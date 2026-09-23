// extract.mjs — pull a widget's module body to a temp file for direct checking.
//
// NOTE: import stripping is anchored to line starts so it cannot eat JS string
// content. An earlier unanchored `[^;]+;` pattern silently removed everything from a
// real `import ...;` up to the NEXT semicolon anywhere later in the file, which
// corrupted concatenated strings and produced phantom syntax errors in files that
// parsed perfectly. That is why the anchored patterns below are used.
import { readFileSync, writeFileSync } from 'node:fs';
const file = process.argv[2];
const txt = readFileSync(file, 'utf8');
const m = txt.match(/<script type="module">([\s\S]*?)<\/script>/);
const body = m[1]
  .replace(/^[ \t]*import\s+[^;\n]*?from\s+['"][^'"\n]+['"];[ \t]*$/gm, '')
  .replace(/^[ \t]*import\s+['"][^'"\n]+['"];[ \t]*$/gm, '');
writeFileSync('build/_tmp_body.mjs', body, 'utf8');
console.log('lines:', body.split('\n').length);
