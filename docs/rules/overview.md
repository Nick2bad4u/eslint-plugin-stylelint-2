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
- [`disallow-stylelint-allow-empty-input`](./disallow-stylelint-allow-empty-input.md)
- [`disallow-stylelint-cache`](./disallow-stylelint-cache.md)
- [`disallow-stylelint-configuration-comment`](./disallow-stylelint-configuration-comment.md)
- [`disallow-stylelint-custom-syntax`](./disallow-stylelint-custom-syntax.md)
- [`disallow-stylelint-default-severity`](./disallow-stylelint-default-severity.md)
- [`disallow-stylelint-duplicate-extends`](./disallow-stylelint-duplicate-extends.md)
- [`disallow-stylelint-duplicate-plugins`](./disallow-stylelint-duplicate-plugins.md)
- [`disallow-stylelint-duplicate-rule-option-values`](./disallow-stylelint-duplicate-rule-option-values.md)
- [`disallow-stylelint-empty-rules-object`](./disallow-stylelint-empty-rules-object.md)
- [`disallow-stylelint-fix`](./disallow-stylelint-fix.md)
- [`disallow-stylelint-formatter`](./disallow-stylelint-formatter.md)
- [`disallow-stylelint-ignore-disables`](./disallow-stylelint-ignore-disables.md)
- [`disallow-stylelint-ignore-files`](./disallow-stylelint-ignore-files.md)
- [`disallow-stylelint-null-rule-config`](./disallow-stylelint-null-rule-config.md)
- [`disallow-stylelint-overrides-runtime-options`](./disallow-stylelint-overrides-runtime-options.md)
- [`disallow-stylelint-processors`](./disallow-stylelint-processors.md)
- [`disallow-stylelint-relative-extends-paths`](./disallow-stylelint-relative-extends-paths.md)
- [`disallow-stylelint-relative-plugin-paths`](./disallow-stylelint-relative-plugin-paths.md)
- [`prefer-stylelint-define-config`](./prefer-stylelint-define-config.md)
- [`prefer-stylelint-extends-array`](./prefer-stylelint-extends-array.md)
- [`prefer-stylelint-plugins-array`](./prefer-stylelint-plugins-array.md)
- [`prefer-stylelint-report-descriptionless-disables`](./prefer-stylelint-report-descriptionless-disables.md)
- [`prefer-stylelint-report-invalid-scope-disables`](./prefer-stylelint-report-invalid-scope-disables.md)
- [`prefer-stylelint-report-needless-disables`](./prefer-stylelint-report-needless-disables.md)
- [`prefer-stylelint-report-unscoped-disables`](./prefer-stylelint-report-unscoped-disables.md)
- [`require-stylelint-custom-syntax-in-overrides`](./require-stylelint-custom-syntax-in-overrides.md)
- [`require-stylelint-config-file-naming-convention`](./require-stylelint-config-file-naming-convention.md)
- [`require-stylelint-extends-packages-installed`](./require-stylelint-extends-packages-installed.md)
- [`require-stylelint-overrides-configuration`](./require-stylelint-overrides-configuration.md)
- [`require-stylelint-overrides-files-array`](./require-stylelint-overrides-files-array.md)
- [`require-stylelint-overrides-files`](./require-stylelint-overrides-files.md)
- [`require-stylelint-plugins-packages-installed`](./require-stylelint-plugins-packages-installed.md)
- [`require-stylelint-report-disables`](./require-stylelint-report-disables.md)
- [`require-stylelint-rules-object`](./require-stylelint-rules-object.md)
- [`sort-stylelint-extends`](./sort-stylelint-extends.md)
- [`sort-stylelint-plugins`](./sort-stylelint-plugins.md)
- [`sort-stylelint-rule-keys`](./sort-stylelint-rule-keys.md)

## Next steps

- Read [Getting Started](./getting-started.md) for copy-paste setup examples.
- Review [Presets](./presets/index.md) to pick the right rollout path.
- Open each rule page before enabling stricter adoption in a larger codebase.
