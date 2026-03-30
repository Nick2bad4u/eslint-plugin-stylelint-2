# disallow-stylelint-fix

Disallow configuring Stylelint's top-level `fix` option inside authored Stylelint config files.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

This rule reports Stylelint config objects that include a top-level `fix` property.

## Why this rule exists

`fix` is an execution-time behavior. In an ESLint-first workflow, autofix should be controlled by ESLint's `--fix` flow or task-level invocation settings.

Setting `fix` in shared Stylelint config files can create surprising behavior differences between editor runs, CI runs, and local command invocations.

## ❌ Incorrect

```ts
export default {
    fix: true,
    rules: {},
};
```

## ✅ Correct

```ts
export default {
    rules: {},
};
```

## Behavior and migration notes

- This rule removes the top-level `fix` property.
- It preserves the rest of the config object.
- Configure autofix at execution time (`eslint --fix` or Stylelint CLI options), not in shared config state.

## Additional examples

### ✅ Correct — execution controls autofix

```json
{
    "scripts": {
        "lint:styles": "eslint --fix \"src/**/*.{css,scss}\""
    }
}
```

## ESLint flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [stylelint2.configs.configuration];
```

## When not to use it

Do not use this rule if your team intentionally keeps Stylelint autofix policy in shared Stylelint config and accepts that runtime coupling.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R011

## Further reading

- [Stylelint configuring guide](https://stylelint.io/user-guide/configure/#fix)
- [Stylelint autofix documentation](https://stylelint.io/user-guide/options/#fix)
