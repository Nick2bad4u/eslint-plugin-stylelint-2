/**
 * @packageDocumentation
 * Disallow top-level Stylelint allowEmptyInput configuration in authored config files.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigDisallowedOptionRule } from "../_internal/stylelint-config-disallowed-option-rule.js";

/** Rule module that disallows `allowEmptyInput` in Stylelint config files. */
const disallowStylelintAllowEmptyInputRule: RuleModuleWithDocs<
    string,
    readonly unknown[]
> = createStylelintConfigDisallowedOptionRule({
    description:
        "disallow configuring Stylelint's top-level `allowEmptyInput` option inside authored Stylelint config files.",
    message:
        "Remove `allowEmptyInput` from the shared Stylelint config. Empty-input handling should be managed by invocation-level file targeting and task orchestration, not hidden in shared config state.",
    optionName: "allowEmptyInput",
    ruleName: "disallow-stylelint-allow-empty-input",
});

export default disallowStylelintAllowEmptyInputRule;
