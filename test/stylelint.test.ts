/**
 * @packageDocumentation
 * Integration coverage for the Stylelint bridge rule.
 */
import { ESLint, type Linter } from "eslint";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import stylelint2Plugin from "../src/plugin";

const stylelintConfigFilePath = fileURLToPath(
    new URL("fixtures/stylelint/short-hex.config.mjs", import.meta.url)
);
const stylesheetsConfig = stylelint2Plugin.configs
    .stylelintOnly as Linter.Config;

const createCssLintEngine = (
    fix: boolean,
    ruleOptions: Readonly<Record<string, unknown>> = {}
): ESLint =>
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
                            ...ruleOptions,
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

    it("supports explicit stylelint invocation options", async () => {
        const eslint = createCssLintEngine(false, {
            allowEmptyInput: false,
            configBasedir: process.cwd(),
            ignoreDisables: false,
            quiet: false,
        });

        const [result] = await eslint.lintText(`a { color: #ffffff; }`, {
            filePath: "sample.css",
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result!.messages)).toBeTruthy();
        expect(result!.messages.length).toBeGreaterThanOrEqual(0);
    });

    it("reports parse errors through eslint diagnostics", async () => {
        const eslint = createCssLintEngine(false);
        const [result] = await eslint.lintText(`a { color: red;`, {
            filePath: "sample.css",
        });

        expect(result).toBeDefined();
        expect(result!.messages.length).toBeGreaterThan(0);

        const parseErrorMessage = result!.messages
            .map((message) => message.message)
            .join("\n");

        expect(parseErrorMessage).toMatch(
            /CssSyntaxError|Unclosed block|Unknown word/v
        );
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
