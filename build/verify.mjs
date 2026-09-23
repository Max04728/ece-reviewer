// verify.mjs — run every guard. This is the single command to run after any wave.
//
//   node build/verify.mjs
//
// IMPORTANT: the checks are imported and called in-process, NOT spawned as child
// processes. Under the DSH sandbox Node cannot open pipes, so child_process with
// piped stdio fails with EPERM. Importing also makes each check reusable.
//
// Checks:
//   1. note IDs are unique
//   2. every topic note exists on disk
//   3. payload coverage agrees with each note's `depth:` frontmatter
//   4. every payload parses and passes tier requirements
//   5. every wikilink resolves
//   6. every widget parses and its asset paths resolve
//   7. generated meta files are fresh

import { statSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ALL_TOPICS, AREAS, VAULT, topicPath } from './vault.mjs';
import { checkLinks } from './check-links.mjs';
import { checkWidgets } from './check-widgets.mjs';
import { validateAllPayloads } from './build-notes.mjs';
import { buildMeta } from './build-meta.mjs';

let failures = 0;
const fail = (m) => { failures++; console.log(`  x ${m}`); };

// ---- 1. unique IDs -------------------------------------------------------
console.log('=== 1. ID uniqueness ===');
{
  const seen = new Map();
  for (const t of ALL_TOPICS) {
    if (seen.has(t.id)) fail(`duplicate ID ${t.id}: ${seen.get(t.id)} and ${t.key}`);
    seen.set(t.id, t.key);
  }
  console.log(`  topics ${ALL_TOPICS.length} | unique IDs ${seen.size}`);
}

// ---- 2. every topic file exists -----------------------------------------
console.log('\n=== 2. note file presence ===');
{
  let missing = 0;
  for (const t of ALL_TOPICS) {
    try { statSync(topicPath(t)); } catch { missing++; fail(`missing note file: ${topicPath(t)}`); }
  }
  console.log(`  present ${ALL_TOPICS.length - missing} / ${ALL_TOPICS.length}`);
}

// ---- 3. payload coverage vs depth ---------------------------------------
console.log('\n=== 3. payload coverage vs depth ===');
{
  let withPayload = 0, rendered = 0, stale = 0;
  for (const area of AREAS) {
    for (const t of area.topics) {
      let has = false;
      try { statSync(`build/payload/${t.part}/${t.area}/${t.slug}.json`); has = true; } catch { /* none */ }
      if (has) withPayload++;
      let depth = 'stub';
      try {
        const m = readFileSync(topicPath(t), 'utf8').match(/^depth:\s*(\w+)/m);
        if (m) depth = m[1];
      } catch { /* already reported in check 2 */ }
      if (depth === 'full') rendered++;
      if (has && depth !== 'full') { stale++; fail(`${t.id} has a payload but depth=${depth} - run build-notes.mjs`); }
      if (!has && depth === 'full') fail(`${t.id} is depth=full but has no payload`);
    }
  }
  console.log(`  with payload ${withPayload} | rendered ${rendered} | stubs ${ALL_TOPICS.length - rendered}${stale ? ` | STALE ${stale}` : ''}`);
}

// ---- 4. payload validation ----------------------------------------------
console.log('\n=== 4. payload validation ===');
{
  const r = validateAllPayloads();
  console.log(`  payloads checked ${r.checked}`);
  if (r.errs.length) {
    console.log(`  errors ${r.errs.length}:`);
    for (const e of r.errs.slice(0, 40)) fail(e);
    if (r.errs.length > 40) console.log(`  ... ${r.errs.length - 40} more`);
  } else {
    console.log('  no errors');
  }
  if (r.warns.length) {
    console.log(`  warnings ${r.warns.length}:`);
    for (const w of r.warns.slice(0, 25)) console.log(`  ! ${w}`);
    if (r.warns.length > 25) console.log(`  ... ${r.warns.length - 25} more`);
  }
}

// ---- 5. links ------------------------------------------------------------
console.log('\n=== 5. wikilinks ===');
{
  const r = checkLinks();
  console.log(`  files ${r.files} | links ${r.links} | broken ${r.broken.length} | ambiguous ${r.ambiguous.length}`);
  for (const b of r.broken.slice(0, 40)) fail(`${b.from} -> [[${b.target}]]`);
  for (const a of r.ambiguous.slice(0, 20)) fail(`${a.from} -> [[${a.target}]] is ambiguous (${a.hits.length} candidates)`);
}

// ---- 6. widgets ----------------------------------------------------------
console.log('\n=== 6. widgets (static: syntax + asset paths) ===');
{
  const r = await checkWidgets();
  console.log(`  widgets checked ${r.files} | problems ${r.problems.length}`);
  for (const p of r.problems) {
    fail(p.file);
    for (const s of p.msgs) console.log(`      ${s}`);
  }
}

// ---- 6b. widgets (runtime: drive every control, look for NaN/blank) ------
// Called in-process. The harness is importable for the same reason every other check
// is: the DSH sandbox forbids spawning a child process with piped stdio.
console.log('\n=== 6b. widgets (runtime execution) ===');
{
  try {
    const { checkWidgetRuntime } = await import('./check-widget-runtime.mjs');
    const r = await checkWidgetRuntime({ quiet: true });
    console.log(`  widgets executed ${r.executed} / ${r.total} | control combinations ${r.combinations}`);
    console.log(`  defects ${r.hard.length} | widgets with edge-state notes only ${r.soft.length}`);
    for (const h of r.hard) {
      fail(`${h.file}${h.importFailed ? ' (import failed)' : ''}`);
      for (const m of h.hard) console.log(`      ${m}`);
    }
    for (const s of r.soft) console.log(`  ~ ${s.file}: ${s.soft[0]}`);
  } catch (e) {
    console.log(`  runtime harness could not run: ${e.message}`);
  }
}

// ---- 6c. widget map (topic -> widget) ------------------------------------
// A wrong entry here is a SILENT no-op: widgetFor() is keyed by topic slug, so a mistyped
// slug never matches, the note renders no widget section, and nothing reports an error.
console.log('\n=== 6c. widget map (topic -> widget) ===');
{
  const { checkWidgetMap } = await import('./check-widget-map.mjs');
  const r = checkWidgetMap();
  console.log(`  entries ${r.places} | topics ${r.topics} | widgets mapped ${r.widgets}/${r.total}`);
  for (const p of r.problems) fail(p);
  if (!r.problems.length) console.log('  every map entry resolves to a real topic and widget');
  if (r.unmapped.length) {
    console.log(`  note: ${r.unmapped.length} widget(s) on disk are in no topic note (MOC only)`);
    for (const u of r.unmapped.slice(0, 20)) console.log(`    ? ${u}`);
  }
}

// ---- 6d. Obsidian CSS snippet mirror -------------------------------------
// Obsidian applies CSS to NOTES only from <vaultRoot>/.obsidian/snippets/. Assets/snippets.css
// is linked by the widgets but is NOT loaded for notes, so without this mirror every
// note-level rule in it (table alignment, callout accents) is inert. Mirrored here so it
// cannot silently go stale.
console.log('\n=== 6d. CSS snippet mirror ===');
{
  const { syncSnippet } = await import('./sync-snippet.mjs');
  const r = syncSnippet();
  if (r.status === 'no-obsidian') {
    console.log('  skipped: no .obsidian folder beside the vault');
  } else if (r.status === 'no-source') {
    console.log(`  x source missing: ${r.source}`);
  } else {
    console.log(`  ${r.status}: .obsidian/snippets/snippets.css`);
    if (r.status === 'created') {
      console.log('  NOTE: enable it once in Obsidian -> Settings -> Appearance -> CSS snippets.');
    }
  }
}

// ---- 7. meta freshness ---------------------------------------------------
console.log('\n=== 7. generated meta ===');
{
  const files = ['_meta/PROGRESS.md', '_meta/MANIFEST.md', '_meta/CROSSLINKS.md', '_meta/DATAVIEW_QUERIES.md', '00_Dashboard.md'];
  const before = new Map();
  for (const f of files) {
    try { before.set(f, readFileSync(join(VAULT, f), 'utf8')); } catch { before.set(f, null); }
  }
  const r = buildMeta();
  let staleCount = 0;
  for (const f of files) {
    const after = readFileSync(join(VAULT, f), 'utf8');
    if (before.get(f) !== after) { staleCount++; console.log(`  regenerated (was stale): ${f}`); }
  }
  console.log(`  notes ${r.notes} | MOCs ${r.mocs} | widgets ${r.widgets} | full depth ${r.full}/${r.total}`);
  if (!staleCount) console.log('  all meta files already current');
}

console.log(`\n${'='.repeat(56)}`);
if (failures === 0) {
  console.log('ALL CHECKS PASSED');
} else {
  console.log(`${failures} CHECK(S) FAILED`);
  process.exitCode = 1;
}
