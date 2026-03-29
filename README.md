# eslint-plugin-stylelint-2

`eslint-plugin-stylelint-2` brings Stylelint reporting and autofix support into ESLint while also adding Stylelint-specific authoring rules for Stylelint config files.

This package exists as `eslint-plugin-stylelint-2` on npm because `eslint-plugin-stylelint` is already taken.

## Installation

```sh
npm install --save-dev eslint-plugin-stylelint-2 eslint stylelint
```

### Compatibility

- **Supported ESLint versions:** `9.x` and `10.x`
- **Config system:** Flat Config only (`eslint.config.*`)
- **Node.js runtime:** `>=22.0.0`

## Quick start

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [
    ...stylelint2.configs.recommended,
];
```

## Presets

| Preset                           | Purpose                                                            |
| -------------------------------- | ------------------------------------------------------------------ |
| `stylelint2.configs.recommended` | Enable stylesheet linting plus Stylelint config authoring guidance |
| `stylelint2.configs.stylesheets` | Enable only the Stylelint bridge rule for CSS files                |
| `stylelint2.configs.configs`     | Enable only the Stylelint config authoring rule                    |
| `stylelint2.configs.all`         | Currently the same as `recommended`                                |

## Configuration examples

### Recommended

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [
    ...stylelint2.configs.recommended,
];
```

### Stylesheets only

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [
    stylelint2.configs.stylesheets,
];
```

### Stylelint config files only

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [
    stylelint2.configs.configs,
];
```

### Passing Stylelint options

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

## Rules

- `Fix` legend:
  - `🔧` = autofixable
  - `—` = report only
- `Preset key` legend:
  - `🟡` = `stylelint2.configs.recommended`
  - `🎨` = `stylelint2.configs.stylesheets`
  - `🛠️` = `stylelint2.configs.configs`
  - `🟣` = `stylelint2.configs.all`

| Rule                                                                                                                               | Fix | Preset key |
| ---------------------------------------------------------------------------------------------------------------------------------- | :-: | :--------- |
| [`stylelint`](https://nick2bad4u.github.io/eslint-plugin-stylelint/docs/rules/stylelint)                                           |  🔧 | 🟡 🎨 🟣   |
| [`prefer-stylelint-define-config`](https://nick2bad4u.github.io/eslint-plugin-stylelint/docs/rules/prefer-stylelint-define-config) |  🔧 | 🟡 🛠️ 🟣  |

## Why use this plugin?

Use this plugin when you want ESLint to become the single command and editor integration that reports:

- JavaScript and TypeScript issues
- CSS issues from Stylelint
- Stylelint config authoring issues

If your team prefers running Stylelint separately, this package may be unnecessary.

## Documentation

- [Overview](./docs/rules/overview.md)
- [Getting started](./docs/rules/getting-started.md)
- [Presets](./docs/rules/presets/index.md)
- [Rule docs](./docs/rules/stylelint.md)

## Contributors ✨

See [CONTRIBUTORS.md](./CONTRIBUTORS.md).
