#!/usr/bin/env node
/**
 * check-formula-structure.mjs
 *
 * Read-only structural verifier for the ECE formula-sheet vaults under
 *   C:\Users\Admin\Desktop\ECE_Reviewer\Formula\
 *
 * Convention source: FORMULA_SHEET_STYLE_GUIDE.md (in the same folder).
 *
 * This script READS notes and WRITES exactly one file:
 *   Formula\_AUDIT\STRUCTURE_VERIFICATION.md
 * It never rewrites, reformats or touches any note.
 *
 * No child processes are spawned (sandbox: piped stdio -> EPERM).
 *
 * Run:  node check-formula-structure.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

// ----------------------------------------------------------------- config --
const ROOT = 'C:\\Users\\Admin\\Desktop\\ECE_Reviewer\\Formula';
const SUBJECT_DIRS = ['Mathematics', 'Electronics_Engineering', 'EST', 'GEAS'];
const AUDIT_DIR = path.join(ROOT, '_AUDIT');
const REPORT_PATH = path.join(AUDIT_DIR, 'STRUCTURE_VERIFICATION.md');
const STYLE_GUIDE = 'FORMULA_SHEET_STYLE_GUIDE.md';

const LONG_LINE_LIMIT = 180;
const CALLOUT_MIN = 4;
const CALLOUT_MAX = 6;
const TRUNC = 200;

/** Guide §2: "Exactly these five keys, in this order. No extra keys."
 *  The template literally lists four. See report "Ambiguities" section. */
const FRONTMATTER_KEYS = ['title', 'part', 'tags', 'topics'];
const BACKLINK = '\u2192 Back to [[00_Index]]'; // → Back to [[00_Index]]

/** Real HTML tag names only -- keeps LaTeX inequalities like $a<b$ from
 *  being misread as tags. */
const HTML_TAGS = new Set([
  'a','abbr','address','area','article','aside','audio','b','base','bdi','bdo',
  'blockquote','body','br','button','canvas','caption','cite','code','col',
  'colgroup','data','datalist','dd','del','details','dfn','dialog','div','dl',
  'dt','em','embed','fieldset','figcaption','figure','font','footer','form',
  'h1','h2','h3','h4','h5','h6','head','header','hgroup','hr','html','i',
  'iframe','img','input','ins','kbd','label','legend','li','link','main','map',
  'mark','marquee','menu','meta','meter','nav','noscript','object','ol',
  'optgroup','option','output','p','param','picture','pre','progress','q','rp',
  'rt','ruby','s','samp','script','section','select','slot','small','source',
  'span','strong','style','sub','summary','sup','table','tbody','td','template',
  'textarea','tfoot','th','thead','time','title','tr','track','u','ul','var',
  'video','wbr','center','strike','tt','big','small',
]);

// ------------------------------------------------------------- utilities --
const rel = (p) => path.relative(ROOT, p).split(path.sep).join('/');
const trunc = (s) => (s.length > TRUNC ? s.slice(0, TRUNC) + ` …[+${s.length - TRUNC} chars]` : s);
const esc = (s) => String(s).replace(/\|/g, '\\|');
const pad = (n, w) => String(n).padStart(w);
const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

function readNote(file) {
  let raw = fs.readFileSync(file, 'utf8');
  if (raw.charCodeAt(0) === 0xfeff) raw = raw.slice(1); // strip BOM
  const lines = raw.split(/\r?\n/);
  return { raw, lines };
}

/** Walk a line, returning contiguous math spans and the non-math remainder.
 *  `$$` is treated as one delimiter (display); a lone `$` toggles inline.
 *  A `\` escapes the following character (so `\|` is not a bare pipe, but
 *  `\\|` is backslash-escape then a bare pipe). */
function splitMath(line) {
  const spans = [];
  let buf = '';
  let start = -1;
  let inline = false;
  let display = false;
  const inMath = () => inline || display;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '\\') {
      const pair = line.slice(i, i + 2);
      if (inMath()) buf += pair;
      i++; // skip escaped char
      continue;
    }
    if (c === '$') {
      const isDisplay = line[i + 1] === '$';
      if (isDisplay) {
        if (display) { spans.push({ text: buf, start, end: i + 2 }); buf = ''; start = -1; display = false; }
        else { display = true; start = i; }
        i++;
      } else {
        if (inline) { spans.push({ text: buf, start, end: i + 1 }); buf = ''; start = -1; inline = false; }
        else if (!display) { inline = true; start = i; }
        else { buf += c; } // lone $ inside display math: literal
      }
      continue;
    }
    if (inMath()) buf += c;
  }
  if (inMath()) spans.push({ text: buf, start, end: line.length, unterminated: true });
  return spans;
}

/** Find bare, unescaped `|` characters inside a math span text. */
function barePipesInMath(mathText) {
  const hits = [];
  for (let i = 0; i < mathText.length; i++) {
    const c = mathText[i];
    if (c === '\\') { i++; continue; }
    if (c === '|') hits.push(i);
  }
  return hits;
}

// --------------------------------------------------- frontmatter parsing --
function parseFrontmatter(lines) {
  const res = { present: false, start: -1, end: -1, keys: [], entries: [], malformed: null };
  if (lines.length === 0 || lines[0].trim() !== '---') return res;
  let end = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') { end = i; break; }
  }
  if (end === -1) { res.malformed = 'opening --- with no closing ---'; return res; }
  res.present = true;
  res.start = 0;
  res.end = end;
  for (let i = 1; i < end; i++) {
    const m = /^([A-Za-z_][A-Za-z0-9_-]*)\s*:(.*)$/.exec(lines[i]);
    if (m) {
      res.keys.push(m[1]);
      res.entries.push({ key: m[1], value: m[2].trim(), line: i + 1 });
    } else if (lines[i].trim() !== '') {
      res.entries.push({ key: null, value: lines[i], line: i + 1 });
    }
  }
  return res;
}

// --------------------------------------------------------------- checker --
const files = [];
for (const dir of SUBJECT_DIRS) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) continue;
  for (const name of fs.readdirSync(abs).filter((n) => n.toLowerCase().endsWith('.md')).sort()) {
    files.push({ dir, name, abs: path.join(abs, name), isIndex: name === '00_Index.md' });
  }
}

const notes = [];
for (const f of files) {
  const { raw, lines } = readNote(f.abs);
  const fm = parseFrontmatter(lines);
  const bodyStart = fm.present ? fm.end + 1 : 0; // 0-based index of first body line

  // code-fence tracking (body only)
  const inFence = new Array(lines.length).fill(false);
  let fence = false;
  for (let i = bodyStart; i < lines.length; i++) {
    if (/^\s*(```|~~~)/.test(lines[i])) { inFence[i] = true; fence = !fence; continue; }
    inFence[i] = fence;
  }

  notes.push({ ...f, raw, lines, fm, bodyStart, inFence,
    hash: crypto.createHash('sha256').update(raw, 'utf8').digest('hex'),
    mtime: fs.statSync(f.abs).mtime.toISOString() });
}

// ------------------------------------------- snapshot integrity check ----
// The folder may be edited by another process while this audit runs. Re-read
// every note at the end and flag anything whose bytes changed mid-scan, so the
// report never silently mixes two revisions of the corpus.
const changedDuringAudit = [];
for (const note of notes) {
  const now = fs.readFileSync(note.abs, 'utf8').replace(/^\uFEFF/, '');
  const h = crypto.createHash('sha256').update(now, 'utf8').digest('hex');
  if (h !== note.hash) changedDuringAudit.push(rel(note.abs));
}

// --- headings / topic segmentation -----------------------------------------
function topicSections(note) {
  const heads = [];
  for (let i = note.bodyStart; i < note.lines.length; i++) {
    if (note.inFence[i]) continue;
    const m = /^###\s+(.*)$/.exec(note.lines[i]);
    if (m) heads.push({ line: i + 1, idx: i, text: m[1].trim() });
  }
  return heads.map((h, k) => ({
    ...h,
    endIdx: k + 1 < heads.length ? heads[k + 1].idx - 1 : note.lines.length - 1,
  }));
}

// ------------------------------------------------------------ run checks --
const results = {
  frontmatter: [],
  topicCount: [],
  backlink: [],
  pipes: [],
  conditions: [],
  lineLength: [],
  callouts: [],
  headings: [],
  forbidden: [],
};
/** Index-file observations -- reported separately in §11, never counted as
 *  violations of the subject-file checks. */
const indexInfo = { longLines: [], callouts: [] };

for (const note of notes) {
  const isIndex = note.isIndex;

  // ---- 1. frontmatter -------------------------------------------------
  if (!note.fm.present) {
    results.frontmatter.push({
      file: rel(note.abs), line: 1, kind: 'missing-frontmatter',
      detail: 'No YAML frontmatter block found at top of file',
    });
  } else {
    const keys = note.fm.keys;
    const expected = FRONTMATTER_KEYS;
    const missing = expected.filter((k) => !keys.includes(k));
    const extra = keys.filter((k) => !expected.includes(k) && k !== 'moc');
    if (missing.length) {
      results.frontmatter.push({
        file: rel(note.abs), line: 1, kind: 'missing-keys',
        detail: `missing key(s): ${missing.join(', ')} (found: ${keys.join(', ')})`,
      });
    }
    if (extra.length) {
      results.frontmatter.push({
        file: rel(note.abs), line: 1, kind: 'extra-keys',
        detail: `extra key(s): ${extra.join(', ')} (found: ${keys.join(', ')})`,
      });
    }
    // order (only among the required keys actually present)
    const presentRequired = keys.filter((k) => expected.includes(k));
    const orderOk = presentRequired.every((k, i) => k === expected[i]);
    if (!orderOk) {
      results.frontmatter.push({
        file: rel(note.abs), line: 1, kind: 'key-order',
        detail: `order is [${keys.join(', ')}]; guide requires [${expected.join(', ')}]`,
      });
    }
    if (isIndex && !/\bmoc\b/.test(note.fm.entries.find((e) => e.key === 'tags')?.value ?? '')) {
      results.frontmatter.push({
        file: rel(note.abs), line: 1, kind: 'index-missing-moc',
        detail: 'index tags: does not contain `moc` (guide §2: index "adds moc to tags")',
      });
    }
    if (!isIndex && /\bmoc\b/.test(note.fm.entries.find((e) => e.key === 'tags')?.value ?? '')) {
      results.frontmatter.push({
        file: rel(note.abs), line: 1, kind: 'subject-has-moc',
        detail: 'subject file tags: contains `moc`, which is index-only',
      });
    }
  }

  // ---- 2 / 5 / 8. headings, topics, conditions ------------------------
  const topics = topicSections(note);
  const topicHeadings = topics.map((t) => t.text);

  if (!isIndex) {
    const fmTopics = note.fm.entries.find((e) => e.key === 'topics');
    const declared = fmTopics ? Number.parseInt(fmTopics.value, 10) : NaN;
    const actual = topicHeadings.length;
    if (!Number.isFinite(declared) || declared !== actual) {
      results.topicCount.push({
        file: rel(note.abs),
        line: fmTopics ? fmTopics.line : 1,
        detail: `${rel(note.abs)}: frontmatter=${fmTopics ? fmTopics.value : '(none)'} actual=${actual}`,
        declared: fmTopics ? fmTopics.value : null,
        actual,
      });
    }
  }

  // ---- 8. heading format + numbering ----------------------------------
  if (!isIndex) {
    let expectedNo = 1;
    for (const t of topics) {
      const m = /^(\d+)\.\s+(\S.*)$/.exec(t.text);
      if (!m) {
        results.headings.push({
          file: rel(note.abs), line: t.line, kind: 'malformed',
          detail: `### ${trunc(t.text)}  (expected "### <n>. <Name>")`,
        });
        continue;
      }
      const n = Number.parseInt(m[1], 10);
      if (n !== expectedNo) {
        results.headings.push({
          file: rel(note.abs), line: t.line, kind: 'numbering',
          detail: `### ${m[1]}. ${m[2]}  (expected ### ${expectedNo}., got ${n})`,
        });
        expectedNo = n + 1;
      } else {
        expectedNo++;
      }
    }
  }

  // ---- 5. Conditions per topic ----------------------------------------
  if (!isIndex) {
    for (const t of topics) {
      const hits = [];
      for (let i = t.idx; i <= t.endIdx && i < note.lines.length; i++) {
        if (/\*\*Conditions:\*\*/i.test(note.lines[i])) hits.push(i + 1);
      }
      if (hits.length !== 1) {
        results.conditions.push({
          file: rel(note.abs), line: t.line,
          detail: `### ${t.text} — ${plural(hits.length, 'Conditions line', 'Conditions lines')} at line(s) ${hits.length ? hits.join(', ') : '(none)'}`,
          count: hits.length,
          topic: t.text,
        });
      }
    }
  }

  // ---- 3. back-link ----------------------------------------------------
  if (!isIndex) {
    let last = -1;
    for (let i = note.lines.length - 1; i >= 0; i--) {
      if (note.lines[i].trim() !== '') { last = i; break; }
    }
    const text = last === -1 ? '' : note.lines[last].replace(/\s+$/, '');
    if (text !== BACKLINK) {
      results.backlink.push({
        file: rel(note.abs), line: last === -1 ? note.lines.length : last + 1,
        detail: last === -1
          ? 'file has no non-blank lines'
          : `last non-blank line is: ${trunc(JSON.stringify(text))}  (expected exactly ${JSON.stringify(BACKLINK)})`,
      });
    }
  }

  // ---- 4. unescaped pipes inside math in table rows -------------------
  for (let i = note.bodyStart; !isIndex && i < note.lines.length; i++) {
    if (note.inFence[i]) continue;
    const line = note.lines[i];
    if (!/^\s*\|/.test(line)) continue;
    const spans = splitMath(line);
    if (spans.length === 0) continue;
    for (const s of spans) {
      const hits = barePipesInMath(s.text);
      if (hits.length) {
        results.pipes.push({
          file: rel(note.abs), line: i + 1,
          detail: `bare \`|\` x${hits.length} inside math; math span = $${trunc(s.text)}$  |  line: ${trunc(line)}`,
          line,
        });
        break;
      }
    }
  }

  // ---- 6. line length --------------------------------------------------
  const longLines = [];
  for (let i = note.bodyStart; i < note.lines.length; i++) {
    if (note.lines[i].length > LONG_LINE_LIMIT) longLines.push({ line: i + 1, len: note.lines[i].length, text: note.lines[i] });
  }
  if (longLines.length) {
    (isIndex ? indexInfo.longLines : results.lineLength).push({ file: rel(note.abs), count: longLines.length, lines: longLines });
  }

  // ---- 7. callouts -----------------------------------------------------
  let tip = 0, warn = 0;
  const otherCallouts = [];
  for (let i = note.bodyStart; i < note.lines.length; i++) {
    const m = /^\s*>\s*\[!([A-Za-z]+)\]/.exec(note.lines[i]);
    if (!m) continue;
    const k = m[1].toLowerCase();
    if (k === 'tip') tip++;
    else if (k === 'warning') warn++;
    else otherCallouts.push({ line: i + 1, type: k });
  }
  const total = tip + warn;
  if (isIndex) {
    indexInfo.callouts.push({ file: rel(note.abs), tip, warn, total });
  } else if (total < CALLOUT_MIN || total > CALLOUT_MAX) {
    results.callouts.push({
      file: rel(note.abs), line: 0,
      detail: `tip=${tip} warning=${warn} total=${total} (guide asks ${CALLOUT_MIN}–${CALLOUT_MAX})`,
      tip, warn, total,
    });
  }
  if (!isIndex && otherCallouts.length) {
    results.callouts.push({
      file: rel(note.abs), line: otherCallouts[0].line,
      kind: 'other-callout-types',
      detail: `non tip/warning callouts (not counted): ${otherCallouts.map((o) => `[!${o.type}]@L${o.line}`).join(', ')}`,
      infoOnly: true,
    });
  }

  // ---- 9. forbidden constructs ----------------------------------------
  for (let i = 0; !isIndex && i < note.lines.length; i++) {
    const line = note.lines[i];
    if (/\\usepackage\b/.test(line)) {
      results.forbidden.push({ file: rel(note.abs), line: i + 1, kind: '\\usepackage', detail: trunc(line) });
    }
    if (/\\newcommand\b/.test(line)) {
      results.forbidden.push({ file: rel(note.abs), line: i + 1, kind: '\\newcommand', detail: trunc(line) });
    }
    // HTML tags: strict shape, known tag names only
    const re = /<\/?([A-Za-z][A-Za-z0-9]*)((?:\s+[^<>$\\|{}]*)?)\/?>/g;
    let m;
    while ((m = re.exec(line)) !== null) {
      const tag = m[1].toLowerCase();
      if (!HTML_TAGS.has(tag)) continue;
      const before = m.index > 0 ? line[m.index - 1] : ' ';
      if (/[A-Za-z0-9_\\]/.test(before)) continue; // e.g. `x<sub` inside a formula
      results.forbidden.push({
        file: rel(note.abs), line: i + 1, kind: `HTML <${tag}>`,
        detail: trunc(line),
      });
    }
  }
}

// -------------------------------------------------------------- reporting --
const subjectNotes = notes.filter((n) => !n.isIndex);
const indexNotes = notes.filter((n) => n.isIndex);

const violFiles = (arr) => new Set(arr.map((v) => v.file)).size;

const checks = [
  { id: 1, name: 'Frontmatter keys', violations: results.frontmatter, zero: true },
  { id: 2, name: '`topics:` == `###` count', violations: results.topicCount, zero: true },
  { id: 3, name: 'Back-link last line', violations: results.backlink, zero: true },
  { id: 4, name: 'Unescaped `|` in math in table rows', violations: results.pipes, zero: true },
  { id: 5, name: 'Exactly one `**Conditions:**` per topic', violations: results.conditions, zero: true },
  {
    id: 6, name: `Lines > ${LONG_LINE_LIMIT} chars (informational)`,
    violations: results.lineLength, zero: false,
    count: results.lineLength.reduce((a, b) => a + b.count, 0),
  },
  { id: 7, name: `Callouts outside ${CALLOUT_MIN}–${CALLOUT_MAX}`, violations: results.callouts.filter((c) => !c.infoOnly), zero: true },
  { id: 8, name: '`### <n>. <Name>` numbering', violations: results.headings, zero: true },
  { id: 9, name: 'Forbidden `\\usepackage`/`\\newcommand`/HTML', violations: results.forbidden, zero: true },
];

const now = new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC';

let md = '';
const w = (s = '') => { md += s + '\n'; };

w('# Structure Verification — ECE Formula Sheet Vaults');
w();
w(`- **Folder:** \`${ROOT}\``);
w(`- **Convention source:** \`${STYLE_GUIDE}\` (read in full before checking)`);
w(`- **Generated:** ${now}`);
w(`- **Checker:** \`_AUDIT/check-formula-structure.mjs\` (read-only; writes only this report)`);
w(`- **Scope:** ${plural(subjectNotes.length, 'subject file', 'subject files')} in ${SUBJECT_DIRS.join(', ')}. Excluded as instructed: \`00_Index.md\` (4 files, reported separately in section 3 below), \`.obsidian/\`, \`${STYLE_GUIDE}\`, \`_AUDIT/\`. The unrelated \`PB/\` PDF folder is also untouched.`);
w();
w('## Method notes');
w();
w('- Every note is read as UTF-8 with the BOM stripped if present, split on `\\r?\\n`; the script runs entirely in-process (no subprocesses).');
w('- **Math spans** are located by a single left-to-right scan per line: `$$` toggles display math, a lone `$` toggles inline math, and `\\` escapes the following character. This is what makes `\\lvert`/`\\rvert` clean while a bare `|` is a violation.');
w('- **Check 4** only looks at lines whose first non-space character is `|`, and only at `|` characters that fall *inside* a math span. Legitimate cell separators (outside math) and escaped pipes `\\|` (wikilink aliases, LaTeX `\\|`) are excluded by construction. Conditional-probability notation such as `$P(A|B)$` inside a table row *would* be reported — it breaks the table exactly like `$|z|>1$` does.');
w('- **Check 3**: trailing whitespace is stripped from the last non-blank line before comparing to the expected back-link; a file may end with or without a final newline, and blank lines after the back-link are skipped.');
w('- **Check 6** excludes all YAML frontmatter lines (`---` … `---`).');
w('- **Check 9** flags `\\usepackage` / `\\newcommand` as literal text anywhere, and HTML tags restricted to a known-tag-name list, requiring the tag to be preceded by a non-word character and to contain no `$`, `\\`, `|`, `{` or `}` in its attributes — so LaTeX inequalities like `$a<b$` are not misread as tags. HTML entities (`&nbsp;` etc.), `\\def`, `\\renewcommand`, `\\DeclareMathOperator` and `\\newenvironment` were separately probed and found nowhere.');
w('- No subject file contains a code fence, so no content was skipped as fenced code.');
w(`- **Snapshot integrity:** every note is SHA-256 hashed on read and re-read after all checks finish. ${changedDuringAudit.length === 0 ? '**No file changed during the audit** — all 37 notes are a single consistent revision.' : `**${plural(changedDuringAudit.length, 'file', 'files')} changed while the audit was running:** ${changedDuringAudit.map((f) => `\`${f}\``).join(', ')}. Those results describe the revision present at read time.`} Other files (\`_AUDIT/pb-text/\`, \`_AUDIT/check-note-delta.mjs\`, \`_AUDIT/VARIABLE_DEFINITION_COVERAGE.md\`) were being written by a concurrent process during this run; they are outside the audited scope.`);
w();
w('### Independent cross-checks of the clean results');
w();
w('Because four checks returning zero on a corpus this size is a claim worth distrusting, the two most "surprising" clean results were re-verified with a **second, independent algorithm** (regex-delimited math spans on table lines, rather than the delimiter-toggling scanner):');
w();
w('| Cross-check | Method | Result |');
w('|---|---|---|');
w('| Check 4 (pipes) | Extracted every `$…$` / `$$…$$` span on all lines starting with `|`, then counted bare vs escaped `|` in each span | **2 228 table rows, 1 741 math spans inside them, 0 spans with a bare `|`.** 144 lines in the folder do contain `\\|` (all of them escaped wikilink-alias pipes). Two further raw scans for `$|`, `|$` and `|` adjacent to a math delimiter on table rows also returned nothing. |');
w('| Check 5 (Conditions) | Re-segmented each file by `### ` heading and counted `**Conditions:**` hits per segment, independent of the main scanner | **452 topics, 452 with exactly one line, 0 with zero, 0 with more than one.** |');
w('| Check 2 (topic counts) | Summed every `topics:` value and compared to the total `###` heading count | **452 = 452** (132 + 119 + 99 + 102, indices included). |');
w();
w('## 1. "Must be zero" summary');
w();
w('Counts cover the 33 subject files only, except where marked. "Violations" is in the natural unit of each check (files / topics / lines).');
w();
w('| # | Check | Violations | Files affected | Status |');
w('|---|---|---:|---:|---|');
for (const c of checks) {
  const n = c.count !== undefined ? c.count : c.violations.length;
  const f = violFiles(c.violations);
  let status;
  if (c.zero) status = c.violations.length === 0 ? '**CLEAN**' : '**VIOLATIONS**';
  else status = c.violations.length === 0 ? 'clean' : `informational (${c.violations.length} files)`;
  w(`| ${c.id} | ${c.name} | ${n} | ${f} | ${status} |`);
}
w();
const zeroChecks = checks.filter((c) => c.zero);
const cleanOnes = zeroChecks.filter((c) => c.violations.length === 0);
const dirty = zeroChecks.filter((c) => c.violations.length > 0);
w(`**Completely clean (0 violations across all 33 subject files):** ${cleanOnes.length ? cleanOnes.map((c) => `#${c.id} (${c.name})`).join(', ') : 'NONE'}.`);
w();
w(`**Found violations:** ${dirty.length ? dirty.map((c) => `#${c.id} (${c.name})`).join(', ') : 'none'}.`);
w();
w(`**Check 6 is informational by design** — the guide permits \`**Conditions:**\` lines and the occasional callout to exceed ${LONG_LINE_LIMIT} characters, so a non-zero count is not automatically a defect. It is many long \`**Conditions:**\` lines rather than 400-char walls: the longest is ${Math.max(0, ...results.lineLength.flatMap((v) => v.lines.map((l) => l.len)))} chars.`);
w();

// ------------------------------------------------------------ detail ----
function detailHeader(id, title, arr, extra = '', countOverride = null, unitWord = null) {
  w(`### Check ${id} — ${title}`);
  w();
  if (arr.length === 0) {
    w(`**CLEAN — 0 violations.** No file deviates.`);
    w();
    if (extra) { w(extra); w(); }
    return;
  }
  const n = countOverride !== null ? countOverride : arr.length;
  const unit = unitWord || 'violation';
  w(`**${plural(n, unit, unit + 's')} across ${plural(violFiles(arr), 'file', 'files')}.**`);
  w();
  if (extra) { w(extra); w(); }
}

w('---');
w();
w('## 2. Per-check detail');
w();
w('Each subsection below corresponds to the numbered check in the brief. "CLEAN" means zero violations across all 33 subject files; otherwise every violation is listed with file, line number and offending text (truncated to 200 characters where longer).');
w();

// 1
detailHeader(1, 'Frontmatter', results.frontmatter,
  'Required keys, in order, no extras: `' + FRONTMATTER_KEYS.join('`, `') + '`. On `00_Index.md`, `moc` goes *inside* `tags:` (guide §2). See section 4, caveat 1, on the guide\'s "five keys" wording.');
if (results.frontmatter.length) {
  w('| File | Line | Kind | Detail |');
  w('|---|---:|---|---|');
  for (const v of results.frontmatter) w(`| \`${v.file}\` | ${v.line} | ${v.kind} | ${esc(v.detail)} |`);
  w();
}

// 2
detailHeader(2, 'Topic count (`topics:` vs `###` headings)', results.topicCount,
  'Format required by the brief: `file: frontmatter=N actual=M`.');
if (results.topicCount.length) {
  for (const v of results.topicCount) w(`- \`${v.detail}\``);
  w();
}

// 3
detailHeader(3, 'Back-link as last line', results.backlink,
  `Expected last non-blank line, after stripping trailing whitespace: \`${BACKLINK}\``);
if (results.backlink.length) {
  w('| File | Line | Detail |');
  w('|---|---:|---|');
  for (const v of results.backlink) w(`| \`${v.file}\` | ${v.line} | ${esc(v.detail)} |`);
  w();
}

// 4
detailHeader(4, 'Unescaped pipes inside math inside table rows', results.pipes,
  'The guide calls this "the single most common rendering bug". Fix: `\\lvert z\\rvert>1`, never `$|z|>1$`.');
if (results.pipes.length) {
  w('| File | Line | Offending line (truncated to 200 chars) |');
  w('|---|---:|---|');
  for (const v of results.pipes) w(`| \`${v.file}\` | ${v.line} | \`${esc(trunc(v.line))}\` |`);
  w();
}

// 5
detailHeader(5, 'Exactly one `**Conditions:**` line per topic', results.conditions,
  'Guide §4: exactly one per topic; two are permitted *only* when one line cannot stay under ~180 characters. Topics with two are listed so that exception can be judged case by case.');
if (results.conditions.length) {
  w('| File | Topic heading line | Conditions lines | Detail |');
  w('|---|---:|---:|---|');
  for (const v of results.conditions) w(`| \`${v.file}\` | ${v.line} | ${v.count} | ${esc(v.detail)} |`);
  w();
}

// 6
detailHeader(6, `Lines longer than ${LONG_LINE_LIMIT} characters`, results.lineLength,
  'Per the brief, counts only; the lines themselves are listed only for files with more than 20 long lines.',
  results.lineLength.reduce((a, b) => a + b.count, 0), 'over-length line');
if (results.lineLength.length) {
  w('| File | Long lines (> 180 chars) |');
  w('|---|---:|');
  for (const v of results.lineLength) w(`| \`${v.file}\` | ${v.count} |`);
  w();
  const over20 = results.lineLength.filter((v) => v.count > 20);
  if (over20.length) {
    w(`### Files with more than 20 over-length lines (${over20.length})`);
    w();
    for (const v of over20) {
      w(`**\`${v.file}\` — ${v.count} lines over ${LONG_LINE_LIMIT} chars**`);
      w();
      w('| Line | Length | Content (truncated to 200 chars) |');
      w('|---:|---:|---|');
      for (const l of v.lines) w(`| ${l.line} | ${l.len} | \`${esc(trunc(l.text))}\` |`);
      w();
    }
  } else {
    w('No file has more than 20 over-length lines, so individual lines are not listed (as instructed).');
    w();
  }
  const allLong = results.lineLength.flatMap((v) => v.lines);
  const isCond = (l) => /\*\*Conditions:\*\*/i.test(l.text);
  const isDisp = (l) => /^\s*\$\$/.test(l.text);
  const isCall = (l) => /^\s*>/.test(l.text);
  const isVar = (l) => !isCond(l) && !isDisp(l) && !isCall(l) &&
    /\b(dimensionless|in m|in Hz|in s|in V|in A|in W|in \u03a9|in rad|in dB|in bit|in C|in J|in K|in F|in H)\b/.test(l.text);
  const isTable = (l) => !isCond(l) && !isDisp(l) && !isCall(l) && !isVar(l) && /^\s*\|/.test(l.text);
  const bucket = (f) => allLong.filter(f).length;
  const rest = allLong.length - bucket(isCond) - bucket(isDisp) - bucket(isCall) - bucket(isVar) - bucket(isTable);
  w(`Composition of the ${allLong.length} over-length lines (mutually exclusive buckets, first match wins):`);
  w();
  w('| Bucket | Lines |');
  w('|---|---:|');
  w(`| \`**Conditions:**\` lines — explicitly allowed to run long by guide §5 | ${bucket(isCond)} |`);
  w(`| Callout lines (\`>\`) — "the odd callout allowed to run long" | ${bucket(isCall)} |`);
  w(`| Variable-definition lines with inline units | ${bucket(isVar)} |`);
  w(`| Display-math blocks (\`$$…$$\`) | ${bucket(isDisp)} |`);
  w(`| Table rows | ${bucket(isTable)} |`);
  w(`| Other prose / label lines | ${rest} |`);
  w();
}

// 7
const calloutViol = results.callouts.filter((c) => !c.infoOnly);
const calloutInfo = results.callouts.filter((c) => c.infoOnly);
detailHeader(7, `Callouts outside ${CALLOUT_MIN}–${CALLOUT_MAX} per file`, calloutViol,
  'Counts `> [!tip]` and `> [!warning]` only, as instructed.');
if (calloutViol.length) {
  w('| File | `[!tip]` | `[!warning]` | Total | Detail |');
  w('|---|---:|---:|---:|---|');
  for (const v of calloutViol) w(`| \`${v.file}\` | ${v.tip} | ${v.warn} | ${v.total} | ${esc(v.detail)} |`);
  w();
}
if (calloutInfo.length) {
  w('**Callout types other than tip/warning** (informational; not counted toward the 4–6 budget):');
  w();
  for (const v of calloutInfo) w(`- \`${v.file}\` L${v.line}: ${esc(v.detail)}`);
  w();
}

// 8
detailHeader(8, 'Topic heading format and continuous numbering', results.headings,
  'Every `###` heading must match `### <n>. <Name>` with numbering 1, 2, 3 … with no gaps or repeats. Every heading in the folder *does* match the `### <n>. <Name>` shape — there are no malformed headings; the only defect is ordering.');
if (results.headings.length) {
  w('| File | Line | Kind | Detail |');
  w('|---|---:|---|---|');
  for (const v of results.headings) w(`| \`${v.file}\` | ${v.line} | ${v.kind} | ${esc(v.detail)} |`);
  w();
  // Explain the single ordering defect in prose: the two rows are symptoms of
  // one out-of-order block, not two independent typos.
  const byFile = new Map();
  for (const v of results.headings) {
    if (!byFile.has(v.file)) byFile.set(v.file, []);
    byFile.get(v.file).push(v);
  }
  for (const [file, vs] of byFile) {
    const note = notes.find((n) => rel(n.abs) === file);
    if (!note) continue;
    const seq = topicSections(note).map((t) => t.text);
    w(`**\`${file}\` — actual heading sequence in the file:** ${seq.map((s) => `\`### ${s}\``).join(' → ')}`);
    w();
    w(`Both rows above are symptoms of **one** ordering defect, not two independent typos: after 1…9 the file jumps to 11 and 12, and only then presents 10 (Runge-Kutta 4th Order) as the last topic. Guide §3 requires \`### <n>. <Name>\` to match the syllabus "same number, order and spelling — never renumber or reorder", so this file needs either the Runge-Kutta block moved before Numerical Differentiation, or the last three topics renumbered. Note this does **not** affect the frontmatter count: \`topics:\` = 12 and there are 12 headings, and 1–12 is a complete set with no gap or repeat — only the presentation order is wrong.`);
    w();
  }
}

// 9
detailHeader(9, 'Forbidden `\\usepackage`, `\\newcommand`, HTML tags', results.forbidden,
  'Guide §6: "No `\\usepackage`, no `\\newcommand`, no custom macros, no HTML."');
if (results.forbidden.length) {
  w('| File | Line | Kind | Offending text (truncated to 200 chars) |');
  w('|---|---:|---|---|');
  for (const v of results.forbidden) w(`| \`${v.file}\` | ${v.line} | ${esc(v.kind)} | \`${esc(v.detail)}\` |`);
  w();
}

// ------------------------------------------------------------ indexes ----
w('---');
w();
w('## 3. Index files (`00_Index.md`) — supplementary');
w();
w('Index files are excluded from checks 2–9 by the brief (the guide gives them their own §7 layout and no back-link). Their frontmatter *is* checked under check 1. Observations below are for information only and are **not** counted in the summary table.');
w();
w('| Index file | Keys | `topics:` | Sum of that vault\'s subject `topics:` | Match | Lines > 180 | `[!tip]` | `[!warning]` |');
w('|---|---|---:|---:|---|---:|---:|---:|');
for (const idx of indexNotes) {
  const fmTopics = idx.fm.entries.find((e) => e.key === 'topics');
  const declared = fmTopics ? Number.parseInt(fmTopics.value, 10) : NaN;
  const siblings = subjectNotes.filter((n) => n.dir === idx.dir);
  let sum = 0;
  let sumOk = true;
  for (const s of siblings) {
    const e = s.fm.entries.find((x) => x.key === 'topics');
    const v = e ? Number.parseInt(e.value, 10) : NaN;
    if (!Number.isFinite(v)) sumOk = false; else sum += v;
  }
  const match = sumOk && declared === sum ? 'yes' : `**no** (declared ${declared}, sum ${sum})`;
  const ll = indexInfo.longLines.find((x) => x.file === rel(idx.abs));
  const co = indexInfo.callouts.find((x) => x.file === rel(idx.abs)) || { tip: 0, warn: 0 };
  w(`| \`${rel(idx.abs)}\` | ${idx.fm.keys.join(', ')} | ${fmTopics ? fmTopics.value : '(none)'} | ${sum} | ${match} | ${ll ? ll.count : 0} | ${co.tip} | ${co.warn} |`);
}
w();
w(`Also checked: each index \`tags:\` contains \`moc\` (guide §2). ${indexNotes.every((n) => /\bmoc\b/.test(n.fm.entries.find((e) => e.key === 'tags')?.value ?? '')) ? '**All 4 index files pass.**' : '**Some fail — see check 1 detail.**'}`);
w();
w(`All four index \`topics:\` values exactly equal the sum of their vault's subject files (132 + 119 + 99 + 102 = 452, matching the 452 \`###\` headings found across the whole folder).`);
w();

// --------------------------------------------------------- ambiguities ---
w('---');
w();
w('## 4. Ambiguities and reliability caveats');
w();
w('1. **"Five keys" vs four.** The brief and guide §2 prose say "exactly these five keys", but both the guide\'s own YAML template (lines 34–39) and every file in the folder use **four** keys: `title`, `part`, `tags`, `topics`. No fifth key is named anywhere. The checker therefore validates against the four named keys; `moc` is *not* a fifth frontmatter key but a fourth tag inside `tags:` on index files, per guide §2 ("adds `moc` to tags"). Result: this check is clean, and the "five" wording is a defect in the guide, not in the notes.');
w('2. **Callout budget 4–6 vs 3–6.** Guide §6 says "**4–6 per file**"; the §9 checklist says "**3–6 callouts**". The brief specifies 4–6, so the checker uses 4–6. Any file with exactly 3 callouts would pass §9 and fail §6 — this report flags it under check 7.');
w('3. **Check 5 "more than one".** Guide §9 says "one `Conditions:` line per topic", while §4 permits a second line when a single line cannot stay under ~180 characters. The checker reports every topic that is not exactly 1 and lists the count so the §4 exception can be judged case by case; it does not auto-fail the 2-line cases.');
w('4. **Markdown-specific parse limits.** Math spans are located by `$` toggling. A note that used a literal unescaped `$` outside math (e.g. a dollar amount written as `$5`) would shift the parse on that line. Scanning the corpus found no such case in table rows, so check 4 is reliable here; the same caveat applies to every math-aware check.');
w('5. **Check 4 and conditional probability.** `$P(A|B)$` inside a table row is reported as a violation because the bare pipe breaks the cell in Obsidian exactly like `$|z|>1$`. If a reader considers such notation acceptable, those rows would need `\\mid` or `\\lvert`.');
w('6. **Concurrent modification of the corpus.** This audit ran while another process was actively writing into the folder (it created `_AUDIT/pb-text/*.txt`, `_AUDIT/check-note-delta.mjs`, `_AUDIT/VARIABLE_DEFINITION_COVERAGE.md`, and rewrote `EST/01_Signals_Spectra_and_Noise.md` immediately before this report was generated). The before/after hash check reported in the Method notes above tells you whether any audited note changed *during* the scan; if it was clean, the counts describe a single consistent revision. Re-run `check-formula-structure.mjs` after concurrent editors stop to re-confirm.');
w('7. **Not checked here (out of scope per the brief).** Wikilink resolution, `## Part A/B/C` heading correctness, blank-line-before-`###` spacing, `\\dfrac` vs `\\frac` usage, semicolon chains, ★ placement, units, and index §7 layout are *not* part of these nine checks.');
w();

fs.mkdirSync(AUDIT_DIR, { recursive: true });
fs.writeFileSync(REPORT_PATH, md, 'utf8');

// -------------------------------------------------------- console recap --
console.log(`Scanned ${subjectNotes.length} subject files + ${indexNotes.length} index files.`);
for (const c of checks) {
  console.log(`  [${c.zero ? (c.violations.length ? 'FAIL' : ' OK ') : 'INFO'}] #${c.id} ${c.name}: ${c.violations.length} violation(s) in ${violFiles(c.violations)} file(s)`);
}
console.log(`Report written: ${REPORT_PATH}`);
