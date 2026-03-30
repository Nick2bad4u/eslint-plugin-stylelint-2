# configuration

Enable only the Stylelint configuration-authoring workflow.

Use this preset when you want to lint `stylelint.config.*` and `.stylelintrc.*` files for config hygiene, but you do **not** want the stylesheet bridge, source CSS linting, or Stylelint autofix bridging enabled in the same preset.

## Flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [
    stylelint2.configs.configuration,
];
```

> Legacy alias: `stylelint2.configs.configs` remains supported for backwards compatibility.

## What this preset includes

- `stylelint-2/disallow-stylelint-cache`
- `stylelint-2/disallow-stylelint-default-severity`
- `stylelint-2/disallow-stylelint-fix`
- `stylelint-2/disallow-stylelint-formatter`
- `stylelint-2/disallow-stylelint-ignore-disables`
- `stylelint-2/disallow-stylelint-ignore-files`
- `stylelint-2/prefer-stylelint-define-config`
- `stylelint-2/prefer-stylelint-report-descriptionless-disables`
- `stylelint-2/prefer-stylelint-report-invalid-scope-disables`
- `stylelint-2/prefer-stylelint-report-needless-disables`
- `stylelint-2/prefer-stylelint-report-unscoped-disables`

## What this preset does not include

- No CSS `stylelint-2/stylelint` bridge rule
- No stylesheet linting for `**/*.css`
- No Stylelint autofix bridge for source CSS files

## Related preset docs

- [Presets overview](./index.md)
- [Recommended preset](./recommended.md)
- [Stylelint-only preset](./stylelint-only.md)
- [All preset](./all.md)

## Rules in this preset

| Rule                                                                                                                                                                     | Fix |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-: |
| [`disallow-stylelint-cache`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-cache)                                                 |  🔧 |
| [`disallow-stylelint-default-severity`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-default-severity)                           |  🔧 |
| [`disallow-stylelint-fix`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-fix)                                                     |  🔧 |
| [`disallow-stylelint-formatter`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-formatter)                                         |  🔧 |
| [`disallow-stylelint-ignore-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-ignore-disables)                             |  🔧 |
| [`disallow-stylelint-ignore-files`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-ignore-files)                                   |  🔧 |
| [`prefer-stylelint-define-config`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-define-config)                                     |  🔧 |
| [`prefer-stylelint-report-descriptionless-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-descriptionless-disables) |  🔧 |
| [`prefer-stylelint-report-invalid-scope-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-invalid-scope-disables)     |  🔧 |
| [`prefer-stylelint-report-needless-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-needless-disables)               |  🔧 |
| [`prefer-stylelint-report-unscoped-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-unscoped-disables)               |  🔧 |
