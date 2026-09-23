// build-meta.mjs — P2: generate every derived meta file from the vault itself.
// Nothing here is hand-maintained. Re-run after each content wave.
//
//   node build/build-meta.mjs
//
// Outputs:
//   _meta/PROGRESS.md        tier x depth progress, per part/area
//   _meta/MANIFEST.md        every note with id, path, tier, depth
//   _meta/CROSSLINKS.md      prereq edges (frontmatter) + known cross-area edges
//   _meta/DATAVIEW_queries.md  copy-paste query cookbook
//   00_Dashboard.md          entry point with progress + navigation

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { AREAS, AREA_NAMES, VAULT, ALL_TOPICS, topicPath, mocPath, tierCounts } from './vault.mjs';

const today = new Date().toISOString().slice(0, 10);

// ---------------------------------------------------------------------------
// scan the vault for frontmatter
// ---------------------------------------------------------------------------

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (e.endsWith('.md') || e.toLowerCase().endsWith('.html')) out.push(p);
  }
  return out;
}

/**
 * Split a YAML flow list body on commas that are NOT inside quotes or brackets.
 * Required because topic filenames legitimately contain commas, e.g.
 *   ["[[01_Limits,_Continuity_and_L_Hopital]]", "[[05_Extrema,_Concavity_and_Inflection]]"]
 * A naive split(',') breaks those wikilinks in half.
 */
function splitFlowList(body) {
  const out = [];
  let cur = '';
  let depth = 0;
  let quote = null;
  for (let i = 0; i < body.length; i++) {
    const ch = body[i];
    if (quote) {
      if (ch === '\\') { cur += ch + (body[++i] ?? ''); continue; }
      if (ch === quote) quote = null;
      cur += ch;
      continue;
    }
    if (ch === '"' || ch === "'") { quote = ch; cur += ch; continue; }
    if (ch === '[' || ch === '{') depth++;
    if (ch === ']' || ch === '}') depth--;
    if (ch === ',' && depth === 0) { out.push(cur); cur = ''; continue; }
    cur += ch;
  }
  if (cur.trim()) out.push(cur);
  return out;
}

function parseFront(file) {
  const txt = readFileSync(file, 'utf8');
  const m = txt.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return { fm: {}, body: txt };
  const fm = {};
  for (const line of m[1].split(/\r?\n/)) {
    const mm = line.match(/^([A-Za-z_][\w]*):\s*(.*)$/);
    if (!mm) continue;
    let [, k, v] = mm;
    v = v.trim();
    if (v.startsWith('[') && v.endsWith(']')) {
      fm[k] = splitFlowList(v.slice(1, -1))
        .map((s) => s.trim().replace(/^"|"$/g, ''))
        .filter(Boolean);
    } else if (/^\d+$/.test(v)) fm[k] = Number(v);
    else fm[k] = v.replace(/^"|"$/g, '');
  }
  const depth = /^depth:\s*full/m.test(m[1]) ? 'full' : 'stub';
  return { fm, body: txt, depth };
}

const files = walk(VAULT);
const notes = files.map((f) => ({ path: relative(VAULT, f).replace(/\\/g, '/'), full: f, ...parseFront(f) }));

// ---------------------------------------------------------------------------
// stats
// ---------------------------------------------------------------------------

const byArea = AREAS.map((area) => {
  const topics = area.topics.map((t) => {
    const rel = `${area.part}/${area.area}/Topics/${t.file}`;
    const found = notes.find((n) => n.path === rel);
    const depth = found?.depth ?? 'stub';
    const fmTier = found?.fm?.tier;
    return { ...t, depth, tier: fmTier ?? t.tier };
  });
  const t1 = topics.filter((t) => t.tier === 1);
  const t2 = topics.filter((t) => t.tier === 2);
  const t3 = topics.filter((t) => t.tier === 3);
  const full = topics.filter((t) => t.depth === 'full');
  const pct = Math.round((full.length / Math.max(1, topics.length)) * 100);
  return {
    area: area.area, part: area.part, partName: AREA_NAMES[area.part], topics,
    n: topics.length, t1: t1.length, t2: t2.length, t3: t3.length,
    full: full.length, pct,
    t1done: t1.filter((t) => t.depth === 'full').length,
    t2done: t2.filter((t) => t.depth === 'full').length,
    t3done: t3.filter((t) => t.depth === 'full').length,
  };
});

const totals = byArea.reduce(
  (a, x) => ({
    n: a.n + x.n, t1: a.t1 + x.t1, t2: a.t2 + x.t2, t3: a.t3 + x.t3,
    full: a.full + x.full, t1done: a.t1done + x.t1done, t2done: a.t2done + x.t2done, t3done: a.t3done + x.t3done,
  }),
  { n: 0, t1: 0, t2: 0, t3: 0, full: 0, t1done: 0, t2done: 0, t3done: 0 }
);

const widgets = notes.filter((n) => n.full.toLowerCase().endsWith('.html'));
const mocCount = notes.filter((n) => n.fm.type === 'moc').length;

const bar = (done, total, width = 18) => {
  const f = total ? Math.round((done / total) * width) : 0;
  return `${'█'.repeat(f)}${'░'.repeat(width - f)} ${String(Math.round((done / Math.max(1, total)) * 100)).padStart(3)}%`;
};

// ---------------------------------------------------------------------------
// PROGRESS.md
// ---------------------------------------------------------------------------

const progressRows = byArea
  .map((a) => {
    const status = a.pct === 100 ? '✅' : a.pct === 0 ? '⬜' : '🚧';
    return `| ${a.partName} | ${a.area.replace(/^\d+_/, '').replace(/_/g, ' ')} | ${a.n} | ${a.t1}/${a.t1done} | ${a.t2}/${a.t2done} | ${a.t3}/${a.t3done} | ${a.pct}% | ${status} |`;
  })
  .join('\n');

const progress = `---
title: PROGRESS
type: meta
updated: ${today}
---

# PROGRESS

**Generated file — do not edit by hand.** Rebuild with \`node build/build-meta.mjs\`.

## Overall

\`\`\`
topics        ${bar(totals.full, totals.n)}
T1 full depth ${bar(totals.t1done, totals.t1)}
T2 medium     ${bar(totals.t2done, totals.t2)}
T3 lean       ${bar(totals.t3done, totals.t3)}
\`\`\`

| Metric | Value |
| --- | --- |
| Topics total | ${totals.n} |
| Topics at \`depth: full\` | ${totals.full} |
| Topics still stub | ${totals.n - totals.full} |
| T1 complete | ${totals.t1done} / ${totals.t1} |
| T2 complete | ${totals.t2done} / ${totals.t2} |
| T3 complete | ${totals.t3done} / ${totals.t3} |
| Area MOCs | ${mocCount} |
| Widgets | ${widgets.length} |

## Per area

| Part | Area | Topics | T1 done | T2 done | T3 done | Progress | |
| --- | --- | --- | --- | --- | --- | --- | --- |
${progressRows}

## Resume protocol

State lives on disk, not in chat. A new session resumes by reading:

1. this file (what is done)
2. \`_meta/CONVENTIONS.md\` (the rules)
3. \`_meta/MANIFEST.md\` (canonical paths and IDs)

Then continue at the first area with \`pct < 100\`, writing payloads into
\`build/payload/<part>/<area>/\` and running
\`node build/build-notes.mjs --area <area>\`.
`;

// ---------------------------------------------------------------------------
// MANIFEST.md
// ---------------------------------------------------------------------------

const manifestSections = AREAS.map((area) => {
  const a = byArea.find((x) => x.area === area.area && x.part === area.part);
  const rows = a.topics
    .map((t) => `| ${t.id} | ${t.file} | ${t.title} | T${t.tier} | ${t.depth} |`)
    .join('\n');
  return `### ${AREA_NAMES[area.part]} → ${area.area.replace(/^\d+_/, '').replace(/_/g, ' ')}

MOC: \`${area.moc}.md\` · ${a.n} topics · ${a.full} full

| ID | File | Title | Tier | Depth |
| --- | --- | --- | --- | --- |
${rows}`;
}).join('\n\n');

const manifest = `---
title: MANIFEST
type: meta
updated: ${today}
---

# MANIFEST

**Generated file — do not edit by hand.** Canonical index of every topic note: ID,
filename, title, tier, depth. This is the file to read when you need a real path or
title instead of guessing one.

- Parts: ${Object.keys(AREA_NAMES).length} · Leaf areas: ${AREAS.length} · Topics: ${ALL_TOPICS.length}
- Filename form: \`NN_Descriptive_Title.md\` under \`<part>/<area>/Topics/\`
- Wikilink target = filename without \`.md\`

${manifestSections}
`;

// ---------------------------------------------------------------------------
// CROSSLINKS.md
// ---------------------------------------------------------------------------

const edges = [];
for (const n of notes) {
  const p = n.fm.prereqs;
  if (Array.isArray(p)) for (const q of p) edges.push({ from: n.fm.id ?? n.path, to: q });
}

const edgeRows = edges.length
  ? edges.map((e) => `| ${e.from} | requires | ${e.to} |`).join('\n')
  : '| _none yet_ | | |';

const crosslinks = `---
title: CROSSLINKS
type: meta
updated: ${today}
---

# CROSSLINKS — cross-area prerequisite map

Generated from \`prereqs\` in note frontmatter. **Author the edge, not this file.**

## Authored cross-area edges

| From | Relation | Requires |
| --- | --- | --- |
${edgeRows}

## Known structural edges (reference)

| From | Requires | Why |
| --- | --- | --- |
| Math-07 §06–09 (Z Transform block) | EST-01 §08–10 (Sampling) | DT block needs sampling theory first |
| Math-04 §07–13 (Laplace/Fourier) | Math-07 §06–09 | transform tooling before Z |
| Math-05 §04+ (all EM) | Math-05 §01–03 | vector calculus before fields |
| ECE-05 §05+ (small-signal) | ECE-05 §01–03 (biasing) | Q-point before AC model |
| EST-06 §01–06 (antennas, Friis) | EST-05 §04–06 (reflection, VSWR, Smith) | TL theory before radiation |
| Math-08 (numerical methods) | Math-01 §05–06, Math-02 §03–07 | calculus before numerical calculus |

## Duplicate-risk notes (deliberately not duplicated)

| Topic | Single home | Cross-linked from |
| --- | --- | --- |
| Noise physics (thermal, shot, flicker, SNR, NF) | EST-01 §03–07 | ECE-06 Power Electronics |
| BJT h-parameter model | ECE-05 §05 | ECE-03 Two-Port (moved out) |
| Friis transmission vs Friis noise | EST-06 §06 / EST-01 §07 | disambiguated in both notes |
`;

// ---------------------------------------------------------------------------
// DATAVIEW_queries.md
// ---------------------------------------------------------------------------

const dataview = `---
title: DATAVIEW_QUERIES
type: meta
updated: ${today}
---

# DATAVIEW queries

Copy-paste cookbook. All topic notes carry \`id, part, area, topic, tier, depth,
prereqs, tags\`, so these work without hand-maintained lists.

## Progress by area

\`\`\`dataview
TABLE WITHOUT ID area AS "Area", length(rows) AS "Topics",
  length(filter(rows, (r) => r.depth = "full")) AS "Full"
FROM ""
WHERE type != "moc" AND type != "meta" AND tier
GROUP BY area
SORT area ASC
\`\`\`

## Everything still a stub in one area

\`\`\`dataview
TABLE WITHOUT ID id AS "ID", title AS "Title", tier AS "Tier"
FROM "02_Electronics_Engineering/05_Circuit_Analysis_and_Design/Topics"
WHERE depth = "stub"
SORT topic ASC
\`\`\`

## T1 notes not yet at full depth

\`\`\`dataview
TABLE WITHOUT ID id AS "ID", area AS "Area", title AS "Title"
FROM ""
WHERE tier = 1 AND depth = "stub"
SORT area ASC, topic ASC
\`\`\`

## Notes depending on a given note (reverse prereqs)

\`\`\`dataview
LIST
FROM ""
WHERE contains(prereqs, "[[04_Reflection_Coefficient_and_VSWR]]")
\`\`\`

## All formulas in an area (dataviewjs, reads the Formulas section)

\`\`\`dataviewjs
const pages = dv.pages('"04_EST/05_Transmission_Lines_and_Waveguides/Topics"');
for (const p of pages.sort((x) => x.topic)) {
  const t = await dv.io.load(p.file.path);
  const sec = t.split('## Formulas')[1];
  if (!sec) continue;
  dv.header(4, p.id + " — " + p.title);
  dv.paragraph(sec.split('##')[0].trim());
}
\`\`\`

## Drill-ready problem counts

\`\`\`dataview
TABLE WITHOUT ID area AS "Area", length(rows) AS "Notes",
  sum(rows.problem_count) AS "Problems"
FROM ""
WHERE problem_count
GROUP BY area
\`\`\`

> \`problem_count\` is stamped into frontmatter by \`build-notes.mjs\` when a payload is
> rendered, so this query works once notes are generated.

## Recently updated

\`\`\`dataview
TABLE WITHOUT ID id AS "ID", area AS "Area", updated AS "Updated"
FROM ""
WHERE updated
SORT updated DESC
LIMIT 25
\`\`\`
`;

// ---------------------------------------------------------------------------
// 00_Dashboard.md
// ---------------------------------------------------------------------------

const partBlocks = Object.keys(AREA_NAMES)
  .map((part) => {
    const areas = byArea.filter((a) => a.part === part);
    const name = AREA_NAMES[part];
    const full = areas.reduce((s, a) => s + a.full, 0);
    const n = areas.reduce((s, a) => s + a.n, 0);
    const rows = areas
      .map((a) => {
        const label = a.area.replace(/^\d+_/, '').replace(/_/g, ' ');
        const icon = a.pct === 100 ? '✅' : a.pct === 0 ? '⬜' : '🚧';
        // The area MOC is the linkable note; its basename is `_MOC_<AreaSlug>`.
        return `| [[_MOC_${a.area.replace(/^\d+_/, '')}\\|${label}]] | ${a.n} | \`${bar(a.full, a.n, 10)}\` | ${icon} |`;
      })
      .join('\n');
    return `### ${name} — ${full}/${n} full

| Area | Topics | Progress | |
| --- | --- | --- | --- |
${rows}

MOC: [[_MOC_${name.replace(/\s+/g, '_')}]]`;
  })
  .join('\n\n');

// A live Dataview block. Built with a helper rather than written inline so the template
// literal does not have to escape nested backticks.
const fence = (lang, body) => '```' + lang + '\n' + body.trim() + '\n```';

// The dashboard is the reviewer's FRONT PAGE, not a build report: build progress lives in
// _meta/PROGRESS.md. Everything under "My progress" is a live Dataview query over the
// learner-owned frontmatter (status / confidence / last_reviewed) that build-notes.mjs
// preserves across re-renders — so this page needs no maintenance and never goes stale.
const dashboard = `---
title: ECE Reviewer
type: dashboard
updated: ${today}
---

# ECE Reviewer

${totals.n} topics across 4 parts — formulas, worked problems and exam traps in every one,
plus ${widgets.length} interactive widgets.

## How to use this

1. Pick an **area** below, then open its MOC: topic map, drill links and widgets.
2. Work through the topic notes. Each one ends with **Traps & Exam Notes** — the highest-value
   section for the board exam.
3. In each note, set **status** and **confidence** in the Properties panel at the top of the
   note. \`confidence\` runs 1 (lost) to 5 (solid); \`status\` is one of
   not-started / reading / shaky / solid.
4. Come back to this page. Everything under **My progress** is a live Dataview query reading
   what you set — there is nothing here to maintain by hand.
5. Before an exam, open an area MOC and use **Sets & Drills**: a shuffled drill plus a
   trap-recall drill built from that area's own problems.

## My progress

${fence('dataview', `
TABLE WITHOUT ID status AS "Status", length(rows) AS "Topics"
FROM ""
WHERE tier
GROUP BY status
SORT length(rows) DESC
`)}

## Where I'm weakest

${fence('dataview', `
TABLE WITHOUT ID area AS "Area", length(rows) AS "Topics", round(average(map(rows, (r) => r.confidence)), 1) AS "Avg confidence"
FROM ""
WHERE tier
GROUP BY area
SORT round(average(map(rows, (r) => r.confidence)), 1) ASC
`)}

## Review these next

${fence('dataview', `
TABLE WITHOUT ID link(file.path, title) AS "Topic", area AS "Area", confidence AS "Conf", status AS "Status"
FROM ""
WHERE tier AND confidence > 0 AND confidence <= 2
SORT confidence ASC, area ASC
LIMIT 15
`)}

> Empty either because you have not rated anything yet, or because nothing is shaky.

## Recently reviewed

${fence('dataview', `
TABLE WITHOUT ID link(file.path, title) AS "Topic", last_reviewed AS "Reviewed"
FROM ""
WHERE tier AND last_reviewed
SORT last_reviewed DESC
LIMIT 10
`)}

## Areas

${partBlocks}

## Vault internals

Generated files — for maintaining the vault, not for studying.
Build progress lives in PROGRESS; this page is for studying.

| Note | What it is |
| --- | --- |
| [[_meta/PROGRESS]] | build state, per area |
| [[_meta/MANIFEST]] | canonical index: every ID, filename, tier |
| [[_meta/CROSSLINKS]] | cross-area prerequisite map |
| [[_meta/CONVENTIONS]] | the rules of the vault |
| [[_meta/DATAVIEW_QUERIES]] | copy-paste query cookbook |

${bar(totals.full, totals.n, 30)}

**${totals.full} / ${totals.n} topics at full depth** · built ${today}
`;

// ---------------------------------------------------------------------------
// write
// ---------------------------------------------------------------------------

const write = (p, s) => {
  mkdirSync(join(p, '..'), { recursive: true });
  writeFileSync(p, s, 'utf8');
};

/**
 * Regenerate the meta files. Exported so build/verify.mjs can call it in-process.
 * @returns {{notes:number, full:number, mocs:number, widgets:number}}
 */
export function buildMeta() {
  write(join(VAULT, '_meta', 'PROGRESS.md'), progress);
  write(join(VAULT, '_meta', 'MANIFEST.md'), manifest);
  write(join(VAULT, '_meta', 'CROSSLINKS.md'), crosslinks);
  write(join(VAULT, '_meta', 'DATAVIEW_QUERIES.md'), dataview);
  write(join(VAULT, '00_Dashboard.md'), dashboard);
  return { notes: notes.length, full: totals.full, total: totals.n, mocs: mocCount, widgets: widgets.length };
}

const isMain = process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('build/build-meta.mjs');
if (isMain) {
  const r = buildMeta();
  const c = tierCounts();
  console.log(`notes scanned:      ${r.notes}`);
  console.log(`full depth:         ${r.full} / ${r.total} (${Math.round((r.full / r.total) * 100)}%)`);
  console.log(`tiers:              T1 ${c[1]}  T2 ${c[2]}  T3 ${c[3]}`);
  console.log(`area MOCs:          ${r.mocs}`);
  console.log(`widgets:            ${r.widgets}`);
  console.log('wrote: _meta/PROGRESS.md, _meta/MANIFEST.md, _meta/CROSSLINKS.md,');
  console.log('       _meta/DATAVIEW_QUERIES.md, 00_Dashboard.md');
}
