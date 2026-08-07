/**
 * Repository-specific configuration for Knip dependency analysis.
 *
 * @packageDocumentation
 */
import type { KnipConfig } from "knip";

/**
 * Knip configuration that scopes entry points and dependency heuristics to the
 * repository layout.
 */
const knipConfig: KnipConfig = {
    $schema: "https://unpkg.com/knip@6/schema.json",
    ignoreBinaries: [
        // Installed as standalone system tools in local and CI environments.
        "actionlint",
        "detect-secrets",
        "gitleaks",
        "grype",
        // Knip 6 misclassifies its own `-c knip.config.ts` argument as a binary.
        "knip.config.ts",
        "lychee",
    ],
    ignoreDependencies: [
        // Internal theme name resolved by @easyops-cn/docusaurus-search-local.
        "@easyops-cn/docusaurus-theme-docusaurus-search-local",
        // React is referenced by the shared root tsconfig's JSX runtime option.
        "react",
        // Dependencies and plugins loaded by the shared Stylelint config.
        "@double-great/stylelint-a11y",
        "@stylistic/stylelint-plugin",
        "postcss.*",
        "stylelint.*",
        // Loaded by command-line tools through package paths or shared config files.
        "git-cliff",
        "gitcliff-config-nick2bad4u",
        "gitleaks-config-nick2bad4u",
        "jscpd-config-nick2bad4u",
        "lychee-config-nick2bad4u",
        "ncu-config-nick2bad4u",
        "tsdoc-config-nick2bad4u",
        "yamllint-config-nick2bad4u",
    ],
    ignoreExportsUsedInFile: {
        interface: true,
        type: true,
    },
    includeEntryExports: true,
    rules: {
        binaries: "error",
        catalog: "error",
        dependencies: "error",
        devDependencies: "error",
        duplicates: "error",
        enumMembers: "warn",
        exports: "warn",
        files: "error",
        namespaceMembers: "warn",
        nsExports: "warn",
        nsTypes: "warn",
        optionalPeerDependencies: "error",
        types: "warn",
        unlisted: "error",
        unresolved: "error",
    },
    workspaces: {
        ".": {
            entry: [
                ".secretlintrc.cjs",
                "benchmarks/fixtures/stylelint.config.invalid.ts",
                "scripts/bootstrap-eslint-repo.mjs",
                "scripts/create-eslint-plugin-project.mjs",
                "scripts/sync-presets-rules-matrix.d.mts",
                "scripts/sync-readme-rules-table.d.mts",
                "src/_internal/stylelint-worker.ts",
                "src/plugin.ts",
                "vitest.stryker.config.ts",
            ],
            eslint: {
                config: ["eslint.config.mjs"],
            },
            project: [
                "*.{js,mjs,cjs,ts,mts,cts}",
                "benchmarks/**/*.{js,mjs,cjs,ts,mts,cts}",
                "scripts/**/*.{js,mjs,cjs,ts,mts,cts}",
                "src/**/*.{js,mjs,cjs,ts,mts,cts}",
                "test/**/*.{js,mjs,cjs,ts,mts,cts}",
            ],
        },
        "docs/docusaurus": {
            entry: ["src/**/*.{ts,tsx}"],
            ignoreIssues: {
                "src/components/HomepageFeatures/styles.module.css.d.ts": [
                    "exports",
                ],
            },
            includeEntryExports: false,
            ignoreDependencies: [
                "@easyops-cn/docusaurus-search-local",
                "typed-css-modules",
                "typedoc-config-nick2bad4u",
            ],
            project: ["*.ts", "**/*.{mdx,ts,tsx}"],
        },
    },
};

export default knipConfig;
