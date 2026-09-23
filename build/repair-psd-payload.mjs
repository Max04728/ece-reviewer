// repair-psd-payload.mjs — one-off recovery of a payload corrupted by a bad string replace.
//
// WHAT HAPPENED: fix-formulas.mjs replaced payload values with
// `text.replaceAll(jsonOld, JSON.stringify(fixed))`. In a replace() replacement STRING, `$'`
// means "the text after the match", so a field containing `$...$'` spliced the whole rest of
// the file into itself, twice, and left the string literal unterminated.
//
// The damage is a clean duplication, so the repair is exact rather than a reconstruction:
//
//   lines 1-4    intact prologue ({ scope intuition "concept": [)
//   line 5       the replacement string's head, cut where `$'` began, plus the suffix's first ','
//   lines 6-103  the ORIGINAL TAIL (concept[1..], formulas, problems, traps, refs, prereqs, })
//   line 104     the replacement string's REMAINDER, then '",' and the tail repeated
//   lines 105-202  the tail again (duplicate) + closing }
//
// So: rejoin line 5's head with line 104's fragment, keep ONE copy of the tail, drop the rest.
// Every step is asserted; the script refuses to write if the shape is not what it expects.

import { readFileSync, writeFileSync } from 'node:fs';

const FILE = 'build/payload/04_EST/01_Signals_Spectra_and_Noise/02_Power_Spectral_Density.json';

const raw = readFileSync(FILE, 'utf8');
const eol = raw.includes('\r\n') ? '\r\n' : '\n';
const lines = raw.split(/\r?\n/);

const problems = [];
const check = (cond, msg) => { if (!cond) problems.push(msg); };

check(lines[0].trim() === '{', 'line 1 is not "{"');
check(lines[3].trim() === '"concept": [', 'line 4 is not the concept array opener');
check(/^\s{4}"/.test(lines[4]) && lines[4].endsWith(','), 'line 5 is not an indented string ending in ","');
check(lines[102].trim() === '}', 'line 103 is not the "}" that ends the original tail');
check(lines[103].endsWith('",'), 'line 104 does not end with `",`');
check(lines[103].startsWith(' '), 'line 104 does not look like a mid-sentence continuation');
// The file ends with a newline, so the final split element is empty — check the last
// non-empty line instead.
const lastNonEmpty = (() => {
  for (let i = lines.length - 1; i >= 0; i--) if (lines[i].trim() !== '') return i;
  return -1;
})();
check(lastNonEmpty >= 0 && lines[lastNonEmpty].trim() === '}', 'the file does not end with "}"');

if (problems.length) {
  console.log('REFUSING TO WRITE — the file is not the shape this repair expects:');
  for (const p of problems) console.log(`  x ${p}`);
  process.exitCode = 1;
} else {
  const head = lines[4].slice(0, -1);            // `    "<new string head>`  (drop suffix ',')
  const rest = lines[103].slice(0, -2);          // `<new string remainder>` (drop `",`)
  const tail = lines.slice(5, 103);              // concept[1..], ..., prereqs, `}`

  // `head` carries the opening quote and `rest` had the closing `",` stripped, so the joined
  // line must have them put back or the literal is unterminated — which parses as a raw
  // newline inside a string, the very error being repaired.
  const repairedLine5 = `${head}${rest}",`;

  const repaired = [lines[0], lines[1], lines[2], lines[3], repairedLine5, ...tail].join(eol) + eol;

  // Prove the result is valid JSON and looks like the right document BEFORE writing.
  let parsed = null;
  try { parsed = JSON.parse(repaired); } catch (e) { console.log(`x repaired text does not parse: ${e.message}`); process.exitCode = 1; }

  if (parsed) {
    const okShape =
      typeof parsed.scope === 'string' &&
      Array.isArray(parsed.concept) && parsed.concept.length >= 4 &&
      String(parsed.concept[0]).startsWith('**PSD is a density') &&
      Array.isArray(parsed.formulas) && parsed.formulas.length > 0 &&
      Array.isArray(parsed.problems) && parsed.problems.length > 0 &&
      Array.isArray(parsed.traps) && Array.isArray(parsed.prereqs);
    if (!okShape) {
      console.log('x repaired text parses but does not look like the expected payload — not writing');
      console.log(`  concept: ${parsed.concept?.length} paragraphs, first starts: ${String(parsed.concept?.[0]).slice(0, 40)}`);
      process.exitCode = 1;
    } else {
      writeFileSync(FILE, repaired, 'utf8');
      console.log(`repaired ${FILE}`);
      console.log(`  concept paragraphs : ${parsed.concept.length}`);
      console.log(`  formulas           : ${parsed.formulas.length}`);
      console.log(`  problems           : ${parsed.problems.length}`);
      console.log(`  traps              : ${parsed.traps.length}`);
      console.log(`  bytes              : ${raw.length} -> ${repaired.length}`);
    }
  }
}
