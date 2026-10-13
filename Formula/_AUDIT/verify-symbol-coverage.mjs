// verify-symbol-coverage.mjs — heuristic completeness check: for every PARTIAL topic,
// is each audited "bare symbol" now present in a **Symbols** bullet inside that topic?
// Usage: node Formula/_AUDIT/verify-symbol-coverage.mjs
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = 'C:/Users/Admin/Desktop/ECE_Reviewer/Formula';
const AUDIT = path.join(ROOT, '_AUDIT');
const wl = JSON.parse(readFileSync(path.join(AUDIT, 'worklist.json'), 'utf8'));

// keep LaTeX command names (so \omega -> omega), drop delimiters and spacing noise
const norm = (s) => s
  .replace(/\$/g, '')
  .replace(/\\(begin|end|text|mathrm|left|right|,|;|!|\s)/g, ' ')
  .replace(/\\/g, '')
  .replace(/[{}\s,]/g, '')
  .toLowerCase();

function sections(text) {
  const lines = text.split(/\r?\n/);
  const topics = new Map();
  let cur = null;
  for (const line of lines) {
    const m = /^###\s+(\d+)\.\s+/.exec(line);
    if (m) { cur = Number(m[1]); topics.set(cur, []); }
    else if (cur !== null) topics.get(cur).push(line);
  }
  return topics;
}

/** Pull the leading identifier out of one bare-symbol entry. */
function baseOf(entry) {
  const m = /([A-Za-z_\\][A-Za-z0-9_\\{}^]*)/.exec(entry.replace(/^\$+/, ''));
  if (!m) return null;
  let b = m[1].split(/[_^{]/)[0].replace(/\\/g, '');
  if (b.endsWith('}')) return null; // artifact of splitting a comma inside a subscript
  return b;
}

const misses = [];
let symbolsChecked = 0, topicsChecked = 0;
for (const e of wl) {
  const file = path.join(ROOT, e.part, e.file);
  if (!existsSync(file)) continue;
  const topics = sections(readFileSync(file, 'utf8'));
  for (const t of e.topics) {
    const lines = topics.get(t.no);
    topicsChecked++;
    if (!lines) { misses.push({ key: `${e.part}/${e.file}`, no: t.no, sym: '(topic missing!)', entry: '' }); continue; }
    const bullets = lines.filter((l) => /^- /.test(l));
    const bulletsNorm = bullets.map(norm).join('\n');
    for (const entry of t.bare.split(/,\s*(?=\$|[A-Za-z])/)) {
      const b = baseOf(entry);
      if (!b) continue;
      if (['prime', 'implicants', 'centroid', 'terms'].includes(b.toLowerCase())) continue;
      symbolsChecked++;
      const nb = b.toLowerCase();
      // whole-token match, not a substring of a longer identifier
      const re = new RegExp(`(^|[^a-z0-9])${nb.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z0-9]|$)`, 'i');
      if (!re.test(bulletsNorm)) misses.push({ key: `${e.part}/${e.file}`, no: t.no, sym: b, entry: entry.trim() });
    }
  }
}

console.log(`topics checked: ${topicsChecked}, bare-symbol entries checked: ${symbolsChecked}`);
if (!misses.length) console.log('PASS  every audited bare symbol now appears in a **Symbols** bullet in its topic');
else {
  console.log(`REVIEW  ${misses.length} entries with no matching bullet:\n`);
  for (const m of misses) console.log(`  ${m.key} topic ${m.no}: "${m.entry}"  (looked for base "${m.sym}")`);
}
process.exit(0);
