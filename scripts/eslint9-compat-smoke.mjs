import { ESLint } from "eslint";
import pc from "picocolors";

import plugin from "../plugin.mjs";

/** @typedef {import("eslint").Linter.Config} FlatConfig */
/** @type {Record<string, FlatConfig | readonly FlatConfig[]>} */
const pluginConfigs =
    /** @type {Record<string, FlatConfig | readonly FlatConfig[]>} */ (
        plugin.configs ?? {}
    );

/**
 * @param {string} configName
 *
 * @returns {FlatConfig}
 */
const getSingleFlatConfig = (configName) => {
    const configValue = pluginConfigs[configName];

    if (Array.isArray(configValue) || configValue === undefined) {
        throw new TypeError(
            `Expected plugin.configs.${configName} to be a single flat config object.`
        );
    }

    return /** @type {FlatConfig} */ (configValue);
};

const run = async () => {
    const cssEslint = new ESLint({
        cwd: process.cwd(),
        fix: true,
        overrideConfig: getSingleFlatConfig("stylesheets"),
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
        overrideConfig: getSingleFlatConfig("configs"),
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
