/**
 * @packageDocumentation
 * Integration coverage for the Stylelint bridge rule.
 */
import { ESLint } from "eslint";
import { describe, expect, it } from "vitest";

import stylelint2Plugin from "../src/plugin";

const stylelintConfigPath = new URL(
    "./fixtures/stylelint/short-hex.config.mjs",
    import.meta.url
);

const createCssLintEngine = (fix: boolean): ESLint =>
    new ESLint({
        fix,
        overrideConfig: [
            {
                ...stylelint2Plugin.configs.stylesheets,
                rules: {
                    "stylelint-2/stylelint": [
                        "error",
                        {
                            configFile: stylelintConfigPath.pathname,
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
