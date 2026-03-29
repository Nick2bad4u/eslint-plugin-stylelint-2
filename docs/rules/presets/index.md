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

| Rule                                                                                                                                                                     | Fix | Preset key |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-: | :--------- |
| [`stylelint`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/stylelint)                                                                               |  🔧 | 🟡 🎨 🟣   |
| [`disallow-stylelint-formatter`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-formatter)                                         |  🔧 | 🟡 🛠️ 🟣  |
| [`disallow-stylelint-ignore-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-ignore-disables)                             |  🔧 | 🟡 🛠️ 🟣  |
| [`prefer-stylelint-define-config`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-define-config)                                     |  🔧 | 🟡 🛠️ 🟣  |
| [`prefer-stylelint-report-descriptionless-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-descriptionless-disables) |  🔧 | 🟡 🛠️ 🟣  |
| [`prefer-stylelint-report-invalid-scope-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-invalid-scope-disables)     |  🔧 | 🟡 🛠️ 🟣  |
| [`prefer-stylelint-report-needless-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-needless-disables)               |  🔧 | 🟡 🛠️ 🟣  |
| [`prefer-stylelint-report-unscoped-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-unscoped-disables)               |  🔧 | 🟡 🛠️ 🟣  |
