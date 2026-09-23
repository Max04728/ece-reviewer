// expand.mjs — the payload expander.
//
// Takes a topic's metadata (from vault.mjs) plus its payload (from payload/*.json)
// and renders the full Obsidian note. All fixed structure lives HERE, once, so it
// can never drift across 408 notes and never has to be re-typed by the model.
//
// Payload schema (build/payload/<part>/<area>/<slug>.json):
// {
//   "scope":   "one-line scope statement",
//   "concept": ["para", "para"],                  // markdown, may contain $math$
//   "derive":  ["step or derivation line"],        // T1 only
//   "formulas": [ {"q":"name","e":"C = \\eps A/d","n":"note"} ],
//   "problems": [ {
//        "prompt": "text",
//        "give":   ["A = 0.5 m^2", "d = 1 mm"],
//        "steps":  ["line 1", "line 2"],
//        "ans":    "4.43 nF",
//        "trap":   "mm to m conversion"             // optional
//   } ],
//   "traps":  ["short exam trap"],
//   "refs":   ["[[Related_Note]]"],
//   "prereqs":["[[03_Definite_Integrals_and_FTC]]"] // optional, cross-area edges
// }
//
// Tier controls how much of the payload is rendered; missing keys degrade gracefully,
// so a T3 payload that only carries `formulas` still renders a valid note.

import { pad } from './vault.mjs';
import { widgetFor, WIDGET_EMBED_SIZE } from './widget-map.mjs';
import { formulaStyleFor, promotesInlineFormulas, hoistInlineFormulas, givensStyleFor } from './formula-layout.mjs';

const yamlStr = (s) => `"${String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
const yamlList = (arr) => `[${arr.map(yamlStr).join(', ')}]`;
const cell = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\n+/g, ' ').trim();

export function navFooter(area, topic) {
  const idx = area.topics.findIndex((t) => t.slug === topic.slug);
  const prev = area.topics[idx - 1];
  const next = area.topics[idx + 1];
  const left = prev ? `[[${prev.slug}|⬅ ${pad(prev.no)}]]` : '⬅ *start*';
  const right = next ? `[[${next.slug}|${pad(next.no)} ➡]]` : '*end* ➡';
  return `---\n\n${left} · [[${area.moc}|MOC]] · [[00_Dashboard|Dashboard]] · ${right}`;
}

/**
 * Learner-owned frontmatter keys — the ones that record YOUR study progress.
 *
 * These are the ONLY note keys a re-render must never author. build-notes.mjs reads them back
 * off the note already on disk (extractTracking, below) and passes them in, so regenerating an
 * area PRESERVES progress instead of resetting it. Progress deliberately lives in frontmatter
 * rather than in the note body, because the body is rebuilt from the payload every render —
 * a hand-typed checkbox would be destroyed the next time the area is regenerated.
 */
export const TRACKED_KEYS = ['status', 'confidence', 'last_reviewed'];

/**
 * Recover tracked keys from an existing note's frontmatter.
 * Returns {} for a missing file, a note with no frontmatter, or unset values — so a note that
 * has never been rated renders with the defaults rather than inheriting junk.
 */
export function extractTracking(noteText) {
  if (!noteText) return {};
  const block = /^---\r?\n([\s\S]*?)\r?\n---/.exec(noteText);
  if (!block) return {};
  const out = {};
  for (const line of block[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z_][A-Za-z0-9_]*):[ \t]*(.*)$/.exec(line);
    if (!kv || !TRACKED_KEYS.includes(kv[1])) continue;
    let v = kv[2].trim();
    if (v === '' || v === 'null' || v === '~') continue; // unset — keep the default
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    out[kv[1]] = v;
  }
  if (out.confidence !== undefined) {
    const n = Number(out.confidence);
    if (Number.isFinite(n)) out.confidence = n;
    else delete out.confidence;
  }
  return out;
}

export function frontmatter(t, area, payload, depth, tracking = {}) {
  const prereqs = payload.prereqs ?? [];
  const tags = ['ece', t.part.replace(/^\d+_/, '').toLowerCase(), t.areaSlug.toLowerCase()];
  const maxProblems = t.tier === 1 ? 10 : t.tier === 2 ? 5 : 0;
  const problemCount = depth === 'full' && maxProblems
    ? Math.min((payload.problems ?? []).length, maxProblems)
    : 0;
  const rows = [
    '---',
    `id: ${t.id}`,
    `title: ${yamlStr(t.title)}`,
    `part: ${yamlStr(t.part)}`,
    `area: ${yamlStr(t.area)}`,
    `topic: ${t.no}`,
    `tier: ${t.tier}`,
    `depth: ${depth}`,
  ];
  if (depth === 'full') rows.push(`problem_count: ${problemCount}`);
  rows.push(`prereqs: ${yamlList(prereqs)}`);
  rows.push(`tags: ${yamlList(tags)}`);
  // Study progress. Defaults are written on first render; every later render carries the
  // learner's own values through `tracking`. status: not-started | reading | shaky | solid.
  rows.push(`status: ${tracking.status ?? 'not-started'}`);
  rows.push(`confidence: ${tracking.confidence ?? 0}`);
  if (tracking.last_reviewed) rows.push(`last_reviewed: ${tracking.last_reviewed}`);
  rows.push(`updated: ${new Date().toISOString().slice(0, 10)}`);
  rows.push('---');
  return rows.join('\n');
}

/** How many problems the renderer will actually show for a tier. */
export function visibleProblems(tier) {
  return tier === 1 ? 10 : tier === 2 ? 5 : 0;
}

function formulasSection(formulas, style) {
  if (!formulas?.length) return null;

  // Expressions are authored WITHOUT $ delimiters; wrap here so every formula renders as
  // math and no payload can forget them.
  const inline = (e) => {
    // Normalise whitespace too: a raw newline in `e` would end the markdown table row, and
    // math mode treats a newline as a space anyway. A `\ ` keeps its own single space.
    const s = String(e).replace(/\s+/g, ' ').trim();
    return s.startsWith('$') || s.startsWith('\\[') ? s : `$${s}$`;
  };
  // Display form: the formula on its own line. Unlike a table cell this survives a literal
  // `|`, a `\begin{...}` environment, `\\` and embedded newlines — which is precisely why
  // the non-table layouts are immune to the defect class documented in formula-layout.mjs.
  const display = (e) => {
    // Collapse to ONE line before wrapping. A newline inside a callout escapes the blockquote
    // (the continuation line carries no "> "), and math mode treats a newline as a space
    // anyway, so nothing is lost. A `\ ` keeps its own single space.
    const s = String(e).replace(/\s+/g, ' ').trim();
    if (s.startsWith('$$') || s.startsWith('\\[')) return s;
    if (s.startsWith('$') && s.endsWith('$') && s.length > 2) return `$$${s.slice(1, -1)}$$`;
    return `$$${s}$$`;
  };

  if (style === 'callout') {
    return formulas
      .map((f) => {
        const out = [`> [!formula] ${f.q ?? ''}`.trimEnd(), `> ${display(f.e)}`];
        if (f.n) out.push('>', `> ${f.n}`);
        return out.join('\n');
      })
      .join('\n\n');
  }

  if (style === 'block') {
    return formulas
      .map((f) => {
        const out = [`**${f.q ?? ''}**`.trim(), display(f.e)];
        if (f.n) out.push(f.n);
        return out.join('\n\n');
      })
      .join('\n\n');
  }

  // default: the historical 3-column table. Kept byte-identical so that assigning no style
  // anywhere leaves the vault exactly as it was — except that `:---:` now centres the
  // Expression column, which is the only per-column alignment markdown offers. Emitted for
  // THIS table only, so MOC tables are unaffected.
  const rows = formulas.map((f) => `| ${cell(f.q)} | ${inline(f.e)} | ${cell(f.n)} |`).join('\n');
  return `| Quantity | Expression | Notes |\n| --- | :---: | --- |\n${rows}`;
}

function problemsSection(problems, tier, givensStyle = 'inline') {
  if (!problems?.length) return null;
  const max = visibleProblems(tier);
  const list = max ? problems.slice(0, max) : [];
  if (!list.length) return null;
  const body = list
    .map((p, i) => {
      const out = [`### P${i + 1}. ${p.prompt}`];
      if (p.give?.length) {
        out.push(givensStyle === 'list'
          ? ['**Given:**', '', ...p.give.map((g) => `- ${g}`)].join('\n')
          : `**Given:** ${p.give.join('; ')}`);
      }
      if (p.steps?.length) {
        out.push('**Solution:**');
        out.push(p.steps.map((s, k) => `${k + 1}. ${s}`).join('\n'));
      }
      out.push(`> [!success]- Answer\n> **${p.ans}**`);
      if (p.trap) out.push(`> [!warning] Trap\n> ${p.trap}`);
      // An OPTIONAL second solution path: how the same problem falls to a Canon F-789SGA.
      // Collapsed by default so the manual derivation stays the primary answer, and absent
      // entirely on problems where the calculator buys nothing — `calc` is per problem, so
      // "when it can be done" is expressed by simply not authoring it.
      if (p.calc?.steps?.length) {
        const title = p.calc.mode
          ? `Calculator technique (Canon F-789SGA) — ${p.calc.mode}`
          : 'Calculator technique (Canon F-789SGA)';
        const block = [`> [!tip]- ${title}`];
        p.calc.steps.forEach((s, k) => block.push(`> ${k + 1}. ${s}`));
        if (p.calc.note) block.push('>', `> ${p.calc.note}`);
        out.push(block.join('\n'));
      }
      return out.join('\n\n');
    })
    .join('\n\n');
  return body;
}

/**
 * Render a note.
 * depth: 'stub' | 'full'  (stub = structure + nav only, no body yet)
 */
export function renderNote(t, area, payload = {}, depth = 'full', tracking = {}) {
  const bits = [];
  bits.push(frontmatter(t, area, payload, depth, tracking));
  bits.push('');
  bits.push(`# ${pad(t.no)} — ${t.title}`);
  bits.push('');

  if (depth === 'stub') {
    bits.push('> [!abstract] Scope');
    bits.push(`> ${payload.scope || '*To be written.*'}`);
    bits.push('');
    bits.push('> [!todo] Status');
    bits.push(
      `> Stub — \`tier: ${t.tier}\`, \`depth: stub\`. Body (concept, formulas, problems, traps) pending.`
    );
    bits.push('');
    bits.push('## Core Concept');
    bits.push('');
    bits.push('## Formulas');
    bits.push('');
    if (t.tier === 1) {
      bits.push('## Derivation');
      bits.push('');
    }
    if (t.tier !== 3) bits.push('## Worked Problems');
    bits.push('');
    bits.push('## Traps & Exam Notes');
    bits.push('');
    bits.push(navFooter(area, t));
    return bits.join('\n') + '\n';
  }

  // ---- full render -------------------------------------------------------
  if (payload.scope) {
    bits.push('> [!abstract] Scope');
    bits.push(`> ${payload.scope}`);
    bits.push('');
  }

  // A T3 note carries only scope + formulas + traps, so there is no concept prose to
  // show. Printing the heading followed by "*Pending.*" would read as an unfinished
  // note rather than a deliberately lean one, so the section is omitted entirely.
  if (payload.concept?.length || payload.intuition) {
    bits.push('## Core Concept');
    bits.push('');
    if (payload.intuition) {
      bits.push(`> [!tip] Intuition`);
      bits.push(`> ${payload.intuition}`);
      bits.push('');
    }
    if (payload.concept?.length) {
      // Under trial: hoist substantial inline formulas onto their own display lines. Short
      // symbol references stay inline — promoting `$f(x)$` would read worse, not better.
      const promote = promotesInlineFormulas(t.area, t.slug);
      bits.push((promote ? payload.concept.map(hoistInlineFormulas) : payload.concept).join('\n\n'));
    }
    bits.push('');
  }
  if (t.tier === 1 && payload.derive?.length) {
    bits.push('## Derivation');
    bits.push('');
    bits.push(payload.derive.join('\n\n'));
    bits.push('');
  }

  const ft = formulasSection(payload.formulas, formulaStyleFor(t.area, t.slug));
  bits.push('## Formulas');
  bits.push('');
  bits.push(ft ?? '*Pending.*');
  bits.push('');

  // A widget belongs in the note that DISCUSSES it, not only in the area MOC. Which topic owns
  // which widget is data (widget-map.mjs), never a renderer decision — so an unmapped topic
  // renders no section at all, and the rollout can stay incremental area by area. Placed after
  // the formulas because that is what most widgets let you vary and watch.
  const widget = widgetFor(t.area, t.slug);
  if (widget) {
    bits.push('## Interactive Widget');
    bits.push('');
    bits.push(`**${widget.replace(/_/g, ' ')}**`);
    bits.push('');
    bits.push(`![[${widget}.html|${WIDGET_EMBED_SIZE}]]`);
    bits.push('');
  }

  if (t.tier !== 3) {
    bits.push('## Worked Problems');
    bits.push('');
    bits.push(problemsSection(payload.problems, t.tier, givensStyleFor(t.area, t.slug)) ?? '*Pending.*');
    bits.push('');
  }

  bits.push('## Traps & Exam Notes');
  bits.push('');
  bits.push(payload.traps?.length ? payload.traps.map((x) => `- ${x}`).join('\n') : '*Pending.*');
  bits.push('');

  if (payload.refs?.length) {
    bits.push('## See Also');
    bits.push('');
    bits.push(payload.refs.map((r) => `- ${r}`).join('\n'));
    bits.push('');
  }

  bits.push(navFooter(area, t));
  return bits.join('\n') + '\n';
}

export function mocPath(area) {
  return `${VAULT}/${area.part}/${area.area}/${area.moc}.md`;
}

/** Render the top-level MOC for a part (01_Mathematics etc). */
export function renderPartMOC(part, partName, areas) {
  const rows = areas
    .map(
      (a) =>
        `| [[${a.area}/${a.moc}\\|${a.area.replace(/^\d+_/, '').replace(/_/g, ' ')}]] | ${a.topics.length} |`
    )
    .join('\n');
  return `---
title: ${yamlStr(partName)}
part: ${yamlStr(part)}
type: moc
updated: ${new Date().toISOString().slice(0, 10)}
---

# ${partName} — MOC

\`\`\`dataview
TABLE WITHOUT ID area AS "Area", length(rows) AS "Topics"
FROM "${part}"
WHERE type = "topic"
GROUP BY area
SORT area ASC
\`\`\`

## Areas (generated)

| Area | Topics |
| --- | --- |
${rows}

## Cross-Area Prerequisites
<!-- generated by build-meta.mjs from frontmatter prereqs -->

---

[[00_Dashboard|⬆ Dashboard]]
`;
}

/** Render the area MOC. Topic list is generated from the model, never hand-typed. */
export function renderMOC(area, partName) {
  const rows = area.topics
    .map((t) => `| ${t.id} | [[${t.slug}\\|${t.title}]] | T${t.tier} | \`dataview\` |`)
    .join('\n');
  return `---
title: ${yamlStr(partName + ' — ' + area.areaSlug.replace(/_/g, ' '))}
part: ${yamlStr(area.part)}
area: ${yamlStr(area.area)}
type: moc
updated: ${new Date().toISOString().slice(0, 10)}
---

# ${area.areaSlug.replace(/_/g, ' ')} — MOC

\`\`\`dataview
TABLE WITHOUT ID id AS "ID", tier AS "Tier", depth AS "Depth"
FROM "${area.part}/${area.area}/Topics"
SORT topic ASC
\`\`\`

## Topic Map (generated)

| ID | Topic | Tier | Depth |
| --- | --- | --- | --- |
${rows}

## Sets & Drills

<!-- generated by build-drills.mjs -->

## Widgets

<!-- generated by build-widgets.mjs -->

---

[[../_MOC_${partName.replace(/\s+/g, '_')}\\|⬆ ${partName}]] · [[00_Dashboard|Dashboard]]
`;
}
