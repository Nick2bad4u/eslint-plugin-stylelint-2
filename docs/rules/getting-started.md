---
title: Getting Started
description: Enable eslint-plugin-stylelint-2 quickly in Flat Config.
---

# Getting Started

Install the plugin and Stylelint:

```bash
npm install --save-dev eslint-plugin-stylelint-2 eslint stylelint
```

Then enable the recommended preset:

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [
    ...stylelint2.configs.recommended,
];
```

## What `recommended` includes

`recommended` returns an array of flat config entries, not a single object.

It currently adds:

1. a CSS-targeted config that enables `stylelint-2/stylelint`
2. a config-file-targeted config that enables the Stylelint config authoring rules

## Stylelint bridge only

If you only want the Stylelint bridge for stylesheet files:

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [
    stylelint2.configs.stylelintOnly,
];
```

## Stylelint config files only

If you only want the config-authoring rules and no stylesheet bridge:

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [
    stylelint2.configs.configuration,
];
```

Legacy aliases remain supported:

- `stylelint2.configs.stylesheets` → `stylelint2.configs.stylelintOnly`
- `stylelint2.configs.configs` → `stylelint2.configs.configuration`

That preset currently enables:

- `stylelint-2/disallow-stylelint-allow-empty-input`
- `stylelint-2/disallow-stylelint-cache`
- `stylelint-2/disallow-stylelint-configuration-comment`
- `stylelint-2/disallow-stylelint-custom-syntax`
- `stylelint-2/disallow-stylelint-default-severity`
- `stylelint-2/disallow-stylelint-duplicate-extends`
- `stylelint-2/disallow-stylelint-duplicate-plugins`
- `stylelint-2/disallow-stylelint-duplicate-rule-option-values`
- `stylelint-2/disallow-stylelint-empty-rules-object`
- `stylelint-2/disallow-stylelint-fix`
- `stylelint-2/disallow-stylelint-formatter`
- `stylelint-2/disallow-stylelint-ignore-disables`
- `stylelint-2/disallow-stylelint-ignore-files`
- `stylelint-2/disallow-stylelint-null-rule-config`
- `stylelint-2/disallow-stylelint-processors`
- `stylelint-2/disallow-stylelint-relative-extends-paths`
- `stylelint-2/disallow-stylelint-relative-plugin-paths`
- `stylelint-2/prefer-stylelint-define-config`
- `stylelint-2/prefer-stylelint-extends-array`
- `stylelint-2/prefer-stylelint-plugins-array`
- `stylelint-2/prefer-stylelint-report-descriptionless-disables`
- `stylelint-2/prefer-stylelint-report-invalid-scope-disables`
- `stylelint-2/prefer-stylelint-report-needless-disables`
- `stylelint-2/prefer-stylelint-report-unscoped-disables`
- `stylelint-2/require-stylelint-custom-syntax-in-overrides`
- `stylelint-2/require-stylelint-config-file-naming-convention`
- `stylelint-2/require-stylelint-extends-packages-installed`
- `stylelint-2/require-stylelint-overrides-files`
- `stylelint-2/require-stylelint-plugins-packages-installed`
- `stylelint-2/require-stylelint-report-disables`
- `stylelint-2/require-stylelint-rules-object`
- `stylelint-2/sort-stylelint-extends`
- `stylelint-2/sort-stylelint-plugins`
- `stylelint-2/sort-stylelint-rule-keys`

## Adding Stylelint options

Pass rule options when you need a custom syntax or an explicit config file:

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [
    {
        ...stylelint2.configs.stylelintOnly,
        rules: {
            "stylelint-2/stylelint": [
                "error",
                {
                    configFile: "./stylelint.config.mjs",
                    customSyntax: "postcss-scss",
                    ignoreDisables: true,
                },
            ],
        },
    },
];
```

## When to use ESLint + Stylelint together

Use this plugin when you want ESLint to be the single command that reports and fixes both JavaScript/TypeScript issues and stylesheet issues.

If your team already runs Stylelint separately and is happy with that split, this plugin may be unnecessary overhead.
