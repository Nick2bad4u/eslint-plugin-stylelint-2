---
title: Overview
description: Overview of eslint-plugin-stylelint-2 and its Stylelint-to-ESLint workflow.
---

# eslint-plugin-stylelint-2

`eslint-plugin-stylelint-2` lets you run Stylelint inside ESLint for CSS files and author Stylelint config files with a more predictable typed setup.

The current rule set focuses on three high-value workflows:

- surface Stylelint diagnostics through ESLint with autofix support
- disallow execution-only Stylelint config options that belong in the runner, not the shared config object
- disallow shared-config severity and file-ignore options that hide lint-policy changes globally
- standardize modern `stylelint-define-config` usage in Stylelint config modules
- require Stylelint config files to report disable comments that lack a reason
- require the full family of Stylelint disable-comment reporting safeguards in config files

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

| Preset                                                            | Purpose                                                       |
| ----------------------------------------------------------------- | ------------------------------------------------------------- |
| [`stylelint2.configs.recommended`](./presets/recommended.md)      | Stylesheet linting plus Stylelint config authoring guidance   |
| [`stylelint2.configs.stylelintOnly`](./presets/stylelint-only.md) | Only run the Stylelint bridge workflow for stylesheet files   |
| [`stylelint2.configs.configuration`](./presets/configuration.md)  | Only lint Stylelint config modules, with no stylesheet bridge |
| [`stylelint2.configs.all`](./presets/all.md)                      | Enable every preset entry currently shipped by this plugin    |

Legacy aliases remain supported:

- `stylelint2.configs.stylesheets` → `stylelint2.configs.stylelintOnly`
- `stylelint2.configs.configs` → `stylelint2.configs.configuration`

## Included rules

- [`stylelint`](./stylelint.md)
- [`disallow-stylelint-cache`](./disallow-stylelint-cache.md)
- [`disallow-stylelint-formatter`](./disallow-stylelint-formatter.md)
- [`disallow-stylelint-default-severity`](./disallow-stylelint-default-severity.md)
- [`disallow-stylelint-fix`](./disallow-stylelint-fix.md)
- [`disallow-stylelint-ignore-disables`](./disallow-stylelint-ignore-disables.md)
- [`disallow-stylelint-ignore-files`](./disallow-stylelint-ignore-files.md)
- [`prefer-stylelint-define-config`](./prefer-stylelint-define-config.md)
- [`prefer-stylelint-report-descriptionless-disables`](./prefer-stylelint-report-descriptionless-disables.md)
- [`prefer-stylelint-report-invalid-scope-disables`](./prefer-stylelint-report-invalid-scope-disables.md)
- [`prefer-stylelint-report-needless-disables`](./prefer-stylelint-report-needless-disables.md)
- [`prefer-stylelint-report-unscoped-disables`](./prefer-stylelint-report-unscoped-disables.md)

## Next steps

- Read [Getting Started](./getting-started.md) for copy-paste setup examples.
- Review [Presets](./presets/index.md) to pick the right rollout path.
- Open each rule page before enabling stricter adoption in a larger codebase.
