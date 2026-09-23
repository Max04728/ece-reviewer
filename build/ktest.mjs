// ktest.mjs — validate the K-map solver's minimisation against known-good answers.
//
// The solver is embedded in an HTML widget, so its logic is re-implemented here for
// testing. The FIRST version of this algorithm was wrong: it enumerated rectangles as
// (abStart, abLen) x (cdStart, cdLen) with the span capped at the axis width, which
// cannot express a group that spans an ENTIRE axis. That missed the wrap-around group
// B'D' for the default minterm set and produced a non-minimal answer.
//
// The corrected algorithm enumerates rectangles as a wrap-around START plus a SPAN of
// 1, 2 or 4 on each axis, with a total cell count that must be a power of two.

const AB_GRAY = [0, 1, 3, 2];
const CD_GRAY = [0, 1, 3, 2];
const SPANS = [1, 2, 4];
const cellIndex = (ai, ci) => (AB_GRAY[ai] << 2) | CD_GRAY[ci];

function enumerateGroups(set) {
  const groups = [];
  for (const abSpan of SPANS) {
    for (const cdSpan of SPANS) {
      const count = abSpan * cdSpan;
      if (![1, 2, 4, 8, 16].includes(count)) continue;
      for (let abStart = 0; abStart < 4; abStart++) {
        for (let cdStart = 0; cdStart < 4; cdStart++) {
          const cells = [];
          let ok = true;
          for (let i = 0; i < abSpan; i++) {
            for (let j = 0; j < cdSpan; j++) {
              const idx = cellIndex((abStart + i) % 4, (cdStart + j) % 4);
              cells.push(idx);
              if (!set.has(idx)) ok = false;
            }
          }
          if (ok) groups.push({ cells: [...new Set(cells)], abStart, abSpan, cdStart, cdSpan });
        }
      }
    }
  }
  // deduplicate identical cell sets
  const seen = new Set();
  return groups.filter((g) => {
    const key = [...g.cells].sort((a, b) => a - b).join(',');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function termOf(g) {
  const abVals = [];
  for (let i = 0; i < g.abSpan; i++) abVals.push(AB_GRAY[(g.abStart + i) % 4]);
  const cdVals = [];
  for (let j = 0; j < g.cdSpan; j++) cdVals.push(CD_GRAY[(g.cdStart + j) % 4]);
  const parts = [];
  const add = (bits, name) => { if (bits.size === 1) parts.push([...bits][0] ? name : name + "'"); };
  add(new Set(abVals.map((v) => (v >> 1) & 1)), 'A');
  add(new Set(abVals.map((v) => v & 1)), 'B');
  add(new Set(cdVals.map((v) => (v >> 1) & 1)), 'C');
  add(new Set(cdVals.map((v) => v & 1)), 'D');
  return parts.length ? parts.join('') : '1';
}

function sopFromMinterms(minterms) {
  if (minterms.size === 0) return { expression: '0', terms: [], groups: [] };
  if (minterms.size === 16) return { expression: '1', terms: [], groups: [] };
  const set = new Set(minterms);
  const all = enumerateGroups(set);
  // prime implicants: those not contained in a larger valid group
  const prime = all.filter((g) =>
    !all.some((h) => h !== g && h.cells.length > g.cells.length && g.cells.every((c) => h.cells.includes(c)))
  );
  // essential prime implicants first, then greedy cover
  const uncovered = new Set(set);
  const chosen = [];
  let progress = true;
  while (uncovered.size && progress) {
    progress = false;
    // an essential PI covers a minterm no other PI covers
    for (const m of [...uncovered]) {
      const covering = prime.filter((g) => g.cells.includes(m));
      if (covering.length === 1) {
        chosen.push(covering[0]);
        covering[0].cells.forEach((c) => uncovered.delete(c));
        progress = true;
      }
    }
    if (!uncovered.size) break;
    let best = null;
    for (const g of prime) {
      const cover = g.cells.filter((c) => uncovered.has(c)).length;
      if (cover > 0 && (!best || cover > best.cover)) best = { g, cover };
    }
    if (best) {
      chosen.push(best.g);
      best.g.cells.forEach((c) => uncovered.delete(c));
      progress = true;
    }
  }
  const uniq = [];
  const seenTerms = new Set();
  for (const g of chosen) {
    const t = termOf(g);
    if (!seenTerms.has(t)) { seenTerms.add(t); uniq.push({ g, t }); }
  }
  return { expression: uniq.map((u) => u.t).join(' + '), terms: uniq.map((u) => u.t), groups: uniq.map((u) => u.g) };
}

function evalSOP(expr, abcd) {
  if (expr === '0') return 0;
  if (expr === '1') return 1;
  const val = (name) => (abcd >> (3 - ['A', 'B', 'C', 'D'].indexOf(name[0]))) & 1;
  return expr.split(' + ').some((term) => {
    const lits = term.match(/[ABCD]'?/g) || [];
    return lits.every((l) => (l.endsWith("'") ? val(l) === 0 : val(l) === 1));
  }) ? 1 : 0;
}

const cases = [
  { name: 'default S(0,1,2,5,8,9,10,13)', m: [0, 1, 2, 5, 8, 9, 10, 13] },
  { name: 'wrap-around S(0,2,8,10)', m: [0, 2, 8, 10] },
  { name: 'full row S(0,1,2,3)', m: [0, 1, 2, 3] },
  { name: 'two adjacent S(0,1)', m: [0, 1] },
  { name: 'all 16', m: Array.from({ length: 16 }, (_, i) => i) },
  { name: 'empty', m: [] },
  { name: 'single 1 at 5', m: [5] },
  { name: 'column S(0,4,8,12)', m: [0, 4, 8, 12] },
  { name: 'row pair S(0,4)', m: [0, 4] },
  { name: 'checkerboard (unsimplifiable)', m: [1, 2, 4, 7, 8, 11, 13, 14] },
  { name: 'quad S(0,1,4,5)', m: [0, 1, 4, 5] },
  { name: 'four corners', m: [0, 2, 8, 10] },
  { name: 'edge halves S(0,4,12,8,2,6,14,10)', m: [0, 4, 12, 8, 2, 6, 14, 10] },
];

let failures = 0;
for (const c of cases) {
  const set = new Set(c.m);
  const res = sopFromMinterms(set);
  let mismatch = 0;
  for (let abcd = 0; abcd < 16; abcd++) {
    const expected = set.has(abcd) ? 1 : 0;
    if (evalSOP(res.expression, abcd) !== expected) mismatch++;
  }
  const badSizes = res.groups.filter((g) => ![1, 2, 4, 8, 16].includes(g.cells.length));
  const ok = mismatch === 0 && badSizes.length === 0;
  if (!ok) failures++;
  console.log(
    `${ok ? 'ok  ' : 'FAIL'} ${c.name.padEnd(36)} -> ${res.expression.padEnd(30)} ` +
    `terms=${res.terms.length} truth-table-mismatches=${mismatch}`
  );
}

console.log(`\ncases: ${cases.length} | failures: ${failures}`);
if (failures) process.exitCode = 1;
