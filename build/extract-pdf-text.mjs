// extract-pdf-text.mjs — pull readable text out of a PDF using only Node's zlib.
//
// A PDF is mostly Flate-compressed object streams, so `read` shows nothing usable. This
// inflates every stream, harvests the text-showing operators, and writes the result to a
// .txt so ordinary grep/read can be used on it.
//
// Font subsets with custom encodings can defeat this; if the output is garbage, the fallback
// is screenshots rather than a cleverer parser.
//
//   node build/extract-pdf-text.mjs "<input.pdf>" "<output.txt>"

import { readFileSync, writeFileSync } from 'node:fs';
import { inflateSync } from 'node:zlib';

const [, , src, dst] = process.argv;
if (!src || !dst) {
  console.error('usage: node build/extract-pdf-text.mjs <input.pdf> <output.txt>');
  process.exit(2);
}

const buf = readFileSync(src);
const streams = [];
let i = 0;
while (true) {
  const s = buf.indexOf('stream', i);
  if (s === -1) break;
  let start = s + 'stream'.length;
  if (buf[start] === 0x0d) start++;
  if (buf[start] === 0x0a) start++;
  const e = buf.indexOf('endstream', start);
  if (e === -1) break;
  try {
    streams.push(inflateSync(buf.subarray(start, e)).toString('latin1'));
  } catch {
    // Not a deflate stream (image, font, or uncompressed) — skip.
  }
  i = e + 'endstream'.length;
}

/** Decode a PDF literal string body: \n \r \t \b \f \( \) \\ and \ddd octal. */
function decodeLiteral(body) {
  return body.replace(/\\(n|r|t|b|f|\(|\)|\\|[0-7]{1,3})/g, (_, esc) => {
    switch (esc) {
      case 'n': return '\n';
      case 'r': return '\r';
      case 't': return '\t';
      case 'b': return '\b';
      case 'f': return '\f';
      case '(': return '(';
      case ')': return ')';
      case '\\': return '\\';
      default: return String.fromCharCode(parseInt(esc, 8));
    }
  });
}

const pages = [];

for (const stream of streams) {
  if (!/(Tj|TJ|Td|TD)/.test(stream)) continue; // not a content stream
  let out = '';
  // Walk the content stream in order, handling the text operators that matter.
  const re = /\(((?:\\.|[^()\\])*)\)\s*Tj|\[((?:\\.|[^\]\\])*)\]\s*TJ|(T\*|Td|TD|ET)/g;
  let m;
  while ((m = re.exec(stream)) !== null) {
    if (m[1] !== undefined) {
      out += decodeLiteral(m[1]);
    } else if (m[2] !== undefined) {
      const inner = /\(((?:\\.|[^()\\])*)\)/g;
      let n;
      while ((n = inner.exec(m[2])) !== null) out += decodeLiteral(n[1]);
    } else if (m[3] !== undefined) {
      out += '\n';
    }
  }
  out = out.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
  if (out) pages.push(out);
}

const full = pages.join('\n\n===== PAGE BREAK =====\n\n');
writeFileSync(dst, full, 'utf8');

console.log(`streams inflated      : ${streams.length}`);
console.log(`content streams w/ text: ${pages.length}`);
console.log(`output bytes          : ${full.length}`);
console.log(`written to            : ${dst}`);
