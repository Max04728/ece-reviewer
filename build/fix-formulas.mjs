// fix-formulas.mjs — repair the defects that diagnose-formulas.mjs reports.
//
// Three repairs, all confined to `formulas[].e`:
//   1. a literal `|` -> alternating \lvert / \rvert   (absolute values, determinants)
//   2. `\text{...}` -> `\mathrm{...}`, with inner spaces converted to `\ ` so the rendering
//      is unchanged. NOTE: this is why a plain string substitute is not enough — \mathrm{}
//      IGNORES spaces, so `\text{per unit}` would render as "perunit" without the `\ `.
//   3. everything else is REPORTED, never guessed at.
//
// Why the writes are safe:
//   * PowerShell is never used — `Set-Content -Encoding UTF8` writes a BOM that JSON.parse
//     rejects.
//   * The file is NOT re-serialised. Only the exact JSON-encoded value of a repaired string
//     is swapped for its replacement, so indentation, key order and every other byte survive.
//     `JSON.stringify(oldValue)` reproduces the file's own escaping for these strings.
//   * Every file is re-parsed after writing, and a replacement that did not land is reported
//     rather than silently skipped.
//
//   node build/fix-formulas.mjs --report   # what would change (default)
//   node build/fix-formulas.mjs --apply    # write the repairs

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = 'build/payload';
const APPLY = process.argv.includes('--apply');

/** A literal pipe that is not `\|` and not already `\lvert`/`\rvert`. */
function fixPipes(s) {
  let opening = true;
  return String(s).replace(/(?<!\\)\|/g, () => {
    const r = opening ? '\\lvert ' : ' \\rvert';
    opening = !opening;
    return r;
  });
}

/** `\text{X}` -> `\mathrm{X}` with inner spaces preserved as `\ `. Nested braces are skipped. */
function fixText(s) {
  return String(s).replace(/\\text\{([^{}]*)\}/g, (_, inner) => `\\mathrm{${inner.replace(/ /g, '\\ ')}}`);
}

/** Collapse a raw newline or run of spaces: inside math it means nothing, but in a table
 *  cell a newline ends the row. `\ ` keeps its own single space. */
function fixWhitespace(s) {
  return String(s).replace(/\s+/g, ' ').trim();
}

function transform(e) {
  return fixWhitespace(fixText(fixPipes(e)));
}

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (p.toLowerCase().endsWith('.json')) out.push(p);
  }
  return out;
}

const files = walk(ROOT).sort();
const report = { pipes: 0, text: 0, textProblems: 0, files: 0, unmatched: [], corrupt: [], textContents: new Map(), nested: [], unbalanced: [] };

for (const file of files) {
  const raw = readFileSync(file, 'utf8').replace(/^\uFEFF/, '');
  let obj;
  try { obj = JSON.parse(raw); } catch { continue; }

  let t = raw;
  let touched = 0;

  for (const [i, f] of (obj.formulas ?? []).entries()) {
    const e = String(f?.e ?? '');
    if (!e) continue;

    if (/(?<!\\)\|/.test(e)) report.pipes++;
    for (const m of e.matchAll(/\\text\{([^{}]*)\}/g)) {
      report.text++;
      const key = m[1];
      report.textContents.set(key, (report.textContents.get(key) ?? 0) + 1);
    }
    if (/\\text\{/.test(e) && !/\\text\{[^{}]*\}/.test(e)) report.nested.push(`${file} formulas[${i}].e`);

    // unbalanced braces — reported only, never auto-guessed
    let depth = 0;
    for (const ch of e) { if (ch === '{') depth++; else if (ch === '}') depth--; }
    if (depth !== 0) report.unbalanced.push(`${relative('.', file)} formulas[${i}].e = ${e}`);

    const fixed = transform(e);
    if (fixed === e) continue;

    const jsonOld = JSON.stringify(e);
    const jsonNew = JSON.stringify(fixed);
    if (!t.includes(jsonOld)) {
      report.unmatched.push(`${relative('.', file)} formulas[${i}].e`);
      continue;
    }
    // FUNCTION replacement, deliberately. In a replace() replacement STRING, `$'` means "the
    // text after the match" and `$&` the match itself — so a payload string containing
    // `$...$'` spliced the rest of the file into itself, twice, and produced invalid JSON.
    // A function replacement performs no substitution at all. This bit twice in one session:
    // once as `$$` collapsing to `$`, once as this.
    t = t.replaceAll(jsonOld, () => jsonNew);
    touched++;
  }

  // --- prose + problem fields: `\text{}` -> `\mathrm{}` ONLY ----------------
  // Every learner-visible string in the payload. Deliberately NOT fixPipes (a `|` is harmless
  // outside a table) and NOT fixWhitespace (collapsing whitespace in prose would destroy
  // intentional formatting). CONVENTIONS §6 prefers \mathrm{} inside $...$, the formula tables
  // are already converted, so leaving any of these would make a note inconsistent with itself.
  const proseFields = [
    obj.scope, obj.intuition,
    ...(obj.concept ?? []),
    ...(obj.derive ?? []),
    ...(obj.traps ?? []),
    ...(obj.problems ?? []).flatMap((p) => [
      p?.prompt, ...(p?.give ?? []), ...(p?.steps ?? []), p?.ans, p?.trap,
    ]),
  ];
  for (const s of proseFields) {
    if (typeof s !== 'string' || !s.includes('\\text{')) continue;
    const fixed = fixText(s);
    if (fixed === s) continue;
    const jsonOld = JSON.stringify(s);
    if (!t.includes(jsonOld)) {
      report.unmatched.push(`${relative('.', file)} prose field (\\text{})`);
      continue;
    }
    // FUNCTION replacement — see the note on the formula pass. A replacement STRING would
    // treat `$'`, `$&` and `$$` in prose (which is full of `$...$`) as substitution patterns.
    t = t.replaceAll(jsonOld, () => JSON.stringify(fixed));
    touched++;
    report.textProblems++;
  }

  if (touched && t !== raw) {
    report.files++;
    if (APPLY) {
      // Parse BEFORE writing. A bad replacement must never reach disk: a corrupt payload drops
      // its note out of the build entirely, and recovering one cost real work this session.
      try {
        JSON.parse(t);
      } catch (e) {
        report.corrupt.push(relative('.', file));
        console.log(`x REFUSING TO WRITE ${relative('.', file)} — replacement produced invalid JSON: ${e.message}`);
        continue;
      }
      writeFileSync(file, t, 'utf8');
      // Prove the write is still valid JSON and holds the repaired values.
      const check = JSON.parse(readFileSync(file, 'utf8').replace(/^\uFEFF/, ''));
      for (const [i, f] of (obj.formulas ?? []).entries()) {
        const want = transform(String(f?.e ?? ''));
        if (String(check.formulas?.[i]?.e ?? '') !== want) {
          console.log(`x VERIFY FAILED ${relative('.', file)} formulas[${i}].e`);
        }
      }
    }
  }
}

console.log(`payloads scanned:              ${files.length}`);
console.log(`literal pipes to convert:      ${report.pipes}`);
console.log(`\\text{} to convert:            ${report.text} (formula expressions)`);
console.log(`\\text{} in problem fields:     ${report.textProblems}`);
console.log(`files that change:             ${report.files}`);
if (report.unmatched.length) {
  console.log(`\n!! replacements that did NOT match the raw file (nothing written): ${report.unmatched.length}`);
  for (const u of report.unmatched) console.log(`   ${u}`);
}
if (report.corrupt.length) {
  console.log(`\n!! REFUSED TO WRITE — replacement produced invalid JSON: ${report.corrupt.length}`);
  for (const c of report.corrupt) console.log(`   ${c}`);
  process.exitCode = 1;
}
if (report.nested.length) {
  console.log(`\nnested \\text{...} braces skipped (need a hand check): ${report.nested.length}`);
  for (const n of report.nested) console.log(`   ${n}`);
}
if (report.unbalanced.length) {
  console.log(`\nUNBALANCED BRACES (reported, not repaired): ${report.unbalanced.length}`);
  for (const u of report.unbalanced) console.log(`   ${u}`);
}
console.log(`\ndistinct \\text{} contents: ${report.textContents.size}`);
for (const [k, v] of [...report.textContents.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(v).padStart(3)}  |${k}|${k.includes(' ') ? '   <- has spaces, needs \\ ' : ''}`);
}
console.log(APPLY ? '\nAPPLIED' : '\nDRY RUN — re-run with --apply to write');
