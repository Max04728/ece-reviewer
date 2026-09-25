// assemble-crash-review.mjs — build a crash-review note from its part files, with guards.
//
//   node build/assemble-crash-review.mjs --course math          # validate + write
//   node build/assemble-crash-review.mjs --course math --check   # validate only, write nothing
//   node build/assemble-crash-review.mjs --course ee
//
// ONE-SHOT PROVENANCE. Each note was assembled once, from part files written to a session scratch
// directory by parallel workers. That directory is temporary and is NOT part of the repo, so a
// later run reports MISSING PART FILES and writes nothing — the safe failure. The delivered
// artifacts are the notes themselves, and they are hand-maintainable from here on: edit the note
// directly, then run `node build/check-crash-review.mjs` to re-verify it.
//
// Keep this script because the guards below are the checks any future edit should pass.
//
// WHY THE GUARDS: the vault's #1 documented failure mode is a wikilink whose target is mistyped
// (filenames carry commas and typographic apostrophes), and `check-links.mjs` only sees the mistake
// AFTER the file is in the vault. This validates every link against the real basename index first,
// and refuses to write a note containing a broken link, display maths, a wrapped table row, or a
// timing plan that does not add up to 60 minutes.

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, basename, relative } from 'node:path';
import { VAULT, PART_NOTES, partNotePath } from './vault.mjs';

const SCRATCH_ROOT = 'C:/Users/Admin/AppData/Local/Temp/dsh-FdDsSK/crash';

/**
 * Per-course build config.
 *   part   — key into PART_NOTES (vault.mjs), which owns the note's filename and MOC link
 *   plan   — the 60-minute allocation, keyed by block number; the guards enforce it exactly
 *   parts  — the scratch files to concatenate, in presentation order
 */
const COURSES = {
  math: {
    part: '01_Mathematics',
    plan: { 1: 7, 2: 7, 3: 8, 4: 8, 5: 10, 6: 6, 7: 6, 8: 4, 9: 4 },
    parts: [
      ['_framing.md', null],
      ['b1b2.md', 'Blocks 1-2: Differential + Integral Calculus'],
      ['b3.md', 'Block 3: Differential Equations'],
      ['b4.md', 'Block 4: Advanced Engineering Math'],
      ['b5.md', 'Block 5: Electromagnetics'],
      ['b6b9.md', 'Blocks 6-9: Control, Signals, Numerical, Data Analysis'],
    ],
  },
  ee: {
    part: '02_Electronics_Engineering',
    plan: { 1: 8, 2: 7, 3: 4, 4: 9, 5: 10, 6: 5, 7: 8, 8: 5, 9: 4 },
    parts: [
      ['_framing.md', null],
      ['b12.md', 'Blocks 1-2: DC + AC Circuits'],
      ['b34.md', 'Blocks 3-4: Two-Port + Semiconductor Devices'],
      ['b5.md', 'Block 5: Circuit Analysis and Design'],
      ['b67.md', 'Blocks 6-7: Power Electronics + Industrial/Automation'],
      ['b89.md', 'Blocks 8-9: Logic Circuits + Microprocessors'],
    ],
  },
};

const argOf = (flag, dflt) => {
  const i = process.argv.indexOf(flag);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : dflt;
};
const courseKey = argOf('--course', 'math');
const course = COURSES[courseKey];
if (!course) {
  console.error(`unknown --course "${courseKey}". known: ${Object.keys(COURSES).join(', ')}`);
  process.exit(1);
}
const SCRATCH = join(SCRATCH_ROOT, courseKey);
const PLAN_MIN = course.plan;
const NOTE = PART_NOTES[course.part];
if (!NOTE) {
  console.error(`PART_NOTES has no entry for ${course.part} — add one in vault.mjs first`);
  process.exit(1);
}
const OUT = partNotePath(course.part, NOTE);
const BLOCKS = Object.keys(PLAN_MIN).map(Number);

// Validate the declared plan itself before doing any work: a plan that does not total 60 minutes
// would otherwise be reported as a defect in the NOTE rather than in this config.
{
  const declared = BLOCKS.reduce((a, n) => a + PLAN_MIN[n], 0);
  if (declared !== 60) {
    console.error(`config error: the "${courseKey}" plan totals ${declared} minutes, not 60`);
    process.exit(1);
  }
}

// ---------------------------------------------------------------- link index
function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}
const stripExt = (n) => n.replace(/\.(md|html)$/i, '');
const byBase = new Map();
for (const f of walk(VAULT)) {
  if (!/\.(md|html)$/i.test(f)) continue;
  const b = stripExt(basename(f));
  if (!byBase.has(b)) byBase.set(b, []);
  byBase.get(b).push(relative(VAULT, f).replace(/\\/g, '/'));
}

// ------------------------------------------------------------------- assemble
const missing = [];
const chunks = [];
let backtickFixes = 0;
let textFixes = 0;
let pipeFixes = 0;
for (const [file, label] of course.parts) {
  const p = join(SCRATCH, file);
  if (!existsSync(p)) { missing.push(`${file}${label ? ` (${label})` : ''}`); continue; }
  let body = readFileSync(p, 'utf8').replace(/^\uFEFF/, '').trimEnd();

  // Some contributed blocks wrapped inline math in code spans (`` `$x$` ``). In Obsidian that
  // renders as literal monospace source, not as maths — the whole point of the block is lost.
  // Unwrap `` `$...$` `` -> `$...$`. This changes only presentation, never the mathematics.
  body = body.replace(/`\s*(\$[^`$]*\$)\s*`/g, (_m, math) => { backtickFixes++; return math; });

  // House convention (CONVENTIONS.md §6): inside `$...$` use \mathrm{}, never \text{}. Both
  // render, but \text{} is avoided where possible so the maths survives MathJax consistently.
  body = body.replace(/\\text\{([^{}]*)\}/g, (_m, inner) => {
    textFixes++;
    return `\\mathrm{${inner.trim().replace(/ /g, '\\ ')}}`;
  });

  // House convention (CONVENTIONS.md §6): a magnitude uses \lvert ... \rvert, never a bare `|`.
  //
  // A regex is the wrong tool here, and an earlier attempt proved it: a permissive pattern spanned
  // ACROSS a table row's cell separators and tried to rewrite "| Purpose | `SHIFT` `d/dx` |" as
  // maths. Instead, walk each line character by character, track whether we are inside a `$...$`
  // span, and only inside a span convert an unescaped `|` to \lvert / \rvert, alternating. A pipe
  // OUTSIDE a maths span is a table separator and is left completely alone. Text between the pipes
  // is copied verbatim — nothing is trimmed or re-spaced.
  body = body
    .split('\n')
    .map((line) => {
      if (!line.includes('|') || !line.includes('$')) return line;
      let out = '';
      let inMath = false;
      let openBar = false;   // true once we have emitted \lvert and are awaiting its \rvert
      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '$' && line[i - 1] !== '\\') { inMath = !inMath; out += ch; continue; }
        if (ch === '|' && inMath && line[i - 1] !== '\\') {
          // TeX control words end at a non-letter, so `\lvertZ` would parse as the unknown command
          // "\lvertZ" and fail to render. ALWAYS emit a delimiter space: `\lvert Z`, `Z \rvert`.
          out += openBar ? ' \\rvert' : '\\lvert ';
          openBar = !openBar;
          pipeFixes++;
          continue;
        }
        out += ch;
      }
      return out;
    })
    .join('\n');
  // Report a span left half-converted, which would mean an odd number of pipes inside one span.
  // (Checked on the CONVERTED text, so track \lvert/\rvert, not the pipes we just replaced.)
  const halfConverted = body.split('\n').filter((l) => {
    let inMath = false;
    let openBar = false;
    for (let i = 0; i < l.length; i++) {
      if (l[i] === '$' && l[i - 1] !== '\\') { inMath = !inMath; if (!inMath) openBar = false; continue; }
      if (!inMath) continue;
      if (l.startsWith('\\lvert', i)) { openBar = true; i += 5; }
      else if (l.startsWith('\\rvert', i)) { openBar = false; i += 5; }
    }
    return openBar;
  });
  if (halfConverted.length) {
    console.warn(`  ! ${halfConverted.length} line(s) have an unmatched \\lvert after normalisation`);
    for (const l of halfConverted.slice(0, 3)) console.warn(`      ${l.trim().slice(0, 80)}`);
  }

  chunks.push(body);
}
if (missing.length) {
  console.error(`MISSING PART FILES for course "${courseKey}":`);
  for (const m of missing) console.error(`  - ${m}`);
  console.error(`\nlooked in: ${SCRATCH}`);
  process.exitCode = 1;
} else {
  const md = chunks.join('\n\n---\n\n') + '\n';

  // -------------------------------------------------------------- structural
  const problems = [];
  const lines = md.split('\n');

  // 1. no display math anywhere
  lines.forEach((l, i) => {
    if (l.includes('$$')) problems.push(`line ${i + 1}: contains "$$" (vault uses inline $...$ only)`);
  });

  // 2. balanced single-$ per line and no \text{}
  lines.forEach((l, i) => {
    if (l.trimStart().startsWith('```')) return;
    const dollars = (l.match(/(?<!\\)\$/g) || []).length;
    if (dollars % 2 !== 0) problems.push(`line ${i + 1}: odd number of $ delimiters (${dollars})`);
    if (/\\text\{/.test(l)) problems.push(`line ${i + 1}: uses \\text{} - use \\mathrm{} instead`);
  });

  // 2b. A pipe inside maths only BREAKS the note when it sits in a table cell, because a parser
  // reads it as a cell separator: the row gains columns and the maths is chopped in half. You
  // cannot find that by regex, since the offending `|` is the same character used to split cells.
  // So split the row as a parser would, and look for a cell with an ODD number of `$`: a whole
  // cell holds whole spans, while a split formula leaves a dangling fragment on each side.
  // (Pipes inside maths OUTSIDE a table render correctly and are normalised to \lvert upstream.)
  lines.forEach((l, i) => {
    if (!/^\s*\|/.test(l)) return;                 // only table rows can break
    if (/^\s*\|[\s:|-]+\|\s*$/.test(l)) return;    // separator row
    const cells = l.trim().replace(/^\|/, '').replace(/\|$/, '').split('|');
    const bad = cells.filter((c) => ((c.match(/(?<!\\)\$/g) || []).length % 2) !== 0);
    if (bad.length) {
      problems.push(`line ${i + 1}: a "|" inside maths split ${bad.length} table cell(s) - use \\lvert and \\rvert`);
    }
  });

  // 3. table rows must be single physical lines
  let inFence = false;
  lines.forEach((l, i) => {
    if (l.trimStart().startsWith('```')) { inFence = !inFence; return; }
    if (inFence) return;
    if (/^\s*\|/.test(l) && !/\|\s*$/.test(l.trimEnd())) {
      problems.push(`line ${i + 1}: table row does not end with "|" (may be wrapped)`);
    }
  });

  // 4. every wikilink resolves, and none is ambiguous
  const seen = new Map();
  lines.forEach((l, i) => {
    if (l.trimStart().startsWith('```')) return;
    for (const m of l.matchAll(/\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|[^\]]*)?\]\]/g)) {
      const target = m[1].trim();
      const base = stripExt(basename(target.replace(/\\/g, '/')));
      const hits = byBase.get(base);
      if (!hits) {
        problems.push(`line ${i + 1}: BROKEN link [[${target}]]`);
      } else if (hits.length > 1 && !hits.some((h) => basename(h) === target)) {
        problems.push(`line ${i + 1}: AMBIGUOUS link [[${target}]] -> ${hits.join(', ')}`);
      }
      seen.set(target, (seen.get(target) || 0) + 1);
    }
  });

  // 5. all blocks present, in order, and their stated minutes match the plan
  const blockHeads = [...md.matchAll(/^## Block (\d+)\s*—\s*(.+?)\s*\((\d+)\s*min\)/gm)];
  const headings = blockHeads.map((m) => Number(m[1]));
  if (JSON.stringify(headings) !== JSON.stringify(BLOCKS)) {
    problems.push(`block headings are ${JSON.stringify(headings)}, expected ${JSON.stringify(BLOCKS)}`);
  }
  let plannedTotal = 0;
  for (const m of blockHeads) {
    const n = Number(m[1]), min = Number(m[3]);
    plannedTotal += min;
    if (PLAN_MIN[n] !== min) {
      problems.push(`Block ${n} says ${min} min but the plan allocates ${PLAN_MIN[n]} min`);
    }
  }
  if (plannedTotal !== 60) {
    problems.push(`block minutes total ${plannedTotal}, the sheet promises exactly 60`);
  }

  // 6. the "60-minute clock" checklist must agree with the plan
  const clock = [...md.matchAll(/^- \[ \] \*\*(\d+) · .*?— (\d+) min/gm)].map((m) => [Number(m[1]), Number(m[2])]);
  if (clock.length !== BLOCKS.length) {
    problems.push(`the 60-minute clock checklist lists ${clock.length} blocks, expected ${BLOCKS.length}`);
  } else {
    for (const [n, min] of clock) {
      if (PLAN_MIN[n] !== min) problems.push(`clock entry for Block ${n} says ${min} min, plan says ${PLAN_MIN[n]}`);
    }
    const clockTotal = clock.reduce((a, [, min]) => a + min, 0);
    if (clockTotal !== 60) problems.push(`clock checklist totals ${clockTotal} min, expected 60`);
  }

  // 7. every checkbox must be a real task item
  const boxes = (md.match(/^- \[ \]/gm) || []).length;

  console.log(`course            : ${courseKey} (${course.part})`);
  console.log(`parts joined      : ${chunks.length}/${course.parts.length}`);
  console.log(`lines             : ${lines.length}`);
  console.log(`distinct wikilinks: ${seen.size}`);
  console.log(`block headings    : ${headings.join(', ')}`);
  console.log(`checkboxes        : ${boxes}`);
  if (backtickFixes) console.log(`code-span math unwrapped: ${backtickFixes}`);
  if (textFixes) console.log(`\\text{} -> \\mathrm{}: ${textFixes}`);
  if (pipeFixes) console.log(`bare magnitudes -> \\lvert: ${pipeFixes}`);

  if (problems.length) {
    console.log(`\nPROBLEMS (${problems.length}):`);
    for (const p of problems) console.log(`  x ${p}`);
    process.exitCode = 1;
  } else {
    console.log('\nall structural checks passed');
    if (process.argv.includes('--check')) {
      console.log('--check: not writing');
    } else {
      writeFileSync(OUT, md, 'utf8');
      console.log(`wrote ${OUT}`);
    }
  }
}
