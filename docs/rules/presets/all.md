# all

`all` currently matches `recommended`.

It exists as the future-proof "everything shipped by this plugin" preset.

## Flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [
    ...stylelint2.configs.all,
];
```

## Rules in this preset

| Rule                                                                                                                                                                   | Fix |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-: |
| [`stylelint`](https://nick2bad4u.github.io/eslint-plugin-stylelint/docs/rules/stylelint)                                                                               |  🔧 |
| [`disallow-stylelint-formatter`](https://nick2bad4u.github.io/eslint-plugin-stylelint/docs/rules/disallow-stylelint-formatter)                                         |  🔧 |
| [`disallow-stylelint-ignore-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint/docs/rules/disallow-stylelint-ignore-disables)                             |  🔧 |
| [`prefer-stylelint-define-config`](https://nick2bad4u.github.io/eslint-plugin-stylelint/docs/rules/prefer-stylelint-define-config)                                     |  🔧 |
| [`prefer-stylelint-report-descriptionless-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint/docs/rules/prefer-stylelint-report-descriptionless-disables) |  🔧 |
| [`prefer-stylelint-report-invalid-scope-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint/docs/rules/prefer-stylelint-report-invalid-scope-disables)     |  🔧 |
| [`prefer-stylelint-report-needless-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint/docs/rules/prefer-stylelint-report-needless-disables)               |  🔧 |
| [`prefer-stylelint-report-unscoped-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint/docs/rules/prefer-stylelint-report-unscoped-disables)               |  🔧 |
