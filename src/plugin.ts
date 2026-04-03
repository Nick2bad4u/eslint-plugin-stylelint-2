/**
 * @packageDocumentation
 * Public plugin entrypoint for eslint-plugin-stylelint-2 exports and preset wiring.
 */
import type { ESLint, Linter } from "eslint";

import css from "@eslint/css";
import tsParser from "@typescript-eslint/parser";
import { ESLint as ESLintRuntime } from "eslint";

import packageJson from "../package.json" with { type: "json" };
import { stylelint2Rules } from "./_internal/rules-registry.js";
import {
    type Stylelint2ConfigName as InternalStylelint2ConfigName,
    stylelint2ConfigMetadataByName,
} from "./_internal/stylelint2-config-references.js";

/** Public preset key names supported by eslint-plugin-stylelint-2. */
export type Stylelint2ConfigName = InternalStylelint2ConfigName;

/** Package name exported in runtime plugin metadata. */
const pluginName = "eslint-plugin-stylelint-2" as const;
/** ESLint namespace used for qualified rule ids. */
const pluginNamespace = "stylelint-2" as const;
/** Default CSS files covered by the stylesheet preset. */
const stylesheetFiles = ["**/*.css"] as const;
/** Stylelint config file globs covered by the config preset. */
const configFiles = [
    "**/stylelint.config.{js,mjs,cjs,ts,mts,cts}",
    "**/.stylelintrc.{js,mjs,cjs,ts,mts,cts}",
] as const;

/** Public preset config value shape. */
export type Stylelint2Config = Linter.Config | readonly Linter.Config[];
/** Public preset registry shape. */
export type Stylelint2Configs = Record<Stylelint2ConfigName, Stylelint2Config>;
/** Qualified rule ID supported by eslint-plugin-stylelint-2. */
export type Stylelint2RuleId =
    `${typeof pluginNamespace}/${Stylelint2RuleName}`;
/** Unqualified rule name supported by eslint-plugin-stylelint-2. */
export type Stylelint2RuleName = keyof typeof stylelint2Rules;
type FlatConfigRules = NonNullable<Linter.Config["rules"]>;
/** ESLint-compatible rule map view of the strongly typed internal rule record. */
const eslintPluginRules = stylelint2Rules as NonNullable<
    ESLint.Plugin["rules"]
> &
    typeof stylelint2Rules;

const version =
    typeof packageJson.version === "string" ? packageJson.version : "0.0.0";

const eslintMajorOverrideEnvironmentVariable =
    "STYLELINT2_ESLINT_MAJOR" as const;

const getEslintMajorVersion = (eslintVersion: string): number => {
    const [majorText = "0"] = eslintVersion.split(".");
    const parsedMajor = Number.parseInt(majorText, 10);

    return Number.isFinite(parsedMajor) && parsedMajor > 0 ? parsedMajor : 0;
};

const getEslintMajorVersionOverride = (): number | undefined => {
    const overrideValue =
        globalThis.process.env[eslintMajorOverrideEnvironmentVariable];

    if (typeof overrideValue !== "string" || overrideValue.length === 0) {
        return undefined;
    }

    const parsedOverride = Number.parseInt(overrideValue, 10);

    return Number.isFinite(parsedOverride) && parsedOverride > 0
        ? parsedOverride
        : undefined;
};

const resolvedEslintMajorVersion =
    getEslintMajorVersionOverride() ??
    getEslintMajorVersion(ESLintRuntime.version);

const supportsCssLanguageInFlatConfig = resolvedEslintMajorVersion >= 10;

const cssLanguagePresetFields: Readonly<Record<string, unknown>> =
    supportsCssLanguageInFlatConfig
        ? {
              language: "css/css",
              languageOptions: {
                  tolerant: true,
              },
          }
        : {};

/** Fully assembled runtime plugin object exported by this package. */
/** Fully assembled runtime plugin object exported by this package. */
const stylelint2Plugin: ESLint.Plugin & {
    configs: Stylelint2Configs;
    meta: {
        name: string;
        namespace: string;
        version: string;
    };
    rules: typeof eslintPluginRules;
} = {
    configs: {} as Stylelint2Configs,
    meta: {
        name: pluginName,
        namespace: pluginNamespace,
        version,
    },
    processors: {},
    rules: eslintPluginRules,
};

const stylelintOnlyPreset: Linter.Config = {
    files: [...stylesheetFiles],
    ...cssLanguagePresetFields,
    name: stylelint2ConfigMetadataByName.stylelintOnly.presetName,
    plugins: {
        ...(supportsCssLanguageInFlatConfig ? { css } : {}),
        [pluginNamespace]: stylelint2Plugin,
    },
    rules: {
        [`${pluginNamespace}/stylelint`]: "error",
    },
};

const configurationRules = {
    [`${pluginNamespace}/disallow-stylelint-allow-empty-input`]: "warn",
    [`${pluginNamespace}/disallow-stylelint-configuration-comment`]: "warn",
    [`${pluginNamespace}/disallow-stylelint-custom-syntax`]: "warn",
    [`${pluginNamespace}/disallow-stylelint-default-severity`]: "warn",
    [`${pluginNamespace}/disallow-stylelint-duplicate-extends`]: "warn",
    [`${pluginNamespace}/disallow-stylelint-duplicate-plugins`]: "warn",
    [`${pluginNamespace}/disallow-stylelint-duplicate-rule-option-values`]:
        "warn",
    [`${pluginNamespace}/disallow-stylelint-empty-rules-object`]: "warn",
    [`${pluginNamespace}/disallow-stylelint-ignore-disables`]: "warn",
    [`${pluginNamespace}/disallow-stylelint-ignore-files`]: "warn",
    [`${pluginNamespace}/disallow-stylelint-null-rule-config`]: "warn",
    [`${pluginNamespace}/disallow-stylelint-overrides-runtime-options`]: "warn",
    [`${pluginNamespace}/disallow-stylelint-processors`]: "warn",
    [`${pluginNamespace}/disallow-stylelint-relative-extends-paths`]: "warn",
    [`${pluginNamespace}/disallow-stylelint-relative-plugin-paths`]: "warn",
    [`${pluginNamespace}/prefer-stylelint-cache`]: "warn",
    [`${pluginNamespace}/prefer-stylelint-define-config`]: "warn",
    [`${pluginNamespace}/prefer-stylelint-extends-array`]: "warn",
    [`${pluginNamespace}/prefer-stylelint-fix`]: "warn",
    [`${pluginNamespace}/prefer-stylelint-formatter`]: "warn",
    [`${pluginNamespace}/prefer-stylelint-plugins-array`]: "warn",
    [`${pluginNamespace}/prefer-stylelint-report-descriptionless-disables`]:
        "warn",
    [`${pluginNamespace}/prefer-stylelint-report-invalid-scope-disables`]:
        "warn",
    [`${pluginNamespace}/prefer-stylelint-report-needless-disables`]: "warn",
    [`${pluginNamespace}/prefer-stylelint-report-unscoped-disables`]: "warn",
    [`${pluginNamespace}/require-stylelint-config-file-naming-convention`]:
        "warn",
    [`${pluginNamespace}/require-stylelint-custom-syntax-in-overrides`]: "warn",
    [`${pluginNamespace}/require-stylelint-extends-packages-installed`]: "warn",
    [`${pluginNamespace}/require-stylelint-overrides-configuration`]: "warn",
    [`${pluginNamespace}/require-stylelint-overrides-files-array`]: "warn",
    [`${pluginNamespace}/require-stylelint-overrides-files`]: "warn",
    [`${pluginNamespace}/require-stylelint-plugins-packages-installed`]: "warn",
    [`${pluginNamespace}/require-stylelint-report-disables`]: "warn",
    [`${pluginNamespace}/require-stylelint-rules-object`]: "warn",
    [`${pluginNamespace}/sort-stylelint-extends`]: "warn",
    [`${pluginNamespace}/sort-stylelint-plugins`]: "warn",
    [`${pluginNamespace}/sort-stylelint-rule-keys`]: "warn",
} as const satisfies FlatConfigRules;

const recommendedConfigurationRules: FlatConfigRules = {
    [`${pluginNamespace}/disallow-stylelint-allow-empty-input`]: "warn",
    [`${pluginNamespace}/disallow-stylelint-configuration-comment`]: "warn",
    [`${pluginNamespace}/disallow-stylelint-custom-syntax`]: "warn",
    [`${pluginNamespace}/disallow-stylelint-duplicate-extends`]: "warn",
    [`${pluginNamespace}/disallow-stylelint-duplicate-plugins`]: "warn",
    [`${pluginNamespace}/disallow-stylelint-duplicate-rule-option-values`]:
        "warn",
    [`${pluginNamespace}/disallow-stylelint-empty-rules-object`]: "warn",
    [`${pluginNamespace}/disallow-stylelint-null-rule-config`]: "warn",
    [`${pluginNamespace}/disallow-stylelint-overrides-runtime-options`]: "warn",
    [`${pluginNamespace}/disallow-stylelint-processors`]: "warn",
    [`${pluginNamespace}/disallow-stylelint-relative-extends-paths`]: "warn",
    [`${pluginNamespace}/disallow-stylelint-relative-plugin-paths`]: "warn",
    [`${pluginNamespace}/prefer-stylelint-define-config`]: "warn",
    [`${pluginNamespace}/prefer-stylelint-extends-array`]: "warn",
    [`${pluginNamespace}/prefer-stylelint-plugins-array`]: "warn",
    [`${pluginNamespace}/prefer-stylelint-report-descriptionless-disables`]:
        "warn",
    [`${pluginNamespace}/prefer-stylelint-report-invalid-scope-disables`]:
        "warn",
    [`${pluginNamespace}/prefer-stylelint-report-needless-disables`]: "warn",
    [`${pluginNamespace}/prefer-stylelint-report-unscoped-disables`]: "warn",
    [`${pluginNamespace}/require-stylelint-config-file-naming-convention`]:
        "warn",
    [`${pluginNamespace}/require-stylelint-custom-syntax-in-overrides`]: "warn",
    [`${pluginNamespace}/require-stylelint-extends-packages-installed`]: "warn",
    [`${pluginNamespace}/require-stylelint-overrides-configuration`]: "warn",
    [`${pluginNamespace}/require-stylelint-overrides-files-array`]: "warn",
    [`${pluginNamespace}/require-stylelint-overrides-files`]: "warn",
    [`${pluginNamespace}/require-stylelint-plugins-packages-installed`]: "warn",
    [`${pluginNamespace}/require-stylelint-report-disables`]: "warn",
    [`${pluginNamespace}/require-stylelint-rules-object`]: "warn",
    [`${pluginNamespace}/sort-stylelint-extends`]: "warn",
    [`${pluginNamespace}/sort-stylelint-plugins`]: "warn",
    [`${pluginNamespace}/sort-stylelint-rule-keys`]: "warn",
};

const configurationPreset: Linter.Config = {
    files: [...configFiles],
    languageOptions: {
        parser: tsParser,
        parserOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
        },
    },
    name: stylelint2ConfigMetadataByName.configuration.presetName,
    plugins: {
        [pluginNamespace]: stylelint2Plugin,
    },
    rules: configurationRules,
};

const recommendedConfigurationPreset: Linter.Config = {
    ...configurationPreset,
    name: `${stylelint2ConfigMetadataByName.recommended.presetName}:config`,
    rules: recommendedConfigurationRules,
};

stylelint2Plugin.configs = {
    all: [stylelintOnlyPreset, configurationPreset],
    configs: configurationPreset,
    configuration: configurationPreset,
    recommended: [stylelintOnlyPreset, recommendedConfigurationPreset],
    stylelintOnly: stylelintOnlyPreset,
    stylesheets: stylelintOnlyPreset,
};

/** Fully assembled public plugin contract. */
export type Stylelint2Plugin = typeof stylelint2Plugin;

export default stylelint2Plugin;
