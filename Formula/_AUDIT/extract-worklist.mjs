// extract-worklist.mjs — pull the §2 per-topic table out of VARIABLE_DEFINITION_COVERAGE.md
// and emit a per-file PARTIAL worklist as JSON.
import { readFileSync, writeFileSync } from 'node:fs';

const src = readFileSync('C:/Users/Admin/Desktop/ECE_Reviewer/Formula/_AUDIT/VARIABLE_DEFINITION_COVERAGE.md', 'utf8');
const lines = src.split('\n');
const re = /^\|\s*(Mathematics|Electronics_Engineering|EST|GEAS)\s*\|\s*([^|]+\.md)\s*\|\s*(\d+)\s*\|\s*([^|]+?)\s*\|\s*(DEFINED|PARTIAL|NONE)\s*\|\s*(.*?)\s*\|\s*$/;

const byFile = new Map();
let total = 0, partial = 0;
for (const line of lines) {
  const m = re.exec(line);
  if (!m) continue;
  const [, part, file, no, topic, status, bare] = m;
  total++;
  if (status !== 'PARTIAL') continue;
  partial++;
  const key = `${part}/${file}`;
  if (!byFile.has(key)) byFile.set(key, { part, file, topics: [] });
  byFile.get(key).topics.push({ no: Number(no), topic, bare: bare === '-' ? '' : bare });
}

const out = [...byFile.values()];
writeFileSync('C:/Users/Admin/Desktop/ECE_Reviewer/Formula/_AUDIT/worklist.json', JSON.stringify(out, null, 1));
console.log(`rows parsed: ${total}, PARTIAL: ${partial}, files with PARTIAL: ${out.length}`);
for (const f of out) console.log(`  ${f.part}/${f.file}  topics=${f.topics.length}  [${f.topics.map((t) => t.no).join(',')}]`);
