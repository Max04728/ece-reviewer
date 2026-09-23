---
title: TEMPLATE_widget
type: meta
updated: 2026-09-23
---

# TEMPLATE — Interactive widget

Widgets are standalone HTML files in `<part>/<area>/Widgets/`. They must use the shared
runtime — never re-implement sliders, canvas setup or number formatting.

## Minimal widget

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{title}}</title>
  <link rel="stylesheet" href="../../../Assets/snippets.css">
</head>
<body>
  <div id="app"></div>
  <script type="module">
    import { widget, fmt, Plot, PALETTE } from '../../../Assets/vault.js';

    widget({
      title: '{{title}}',
      description: '{{one-line purpose}}',
      controls: [
        { id: 'n', label: 'slices n', min: 2, max: 200, step: 1, value: 20 },
      ],
      compute: (v) => {
        const f = (x) => Math.sqrt(x + 1);
        let V = 0;
        const dx = 3 / v.n;
        for (let i = 0; i < v.n; i++) V += Math.PI * f((i + 0.5) * dx) ** 2 * dx;
        return { V };
      },
      range: { xMin: -0.5, xMax: 3.5, yMin: -0.5, yMax: 3 },
      draw: (ctx, v, out, plot) => {
        plot.clear().grid(1, 1).axes();
        plot.fn((x) => Math.sqrt(x + 1), 0, 3, { color: PALETTE.accent });
        plot.label('f(x) = √(x+1)', 1.6, 2.6);
      },
      readout: (out) => ({ 'Approximate V': fmt(out.V, 5) }),
    });
  </script>
</body>
</html>
```

## Path depth (easy to get wrong)

| Widget location | Relative path to Assets |
| --- | --- |
| `<part>/<area>/Widgets/x.html` | `../../../Assets/` |

## Rules

1. Import from `vault.js`. Duplicating the runtime is a bug, not a shortcut.
2. Always show a numeric readout next to the graphic — the goal is exam intuition.
3. When the widget demonstrates a formula, display the formula and the current
   substituted values on the page.
4. Keep the canvas responsive: set `width` as an attribute, let CSS handle display size.
5. Every widget gets linked from its area MOC's **Widgets** section by
   `build-widgets.mjs` (P6).