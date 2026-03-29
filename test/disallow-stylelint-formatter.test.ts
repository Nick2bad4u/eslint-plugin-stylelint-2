/**
 * @packageDocumentation
 * RuleTester coverage for disallow-stylelint-formatter.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "disallow-stylelint-formatter",
    getPluginRule("disallow-stylelint-formatter"),
    {
        invalid: [
            {
                code: `export default {\n    formatter: "json",\n};`,
                errors: [{ messageId: "disallowConfigOption" }],
                filename: "stylelint.config.ts",
                output: `export default {};`,
            },
            {
                code: `export default {\n    formatter: "json",\n    rules: {},\n};`,
                errors: [{ messageId: "disallowConfigOption" }],
                filename: "stylelint.config.ts",
                output: `export default {\n    rules: {},\n};`,
            },
            {
                code: `export default {\n    rules: {},\n    formatter: "json"\n};`,
                errors: [{ messageId: "disallowConfigOption" }],
                filename: "stylelint.config.ts",
                output: `export default {\n    rules: {}\n};`,
            },
        ],
        valid: [
            {
                code: `export default {\n    rules: {},\n};`,
                filename: "stylelint.config.ts",
            },
            {
                code: `export default { formatter: "json" };`,
                filename: "not-a-stylelint-config.ts",
            },
        ],
    }
);
