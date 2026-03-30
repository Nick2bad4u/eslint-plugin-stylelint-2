/**
 * @packageDocumentation
 * RuleTester coverage for disallow-stylelint-cache.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "disallow-stylelint-cache",
    getPluginRule("disallow-stylelint-cache"),
    {
        invalid: [
            {
                code: `export default {
    cache: true,
};`,
                errors: [{ messageId: "disallowConfigOption" }],
                filename: "stylelint.config.ts",
                output: `export default {};`,
            },
            {
                code: `export default {
    cache: false,
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
    cache: true
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
                code: `export default { cache: true };`,
                filename: "not-a-stylelint-config.ts",
            },
        ],
    }
);
