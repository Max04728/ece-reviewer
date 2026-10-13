// toggle-math-css.mjs — turn the inline/display MATH styling on or off, live, without touching
// Obsidian's settings.
//
// WHY NOT FLIP `enabledCssSnippets`: that list lives in `.obsidian/appearance.json`, which a
// RUNNING Obsidian caches in memory and rewrites whenever it saves settings — an external edit can
// be silently reverted, and it needs an app reload to take effect anyway. Obsidian does live-reload
// a snippet's CONTENT, so this toggles the rules themselves and leaves the snippet enabled. The
// pre-existing widget/callout/table styling is unaffected either way; only the math section moves.
//
// The section is kept verbatim in `build/math-styling.section.css` while it is off, so nothing is
// lost and the toggle is exactly reversible.
//
// Usage:
//   node build/toggle-math-css.mjs --status
//   node build/toggle-math-css.mjs --off      # maths renders with plain theme styling
//   node build/toggle-math-css.mjs --on       # maths styling back on
//
// Both directions re-mirror the snippet into `.obsidian/snippets/`, which `verify.mjs` requires.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { syncSnippet } from './sync-snippet.mjs';

const TARGET = 'ECE_Reviewer_Vault/Assets/snippets.css';
const SECTION = 'build/math-styling.section.css';
const MARKER = '/* --------------------------------------------------- inline & display math -- */';

const argv = process.argv.slice(2);
const want = argv.includes('--off') ? 'off' : argv.includes('--on') ? 'on' : 'status';

const text = readFileSync(TARGET, 'utf8');
const at = text.indexOf(MARKER);
const isOn = at !== -1;

/** The file without the math section, and the section itself. */
function split(text) {
  const i = text.indexOf(MARKER);
  if (i === -1) return { base: text, section: '' };
  return { base: text.slice(0, i).replace(/\s*$/, '\n'), section: text.slice(i) };
}

const { base, section } = split(text);

function mirror() {
  const r = syncSnippet();
  console.log(`mirror: ${r.status}`);
}

if (want === 'status') {
  console.log(`math styling is ${isOn ? 'ON' : 'OFF'}  (${TARGET})`);
  console.log(`section copy       : ${existsSync(SECTION) ? SECTION : '(none)'}`);
  process.exit(0);
}

if (want === 'off') {
  if (!isOn) {
    console.log('math styling is already OFF');
    process.exit(0);
  }
  writeFileSync(SECTION, section, 'utf8');
  writeFileSync(TARGET, base, 'utf8');
  console.log(`math styling OFF  (section saved to ${SECTION})`);
  mirror();
  console.log('Obsidian live-reloads snippet content; if the note looks unchanged, press Ctrl+R.');
  process.exit(0);
}

// --on
if (isOn) {
  console.log('math styling is already ON');
  process.exit(0);
}
if (!existsSync(SECTION)) {
  console.error(`cannot turn on: ${SECTION} is missing and the target has no math section`);
  process.exit(2);
}
writeFileSync(TARGET, base.replace(/\s*$/, '\n') + readFileSync(SECTION, 'utf8'), 'utf8');
console.log(`math styling ON  (section restored from ${SECTION})`);
mirror();
console.log('Obsidian live-reloads snippet content; if the note looks unchanged, press Ctrl+R.');
