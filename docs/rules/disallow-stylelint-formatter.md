# disallow-stylelint-formatter

Disallow configuring Stylelint's top-level `formatter` option inside authored Stylelint config files.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

This rule reports Stylelint config objects that include a top-level `formatter` property.

## Why this rule exists

`formatter` controls how Stylelint prints results. That is an execution concern, not a shareable config concern.

Putting `formatter` in the committed config object makes output behavior less predictable across editors, scripts, and CI environments.

## ❌ Incorrect

```ts
export default {
    formatter: "json",
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

- This rule removes the top-level `formatter` property.
- It preserves the rest of the config object.
- Formatter choice should move to the Stylelint CLI or Node API invocation site.

## Additional examples

### ✅ Correct — formatter belongs in the runner

```ts
await stylelint.lint({
    code,
    formatter: "string",
});
```

## ESLint flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [
    stylelint2.configs.configs,
];
```

## When not to use it

Do not use this rule if your team intentionally commits one formatter choice into the shared Stylelint config object and wants all environments to inherit it.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R007

## Further reading

- [Stylelint configuring guide](https://stylelint.io/user-guide/configure/#formatter)
- [Stylelint Node API](https://stylelint.io/user-guide/node-api/)
