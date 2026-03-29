/**
 * @packageDocumentation
 * RuleTester coverage for prefer-stylelint-define-config.
 */
import { getPluginRule, createRuleTester } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "prefer-stylelint-define-config",
    getPluginRule("prefer-stylelint-define-config"),
    {
        valid: [
            {
                code: `
                    import { defineConfig } from "stylelint-define-config";

                    export default defineConfig({
                        rules: {
                            "color-no-invalid-hex": true,
                        },
                    });
                `,
                filename: "stylelint.config.ts",
            },
            {
                code: `export default { rules: {} };`,
                filename: "not-a-stylelint-config.ts",
            },
        ],
        invalid: [
            {
                code: `
                    export default {
                        rules: {
                            "color-no-invalid-hex": true,
                        },
                    };
                `,
                errors: [{ messageId: "preferDefineConfig" }],
                filename: "stylelint.config.ts",
                output: `
                    import { defineConfig } from "stylelint-define-config";

                    export default defineConfig({
                        rules: {
                            "color-no-invalid-hex": true,
                        },
                    });
                `,
            },
        ],
    }
);
