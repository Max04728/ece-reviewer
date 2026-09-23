// check-links.mjs — verify every wikilink in the vault resolves to a real file.
//
//   node build/check-links.mjs            # summary + first 40 problems
//   node build/check-links.mjs --all      # print every problem
//
// Also importable: `import { checkLinks } from './check-links.mjs'`
//
// Why this matters: filenames are descriptive and contain commas, apostrophes and
// parentheses, so a hand-typed or mis-guessed link target silently dangles. Obsidian
// only reveals these one at a time; this finds all of them at once.
//
// Wikilinks inside fenced code blocks are ignored (Dataview queries are not links).

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, basename } from 'node:path';
import { VAULT } from './vault.mjs';

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

function stripCodeBlocks(text) {
  return text.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
}

// A wikilink target may be written with or without its extension: [[Name]], [[Name.md]]
// and [[Name.html]] must all resolve to the same file. Normalising both the index and
// the looked-up target through ONE helper is what stops the two from drifting apart.
const stripExt = (n) => n.replace(/\.(md|html)$/i, '');

/**
 * @returns {{files:number, links:number, broken:Array, ambiguous:Array}}
 */
export function checkLinks() {
  const all = walk(VAULT);
  const md = all.filter((f) => f.endsWith('.md'));
  const widgets = all.filter((f) => f.toLowerCase().endsWith('.html'));

  // Resolution index: basename (no extension) -> [relative paths].
  // Widgets are indexed too, so an explicit [[Name.html]] embed resolves.
  const byBase = new Map();
  for (const f of [...md, ...widgets]) {
    const b = stripExt(basename(f));
    if (!byBase.has(b)) byBase.set(b, []);
    byBase.get(b).push(relative(VAULT, f).replace(/\\/g, '/'));
  }

  const linkRe = /\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|[^\]]*)?\]\]/g;
  const broken = [];
  const ambiguous = [];
  let totalLinks = 0;

  for (const f of md) {
    const rel = relative(VAULT, f).replace(/\\/g, '/');
    const body = stripCodeBlocks(readFileSync(f, 'utf8'));
    let m;
    while ((m = linkRe.exec(body)) !== null) {
      let target = m[1].trim().replace(/\\$/, '');
      if (!target) continue;
      totalLinks++;
      const asBase = stripExt(basename(target.replace(/\\/g, '/')));
      const hits = byBase.get(asBase);
      if (!hits) {
        broken.push({ from: rel, target });
      } else if (hits.length > 1) {
        const exact = hits.some((h) => basename(h) === target);
        if (!exact) ambiguous.push({ from: rel, target, hits });
      }
    }
  }

  return { files: md.length, links: totalLinks, broken, ambiguous };
}

const isMain = process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('build/check-links.mjs');
if (isMain) {
  const showAll = process.argv.includes('--all');
  const r = checkLinks();
  console.log(`markdown files: ${r.files}`);
  console.log(`wikilinks checked: ${r.links}`);
  console.log(`broken: ${r.broken.length}`);
  console.log(`ambiguous (same basename in >1 folder): ${r.ambiguous.length}`);

  if (r.broken.length) {
    console.log(`\nBROKEN LINKS${showAll ? '' : ' (first 40)'}`);
    console.log('(target does not match any file basename in the vault)');
    for (const b of r.broken.slice(0, showAll ? r.broken.length : 40)) {
      console.log(`  ${b.from}\n     -> [[${b.target}]]`);
    }
  }
  if (r.ambiguous.length) {
    console.log(`\nAMBIGUOUS LINKS${showAll ? '' : ' (first 20)'}`);
    for (const a of r.ambiguous.slice(0, showAll ? a.ambiguous.length : 20)) {
      console.log(`  ${a.from} -> [[${a.target}]]`);
      for (const h of a.hits) console.log(`       candidate: ${h}`);
    }
  }
  if (r.broken.length) process.exitCode = 1;
}
