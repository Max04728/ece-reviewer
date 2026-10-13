// verify-topic-scope.mjs — independent check that the definition pass touched ONLY the
// PARTIAL topics listed in worklist.json, and added only **Symbols** lines.
// Usage: node Formula/_AUDIT/verify-topic-scope.mjs
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = 'C:/Users/Admin/Desktop/ECE_Reviewer/Formula';
const AUDIT = path.join(ROOT, '_AUDIT');

const wl = JSON.parse(readFileSync(path.join(AUDIT, 'worklist.json'), 'utf8'));
const allowed = new Map(); // "part/file" -> Set(topicNo)
for (const e of wl) allowed.set(`${e.part}/${e.file}`, new Set(e.topics.map((t) => t.no)));

/** split a note into { lead, topics: Map(no -> lines[]) } by '### <n>. ' headings */
function sections(text) {
  const lines = text.split(/\r?\n/);
  const topics = new Map();
  let cur = null, lead = [];
  for (const line of lines) {
    const m = /^###\s+(\d+)\.\s+/.exec(line);
    if (m) { cur = Number(m[1]); topics.set(cur, [line]); }
    else if (cur === null) lead.push(line);
    else topics.get(cur).push(line);
  }
  return { lead, topics };
}

const notes = [];
for (const part of readdirSync(ROOT, { withFileTypes: true })) {
  if (!part.isDirectory()) continue;
  if (!['Mathematics', 'Electronics_Engineering', 'EST', 'GEAS'].includes(part.name)) continue;
  for (const f of readdirSync(path.join(ROOT, part.name))) {
    if (f.endsWith('.md')) notes.push({ part: part.name, file: f });
  }
}

let problems = 0, checked = 0;
const rows = [];
for (const { part, file } of notes) {
  const key = `${part}/${file}`;
  const backup = path.join(AUDIT, file.replace(/\.md$/, '.before.md'));
  if (!existsSync(backup)) { rows.push({ key, status: 'NO-BACKUP' }); continue; }
  const before = sections(readFileSync(backup, 'utf8'));
  const after = sections(readFileSync(path.join(ROOT, part, file), 'utf8'));
  checked++;

  const allow = allowed.get(key) || new Set();
  const issues = [];

  // frontmatter / lead material must be identical
  if (before.lead.join('\n') !== after.lead.join('\n')) issues.push('LEAD/frontmatter changed');

  const nos = new Set([...before.topics.keys(), ...after.topics.keys()]);
  let added = 0, removed = 0, topicsTouched = [];
  for (const no of [...nos].sort((a, b) => a - b)) {
    const b = before.topics.get(no) || [];
    const a = after.topics.get(no) || [];
    const bs = new Set(b), as = new Set(a);
    const add = a.filter((l) => !bs.has(l));
    const del = b.filter((l) => !as.has(l));
    if (!add.length && !del.length && b.length === a.length) continue;
    if (!allow.has(no)) issues.push(`topic ${no} changed but is not in the worklist (${b.length}->${a.length} lines)`);
    topicsTouched.push(no);
    added += add.length; removed += del.length;
    for (const l of del) if (l.trim() !== '') issues.push(`topic ${no}: line REMOVED/CHANGED -> ${l.trim().slice(0, 100)}`);
    for (const l of add) {
      const t = l.trim();
      if (t === '' || t === '**Symbols**') continue;
      if (!/^- /.test(t)) issues.push(`topic ${no}: non-bullet line added -> ${t.slice(0, 100)}`);
      else if (!/\u2014/.test(t)) issues.push(`topic ${no}: bullet without em dash -> ${t.slice(0, 100)}`);
      else if (!/\b(in |dimensionless|per )/i.test(t)) issues.push(`topic ${no}: bullet without a unit -> ${t.slice(0, 100)}`);
    }
  }
  const missing = [...allow].filter((n) => !topicsTouched.includes(n));
  if (missing.length) issues.push(`worklist topics not touched: ${missing.join(', ')}`);
  if (issues.length) problems++;
  rows.push({ key, status: issues.length ? 'ISSUES' : 'ok', touched: topicsTouched, allowed: [...allow], added, removed, issues });
}

for (const r of rows) {
  if (r.status === 'ok') console.log(`PASS  ${r.key}  topics=[${r.touched}] +${r.added} lines`);
  else if (r.status === 'NO-BACKUP') console.log(`SKIP  ${r.key}  (no backup - not edited)`);
  else {
    console.log(`FAIL  ${r.key}  allowed=[${r.allowed}] touched=[${r.touched}] +${r.added}/-${r.removed}`);
    for (const i of r.issues) console.log(`        ${i}`);
  }
}
console.log(`\nfiles with a backup: ${checked}; with issues: ${problems}`);
process.exit(problems ? 1 : 0);
