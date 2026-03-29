---
title: Overview
description: Overview of eslint-plugin-stylelint-2 and its Stylelint-to-ESLint workflow.
---

# eslint-plugin-stylelint-2

`eslint-plugin-stylelint-2` lets you run Stylelint inside ESLint for CSS files and author Stylelint config files with a more predictable typed setup.

The initial rule set focuses on two high-value workflows:

- surface Stylelint diagnostics through ESLint with autofix support
- standardize modern `stylelint-define-config` usage in Stylelint config modules

## Installation

```bash
npm install --save-dev eslint-plugin-stylelint-2 eslint stylelint
```

## Quick start

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [
    ...stylelint2.configs.recommended,
];
```

`recommended` expands to two file-scoped flat config entries:

- one for CSS files using ESLint's `css/css` language
- one for Stylelint config files such as `stylelint.config.ts`

## Included presets

| Preset                           | Purpose                                                     |
| -------------------------------- | ----------------------------------------------------------- |
| `stylelint2.configs.recommended` | Stylesheet linting plus Stylelint config authoring guidance |
| `stylelint2.configs.stylesheets` | Only run the Stylelint bridge rule on CSS files             |
| `stylelint2.configs.configs`     | Only lint Stylelint config modules                          |
| `stylelint2.configs.all`         | Currently the same as `recommended`                         |

## Included rules

- [`stylelint`](./stylelint.md)
- [`prefer-stylelint-define-config`](./prefer-stylelint-define-config.md)

## Next steps

- Read [Getting Started](./getting-started.md) for copy-paste setup examples.
- Review [Presets](./presets/index.md) to pick the right rollout path.
- Open each rule page before enabling stricter adoption in a larger codebase.
