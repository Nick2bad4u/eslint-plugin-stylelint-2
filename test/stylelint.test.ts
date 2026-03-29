/**
 * @packageDocumentation
 * Integration coverage for the Stylelint bridge rule.
 */
import { ESLint, type Linter } from "eslint";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import stylelint2Plugin from "../src/plugin";

/* eslint-disable total-functions/no-partial-url-constructor -- Test fixture URL resolution is local, deterministic, and acceptable here. */
const stylelintConfigFilePath = fileURLToPath(
    new URL("fixtures/stylelint/short-hex.config.mjs", import.meta.url)
);
/* eslint-enable total-functions/no-partial-url-constructor -- Re-enable after the local fixture path is resolved. */
const stylesheetsConfig = stylelint2Plugin.configs.stylesheets as Linter.Config;

const createCssLintEngine = (fix: boolean): ESLint =>
    new ESLint({
        fix,
        overrideConfig: [
            {
                ...stylesheetsConfig,
                rules: {
                    "stylelint-2/stylelint": [
                        "error",
                        {
                            configFile: stylelintConfigFilePath,
                        },
                    ],
                },
            },
        ],
        overrideConfigFile: true,
    });

describe("stylelint bridge rule", () => {
    it("reports Stylelint diagnostics through ESLint", async () => {
        const eslint = createCssLintEngine(false);
        const [result] = await eslint.lintText(`a { color: #ffffff; }`, {
            filePath: "sample.css",
        });

        expect(result).toBeDefined();

        const lintResult = result!;

        expect(lintResult.messages).toHaveLength(1);
        expect(lintResult.messages[0]?.ruleId).toBe("stylelint-2/stylelint");
        expect(lintResult.messages[0]?.message).toContain("color-hex-length");
    });

    it("applies Stylelint computed edit info through eslint --fix", async () => {
        const eslint = createCssLintEngine(true);
        const [result] = await eslint.lintText(`a { color: #ffffff; }`, {
            filePath: "sample.css",
        });

        expect(result).toBeDefined();

        const lintResult = result!;

        expect(lintResult.output).toContain("#fff");
    });
});
