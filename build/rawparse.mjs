// rawparse.mjs -- extract a widget's <script type="module"> body, strip only the vault.js
// import, and try to parse it with NO stub. This separates "the widget body is malformed"
// from "my stub collides with the widget".
import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const file = process.argv[2];
const txt = readFileSync(file, 'utf8');
const m = txt.match(/<script type="module">([\s\S]*?)<\/script>/);
if (!m) { console.log('no module block'); process.exit(1); }

// Keep the import intact but rewrite it to a data: URL that exports everything the
// widget asks for, so parsing and binding both work with no local stub declarations.
const imported = (m[1].match(/import\s*\{([^}]*)\}\s*from\s*['"][^'"]*vault\.js['"]/) || [, ''])[1];
const names = imported.split(',').map((s) => s.trim().split(/\s+as\s+/).pop().trim()).filter(Boolean);
const exports = names.map((n) => `export const ${n} = undefined;`).join('\n');
const dataUrl = 'data:text/javascript,' + encodeURIComponent(exports + '\nexport default {};');

const body = m[1].replace(/from\s*['"][^'"]*vault\.js['"]/, `from '${dataUrl}'`);
writeFileSync('build/_raw.mjs', body, 'utf8');

try {
  await import(pathToFileURL('build/_raw.mjs').href + '?t=' + Date.now());
  console.log('PARSED AND RAN with no local stub -> the widget body is well formed');
  console.log('(a stub collision in the checker is therefore the cause of the earlier error)');
} catch (e) {
  const isSyntax = e instanceof SyntaxError;
  console.log(`${isSyntax ? 'SYNTAX ERROR' : 'runtime error'}: ${e.message}`);
  if (isSyntax) {
    console.log('-> the widget body itself is malformed');
  } else {
    console.log('-> the body parsed; it failed later for a DOM reason, which is expected here');
  }
}
try { unlinkSync('build/_raw.mjs'); } catch { /* ignore */ }
