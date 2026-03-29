# recommended

Enable both major workflows in `eslint-plugin-stylelint-2`:

- run Stylelint from ESLint for CSS files
- standardize `defineConfig()` in Stylelint config files

## Flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [
    ...stylelint2.configs.recommended,
];
```

## Rules in this preset

| Rule                                                                                                                                                                     | Fix |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-: |
| [`stylelint`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/stylelint)                                                                               |  🔧 |
| [`disallow-stylelint-formatter`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-formatter)                                         |  🔧 |
| [`disallow-stylelint-ignore-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-ignore-disables)                             |  🔧 |
| [`prefer-stylelint-define-config`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-define-config)                                     |  🔧 |
| [`prefer-stylelint-report-descriptionless-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-descriptionless-disables) |  🔧 |
| [`prefer-stylelint-report-invalid-scope-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-invalid-scope-disables)     |  🔧 |
| [`prefer-stylelint-report-needless-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-needless-disables)               |  🔧 |
| [`prefer-stylelint-report-unscoped-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-unscoped-disables)               |  🔧 |
