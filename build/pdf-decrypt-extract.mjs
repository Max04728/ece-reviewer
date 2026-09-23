// pdf-decrypt-extract.mjs — read a standard-handler-encrypted PDF with Node only.
//
// The Canon manual is /Filter/Standard, V 2, R 3, Length 128 — RC4 with a 16-byte key derived
// from a (presumably empty) user password. Node has MD5; RC4 is ~15 lines. No external tools
// exist on this machine (no qpdf, pdftotext, mutool, and no Python PDF libraries), so this is
// the only way to read it.
//
// The stored /U entry is recomputed from the derived key, which turns "did the decryption
// work?" into a yes/no check instead of a guess: wrong key, wrong bytes.
//
//   node build/pdf-decrypt-extract.mjs "<input.pdf>" "<output.txt>"

import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { inflateSync } from 'node:zlib';

const [, , src, dst] = process.argv;
if (!src || !dst) {
  console.error('usage: node build/pdf-decrypt-extract.mjs <input.pdf> <output.txt>');
  process.exit(2);
}

const buf = readFileSync(src);
const latin = buf.toString('latin1');

// --- the standard 32-byte password padding --------------------------------
const PAD = Buffer.from([
  0x28, 0xbf, 0x4e, 0x5e, 0x4e, 0x75, 0x8a, 0x41, 0x64, 0x00, 0x4e, 0x56, 0xff, 0xfa, 0x01, 0x08,
  0x2e, 0x2e, 0x00, 0xb6, 0xd0, 0x68, 0x3e, 0x80, 0x2f, 0x0c, 0xa9, 0xfe, 0x64, 0x53, 0x69, 0x7a,
]);

const md5 = (...parts) => {
  const h = createHash('md5');
  for (const p of parts) h.update(p);
  return h.digest();
};

function rc4(key, data) {
  const S = new Uint8Array(256);
  for (let i = 0; i < 256; i++) S[i] = i;
  let j = 0;
  for (let i = 0; i < 256; i++) { j = (j + S[i] + key[i % key.length]) & 0xff; const t = S[i]; S[i] = S[j]; S[j] = t; }
  const out = Buffer.alloc(data.length);
  let i = 0; j = 0;
  for (let k = 0; k < data.length; k++) {
    i = (i + 1) & 0xff;
    j = (j + S[i]) & 0xff;
    const t = S[i]; S[i] = S[j]; S[j] = t;
    out[k] = data[k] ^ S[(S[i] + S[j]) & 0xff];
  }
  return out;
}

/** Read a PDF literal string starting at `(` — binary safe, handles \ddd and \x escapes. */
function readLiteralString(text, openParen) {
  const bytes = [];
  let i = openParen + 1;
  let depth = 1;
  while (i < text.length) {
    const c = text[i];
    if (c === '\\') {
      const n = text[i + 1];
      if (n >= '0' && n <= '7') {
        let oct = '';
        let k = i + 1;
        while (k < text.length && oct.length < 3 && text[k] >= '0' && text[k] <= '7') { oct += text[k]; k++; }
        bytes.push(parseInt(oct, 8) & 0xff);
        i = k;
        continue;
      }
      const map = { n: 10, r: 13, t: 9, b: 8, f: 12, '(': 40, ')': 41, '\\': 92 };
      bytes.push(map[n] !== undefined ? map[n] : n.charCodeAt(0));
      i += 2;
      continue;
    }
    if (c === '(') depth++;
    if (c === ')') { depth--; if (depth === 0) { i++; break; } }
    bytes.push(c.charCodeAt(0) & 0xff);
    i++;
  }
  return { bytes: Buffer.from(bytes), end: i };
}

// --- encrypt dictionary ---------------------------------------------------
const encObjIdx = latin.indexOf('/Encrypt');
const encRef = /\/Encrypt\s+(\d+)\s+(\d+)\s+R/.exec(latin.slice(encObjIdx, encObjIdx + 60));
let encDict = '';
if (encRef) {
  const at = latin.indexOf(`${encRef[1]} ${encRef[2]} obj`);
  encDict = latin.slice(at, latin.indexOf('endobj', at));
}
const num = (key, dflt) => {
  const m = new RegExp(`/${key}\\s+(-?\\d+)`).exec(encDict);
  return m ? parseInt(m[1], 10) : dflt;
};
const R = num('R', 3);
const V = num('V', 1);
const lengthBits = num('Length', 40);
const P = num('P', -1);

const oStart = encDict.indexOf('/O');
const oParen = encDict.indexOf('(', oStart);
const O = readLiteralString(encDict, oParen).bytes;
const uStart = encDict.indexOf('/U');
const uParen = encDict.indexOf('(', uStart);
const U = readLiteralString(encDict, uParen).bytes;

const idMatch = /\/ID\s*\[\s*<([0-9A-Fa-f]+)>/.exec(latin);
const ID0 = idMatch ? Buffer.from(idMatch[1], 'hex') : Buffer.alloc(0);

// --- derive the key from the EMPTY user password, then prove it -----------
function deriveKey(password) {
  const n = Math.max(5, Math.floor(lengthBits / 8));
  let pw = Buffer.from(password, 'latin1');
  pw = pw.length >= 32 ? pw.subarray(0, 32) : Buffer.concat([pw, PAD.subarray(0, 32 - pw.length)]);
  const pLE = Buffer.alloc(4);
  pLE.writeInt32LE(P, 0);
  let key = md5(pw, O.subarray(0, 32), pLE, ID0);
  if (R >= 3) for (let i = 0; i < 50; i++) key = md5(key.subarray(0, n));
  return key.subarray(0, n);
}

function computeU(key) {
  let u = rc4(key, PAD);
  for (let i = 1; i <= 19; i++) {
    const k = Buffer.from(key.map((b) => b ^ i));
    u = rc4(k, u);
  }
  return u;
}

const pwArg = process.argv.indexOf('--password');
const PASSWORD = pwArg !== -1 ? (process.argv[pwArg + 1] ?? '') : '';

const key = deriveKey(PASSWORD);
const checkU = computeU(key);
const keyWorks = U.length >= 16 && checkU.subarray(0, 16).equals(U.subarray(0, 16));

console.log(`encrypt dict : V ${V} R ${R} Length ${lengthBits} P ${P}`);
console.log(`O bytes      : ${O.length}   U bytes: ${U.length}   ID[0]: ${ID0.length} bytes`);
console.log(`password     : ${PASSWORD === '' ? '(empty)' : '(supplied)'}`);
console.log(`key ${keyWorks ? 'VERIFIED against /U' : 'REJECTED by /U'}`);

if (!keyWorks) {
  console.log('\nThis password does not open the file. Without the correct one the manual text');
  console.log('cannot be recovered here — screenshots of the relevant pages are the fallback.');
  process.exitCode = 1;
} else {
  const objectKey = (n, g) => {
    const ext = Buffer.alloc(key.length + 5);
    key.copy(ext, 0);
    ext[key.length] = n & 0xff;
    ext[key.length + 1] = (n >> 8) & 0xff;
    ext[key.length + 2] = (n >> 16) & 0xff;
    ext[key.length + 3] = g & 0xff;
    ext[key.length + 4] = (g >> 8) & 0xff;
    return md5(ext).subarray(0, Math.min(key.length + 5, 16));
  };

  const decode = (b) => b.replace(/\\(n|r|t|b|f|\(|\)|\\|[0-7]{1,3})/g, (_, e) => {
    const map = { n: '\n', r: '\r', t: '\t', b: '\b', f: '\f', '(': '(', ')': ')', '\\': '\\' };
    return map[e] !== undefined ? map[e] : String.fromCharCode(parseInt(e, 8));
  });

  const objRe = /(\d+)\s+(\d+)\s+obj/g;
  const pages = [];
  let m;
  let decrypted = 0;
  while ((m = objRe.exec(latin)) !== null) {
    const objNum = parseInt(m[1], 10);
    const genNum = parseInt(m[2], 10);
    const bodyStart = m.index + m[0].length;
    const endobj = latin.indexOf('endobj', bodyStart);
    const dict = latin.slice(bodyStart, endobj);
    const sIdx = dict.indexOf('stream');
    if (sIdx === -1) continue;

    let dataStart = bodyStart + sIdx + 'stream'.length;
    if (buf[dataStart] === 0x0d) dataStart++;
    if (buf[dataStart] === 0x0a) dataStart++;

    // Prefer the declared /Length so trailing bytes before `endstream` are not decrypted.
    let len = null;
    const lm = /\/Length\s+(\d+)(?!\s+\d+\s+R)/.exec(dict);
    if (lm) len = parseInt(lm[1], 10);
    if (len === null) {
      const e = buf.indexOf('endstream', dataStart);
      if (e === -1) continue;
      len = e - dataStart;
    }
    if (len <= 0 || dataStart + len > buf.length) continue;

    const plain = rc4(objectKey(objNum, genNum), buf.subarray(dataStart, dataStart + len));
    decrypted++;

    if (!/\/FlateDecode/.test(dict)) continue;
    let inflated;
    try { inflated = inflateSync(plain).toString('latin1'); } catch { continue; }
    if (!/(Tj|TJ)/.test(inflated)) continue;

    let out = '';
    const re = /\(((?:\\.|[^()\\])*)\)\s*Tj|\[((?:\\.|[^\]\\])*)\]\s*TJ|(T\*|Td|TD|ET)/g;
    let n;
    while ((n = re.exec(inflated)) !== null) {
      if (n[1] !== undefined) out += decode(n[1]);
      else if (n[2] !== undefined) {
        const inner = /\(((?:\\.|[^()\\])*)\)/g;
        let k;
        while ((k = inner.exec(n[2])) !== null) out += decode(k[1]);
      } else out += '\n';
    }
    out = out.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
    if (out) pages.push(out);
  }

  const full = pages.join('\n\n===== PAGE BREAK =====\n\n');
  writeFileSync(dst, full, 'utf8');
  console.log(`streams decrypted : ${decrypted}`);
  console.log(`text pages        : ${pages.length}`);
  console.log(`output bytes      : ${full.length}`);
  console.log(`written to        : ${dst}`);
}
