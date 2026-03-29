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
2. a config-file-targeted config that enables `stylelint-2/prefer-stylelint-define-config`

## Stylesheets only

If you only want the Stylelint bridge for `.css` files:

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [
    stylelint2.configs.stylesheets,
];
```

## Stylelint config files only

If you only want the config-authoring rule:

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [
    stylelint2.configs.configs,
];
```

## Adding Stylelint options

Pass rule options when you need a custom syntax or an explicit config file:

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [
    {
        ...stylelint2.configs.stylesheets,
        rules: {
            "stylelint-2/stylelint": [
                "error",
                {
                    configFile: "./stylelint.config.mjs",
                    customSyntax: "postcss-scss",
                },
            ],
        },
    },
];
```

## When to use ESLint + Stylelint together

Use this plugin when you want ESLint to be the single command that reports and fixes both JavaScript/TypeScript issues and stylesheet issues.

If your team already runs Stylelint separately and is happy with that split, this plugin may be unnecessary overhead.
