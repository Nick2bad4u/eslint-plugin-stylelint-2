/**
 * @packageDocumentation
 * Disallow top-level Stylelint ignoreDisables configuration in authored config files.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigDisallowedOptionRule } from "../_internal/stylelint-config-disallowed-option-rule.js";

/** Rule module that disallows `ignoreDisables` in Stylelint config files. */
const disallowStylelintIgnoreDisablesRule: RuleModuleWithDocs<
    string,
    readonly unknown[]
> = createStylelintConfigDisallowedOptionRule({
    description:
        "disallow configuring Stylelint's top-level `ignoreDisables` option inside authored Stylelint config files.",
    message:
        "Remove `ignoreDisables` from the Stylelint config. It undermines disable-comment governance and conflicts with the report*Disables safety checks this plugin is designed to reinforce.",
    optionName: "ignoreDisables",
    ruleName: "disallow-stylelint-ignore-disables",
});

export default disallowStylelintIgnoreDisablesRule;
