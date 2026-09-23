// build-stubs.mjs — P1 stub pass.
// Generates every topic note as a navigable stub (frontmatter + nav + headings),
// plus the area MOCs and part MOCs. Fully deterministic: re-running is safe and
// idempotent. Anything already carrying a full payload will report full depth once
// build-notes.mjs has run, so run this BEFORE build-notes.mjs, never after.

import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { AREAS, AREA_NAMES, VAULT, topicPath, mocPath, tierCounts } from './vault.mjs';
import { renderNote, renderMOC, renderPartMOC, extractTracking } from './expand.mjs';

const write = (p, s) => {
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, s, 'utf8');
  return p;
};

let n = 0;
const written = [];

for (const area of AREAS) {
  const partName = AREA_NAMES[area.part];
  for (const t of area.topics) {
    const p = topicPath(t);
    // This pass destroys rendered CONTENT by design (payloads survive, build-notes restores
    // it). Study progress is different: status/confidence are authored by the learner and are
    // NOT recoverable from any payload, so carry them across even here.
    let prior = null;
    try { prior = readFileSync(p, 'utf8'); } catch { prior = null; }
    write(p, renderNote(t, area, {}, 'stub', extractTracking(prior)));
    n++;
    written.push(p);
  }
  write(mocPath(area), renderMOC(area, partName));
}

for (const part of Object.keys(AREA_NAMES)) {
  const areas = AREAS.filter((a) => a.part === part);
  const name = part.replace(/^\d+_/, '');
  write(`${VAULT}/${part}/_MOC_${name}.md`, renderPartMOC(part, AREA_NAMES[part], areas));
}

const c = tierCounts();
console.log(`topic stubs written: ${n}`);
console.log(`area MOCs written:   ${AREAS.length}`);
console.log(`part MOCs written:   ${Object.keys(AREA_NAMES).length}`);
console.log(`tiers -> T1: ${c[1]}  T2: ${c[2]}  T3: ${c[3]}`);
console.log(`sample: ${written[0]}`);
