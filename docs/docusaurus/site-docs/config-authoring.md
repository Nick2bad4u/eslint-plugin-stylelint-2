---
title: Config authoring
description: Author Stylelint config files with eslint-plugin-stylelint-2.
---

# Config authoring

The config-focused rules in this plugin help keep Stylelint config files explicit and reviewable.

## Current config rules

- [`disallow-stylelint-cache`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-cache)
- [`disallow-stylelint-default-severity`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-default-severity)
- [`disallow-stylelint-fix`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-fix)
- [`disallow-stylelint-formatter`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-formatter)
- [`disallow-stylelint-ignore-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-ignore-disables)
- [`disallow-stylelint-ignore-files`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-ignore-files)
- [`prefer-stylelint-define-config`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-define-config)
- [`prefer-stylelint-report-descriptionless-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-descriptionless-disables)
- [`prefer-stylelint-report-invalid-scope-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-invalid-scope-disables)
- [`prefer-stylelint-report-needless-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-needless-disables)
- [`prefer-stylelint-report-unscoped-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-unscoped-disables)

## What they enforce

- wrap direct config object exports in `defineConfig(...)`
- keep formatter, cache/fix runtime switches, global default severity, disable-bypass settings, and config-level ignore globs out of shared config files
- enable Stylelint's built-in reporting for disable comments that omit a reason
- enable the broader built-in Stylelint reports that catch stale, invalid, and unscoped disable comments

## Rule reference

Use the rule pages for exact fixer behavior, examples, and adoption guidance:

- [disallow-stylelint-cache](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-cache)
- [disallow-stylelint-formatter](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-formatter)
- [disallow-stylelint-ignore-disables](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-ignore-disables)
- [disallow-stylelint-default-severity](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-default-severity)
- [disallow-stylelint-fix](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-fix)
- [disallow-stylelint-ignore-files](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-ignore-files)
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
