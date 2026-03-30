---
title: Overview
description: Overview of eslint-plugin-stylelint-2.
---

# eslint-plugin-stylelint-2

`eslint-plugin-stylelint-2` helps teams keep ESLint as the single lint command for both code and stylesheets.

It currently focuses on three workflows:

- run Stylelint through ESLint for CSS files
- standardize `defineConfig()` usage in Stylelint config files
- enforce config hygiene for Stylelint disable-comment reporting

## Start here

- Read [Getting Started](./getting-started.md) for the quickest setup path.
- Read [Stylelint bridge](./stylelint-bridge.md) to understand how the runtime integration works.
- Read [Config authoring](./config-authoring.md) if your team wants stricter Stylelint config hygiene.

## Why this plugin exists

Projects that already use ESLint as the single editor and CI lint entrypoint often still keep stylesheet linting in a separate Stylelint command.

This plugin reduces that split by exposing Stylelint diagnostics through ESLint while still letting Stylelint remain the source of truth for stylesheet rules.

## Current rule families

- **Bridge rule** — `stylelint`
- **Config authoring rules** — `disallow-stylelint-allow-empty-input`, `disallow-stylelint-cache`, `disallow-stylelint-configuration-comment`, `disallow-stylelint-custom-syntax`, `disallow-stylelint-default-severity`, `disallow-stylelint-duplicate-extends`, `disallow-stylelint-duplicate-plugins`, `disallow-stylelint-duplicate-rule-option-values`, `disallow-stylelint-empty-rules-object`, `disallow-stylelint-fix`, `disallow-stylelint-formatter`, `disallow-stylelint-ignore-disables`, `disallow-stylelint-ignore-files`, `disallow-stylelint-null-rule-config`, `disallow-stylelint-processors`, `disallow-stylelint-relative-extends-paths`, `disallow-stylelint-relative-plugin-paths`, `prefer-stylelint-define-config`, `prefer-stylelint-extends-array`, `prefer-stylelint-plugins-array`, `prefer-stylelint-report-descriptionless-disables`, `prefer-stylelint-report-invalid-scope-disables`, `prefer-stylelint-report-needless-disables`, `prefer-stylelint-report-unscoped-disables`, `require-stylelint-config-file-naming-convention`, `require-stylelint-custom-syntax-in-overrides`, `require-stylelint-extends-packages-installed`, `require-stylelint-overrides-files`, `require-stylelint-plugins-packages-installed`, `require-stylelint-report-disables`, `require-stylelint-rules-object`, `sort-stylelint-extends`, `sort-stylelint-plugins`, `sort-stylelint-rule-keys`

## Recommended adoption order

1. Start with `stylelint2.configs.stylelintOnly` if you only want the bridge.
2. Move to `stylelint2.configs.recommended` when you also want config hygiene.
3. Tune Stylelint itself before adding more plugin-side config rules.
