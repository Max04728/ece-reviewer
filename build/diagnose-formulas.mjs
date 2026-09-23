// diagnose-formulas.mjs — find payload content that renders as a BROKEN formula table.
//
// WHY: `formulasTable()` in expand.mjs builds the one markdown table a topic note contains.
// It runs `cell()` (which escapes pipes) over the quantity and notes columns, but the
// EXPRESSION is wrapped in $...$ by `expr()` and passed through UNESCAPED. So a literal `|`
// in `formulas[].e` splits the row, and several other shapes break it too. None of this is
// caught by validateAllPayloads(), which only checks that `e` exists and holds no `$`.
//
// ADVISORY, like audit-widgets.mjs: it reports, and never fails a build. Payload content is
// the source of truth, so a defect here is fixed in the payload, not the renderer.
//
//   node build/diagnose-formulas.mjs             # scan every payload
//   node build/diagnose-formulas.mjs --selftest  # prove each rule fires (and stays quiet)

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { formulaStyleFor, hoistInlineFormulas } from './formula-layout.mjs';

const PAYLOAD_ROOT = 'build/payload';

// A single-backslash LaTeX escape that JSON accepted silently: `\f` becomes a form feed and
// `\r` a carriage return, so the formula renders as garbage with NO parse error. This is the
// definitive test for that class, because legitimate LaTeX never produces control characters.
const CTRL = /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/;

const oddDollars = (s) => (String(s).match(/\$/g) ?? []).length % 2 === 1;

function unbalancedBraces(s) {
  let depth = 0;
  for (const ch of String(s)) {
    if (ch === '{') depth++;
    else if (ch === '}') { depth--; if (depth < 0) return true; }
  }
  return depth !== 0;
}

const isTableRow = (l) => /^\s*\|/.test(l);

/**
 * @param {object} obj a parsed payload
 * @param {'table'|'callout'|'block'} style the layout this topic actually renders with.
 *   The table-only rules exist because a markdown table cell cannot survive content that
 *   display math handles fine. Reporting them for a note that no longer uses a table would
 *   be 37 false positives — a checker that cries wolf is worse than no checker.
 * @returns {Array<{where:string, msg:string}>}
 */
export function diagnosePayload(obj, style = 'table') {
  const out = [];
  const push = (where, msg) => out.push({ where, msg });
  const tableOnly = style === 'table';

  // --- control characters anywhere in the payload --------------------------
  const scan = (node, path) => {
    if (typeof node === 'string') {
      if (CTRL.test(node)) {
        const seen = [...new Set([...node].filter((c) => CTRL.test(c))
          .map((c) => '\\x' + c.charCodeAt(0).toString(16).padStart(2, '0')))];
        push(path || '(root)',
          `control character ${seen.join(' ')} — a silently corrupted LaTeX escape. ` +
          'In the JSON the backslash must be DOUBLED (\\\\frac, not \\frac).');
      }
      return;
    }
    if (Array.isArray(node)) { node.forEach((v, i) => scan(v, `${path}[${i}]`)); return; }
    if (node && typeof node === 'object') {
      for (const [k, v] of Object.entries(node)) scan(v, path ? `${path}.${k}` : k);
    }
  };
  scan(obj, '');

  // --- the formulas table --------------------------------------------------
  for (const [i, f] of (obj.formulas ?? []).entries()) {
    const e = String(f?.e ?? '');
    const at = `formulas[${i}].e`;
    if (tableOnly) {
      if (e.includes('|')) push(at, 'literal "|" splits the table cell — use \\lvert and \\rvert (CONVENTIONS §6)');
      if (/[\r\n]/.test(e)) push(at, 'contains a raw newline — it ends the markdown table row');
      if (/^\s*\$\$/.test(e)) push(at, 'starts with $$ (display math) — renders as a display block inside a table cell');
      // REMOVED as false positives: `\begin{...}` and `\\` were originally flagged here, but
      // the markdown parser never sees them as table structure, so they do not break a row.
      // Recorded because a checker that reports phantoms costs more than it saves.
    }
    if (/\\text\{/.test(e)) push(at, 'uses \\text{} — prefer \\mathrm{} (CONVENTIONS §6)');
    if (oddDollars(e)) push(at, 'odd number of "$" — an unmatched delimiter swallows the rest of the row');
    if (unbalancedBraces(e)) push(at, 'unbalanced { } — MathJax will mis-render this');
    for (const col of ['q', 'n']) {
      const v = String(f?.[col] ?? '');
      if (oddDollars(v)) push(`formulas[${i}].${col}`, 'odd number of "$" — opens math that swallows following text');
      if (/[\r\n]/.test(v)) push(`formulas[${i}].${col}`, 'contains a line break (the renderer collapses it, but the payload is malformed)');
    }
  }

  // --- markdown tables authored inside prose -------------------------------
  const checkTable = (text, where) => {
    let block = [];
    const flush = () => {
      if (block.length >= 2) {
        const counts = block.map((l) => l.replace(/\\\|/g, '').split('|').length);
        if (counts.some((c) => c !== counts[0])) {
          push(where, `markdown table has inconsistent column counts (${counts.join(', ')}) — the table breaks`);
        }
      }
      block = [];
    };
    for (const line of String(text ?? '').split(/\r?\n/)) {
      if (isTableRow(line)) block.push(line.trim());
      else flush();
    }
    flush();
  };
  for (const [i, c] of (obj.concept ?? []).entries()) checkTable(c, `concept[${i}]`);
  for (const [i, d] of (obj.derive ?? []).entries()) checkTable(d, `derive[${i}]`);
  for (const [i, p] of (obj.problems ?? []).entries()) {
    checkTable(p?.prompt, `problems[${i}].prompt`);
    for (const [k, s] of (p?.steps ?? []).entries()) checkTable(s, `problems[${i}].steps[${k}]`);
  }

  return out;
}

// ---------------------------------------------------------------------------
// self-test — a checker is only trustworthy once it has been shown to fire on a known
// defect AND to stay quiet on a known-good input.
// ---------------------------------------------------------------------------
function selftest() {
  const clean = {
    scope: 'a clean payload',
    concept: ['| a | b |\n| --- | --- |\n| 1 | 2 |'],
    formulas: [{ q: 'Ohm', e: '\\frac{V}{R}', n: 'V in volts, R in ohms' }],
    problems: [{ prompt: 'find it', steps: ['step', 'step'], ans: '1' }],
  };
  const cases = [
    ['clean payload', clean, 0],
    ['pipe in expression', { formulas: [{ q: 'Abs', e: '|x|', n: 'n' }] }, 1],
    ['display math in expression', { formulas: [{ q: 'x', e: '$$a=b$$', n: 'n' }] }, 1],
    ['newline in expression', { formulas: [{ q: 'x', e: 'a\nb', n: 'n' }] }, 1],
    ['corrupted \\f escape', { formulas: [{ q: 'x', e: '\frac{V}{R}', n: 'n' }] }, 1],
    ['odd dollars in notes', { formulas: [{ q: 'x', e: 'a', n: 'about $5 and $6' }] }, 0],
    ['odd dollars, truly odd', { formulas: [{ q: 'x', e: 'a', n: 'costs $5' }] }, 1],
    ['ragged table in concept', { concept: ['| a | b |\n| 1 |'] }, 1],
    ['unbalanced braces', { formulas: [{ q: 'x', e: '\\frac{V}{R', n: 'n' }] }, 1],
  ];
  let bad = 0;
  for (const [name, payload, expected] of cases) {
    const got = diagnosePayload(payload);
    const ok = got.length === expected;
    if (!ok) bad++;
    console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${name.padEnd(28)} expected ${expected}, got ${got.length}`);
    if (!ok) for (const p of got) console.log(`         ${p.where}: ${p.msg}`);
  }
  // The style gate must actually gate: the very same payload has to be clean under a
  // display-math layout, or the checker is still reporting table artifacts as defects.
  const pipePayload = { formulas: [{ q: 'Abs', e: '|x|', n: 'n' }] };
  const asTable = diagnosePayload(pipePayload, 'table').length;
  const asCallout = diagnosePayload(pipePayload, 'callout').length;
  const gateOk = asTable === 1 && asCallout === 0;
  if (!gateOk) bad++;
  console.log(`  ${gateOk ? 'ok  ' : 'FAIL'} style gate                  table=${asTable}, callout=${asCallout} (want 1/0)`);

  // Inline-formula hoisting. Invariants that each caught a real bug:
  //   * an ODD number of `$` — a '$$\n' replacement string silently collapses to one `$`
  //   * no blank line introduced — blank-line hoisting shredded prose into fragments
  //   * a MID-CLAUSE formula must stay inline, or the words on either side are stranded
  const hoistCases = [
    ['clause-start formula hoisted', 'the limit is: $A = \\int_a^b f(x)\\,dx$ here', true],
    ['mid-clause formula inline', 'the limit is $A = \\int_a^b f(x)\\,dx$ here', false],
    ['after a full stop hoisted', 'that is the area. $A = \\int_a^b f(x)\\,dx$ follows', true],
    ['symbol reference stays inline', 'the value $f(x)$ is small', false],
    ['short relation stays inline', 'so: $a=b$ holds', false],
    ['existing display untouched', 'before $$\\begin{aligned}a &= b\\end{aligned}$$ after', false],
  ];
  for (const [name, input, shouldHoist] of hoistCases) {
    const out = hoistInlineFormulas(input);
    const dollars = (out.match(/\$/g) ?? []).length;
    const triple = out.includes('$$$');
    const hoisted = /\n\$\$/.test(out);
    const blankIntroduced = out.includes('\n\n');
    const ok = dollars % 2 === 0 && !triple && hoisted === shouldHoist && !blankIntroduced;
    if (!ok) bad++;
    console.log(`  ${ok ? 'ok  ' : 'FAIL'} hoist: ${name.padEnd(28)} $=${dollars} triple=${triple} hoisted=${hoisted} blank=${blankIntroduced} (want hoisted=${shouldHoist})`);
  }

  // A continuation word must never be left as its own paragraph. Hoisting no longer creates
  // this (it only fires at clause starts and uses single newlines), but payloads AUTHORED with
  // blank lines around a display block still can, so the merge is still exercised here.
  const merged = hoistInlineFormulas('before\n\n$$A = \\int_0^1 x\\,dx$$\n\nand\n\n$$B = \\frac{p+q+r}{s+t}$$\n\nthen text');
  const noOrphan = !/\n\n\s*(?:and|or|so)\s*\n\n/i.test(merged);
  const keptWord = /and then text/.test(merged);
  const mergeOk = noOrphan && keptWord;
  if (!mergeOk) bad++;
  console.log(`  ${mergeOk ? 'ok  ' : 'FAIL'} hoist: orphan fragment merged   orphan-left=${!noOrphan} reattached=${keptWord}`);

  console.log(bad ? `\n${bad} self-test case(s) FAILED` : '\nself-test passed');
  if (bad) process.exitCode = 1;
  return bad;
}

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (p.toLowerCase().endsWith('.json')) out.push(p);
  }
  return out;
}

const isMain = process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('build/diagnose-formulas.mjs');
if (isMain) {
  if (process.argv.includes('--selftest')) {
    selftest();
  } else {
    const files = walk(PAYLOAD_ROOT).sort();
    const hits = [];
    for (const f of files) {
      let obj;
      try { obj = JSON.parse(readFileSync(f, 'utf8').replace(/^\uFEFF/, '')); }
      catch (e) { hits.push({ file: f, style: '?', problems: [{ where: '(file)', msg: 'unparseable: ' + e.message }] }); continue; }
      // build/payload/<part>/<area>/<slug>.json — the note's own layout decides which rules
      // even apply, so each payload is graded against how it will actually render.
      const seg = f.replace(/\\/g, '/').split('/');
      const area = seg[seg.length - 2];
      const slug = seg[seg.length - 1].replace(/\.json$/, '');
      let style = 'table';
      try { style = formulaStyleFor(area, slug); } catch { /* an unknown style is loud elsewhere */ }
      const problems = diagnosePayload(obj, style);
      if (problems.length) hits.push({ file: f, problems, style });
    }
    console.log(`payloads scanned: ${files.length}`);
    console.log(`payloads with formula/table problems: ${hits.length}`);
    const total = hits.reduce((s, h) => s + h.problems.length, 0);
    console.log(`total findings: ${total}`);
    for (const h of hits) {
      console.log(`\n${relative('.', h.file).replace(/\\/g, '/')}  [style: ${h.style}]`);
      for (const p of h.problems) console.log(`  - ${p.where}: ${p.msg}`);
    }
  }
}
