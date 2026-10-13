---
title: Formula Sheet Style Guide
part: Meta
tags: [ece, formula-sheet, style-guide, template]
scope: Applies to every vault in this folder (e.g. Mathematics/)
version: 1.0
---

# Formula Sheet Style Guide

Authoritative structure for the PRC ECE formula-sheet vaults in this folder. Follow it for every new subject file so the whole set stays uniform and fast to skim during review.

> [!warning] This file lives **outside** the `Mathematics/` vault root
> When `Mathematics/` is opened as an Obsidian vault, nothing here is linkable from the notes. Copy the template below into new vaults instead of wikilinking to this file.

## 1. Vault layout

```
<VaultName>/
├── 00_Index.md                     ← MOC, always first
├── 01_<Subject_Name>.md
├── 02_<Subject_Name>.md
└── ...
```

- Folder name = vault name (`Mathematics`, `Electronics`, `Communications`, …).
- File names: two-digit order prefix, `_` separators, Title_Case words (`04_Advanced_Engineering_Math.md`).
- One subject = one file. If a subject is very long, split into **`## Part A` / `## Part B` / `## Part C` sections inside the same file** — never extra files.
- Topic numbering is continuous across parts (1…N), never restarting per part.

## 2. YAML frontmatter — every file

```yaml
---
title: <Subject Name>
part: <Vault/Part Name>        # e.g. Mathematics
tags: [ece, math, formula-sheet]   # 2nd tag mirrors the part
topics: <count>                # must equal the number of ### topics in the file
---
```

Exactly these five keys, in this order. No extra keys. `00_Index.md` uses `topics:` = grand total and adds `moc` to tags.

## 3. File skeleton

```
--- frontmatter ---
# <Subject Name>                      ← optional H1 + inline tag line
## Part A — <Cluster Name>
### 1. <Topic Name>
... 12–25 lines ...
---
### 2. <Topic Name>
...
---
## Part B — <Cluster Name>
### n. <Topic Name>
...
→ Back to [[00_Index]]               ← LAST line, exactly this text
```

- `##` headings group topics into parts; `###` headings are the numbered syllabus topics.
- `---` separates **topics within a part** and **parts from each other**.
- `### <n>. <Topic Name>` must match the syllabus list exactly — same number, order and spelling. Never renumber or reorder.
- The back-link is the final line of every subject file (the index file has none).

## 4. Anatomy of one topic

```markdown
### 7. Laplace Transform Pairs

**Transform pairs ★**

| $f(t)$, $t\ge0$ | $F(s)$ | ROC |
|---|---|---|
| $1$ | $\frac1s$ | $\sigma>0$ |

**Damping cases ★**

$$y=(c_1+c_2t)e^{-\alpha t}\ \text{(critical)},\qquad y=e^{-\alpha t}\big(c_1\cos\omega_dt+c_2\sin\omega_dt\big)$$

**Conditions:** $f$ piecewise continuous and of exponential order; $s=\sigma+j\omega$ in s⁻¹.

> [!tip] High-yield ★
> One sentence, actionable.
```

Mandatory parts of every topic:

1. **Formulas** — all that the topic needs, nothing else.
2. **Variable definitions with SI units inline** (V/m, A·m², N·s/m, rad/s, s⁻¹, dimensionless…).
3. **Exactly one `**Conditions:** ...` line** (assumptions, validity range, degenerate cases). Split into two `**Conditions:**` lines only if one line cannot stay under ~180 characters; never drop wording.
4. **★ on high-yield formulas** — on the bold label, e.g. `**Gauss law ★**`, or on the trailing formula inside a table.
5. **`#tags`** where genuinely useful for search (`#laplace #ztransform #vector #stability …`), not decoration.

## 5. Formatting rules

| Rule | Do | Don't |
|---|---|---|
| Blank lines | after every `###`, around every table, list, `$$` block and callout | jam a heading against the previous line |
| One idea per block | `**Bold label ★**` → blank → `$$…$$` | chain formulas with `;` on one line |
| Paired/serial data | markdown **table** (pairs, cases, distributions, values, coefficients) | semicolon run-on |
| Multi-line math | `\begin{aligned}`, `\begin{cases}`, `\begin{bmatrix}`, `\qquad` between results | several unrelated formulas in one `$$` |
| Fractions | `\frac` in `$$…$$` | `\dfrac` in display math (reserve it for inline and table cells) |
| Line length | ≤180 chars, with `**Conditions:**` lines and the odd callout allowed to run long | >180-char formula lines |
| Density | ~12–25 lines per topic; 30–50 avg chars/line per file | walls of 400-char lines |
| Semicolons | split into separate blocks/lines | `≥3 ;` on a source line |

## 6. Obsidian specifics

- **LaTeX**: native `$…$` inline and `$$…$$` display only. No `\usepackage`, no `\newcommand`, no custom macros, no HTML. Verify visually in reading view.
- **Pipes inside math in tables break tables** — always `\lvert z\rvert>1`, never `$|z|>1$`. This is the single most common rendering bug in these sheets.
- **Wikilink aliases inside table cells** must escape the alias pipe: `[[06_Control_Systems#5. Second Order Specifications\|Second Order Specifications]]`.
- **Cross-links use numbered anchors**, because headings carry numbers:
  `[[04_Advanced_Engineering_Math#7. Laplace Transform Pairs|Laplace Transform Pairs]]` — the part before `|` must match the heading text exactly.
- **Callouts**, blank line before and after, 4–6 per file:
  ```
  > [!warning] Exam trap
  > The specific mistake that costs points.

  > [!tip] High-yield ★
  > The one thing to memorize / the fastest route.
  ```
- `---` rules between topics and parts; `→ Back to [[00_Index]]` last.

## 7. Index (`00_Index.md`)

Must contain, in this order:

1. `## How to use this vault` — 3–5 lines maximum.
2. `## Map of Content` — table of all subjects as wikilinks with topic counts and part names.
3. High-yield callout listing the most heavily tested subjects.
4. Grand total topic count.
5. Optional: split notes, cross-topic jump table, tag index.

Content decisions to record explicitly in the index:

- If the brief's stated topic total disagrees with the listed topics, **keep every listed topic and flag the discrepancy** in an `> [!warning] Exam trap` callout. Never silently drop topics to match a headline number.
- Note any Part A/B/C splits.

## 8. Content rules

- **Formulas only.** No introductions, no filler prose, no end-of-subject summary, no "in conclusion".
- Every formula that the topic legitimately needs; nothing off-topic.
- Units always inline with the symbol definition; state whether a quantity is dimensionless.
- Tables for anything paired: transform pairs, distributions, coefficient sets, geometry formulas, critical values, series expansions.
- Keep `Conditions:` to one line; keep callouts to one or two lines.

## 9. Definition of done

Run from the vault's parent folder; every file must pass.

```powershell
$dir = 'C:\Users\Admin\Desktop\Formula\Mathematics'   # adjust per vault
Get-ChildItem $dir -Filter *.md | Sort-Object Name | ForEach-Object {
  $c = Get-Content $_.FullName -Encoding UTF8
  $topics = ($c | Select-String '^### ').Count
  $avg = [math]::Round((($c | Measure-Object Length -Average).Average),0)
  $long = ($c | Where-Object { $_.Length -gt 180 }).Count
  $back = $c[-1] -eq '→ Back to [[00_Index]]'
  "{0,-42} ###={1,3} avg={2,3} over180={3,2} backlink={4}" -f $_.Name,$topics,$avg,$long,$back
}
# must print 0: unescaped pipes inside math in table rows
(Get-ChildItem $dir -Filter *.md | Select-String '^\|.*(\$\||\{\||[A-Za-z0-9}]\|)').Count
```

- [ ] `topics:` in frontmatter equals the `###` count, which equals the syllabus count.
- [ ] Topic numbers, names, order match the syllabus exactly.
- [ ] Every `###` has a blank line before and after it.
- [ ] Every topic has at least one `$$…$$` block or a table; no semicolon chains; file average ≤ ~50 chars/line.
- [ ] Every wikilink resolves (numbered anchors); every file ends with `→ Back to [[00_Index]]`.
- [ ] 3–6 callouts, ★ markers intact, units present, one `Conditions:` line per topic.
- [ ] No `\usepackage`, no HTML, no unescaped `|` inside math in tables.

## 10. Anti-patterns that made earlier notes unreadable

| Anti-pattern | Fix |
|---|---|
| `★ Divider: $H=\frac{Z_2}{Z_1+Z_2}$; series RLC $H=...$, $\omega_n=...$, $\zeta=...$` | bold label + one display block per formula, tables for lists of cases |
| `63.2% at $t=\tau$; 95% at $3\tau$; 98% at $4\tau$; $t_r\approx2.2\tau$; $t_s\approx4\tau$` | a landmark table (`Settling/rise/peak` rows) |
| Heading glued to the previous line | blank line before every `###` |
| Bullets full of inline `\dfrac` | display math blocks under bold labels |
| `$|z|>1$` inside a table cell | `$\lvert z\rvert>1$` |
| Merged conditions with six clauses | one tight `**Conditions:**` line, units split off if needed |

---

*Derived from the finished `Mathematics/` vault (10 files, 126 topics). Keep this guide and the vault in sync: if the vault's conventions change, update this file in the same change.*
