// build-notes.mjs — render topic notes from payload files.
//
//   node build/build-notes.mjs              # render every topic that has a payload
//   node build/build-notes.mjs --area 01_Differential_Calculus
//   node build/build-notes.mjs --force      # also re-render topics with no payload as stubs
//   node build/build-notes.mjs --validate   # validate payloads only, write nothing
//
// A topic with no payload file stays a stub (depth: stub). A topic with a payload is
// rendered at full depth (depth: full). Tier decides how much of the payload renders.

import { readFileSync, existsSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, basename } from 'node:path';
import { AREAS, VAULT, topicPath } from './vault.mjs';
import { renderNote, extractTracking } from './expand.mjs';

// Basenames of every note currently on disk, used for authoring-time link checks.
function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (e.endsWith('.md')) out.push(basename(e, '.md'));
  }
  return out;
}
const vaultBasenames = new Set(walk(VAULT));

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const opt = (name) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : null;
};

const onlyArea = opt('area');
const validateOnly = flag('validate');

const payloadPath = (t) => `build/payload/${t.part}/${t.area}/${t.slug}.json`;

/**
 * Repair invalid JSON escapes: inside string literals, double any backslash that does
 * not begin a valid JSON escape.
 *
 * WHY THIS EXISTS: payload authors repeatedly write LaTeX with a single backslash
 * (`\frac`, `\left`, `\pi`). In JSON those are invalid escapes and abort the whole
 * file, so a carefully written note silently renders as nothing. The fix is mechanical
 * and unambiguous - a lone backslash before a letter can only have been meant as
 * LaTeX - so the loader repairs it in place rather than failing the build.
 *
 * Note `\f` and `\r` ARE valid JSON escapes, so they cannot be detected here; they
 * produce a form-feed / carriage-return. `build/scan-escapes.mjs` and
 * `build/diagnose.mjs` report those separately.
 *
 * @returns {{text:string, fixes:number}}
 */
export function repairEscapes(src) {
  const VALID = new Set(['"', '\\', '/', 'b', 'f', 'n', 'r', 't', 'u']);
  let inStr = false;
  let out = '';
  let fixes = 0;
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (!inStr) {
      out += ch;
      if (ch === '"') inStr = true;
      continue;
    }
    if (ch === '\\') {
      const next = src[i + 1];
      if (next !== undefined && VALID.has(next)) {
        out += ch + next;
        i++;
        if (next === 'u') {
          out += src.slice(i + 1, i + 5);
          i += 4;
        }
        continue;
      }
      out += '\\\\';
      fixes++;
      continue;
    }
    if (ch === '"') {
      inStr = false;
      out += ch;
      continue;
    }
    out += ch;
  }
  return { text: out, fixes };
}

function loadPayload(t) {
  const p = payloadPath(t);
  if (!existsSync(p)) return null;
  // Strip a UTF-8 BOM if present. PowerShell's Set-Content -Encoding UTF8 writes one,
  // and JSON.parse rejects it with a confusing "Unexpected token" error.
  const raw = readFileSync(p, 'utf8').replace(/^\uFEFF/, '');
  try {
    return JSON.parse(raw);
  } catch (e) {
    // Attempt the mechanical escape repair before giving up.
    if (/Bad escaped character|Bad control character|Unexpected token/i.test(e.message)) {
      const { text, fixes } = repairEscapes(raw);
      if (fixes > 0) {
        try {
          const parsed = JSON.parse(text);
          writeFileSync(p, text, 'utf8');
          console.log(`  > repaired ${fixes} invalid escape(s) in ${p}`);
          return parsed;
        } catch {
          /* fall through to the hard error below */
        }
      }
    }
    const hint = /Bad escaped character|Bad control character/i.test(e.message)
      ? ' - LaTeX backslashes must be DOUBLED in JSON. See CONVENTIONS.md section 6; run `node build/diagnose.mjs`.'
      : '';
    throw new Error(`payload JSON parse error in ${p}: ${e.message}${hint}`);
  }
}

// ---------------------------------------------------------------------------
// validation: catch thin/incorrect payloads before they become bad notes
// ---------------------------------------------------------------------------

function validate(t, pl) {
  const errs = [];
  const warns = [];
  const push = (a, m) => a.push(`${t.id} ${t.slug}: ${m}`);

  if (!pl || typeof pl !== 'object') { errs.push(`${t.id}: empty payload`); return { errs, warns }; }

  if (!pl.scope || String(pl.scope).trim().length < 8) push(warns, 'scope missing or very short');
  if (!Array.isArray(pl.formulas) || pl.formulas.length === 0) push(errs, 'no formulas[]');

  for (const [i, f] of (pl.formulas ?? []).entries()) {
    if (!f || !f.q || !f.e) push(errs, `formula[${i}] needs {"q","e","n"}`);
    if (f && f.e && /\$/.test(String(f.e))) push(errs, `formula[${i}] expression must not contain $ delimiters`);
    if (f && !f.n) push(warns, `formula[${i}] has no note (assumption/unit trap)`);
  }

  if (t.tier === 1) {
    if (!Array.isArray(pl.concept) || pl.concept.length < 2) push(errs, 'T1 needs concept[] with >= 2 paragraphs');
    if (!Array.isArray(pl.derive) || pl.derive.length < 2) push(warns, 'T1 should have derive[]');
    const n = (pl.problems ?? []).length;
    if (n < 8) push(warns, `T1 has ${n} problems, target 8-10`);
    if (!Array.isArray(pl.traps) || pl.traps.length < 2) push(warns, 'T1 should have >= 2 traps');
  } else if (t.tier === 2) {
    if (!Array.isArray(pl.concept) || pl.concept.length < 1) push(errs, 'T2 needs concept[]');
    const n = (pl.problems ?? []).length;
    if (n < 3) push(warns, `T2 has ${n} problems, target 3-5`);
    if (!pl.traps?.length) push(warns, 'T2 should have >= 1 trap');
  } else {
    if (!pl.formulas?.length) push(errs, 'T3 needs formulas[]');
    if (!pl.traps?.length) push(warns, 'T3 should keep >= 1 trap (recall value)');
  }

  for (const [i, p] of (pl.problems ?? []).entries()) {
    if (!p.prompt) push(errs, `problem[${i}] missing prompt`);
    if (!p.ans) push(errs, `problem[${i}] missing ans`);
    if (!Array.isArray(p.steps) || p.steps.length < 2) push(warns, `problem[${i}] should show >= 2 solution steps`);
  }

  // Link validation, at authoring time. Two precise checks:
  //   1. a wikilink to a note ID instead of a filename (the recurring mistake here)
  //   2. a wikilink whose target does not exist as a file in the vault
  // check-links.mjs still runs after each wave; this catches errors earlier.
  const linkRe = /\[\[([^\]|#]+)/g;
  const checkLink = (s, where) => {
    let m;
    while ((m = linkRe.exec(String(s))) !== null) {
      const target = m[1].trim();
      if (/^(MATH|ECE|GEAS|EST)-\d{2}-\d{2}/.test(target)) {
        push(errs, `${where}: [[${target}]] targets an ID - use the filename instead`);
      } else if (!vaultBasenames.has(target.split('/').pop())) {
        push(errs, `${where}: [[${target}]] does not match any note filename`);
      }
    }
  };
  checkLink(pl.scope, 'scope');
  for (const [i, r] of (pl.refs ?? []).entries()) checkLink(r, `refs[${i}]`);
  for (const [i, r] of (pl.prereqs ?? []).entries()) checkLink(r, `prereqs[${i}]`);

  return { errs, warns };
}

/**
 * Validate every payload that exists, without writing anything.
 * Exported so build/verify.mjs can call it in-process (the sandbox forbids Node
 * from spawning child processes with piped stdio).
 * @returns {{checked:number, errs:string[], warns:string[]}}
 */
export function validateAllPayloads() {
  const errs = [];
  const warns = [];
  let checked = 0;
  for (const area of AREAS) {
    for (const t of area.topics) {
      let pl = null;
      try {
        pl = loadPayload(t);
      } catch (e) {
        errs.push(e.message);
        continue;
      }
      if (!pl) continue;
      checked++;
      const r = validate(t, pl);
      errs.push(...r.errs);
      warns.push(...r.warns);
    }
  }
  return { checked, errs, warns };
}

// ---------------------------------------------------------------------------
// run
// ---------------------------------------------------------------------------

const isMain = process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('build/build-notes.mjs');
if (isMain) {
const targets = AREAS.filter((a) => !onlyArea || a.area === onlyArea);
if (onlyArea && targets.length === 0) {
  console.error(`no area matched --area ${onlyArea}`);
  console.error('available:', AREAS.map((a) => a.area).join(', '));
  process.exit(1);
}

let rendered = 0, stubbed = 0, skipped = 0;
const allErrs = [];
const allWarns = [];
const doneIds = [];

for (const area of targets) {
  for (const t of area.topics) {
    let pl = null;
    try {
      pl = loadPayload(t);
    } catch (e) {
      allErrs.push(String(e.message));
      continue;
    }

    if (!pl) { skipped++; continue; }

    const { errs, warns } = validate(t, pl);
    allErrs.push(...errs);
    allWarns.push(...warns);

    if (validateOnly) { doneIds.push(`${t.id} ok, ${warns.length} warn`); continue; }
    if (errs.length) { allWarns.push(`${t.id}: NOT rendered due to ${errs.length} error(s)`); continue; }

    const path = topicPath(t);
    mkdirSync(dirname(path), { recursive: true });
    // Read the learner-owned frontmatter off the note already on disk BEFORE overwriting it, so
    // re-rendering an area preserves study progress. Without this, every re-render silently
    // resets status/confidence on all 408 notes.
    let prior = null;
    try { prior = readFileSync(path, 'utf8'); } catch { prior = null; }
    writeFileSync(path, renderNote(t, area, pl, 'full', extractTracking(prior)), 'utf8');
    rendered++;
  }
}

if (validateOnly) {
  console.log(`validated ${doneIds.length} payload(s)`);
} else {
  console.log(`rendered: ${rendered}  |  no payload (left as stub): ${skipped}`);
}

if (allWarns.length) {
  console.log(`\nwarnings (${allWarns.length}):`);
  for (const w of allWarns.slice(0, 60)) console.log('  ! ' + w);
  if (allWarns.length > 60) console.log(`  ... ${allWarns.length - 60} more`);
}
if (allErrs.length) {
  console.log(`\nERRORS (${allErrs.length}):`);
  for (const e of allErrs.slice(0, 60)) console.log('  x ' + e);
  if (allErrs.length > 60) console.log(`  ... ${allErrs.length - 60} more`);
  if (!validateOnly) process.exitCode = 1;
}
} // end isMain
