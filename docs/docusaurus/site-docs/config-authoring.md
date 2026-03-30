---
title: Config authoring
description: Author Stylelint config files with eslint-plugin-stylelint-2.
---

# Config authoring

The config-focused rules in this plugin help keep Stylelint config files explicit and reviewable.

## Current config rules

- [`disallow-stylelint-allow-empty-input`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-allow-empty-input)
- [`disallow-stylelint-cache`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-cache)
- [`disallow-stylelint-configuration-comment`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-configuration-comment)
- [`disallow-stylelint-custom-syntax`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-custom-syntax)
- [`disallow-stylelint-default-severity`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-default-severity)
- [`disallow-stylelint-duplicate-extends`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-duplicate-extends)
- [`disallow-stylelint-duplicate-plugins`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-duplicate-plugins)
- [`disallow-stylelint-duplicate-rule-option-values`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-duplicate-rule-option-values)
- [`disallow-stylelint-empty-rules-object`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-empty-rules-object)
- [`disallow-stylelint-fix`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-fix)
- [`disallow-stylelint-formatter`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-formatter)
- [`disallow-stylelint-ignore-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-ignore-disables)
- [`disallow-stylelint-ignore-files`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-ignore-files)
- [`disallow-stylelint-null-rule-config`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-null-rule-config)
- [`disallow-stylelint-processors`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-processors)
- [`disallow-stylelint-relative-extends-paths`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-relative-extends-paths)
- [`disallow-stylelint-relative-plugin-paths`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-relative-plugin-paths)
- [`prefer-stylelint-define-config`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-define-config)
- [`prefer-stylelint-extends-array`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-extends-array)
- [`prefer-stylelint-plugins-array`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-plugins-array)
- [`prefer-stylelint-report-descriptionless-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-descriptionless-disables)
- [`prefer-stylelint-report-invalid-scope-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-invalid-scope-disables)
- [`prefer-stylelint-report-needless-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-needless-disables)
- [`prefer-stylelint-report-unscoped-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-unscoped-disables)
- [`require-stylelint-config-file-naming-convention`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/require-stylelint-config-file-naming-convention)
- [`require-stylelint-custom-syntax-in-overrides`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/require-stylelint-custom-syntax-in-overrides)
- [`require-stylelint-extends-packages-installed`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/require-stylelint-extends-packages-installed)
- [`require-stylelint-overrides-files`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/require-stylelint-overrides-files)
- [`require-stylelint-plugins-packages-installed`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/require-stylelint-plugins-packages-installed)
- [`require-stylelint-report-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/require-stylelint-report-disables)
- [`require-stylelint-rules-object`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/require-stylelint-rules-object)
- [`sort-stylelint-extends`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/sort-stylelint-extends)
- [`sort-stylelint-plugins`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/sort-stylelint-plugins)
- [`sort-stylelint-rule-keys`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/sort-stylelint-rule-keys)

## What they enforce

- wrap direct config object exports in `defineConfig(...)`
- keep formatter, cache/fix runtime switches, allow-empty-input, global/default-scope switches, and config-level ignore globs out of shared config files
- enforce deterministic shared-config composition with array forms, duplicate checks, relative-path guards, stable ordering for `extends`/`plugins`, and explicit non-null/sorted `rules` object policy
- require explicit override file globs and explicit top-level rules-object shape for predictable config review
- enable Stylelint's built-in reporting for disable comments that omit a reason
- enable the broader built-in Stylelint reports that catch stale, invalid, and unscoped disable comments

## Rule reference

Use the rule pages for exact fixer behavior, examples, and adoption guidance:

- [disallow-stylelint-cache](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-cache)
- [disallow-stylelint-allow-empty-input](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-allow-empty-input)
- [disallow-stylelint-configuration-comment](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-configuration-comment)
- [disallow-stylelint-custom-syntax](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-custom-syntax)
- [disallow-stylelint-formatter](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-formatter)
- [disallow-stylelint-ignore-disables](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-ignore-disables)
- [disallow-stylelint-default-severity](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-default-severity)
- [disallow-stylelint-fix](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-fix)
- [disallow-stylelint-ignore-files](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-ignore-files)
- [disallow-stylelint-empty-rules-object](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-empty-rules-object)
- [disallow-stylelint-processors](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-processors)
- [disallow-stylelint-duplicate-extends](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-duplicate-extends)
- [disallow-stylelint-duplicate-plugins](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-duplicate-plugins)
- [disallow-stylelint-duplicate-rule-option-values](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-duplicate-rule-option-values)
- [disallow-stylelint-relative-extends-paths](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-relative-extends-paths)
- [disallow-stylelint-relative-plugin-paths](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-relative-plugin-paths)
- [disallow-stylelint-null-rule-config](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-null-rule-config)
- [prefer-stylelint-extends-array](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-extends-array)
- [prefer-stylelint-plugins-array](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-plugins-array)
- [sort-stylelint-extends](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/sort-stylelint-extends)
- [sort-stylelint-plugins](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/sort-stylelint-plugins)
- [sort-stylelint-rule-keys](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/sort-stylelint-rule-keys)
- [require-stylelint-config-file-naming-convention](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/require-stylelint-config-file-naming-convention)
- [require-stylelint-custom-syntax-in-overrides](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/require-stylelint-custom-syntax-in-overrides)
- [require-stylelint-extends-packages-installed](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/require-stylelint-extends-packages-installed)
- [require-stylelint-report-disables](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/require-stylelint-report-disables)
- [require-stylelint-plugins-packages-installed](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/require-stylelint-plugins-packages-installed)
- [require-stylelint-overrides-files](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/require-stylelint-overrides-files)
- [require-stylelint-rules-object](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/require-stylelint-rules-object)
- [prefer-stylelint-define-config](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-define-config)
- [prefer-stylelint-report-descriptionless-disables](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-descriptionless-disables)
- [prefer-stylelint-report-invalid-scope-disables](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-invalid-scope-disables)
- [prefer-stylelint-report-needless-disables](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-needless-disables)
- [prefer-stylelint-report-unscoped-disables](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-unscoped-disables)

These rules focus on setup quality rather than stylesheet content.

## Why config rules matter

Stylelint config files tend to become shared infrastructure files. Small hygiene rules here pay off because they affect every stylesheet lint run in the repository.

## Current scope limits

These rules intentionally focus on common exported object patterns first. They do not try to rewrite every possible config factory shape.
