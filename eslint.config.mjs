import nickTwoBadFourU from "eslint-config-nick2bad4u";

import plugin from "./plugin.mjs";

/** @type {import("./src/plugin").Stylelint2Plugin} */
const stylelint2 = /** @type {import("./src/plugin").Stylelint2Plugin} */ (
    plugin
);

/** @type {import("eslint").Linter.Config[]} */
const config = [
    ...nickTwoBadFourU.configs.withoutStylelint2,

    {
        ignores: [
            "benchmark/**",
            "benchmarks/**",
            "docs/docusaurus/typedoc-plugins/**",
            "knip.config.ts",
            "plugin.d.cts",
            "plugin.d.mts",
            "untyped-third-party-modules.d.ts",
            "vitest.stryker.config.ts",
        ],
        name: "Non-Project Tooling Ignores",
    },
    {
        name: "Repository Type Import Compatibility",
        rules: {
            "no-duplicate-imports": [
                "error",
                { allowSeparateTypeImports: true },
            ],
        },
    },

    // Local Plugin Config
    // This lets us use the plugin's rules in this repository without needing to publish the plugin first.
    {
        files: ["src/**/*.{js,mjs,cjs,ts,mts,cts,tsx,jsx}"],
        name: "Local Stylelint",
        plugins: {
            "stylelint-2": stylelint2,
        },
        /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- plugin config arrays are runtime-validated ESLint rule maps. */
        rules: {
            // @ts-expect-error -- plugin.mjs is typed as generic ESLint.Plugin.
            ...stylelint2.configs.all[0].rules,
            // @ts-expect-error -- plugin.mjs is typed as generic ESLint.Plugin.
            ...stylelint2.configs.all[1].rules,
        },
        /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- end local override for plugin rule map spreads. */
    },
    {
        files: [
            "benchmark/**/*.{js,mjs,cjs,ts,mts,cts,tsx,jsx}",
            "benchmarks/**/*.{js,mjs,cjs,ts,mts,cts,tsx,jsx}",
        ],
        name: "Benchmarks: relax vitest assertion-count rule",
        rules: {
            // Benchmark callbacks measure runtime cost and do not always
            // represent assertion-driven correctness tests.
            "vitest/prefer-expect-assertions": "off",
        },
    },
    {
        files: [
            "docs/docusaurus/docusaurus.config.ts",
            "docs/docusaurus/sidebars.rules.ts",
            "docs/docusaurus/sidebars.ts",
        ],
        name: "Docusaurus Build Config Relaxations",
        rules: {
            "@typescript-eslint/no-unused-vars": [
                "error",
                { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
            ],
            "n/no-process-env": "off",
            "n/no-sync": "off",
            "prefer-named-capture-group": "off",
            "regexp/prefer-named-capture-group": "off",
            "regexp/require-unicode-sets-regexp": "off",
            "security/detect-non-literal-fs-filename": "off",
            "security/detect-non-literal-regexp": "off",
            "unicorn/no-array-sort": "off",
            "unicorn/no-non-function-verb-prefix": "off",
            "unicorn/no-unreadable-new-expression": "off",
            "unicorn/prefer-else-if": "off",
            "unicorn/prefer-import-meta-properties": "off",
            "unicorn/prefer-temporal": "off",
        },
    },
    {
        files: ["docs/docusaurus/src/**/*.{ts,tsx}"],
        name: "Docusaurus Client Runtime Relaxations",
        rules: {
            "@typescript-eslint/no-dynamic-delete": "off",
            "canonical/filename-no-index": "off",
            "prefer-named-capture-group": "off",
            "regexp/no-super-linear-backtracking": "off",
            "regexp/prefer-named-capture-group": "off",
            "regexp/require-unicode-sets-regexp": "off",
            "runtime-cleanup/no-unmanaged-event-listeners": "off",
            "unicorn/filename-case": "off",
            "unicorn/no-global-object-property-assignment": "off",
            "unicorn/no-unnecessary-global-this": "off",
            "unicorn/prefer-global-this": "off",
            "unicorn/prefer-single-call": "off",
        },
    },
    {
        files: ["docs/docusaurus/src/**/*.{ts,tsx}"],
        name: "Docusaurus Theme Compatibility",
        rules: {
            "@typescript-eslint/restrict-template-expressions": "off",
            "n/no-extraneous-import": "off",
        },
    },
    {
        files: ["src/**/*.{ts,mts,cts,tsx}"],
        name: "Source Compatibility Relaxations",
        rules: {
            "n/no-process-env": "off",
            "unicorn/import-style": "off",
            "unicorn/no-break-in-nested-loop": "off",
            "unicorn/no-error-property-assignment": "off",
            "unicorn/no-top-level-assignment-in-function": "off",
            "unicorn/prefer-includes-over-repeated-comparisons": "off",
            "unicorn/prefer-number-coercion": "off",
            "unicorn/try-complexity": "off",
        },
    },
    {
        files: ["src/_internal/rules-registry.ts"],
        name: "Rule Registry Fan-In",
        rules: {
            "import-x/max-dependencies": "off",
        },
    },
    {
        files: ["test/**/*.{ts,tsx,mts,cts}"],
        name: "Vitest Harness Relaxations",
        rules: {
            "n/no-process-env": "off",
            "test-signal/no-tautological-length-assertions": "off",
            "test-signal/no-weak-existence-assertions": "off",
            "test-signal/require-negative-path": "off",
            "unicorn/consistent-boolean-name": "off",
            "unicorn/no-break-in-nested-loop": "off",
            "unicorn/no-top-level-side-effects": "off",
            "unicorn/no-unreadable-new-expression": "off",
            "unicorn/prefer-number-coercion": "off",
        },
    },
    {
        files: ["stryker.config.mjs", "vite.config.ts"],
        name: "Tooling Config Relaxations",
        rules: {
            "@typescript-eslint/dot-notation": "off",
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-unsafe-call": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
            "unicorn/prefer-number-coercion": "off",
        },
    },
    // Add repository-specific config entries below as needed.
];

export default config;
