---
title: Presets
description: Preset reference for eslint-plugin-stylelint-2.
---

# Presets

The plugin currently exposes four presets:

- `stylelint2.configs.recommended`
- `stylelint2.configs.stylesheets`
- `stylelint2.configs.configs`
- `stylelint2.configs.all`

## Rule matrix

- `Fix` legend:
  - `🔧` = autofixable
  - `—` = report only
- `Preset key` legend:
  - `🟡` — `stylelint2.configs.recommended`
  - `🎨` — `stylelint2.configs.stylesheets`
  - `🛠️` — `stylelint2.configs.configs`
  - `🟣` — `stylelint2.configs.all`

| Rule                                                                                                                               | Fix | Preset key |
| ---------------------------------------------------------------------------------------------------------------------------------- | :-: | :--------- |
| [`stylelint`](https://nick2bad4u.github.io/eslint-plugin-stylelint/docs/rules/stylelint)                                           |  🔧 | 🟡 🎨 🟣   |
| [`prefer-stylelint-define-config`](https://nick2bad4u.github.io/eslint-plugin-stylelint/docs/rules/prefer-stylelint-define-config) |  🔧 | 🟡 🛠️ 🟣  |
