// check-widget-map.mjs — every widget-map entry must point at something real.
//
// WHY THIS EXISTS: a wrong map entry is a SILENT no-op. `widgetFor()` is looked up BY the
// topic's slug, so a mistyped slug simply never matches, the note renders no widget section,
// and nothing anywhere reports an error. Same shape of defect as the slugify orphan
// directories. Validating the keys against the model and the widget names against disk turns
// that silence into a build failure.
//
//   node build/check-widget-map.mjs
//   import { checkWidgetMap } from './check-widget-map.mjs'

import { readdirSync, statSync } from 'node:fs';
import { join, basename } from 'node:path';
import { VAULT, AREAS } from './vault.mjs';
import { WIDGET_TOPICS } from './widget-map.mjs';

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

/**
 * @returns {{topics:number, widgets:number, places:number, problems:string[]}}
 */
export function checkWidgetMap() {
  const slugsByArea = new Map(AREAS.map((a) => [a.area, new Set(a.topics.map((t) => t.slug))]));
  const widgetsOnDisk = new Set(
    walk(VAULT)
      .filter((f) => f.toLowerCase().endsWith('.html'))
      .map((f) => basename(f).replace(/\.html$/i, ''))
  );

  const problems = [];
  const widgets = new Set();
  const topics = new Set();
  let places = 0;

  for (const [area, topicsInArea] of Object.entries(WIDGET_TOPICS)) {
    if (!slugsByArea.has(area)) {
      problems.push(`area does not exist in the model: ${area}`);
      continue;
    }
    for (const [slug, widget] of Object.entries(topicsInArea)) {
      places++;
      widgets.add(widget);
      topics.add(`${area}/${slug}`);

      if (!slugsByArea.get(area).has(slug)) {
        problems.push(`topic slug does not exist: ${area} / ${slug}`);
      }
      if (!widgetsOnDisk.has(widget)) {
        problems.push(`widget file not found on disk: ${widget}.html (mapped in ${area}/${slug})`);
      }
      if (/\.html$/i.test(widget)) {
        problems.push(`map stores the .html extension; store the basename only: ${widget}`);
      }
    }
  }

  // Every widget on disk should be reachable somewhere, or the notes silently miss it.
  const unmapped = [...widgetsOnDisk].filter((w) => !widgets.has(w));

  return { topics: topics.size, widgets: widgets.size, places, problems, unmapped, total: widgetsOnDisk.size };
}

const isMain = process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('build/check-widget-map.mjs');
if (isMain) {
  const r = checkWidgetMap();
  console.log(`map entries (topic -> widget): ${r.places}`);
  console.log(`distinct topics covered:       ${r.topics}`);
  console.log(`distinct widgets mapped:       ${r.widgets} / ${r.total} on disk`);
  console.log(`problems:                      ${r.problems.length}`);
  for (const p of r.problems) console.log(`  x ${p}`);
  if (r.unmapped.length) {
    console.log(`\nwidgets on disk with no topic mapping: ${r.unmapped.length}`);
    for (const u of r.unmapped) console.log(`  ? ${u}`);
  }
  if (r.problems.length) process.exitCode = 1;
}
