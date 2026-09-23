// formula-layout.mjs — how a topic note's "## Formulas" section is laid out.
//
// The default is the historical 3-column table (Quantity | Expression | Notes). Two
// alternatives were trialled against it on real notes and rejected on sight, so the table
// stands. What actually broke the table was payload DATA, not the layout:
//
//   * a literal `|` (`\ln|x|`, a determinant `|A|`) genuinely splits the row — it broke 111
//     expressions across 73 notes. Repaired in the payloads to \lvert / \rvert.
//   * a raw newline inside `e` also ends the markdown row. The renderer now normalises
//     whitespace in `e`, and those payloads were cleaned too.
//
// `\begin{...}` and `\\` were ALSO blamed at first, and that was wrong: the markdown parser
// never sees them as structure, so they do not break a row. Those rules were removed from
// diagnose-formulas.mjs as false positives — a checker that cries wolf costs more than it saves.
//
// Styles:
//   'table'   — 3-column table. The default. Escapes pipes in q/n and normalises `e`.
//   'callout' — one `> [!formula]` callout per formula.
//   'block'   — bold quantity, display math, then the note as a line of prose.
//
// Both alternatives remain available per topic via FORMULA_STYLE_BY_TOPIC, so a future trial
// costs one line.

export const FORMULA_STYLES = ['table', 'callout', 'block'];
// CHOSEN: 'table'. Trialled all three on real notes; callout and block were rejected on sight.
export const DEFAULT_FORMULA_STYLE = 'table';

/** `<area> -> { <topic slug>: <style> }` — only topics that DIFFER from the default. */
export const FORMULA_STYLE_BY_TOPIC = {
  // The three-note trial that settled the choice has been cleared: 'callout' is now the
  // default, so every note uses it unless deliberately overridden here.
};

/**
 * The layout for one topic note. Unknown topics get the default, so nothing changes
 * globally until a style is deliberately assigned.
 * @param {string} areaName area folder, e.g. '02_Integral_Calculus'
 * @param {string} slug     topic slug
 */
export function formulaStyleFor(areaName, slug) {
  const style = FORMULA_STYLE_BY_TOPIC[areaName]?.[slug] ?? DEFAULT_FORMULA_STYLE;
  if (!FORMULA_STYLES.includes(style)) {
    // Fail loudly: a typo would otherwise silently render the wrong layout, and the whole
    // point of the trial is knowing which layout you are looking at.
    throw new Error(`unknown formula style "${style}" for ${areaName}/${slug} (have: ${FORMULA_STYLES.join(', ')})`);
  }
  return style;
}

// ---------------------------------------------------------------------------
// Inline formulas in Core Concept prose
// ---------------------------------------------------------------------------
//
// The complaint that started this: concept paragraphs are dense with inline math (11,456
// inline formulas across 2,015 paragraphs — about 5.7 each, worst case 27 in ONE paragraph),
// so the formulas never get a line of their own to be read on.
//
// The transform hoists only the SUBSTANTIAL ones — an inline formula that states a relation
// or carries an operator AND is long enough to be an equation. Short symbol references
// (`$f(x)$`, `$R_2$`, `$n$`) must stay inline; promoting those would read far worse, which is
// why length alone is not the test. Done in the renderer, so no payload text is rewritten and
// the whole thing reverses by flipping one flag.

/** Apply vault-wide once the trial is accepted. ACCEPTED — see the trial note below. */
export const CONCEPT_PROMOTE_ALL = true;

/** Trial set — retained for reference; harmless now that CONCEPT_PROMOTE_ALL is on. */
export const CONCEPT_PROMOTE_TRIAL = {
  '02_AC_Circuits': { '08_Parallel_Resonance_and_Anti-Resonance': true },
  '03_Two_Port_Networks': { '06_Parameter_Conversions_and_Determinants': true },
  '04_Advanced_Engineering_Math': { '15_Legendre_Polynomials': true },
  '02_Integral_Calculus': { '11_Volumes_by_Slicing,_Disk_and_Washer': true },
};

export function promotesInlineFormulas(areaName, slug) {
  return CONCEPT_PROMOTE_ALL || CONCEPT_PROMOTE_TRIAL[areaName]?.[slug] === true;
}

/** Minimum length of the formula BODY (without the $ delimiters) to be worth its own line. */
export const CONCEPT_PROMOTE_MIN = 20;

/** A formula that merely names a symbol has no operator and is never promoted. */
export const CONCEPT_PROMOTE_OPERATOR =
  /(?:=|\\(?:int|iint|oint|sum|prod|frac|dfrac|tfrac|lim|partial|nabla|rightarrow|leftarrow|to|mapsto|approx|leq|geq|neq|propto|equiv|cdot|times|div))/;

/**
 * Hoist substantial inline formulas out of a concept paragraph onto their own display lines.
 *
 * The `(?<!\$)\$(?!\$)` guards matter: concept prose ALREADY contains `$$...$$` display blocks,
 * and a naive `\$([^$]+)\$` would match the inner span of `$$\begin{aligned}...\end{aligned}$$`
 * and rewrite it into `$$$...$$$`.
 *
 * A comma or full stop stranded at the start of the continuation is dropped — the equation has
 * already broken the sentence, so `, where ...` at the start of a paragraph reads badly.
 */
/** A character after which a display formula may safely be hoisted: a clause already ended. */
const CLAUSE_END = new Set([':', '.', ';', '!', '?']);

export function hoistInlineFormulas(text) {
  const src = String(text);
  const hoisted = src
    .replace(/(?<!\$)\$(?!\$)([^$\n]+?)(?<!\$)\$(?!\$)/g, (whole, body, offset) => {
      const t = String(body).trim();
      if (t.length < CONCEPT_PROMOTE_MIN || !CONCEPT_PROMOTE_OPERATOR.test(t)) return whole;

      // ONLY hoist a formula that already BEGINS a clause. Display math forces a paragraph
      // break in Obsidian, so hoisting mid-sentence strands the words on either side — measured
      // as "or in Leibniz form", "The second derivative is **not**", "it is", "valid when" and
      // 439 such fragments vault-wide, plus an ungrammatical join ("so Substituting"). Requiring
      // a boundary BEFORE the formula means the prose left behind is a complete clause.
      const before = src.slice(0, offset).replace(/[ \t]+$/, '');
      const last = before.slice(-1);
      const atClauseStart = before === '' || last === '\n' || CLAUSE_END.has(last);
      if (!atClauseStart) return whole;

      // SINGLE newlines, not blank lines: the formula still gets its own line, but the sentence
      // stays one paragraph instead of becoming three.
      return `\n$$${t}$$\n`;
    })
    // ARROW REPLACEMENT, deliberately. In a replace() replacement STRING, `$$` means a literal
    // `$`, so a plain '$$\n' here emitted ONE dollar and produced `... = Z_0$` — an unbalanced
    // display block. A function replacement does no such substitution.
    .replace(/\$\$\n([,.;:])[ \t]*/g, () => '$$\n')
    // A space that followed the formula in the source now sits at the START of the next line.
    // It renders the same, but it reads as sloppy in the generated note, and it is safe to drop:
    // this only fires immediately after a display block, never on a list's own indentation.
    .replace(/\$\$\n[ \t]+/g, () => '$$\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  // Still applied: some payloads were AUTHORED with blank lines around a display block, and
  // those can strand a continuation word. With clause-start hoisting this rarely fires.
  return mergeOrphanFragments(hoisted);
}

/**
 * A `$$` block cannot sit inside a sentence, so hoisting a mid-sentence formula leaves the
 * words that followed it stranded as their own paragraph — including paragraphs containing
 * only the word "and". Carry such a fragment past the display block and reattach it to the
 * sentence that follows.
 *
 * The whitelist is deliberate and narrow: a general "short fragment" rule would happily
 * reattach "that is" and invert the sentence's meaning.
 */
const FRAGMENT_CONTINUATION =
  /^(?:and|or|so|but|then|thus|hence|while|where|with|for|giving|yields?|since|because|if|when|as)\b[\s,;:]*$/i;

function mergeOrphanFragments(text) {
  const segs = String(text).split(/\n\n+/).map((s) => s.trim()).filter(Boolean);
  const out = [];
  let i = 0;
  while (i < segs.length) {
    const cur = segs[i];
    const next = segs[i + 1];
    const orphan = !cur.includes('$') && FRAGMENT_CONTINUATION.test(cur);
    const nextIsDisplay = next !== undefined && /^\$\$[\s\S]*\$\$$/.test(next);
    if (orphan && nextIsDisplay) {
      out.push(next);
      if (segs[i + 2] !== undefined) {
        segs[i + 2] = `${cur} ${segs[i + 2]}`;
      } else if (out.length >= 2) {
        // Nothing follows the display block: reattach to the text BEFORE it instead.
        out.splice(out.length - 2, 1, `${out[out.length - 2]} ${cur}`);
      } else {
        out.push(cur);
      }
      i += 2;
      continue;
    }
    out.push(cur);
    i += 1;
  }
  return out.join('\n\n');
}

// ---------------------------------------------------------------------------
// Worked-problem "Given" layout
// ---------------------------------------------------------------------------
//
// `give` items are authored as PLAIN TEXT by convention — CONVENTIONS §5 shows
// `"give": ["A = 0.5 m²", "d = 1 mm", "air"]`. Rendered as one semicolon-joined line they
// read as a run-on and sit oddly next to the LaTeX of the prompt, steps and answer, which
// is what makes a worked solution look like two documents stapled together.
//
// The layout decides only how the items are ARRANGED. The DATA still has to be authored in
// `$...$` for a list to match the maths around it; converting the payloads is separate work.

// TRIALLED AND REJECTED: the bullet-list givens were shown on a real note and the author
// preferred the original single semicolon-joined line, so nothing is assigned here. The
// mechanism stays because it costs nothing and makes a future trial a one-line change.
export const GIVENS_STYLE_ALL = 'inline';
export const GIVENS_STYLE_TRIAL = {};

export function givensStyleFor(areaName, slug) {
  const s = GIVENS_STYLE_TRIAL[areaName]?.[slug] ?? GIVENS_STYLE_ALL;
  if (s !== 'inline' && s !== 'list') {
    throw new Error(`unknown givens style "${s}" for ${areaName}/${slug}`);
  }
  return s;
}
