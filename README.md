# eslint-plugin-stylelint-2

[![npm license.](https://flat.badgen.net/npm/license/eslint-plugin-stylelint-2?color=purple)](https://github.com/Nick2bad4u/eslint-plugin-stylelint-2/blob/main/LICENSE) [![npm total downloads.](https://flat.badgen.net/npm/dt/eslint-plugin-stylelint-2?color=pink)](https://www.npmjs.com/package/eslint-plugin-stylelint-2) [![latest GitHub release.](https://flat.badgen.net/github/release/Nick2bad4u/eslint-plugin-stylelint-2?color=cyan)](https://github.com/Nick2bad4u/eslint-plugin-stylelint-2/releases) [![GitHub stars.](https://flat.badgen.net/github/stars/Nick2bad4u/eslint-plugin-stylelint-2?color=yellow)](https://github.com/Nick2bad4u/eslint-plugin-stylelint-2/stargazers) [![GitHub forks.](https://flat.badgen.net/github/forks/Nick2bad4u/eslint-plugin-stylelint-2?color=green)](https://github.com/Nick2bad4u/eslint-plugin-stylelint-2/forks) [![GitHub open issues.](https://flat.badgen.net/github/open-issues/Nick2bad4u/eslint-plugin-stylelint-2?color=red)](https://github.com/Nick2bad4u/eslint-plugin-stylelint-2/issues) [![codecov.](https://flat.badgen.net/codecov/github/Nick2bad4u/eslint-plugin-stylelint-2?color=blue)](https://codecov.io/gh/Nick2bad4u/eslint-plugin-stylelint-2)

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

| Preset                                                                       | Purpose                                                                           |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| [`stylelint2.configs.recommended`](./docs/rules/presets/recommended.md)      | Enable stylesheet linting plus Stylelint config authoring guidance                |
| [`stylelint2.configs.stylelintOnly`](./docs/rules/presets/stylelint-only.md) | Enable only the Stylelint bridge workflow for stylesheets and ESLint-side autofix |
| [`stylelint2.configs.configuration`](./docs/rules/presets/configuration.md)  | Enable only the Stylelint config authoring rules, with no stylesheet bridge       |
| [`stylelint2.configs.all`](./docs/rules/presets/all.md)                      | Enable every preset entry currently shipped by this plugin                        |

Legacy aliases remain available:

- `stylelint2.configs.stylesheets` → `stylelint2.configs.stylelintOnly`
- `stylelint2.configs.configs` → `stylelint2.configs.configuration`

## Configuration examples

### Recommended

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [
    ...stylelint2.configs.recommended,
];
```

### Stylelint bridge only

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [
    stylelint2.configs.stylelintOnly,
];
```

### Configuration only

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [
    stylelint2.configs.configuration,
];
```

That preset currently enables:

- `stylelint-2/disallow-stylelint-formatter`
- `stylelint-2/disallow-stylelint-ignore-disables`
- `stylelint-2/prefer-stylelint-define-config`
- `stylelint-2/prefer-stylelint-report-descriptionless-disables`
- `stylelint-2/prefer-stylelint-report-invalid-scope-disables`
- `stylelint-2/prefer-stylelint-report-needless-disables`
- `stylelint-2/prefer-stylelint-report-unscoped-disables`

### Passing Stylelint options

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
                },
            ],
        },
    },
];
```

## Rules

Fix legend:

- `🔧` = autofixable
- `—` = report only

Preset key legend:

- [`🟡`](./docs/rules/presets/recommended.md) — [`stylelint2.configs.recommended`](./docs/rules/presets/recommended.md)
- [`🎨`](./docs/rules/presets/stylelint-only.md) — [`stylelint2.configs.stylelintOnly`](./docs/rules/presets/stylelint-only.md)
- [`🔧`](./docs/rules/presets/configuration.md) — [`stylelint2.configs.configuration`](./docs/rules/presets/configuration.md)
- [`🟣`](./docs/rules/presets/all.md) — [`stylelint2.configs.all`](./docs/rules/presets/all.md)

| Rule                                                                                                                                                                     | Fix | Preset key                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-: | :----------------------------------------------------------------------------------------------------------------------- |
| [`stylelint`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/stylelint)                                                                               |  🔧 | [🟡](./docs/rules/presets/recommended.md) [🎨](./docs/rules/presets/stylelint-only.md) [🟣](./docs/rules/presets/all.md) |
| [`disallow-stylelint-cache`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-cache)                                                 |  🔧 | [🟡](./docs/rules/presets/recommended.md) [🔧](./docs/rules/presets/configuration.md) [🟣](./docs/rules/presets/all.md)  |
| [`disallow-stylelint-default-severity`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-default-severity)                           |  🔧 | [🟡](./docs/rules/presets/recommended.md) [🔧](./docs/rules/presets/configuration.md) [🟣](./docs/rules/presets/all.md)  |
| [`disallow-stylelint-fix`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-fix)                                                     |  🔧 | [🟡](./docs/rules/presets/recommended.md) [🔧](./docs/rules/presets/configuration.md) [🟣](./docs/rules/presets/all.md)  |
| [`disallow-stylelint-formatter`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-formatter)                                         |  🔧 | [🟡](./docs/rules/presets/recommended.md) [🔧](./docs/rules/presets/configuration.md) [🟣](./docs/rules/presets/all.md)  |
| [`disallow-stylelint-ignore-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-ignore-disables)                             |  🔧 | [🟡](./docs/rules/presets/recommended.md) [🔧](./docs/rules/presets/configuration.md) [🟣](./docs/rules/presets/all.md)  |
| [`disallow-stylelint-ignore-files`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-ignore-files)                                   |  🔧 | [🟡](./docs/rules/presets/recommended.md) [🔧](./docs/rules/presets/configuration.md) [🟣](./docs/rules/presets/all.md)  |
| [`prefer-stylelint-define-config`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-define-config)                                     |  🔧 | [🟡](./docs/rules/presets/recommended.md) [🔧](./docs/rules/presets/configuration.md) [🟣](./docs/rules/presets/all.md)  |
| [`prefer-stylelint-report-descriptionless-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-descriptionless-disables) |  🔧 | [🟡](./docs/rules/presets/recommended.md) [🔧](./docs/rules/presets/configuration.md) [🟣](./docs/rules/presets/all.md)  |
| [`prefer-stylelint-report-invalid-scope-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-invalid-scope-disables)     |  🔧 | [🟡](./docs/rules/presets/recommended.md) [🔧](./docs/rules/presets/configuration.md) [🟣](./docs/rules/presets/all.md)  |
| [`prefer-stylelint-report-needless-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-needless-disables)               |  🔧 | [🟡](./docs/rules/presets/recommended.md) [🔧](./docs/rules/presets/configuration.md) [🟣](./docs/rules/presets/all.md)  |
| [`prefer-stylelint-report-unscoped-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-unscoped-disables)               |  🔧 | [🟡](./docs/rules/presets/recommended.md) [🔧](./docs/rules/presets/configuration.md) [🟣](./docs/rules/presets/all.md)  |

## Why use this plugin?

Use this plugin when you want ESLint to become the single command and editor integration that reports:

- JavaScript and TypeScript issues
- CSS issues from Stylelint
- Stylelint config authoring issues

This package is strongest when you want repo-level consistency around both stylesheet linting and Stylelint config hygiene.

If your team prefers running Stylelint separately, this package may be unnecessary.

## Documentation

- [Overview](./docs/rules/overview.md)
- [Getting started](./docs/rules/getting-started.md)
- [Presets](./docs/rules/presets/index.md)
- [stylelint rule docs](./docs/rules/stylelint.md)
- [disallow-stylelint-cache](./docs/rules/disallow-stylelint-cache.md)
- [disallow-stylelint-default-severity](./docs/rules/disallow-stylelint-default-severity.md)
- [disallow-stylelint-fix](./docs/rules/disallow-stylelint-fix.md)
- [disallow-stylelint-formatter](./docs/rules/disallow-stylelint-formatter.md)
- [disallow-stylelint-ignore-disables](./docs/rules/disallow-stylelint-ignore-disables.md)
- [disallow-stylelint-ignore-files](./docs/rules/disallow-stylelint-ignore-files.md)
- [prefer-stylelint-define-config](./docs/rules/prefer-stylelint-define-config.md)
- [prefer-stylelint-report-descriptionless-disables](./docs/rules/prefer-stylelint-report-descriptionless-disables.md)
- [prefer-stylelint-report-invalid-scope-disables](./docs/rules/prefer-stylelint-report-invalid-scope-disables.md)
- [prefer-stylelint-report-needless-disables](./docs/rules/prefer-stylelint-report-needless-disables.md)
- [prefer-stylelint-report-unscoped-disables](./docs/rules/prefer-stylelint-report-unscoped-disables.md)

## Contributors ✨

See [CONTRIBUTORS.md](./CONTRIBUTORS.md).
