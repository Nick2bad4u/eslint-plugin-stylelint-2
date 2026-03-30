/**
 * @packageDocumentation
 * RuleTester coverage for disallow-stylelint-fix.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "disallow-stylelint-fix",
    getPluginRule("disallow-stylelint-fix"),
    {
        invalid: [
            {
                code: `export default {
    fix: true,
};`,
                errors: [{ messageId: "disallowConfigOption" }],
                filename: "stylelint.config.ts",
                output: `export default {};`,
            },
            {
                code: `export default {
    fix: "strict",
    rules: {},
};`,
                errors: [{ messageId: "disallowConfigOption" }],
                filename: "stylelint.config.ts",
                output: `export default {
    rules: {},
};`,
            },
            {
                code: `export default {
    rules: {},
    fix: true
};`,
                errors: [{ messageId: "disallowConfigOption" }],
                filename: "stylelint.config.ts",
                output: `export default {
    rules: {}
};`,
            },
        ],
        valid: [
            {
                code: `export default {
    rules: {},
};`,
                filename: "stylelint.config.ts",
            },
            {
                code: `export default { fix: true };`,
                filename: "not-a-stylelint-config.ts",
            },
        ],
    }
);
