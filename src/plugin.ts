/**
 * @packageDocumentation
 * Public plugin entrypoint for eslint-plugin-stylelint-2 exports and preset wiring.
 */
import type { ESLint, Linter } from "eslint";

import css from "@eslint/css";
import tsParser from "@typescript-eslint/parser";

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
/** ESLint-compatible rule map view of the strongly typed internal rule record. */
const eslintPluginRules = stylelint2Rules as NonNullable<
    ESLint.Plugin["rules"]
> &
    typeof stylelint2Rules;

const version =
    typeof packageJson.version === "string" ? packageJson.version : "0.0.0";

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

const stylesheetsPreset: Linter.Config = {
    files: [...stylesheetFiles],
    language: "css/css",
    languageOptions: {
        tolerant: true,
    },
    name: stylelint2ConfigMetadataByName.stylesheets.presetName,
    plugins: {
        css,
        [pluginNamespace]: stylelint2Plugin,
    },
    rules: {
        [`${pluginNamespace}/stylelint`]: "error",
    },
};

const configsPreset: Linter.Config = {
    files: [...configFiles],
    languageOptions: {
        parser: tsParser,
        parserOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
        },
    },
    name: stylelint2ConfigMetadataByName.configs.presetName,
    plugins: {
        [pluginNamespace]: stylelint2Plugin,
    },
    rules: {
        [`${pluginNamespace}/prefer-stylelint-define-config`]: "warn",
    },
};

stylelint2Plugin.configs = {
    all: [stylesheetsPreset, configsPreset],
    configs: configsPreset,
    recommended: [stylesheetsPreset, configsPreset],
    stylesheets: stylesheetsPreset,
};

/** Fully assembled public plugin contract. */
export type Stylelint2Plugin = typeof stylelint2Plugin;

export default stylelint2Plugin;
