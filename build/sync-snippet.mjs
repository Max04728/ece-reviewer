// sync-snippet.mjs — mirror Assets/snippets.css into Obsidian's snippet folder.
//
// WHY THIS EXISTS: Obsidian applies CSS to NOTES only from `<vaultRoot>/.obsidian/snippets/`.
// A stylesheet sitting at `Assets/snippets.css` is linked by the WIDGETS (each widget has a
// <link> to it) but is never loaded for notes. So every note-level rule in that file — table
// alignment, callout accents — was inert until this mirror existed.
//
// The Obsidian vault root here is the PARENT of ECE_Reviewer_Vault: the workspace folder holds
// .obsidian/, build/ and ECE_Reviewer_Vault/. Verified on disk. If the vault is ever moved,
// this silently does nothing rather than writing to a wrong place, and says so.
//
// The source stays `Assets/snippets.css` — one source of truth; this only mirrors it, and
// `verify.mjs` calls it so the mirror cannot go stale.
//
//   node build/sync-snippet.mjs

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { VAULT } from './vault.mjs';

const SNIPPET_NAME = 'snippets.css';

export function syncSnippet() {
  const source = join(VAULT, 'Assets', SNIPPET_NAME);
  const vaultRoot = resolve(VAULT, '..');
  const obsidianDir = join(vaultRoot, '.obsidian');
  const target = join(obsidianDir, 'snippets', SNIPPET_NAME);

  if (!existsSync(source)) return { status: 'no-source', source, target };
  if (!existsSync(obsidianDir)) {
    // Not an Obsidian vault root (or not opened yet) — do not invent a folder tree.
    return { status: 'no-obsidian', source, target };
  }

  const want = readFileSync(source, 'utf8');
  let have = null;
  try { have = readFileSync(target, 'utf8'); } catch { /* first run */ }

  if (have === want) return { status: 'current', source, target };

  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, want, 'utf8');
  return { status: have === null ? 'created' : 'updated', source, target };
}

const isMain = process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('build/sync-snippet.mjs');
if (isMain) {
  const r = syncSnippet();
  const rel = (p) => p.replace(/\\/g, '/');
  switch (r.status) {
    case 'created':
      console.log(`created  ${rel(r.target)}`);
      console.log('NOTE: enable it once in Obsidian -> Settings -> Appearance -> CSS snippets.');
      break;
    case 'updated':
      console.log(`updated  ${rel(r.target)}`);
      break;
    case 'current':
      console.log(`current  ${rel(r.target)}`);
      break;
    case 'no-obsidian':
      console.log(`skipped: no .obsidian folder at ${rel(r.target)}`);
      break;
    default:
      console.log(`skipped: ${rel(r.source)} does not exist`);
  }
}
