import nickTwoBadFourU from "eslint-config-nick2bad4u";

import plugin from "./plugin.mjs";

/** @type {import("./src/plugin").Stylelint2Plugin} */
const stylelint2 = /** @type {import("./src/plugin").Stylelint2Plugin} */ (
    plugin
);

/**
 * Distinguish a single flat config from a preset config array.
 *
 * @param {import("./src/plugin").Stylelint2Config} candidate Preset value.
 *
 * @returns {candidate is import("eslint").Linter.Config} Whether the value is a
 *   single config.
 */
const isSingleFlatConfig = (candidate) => !Array.isArray(candidate);

const stylelintConfigurationPreset = stylelint2.configs.configuration;

if (!isSingleFlatConfig(stylelintConfigurationPreset)) {
    throw new TypeError(
        "stylelint2.configs.configuration must be a single flat config."
    );
}

/** @type {import("eslint").Linter.Config[]} */
const config = [
    ...nickTwoBadFourU.configs.withoutStylelint2,

    {
        ignores: [
            "benchmark/**",
            "benchmarks/**",
            "**/*.css",
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
        rules: {
            ...stylelintConfigurationPreset.rules,
        },
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
        files: [".github/hooks/hooks.json"],
        name: "GitHub Copilot Hook Schema Compatibility",
        rules: {
            // This is a GitHub Copilot repository-hooks document, not a Codex
            // hooks document. The upstream Codex plugin currently classifies
            // every hooks/hooks.json path as Codex configuration.
            "codex/no-ignored-hook-matcher": "off",
            "codex/no-mixed-hook-representations": "off",
            "codex/no-unsupported-hook-handler": "off",
            "codex/require-valid-hook-events": "off",
            "codex/require-valid-hook-structure": "off",
        },
    },
    {
        files: ["docs/docusaurus/sidebars.ts"],
        name: "Generated TypeDoc Sidebar Compatibility",
        rules: {
            // TypeDoc emits a CommonJS sidebar at build time. Docusaurus loads
            // sidebar configuration synchronously, so createRequire is the
            // supported bridge for this generated artifact.
            "import-x/extensions": "off",
            "import-x/no-commonjs": "off",
        },
    },
    {
        files: ["docs/docusaurus/site-docs/**/*.md", "docs/rules/**/*.md"],
        name: "Docusaurus Frontmatter Heading Compatibility",
        rules: {
            // Docusaurus frontmatter titles are counted as headings by the
            // Markdown parser, while remark correctly requires an authored H1.
            "markdown/no-multiple-h1": "off",
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
            "unicorn/prefer-observer-apis": "off",
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
            "import-x/no-cycle": "error",
            "n/no-process-env": "off",
            // ESLint visitor functions are named after case-sensitive AST node
            // types such as ExportDefaultDeclaration and StyleSheet.
            "sonarjs/function-name": [
                "warn",
                { format: "^[_a-zA-Z][a-zA-Z0-9]*$" },
            ],
            "unicorn/import-style": "off",
            "unicorn/no-break-in-nested-loop": "off",
            "unicorn/no-error-property-assignment": "off",
            "unicorn/no-top-level-assignment-in-function": "off",
            "unicorn/prefer-error-is-error": "off",
            "unicorn/prefer-includes-over-repeated-comparisons": "off",
            "unicorn/prefer-number-coercion": "off",
            "unicorn/try-complexity": "off",
        },
    },
    {
        files: ["src/rules/**/*.{ts,mts,cts,tsx}"],
        name: "Rule Export Naming Compatibility",
        rules: {
            // The shared ordering predates ESLint's meta.languages property.
            // Keep the existing sequence and place languages before type so
            // meta ordering and natural object sorting agree.
            "eslint-plugin/meta-property-ordering": [
                "error",
                [
                    "defaultOptions",
                    "deprecated",
                    "docs",
                    "fixable",
                    "hasSuggestions",
                    "languages",
                    "messages",
                    "replacedBy",
                    "schema",
                    "type",
                ],
            ],
            "unicorn/consistent-boolean-name": "off",
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
