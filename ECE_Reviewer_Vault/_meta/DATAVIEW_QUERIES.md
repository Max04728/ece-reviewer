---
title: DATAVIEW_QUERIES
type: meta
updated: 2026-09-25
---

# DATAVIEW queries

Copy-paste cookbook. All topic notes carry `id, part, area, topic, tier, depth,
prereqs, tags`, so these work without hand-maintained lists.

## Progress by area

```dataview
TABLE WITHOUT ID area AS "Area", length(rows) AS "Topics",
  length(filter(rows, (r) => r.depth = "full")) AS "Full"
FROM ""
WHERE type != "moc" AND type != "meta" AND tier
GROUP BY area
SORT area ASC
```

## Everything still a stub in one area

```dataview
TABLE WITHOUT ID id AS "ID", title AS "Title", tier AS "Tier"
FROM "02_Electronics_Engineering/05_Circuit_Analysis_and_Design/Topics"
WHERE depth = "stub"
SORT topic ASC
```

## T1 notes not yet at full depth

```dataview
TABLE WITHOUT ID id AS "ID", area AS "Area", title AS "Title"
FROM ""
WHERE tier = 1 AND depth = "stub"
SORT area ASC, topic ASC
```

## Notes depending on a given note (reverse prereqs)

```dataview
LIST
FROM ""
WHERE contains(prereqs, "[[04_Reflection_Coefficient_and_VSWR]]")
```

## All formulas in an area (dataviewjs, reads the Formulas section)

```dataviewjs
const pages = dv.pages('"04_EST/05_Transmission_Lines_and_Waveguides/Topics"');
for (const p of pages.sort((x) => x.topic)) {
  const t = await dv.io.load(p.file.path);
  const sec = t.split('## Formulas')[1];
  if (!sec) continue;
  dv.header(4, p.id + " — " + p.title);
  dv.paragraph(sec.split('##')[0].trim());
}
```

## Drill-ready problem counts

```dataview
TABLE WITHOUT ID area AS "Area", length(rows) AS "Notes",
  sum(rows.problem_count) AS "Problems"
FROM ""
WHERE problem_count
GROUP BY area
```

> `problem_count` is stamped into frontmatter by `build-notes.mjs` when a payload is
> rendered, so this query works once notes are generated.

## Recently updated

```dataview
TABLE WITHOUT ID id AS "ID", area AS "Area", updated AS "Updated"
FROM ""
WHERE updated
SORT updated DESC
LIMIT 25
```
