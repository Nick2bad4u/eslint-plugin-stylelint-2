# configs

Enable only the Stylelint config authoring rule.

## Flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [
    stylelint2.configs.configs,
];
```

## Rules in this preset

| Rule                                                                                                                               | Fix |
| ---------------------------------------------------------------------------------------------------------------------------------- | :-: |
| [`prefer-stylelint-define-config`](https://nick2bad4u.github.io/eslint-plugin-stylelint/docs/rules/prefer-stylelint-define-config) |  🔧 |
