/**
 * @packageDocumentation
 * Prefer array form for Stylelint top-level plugins option.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigPreferArrayOptionRule } from "../_internal/stylelint-config-string-array-option-rule.js";

const preferStylelintPluginsArrayRule: RuleModuleWithDocs<
    string,
    readonly unknown[]
> = createStylelintConfigPreferArrayOptionRule({
    description:
        "prefer array form for top-level Stylelint `plugins` declarations.",
    message:
        "Use array form for top-level `plugins` so plugin composition is deterministic and easier to maintain.",
    optionName: "plugins",
    ruleName: "prefer-stylelint-plugins-array",
});

export default preferStylelintPluginsArrayRule;
