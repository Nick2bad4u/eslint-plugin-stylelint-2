# disallow-stylelint-cache

Disallow configuring Stylelint's top-level `cache` option inside authored Stylelint config files.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

This rule reports Stylelint config objects that include a top-level `cache` property.

## Why this rule exists

`cache` is an execution policy decision. In shared configs, it can introduce environment-dependent behavior and stale diagnostics when different runners, editors, or CI jobs resolve cache state differently.

Cache strategy is typically clearer and safer when configured at invocation level (`--cache`, task runner flags, CI profiles), not embedded in shared lint rule configuration.

## ❌ Incorrect

```ts
export default {
    cache: true,
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

- This rule removes the top-level `cache` property.
- It preserves the rest of the config object.
- Configure caching in scripts or CI profiles where cache strategy can vary by environment.

## Additional examples

### ✅ Correct — cache policy at invocation level

```json
{
    "scripts": {
        "lint:stylelint": "stylelint --cache \"src/**/*.{css,scss}\""
    }
}
```

## ESLint flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [stylelint2.configs.configuration];
```

## When not to use it

Do not use this rule if your team intentionally enforces one shared Stylelint caching policy in committed config and accepts the operational coupling.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R012

## Further reading

- [Stylelint configuring guide](https://stylelint.io/user-guide/configure/#cache)
- [Stylelint cache option](https://stylelint.io/user-guide/options/#cache)
