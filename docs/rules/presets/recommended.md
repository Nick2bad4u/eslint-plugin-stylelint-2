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

| Rule                                                                                                                               | Fix |
| ---------------------------------------------------------------------------------------------------------------------------------- | :-: |
| [`stylelint`](https://nick2bad4u.github.io/eslint-plugin-stylelint/docs/rules/stylelint)                                           |  🔧 |
| [`prefer-stylelint-define-config`](https://nick2bad4u.github.io/eslint-plugin-stylelint/docs/rules/prefer-stylelint-define-config) |  🔧 |
