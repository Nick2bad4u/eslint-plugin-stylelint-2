import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

import { ESLint as LocalESLint } from "eslint";
import pc from "picocolors";

/** @typedef {import("eslint").Linter.Config} FlatConfig */

/**
 * Internal test hook consumed by src/plugin.ts to lock config shape by ESLint
 * major.
 */
const pluginEslintMajorOverrideEnvironmentVariable = "STYLELINT2_ESLINT_MAJOR";
const eslintRuntimeDirectoryEnvironmentVariable = "ESLINT_RUNTIME_DIRECTORY";

const require = createRequire(import.meta.url);

/**
 * @param {unknown} value
 *
 * @returns {value is { ESLint: typeof LocalESLint }}
 */
const isEslintRuntimeModule = (value) =>
    typeof value === "object" &&
    value !== null &&
    "ESLint" in value &&
    typeof value.ESLint === "function";

/**
 * Load the repository ESLint runtime by default, or an isolated compatibility
 * runtime when CI provides one.
 *
 * @returns {Promise<typeof LocalESLint>}
 */
const loadEslintRuntime = async () => {
    const runtimeDirectory =
        process.env[eslintRuntimeDirectoryEnvironmentVariable];

    if (runtimeDirectory === undefined || runtimeDirectory.length === 0) {
        return LocalESLint;
    }

    const runtimeEntryPath = require.resolve("eslint", {
        paths: [runtimeDirectory],
    });
    /** @type {unknown} */
    const runtimeModule = await import(pathToFileURL(runtimeEntryPath).href);

    if (!isEslintRuntimeModule(runtimeModule)) {
        throw new TypeError(
            `The isolated ESLint runtime at ${runtimeEntryPath} does not export ESLint.`
        );
    }

    return runtimeModule.ESLint;
};

const positiveIntegerPattern = /^(?:[1-9]\d*)$/u;

/**
 * @param {string} value
 *
 * @returns {number | undefined}
 */
const parsePositiveInteger = (value) => {
    if (!positiveIntegerPattern.test(value)) {
        return undefined;
    }

    const parsedValue = Number.parseInt(value, 10);

    return Number.isSafeInteger(parsedValue) && parsedValue > 0
        ? parsedValue
        : undefined;
};

/** @typedef {Record<string, FlatConfig | readonly FlatConfig[]>} PluginConfigs */

/**
 * @param {readonly string[]} argv
 *
 * @returns {number | undefined}
 *
 * @throws {Error} When the operation fails.
 */
const getExpectedEslintMajor = (argv) => {
    const expectedFlag = argv.find((argument) =>
        argument.startsWith("--expect-eslint-major=")
    );

    if (expectedFlag === undefined) {
        return undefined;
    }

    const rawMajor = expectedFlag.slice("--expect-eslint-major=".length);
    const parsedMajor = parsePositiveInteger(rawMajor);

    if (parsedMajor === undefined) {
        throw new TypeError(
            `Invalid --expect-eslint-major value: ${rawMajor}. Expected a positive integer major version.`
        );
    }

    return parsedMajor;
};

/**
 * @param {string} version
 *
 * @returns {number}
 *
 * @throws {Error} When the operation fails.
 */
const getEslintMajorVersion = (version) => {
    const [majorText = "0"] = version.split(".");
    const parsedMajor = parsePositiveInteger(majorText);

    if (parsedMajor === undefined) {
        throw new TypeError(
            `Unable to determine ESLint major version from: ${version}`
        );
    }

    return parsedMajor;
};

/**
 * @param {PluginConfigs} pluginConfigs
 * @param {string} configName
 * @param {readonly string[]} [fallbackConfigNames]
 *
 * @returns {FlatConfig}
 *
 * @throws {Error} When the operation fails.
 */
const getSingleFlatConfig = (
    pluginConfigs,
    configName,
    fallbackConfigNames = []
) => {
    const candidateConfigNames = [configName, ...fallbackConfigNames];

    for (const candidateName of candidateConfigNames) {
        const configValue = pluginConfigs[candidateName];

        if (configValue === undefined) {
            continue;
        }

        if (Array.isArray(configValue)) {
            throw new TypeError(
                `Expected plugin.configs.${candidateName} to be a single flat config object.`
            );
        }

        return /** @type {FlatConfig} */ (configValue);
    }

    throw new TypeError(
        `Could not find plugin config ${configName} (checked fallbacks: ${fallbackConfigNames.join(", ") || "none"}).`
    );
};

/**
 * @returns {Promise<PluginConfigs>}
 */
const loadPluginConfigs = async () => {
    const pluginModule = await import("../plugin.mjs");
    const pluginValue = pluginModule.default;

    return /** @type {PluginConfigs} */ (pluginValue.configs ?? {});
};

const run = async () => {
    const ESLint = await loadEslintRuntime();
    const expectedEslintMajor = getExpectedEslintMajor(process.argv.slice(2));
    const installedEslintMajor = getEslintMajorVersion(ESLint.version);

    if (
        expectedEslintMajor !== undefined &&
        installedEslintMajor !== expectedEslintMajor
    ) {
        throw new Error(
            `Expected ESLint major ${expectedEslintMajor} but found ${ESLint.version}.`
        );
    }

    globalThis.process.env[pluginEslintMajorOverrideEnvironmentVariable] =
        String(installedEslintMajor);
    const pluginConfigs = await loadPluginConfigs();

    const cssEslint = new ESLint({
        cwd: process.cwd(),
        fix: true,
        overrideConfig: getSingleFlatConfig(pluginConfigs, "stylelintOnly", [
            "stylesheets",
        ]),
        overrideConfigFile: true,
    });
    const [cssResult] = await cssEslint.lintText(`a { color: #ffffff; }`, {
        filePath: "compat.css",
    });

    if (
        (cssResult?.messages.length ?? 0) === 0 &&
        cssResult?.output === undefined
    ) {
        throw new Error(
            "Stylelint compatibility smoke test produced no diagnostic or fix output."
        );
    }

    const configEslint = new ESLint({
        cwd: process.cwd(),
        fix: true,
        overrideConfig: getSingleFlatConfig(pluginConfigs, "configuration", [
            "configs",
        ]),
        overrideConfigFile: true,
    });
    const [configResult] = await configEslint.lintText(
        `export default { rules: { \"color-no-invalid-hex\": true } };`,
        { filePath: "stylelint.config.ts" }
    );

    if (configResult?.output?.includes("defineConfig(") !== true) {
        throw new Error(
            "Config compatibility smoke test did not apply defineConfig autofix."
        );
    }

    console.log(
        `${pc.green("✓")} ESLint 9/10 compatibility smoke checks passed.`
    );
};

await run();
