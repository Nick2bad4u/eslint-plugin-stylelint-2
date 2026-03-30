/**
 * @packageDocumentation
 * Disallow top-level Stylelint defaultSeverity configuration in authored config files.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigDisallowedOptionRule } from "../_internal/stylelint-config-disallowed-option-rule.js";

/** Rule module that disallows `defaultSeverity` in Stylelint config files. */
const disallowStylelintDefaultSeverityRule: RuleModuleWithDocs<
    string,
    readonly unknown[]
> = createStylelintConfigDisallowedOptionRule({
    description:
        "disallow configuring Stylelint's top-level `defaultSeverity` option inside authored Stylelint config files.",
    message:
        "Remove `defaultSeverity` from the shared Stylelint config. Severity policy should stay explicit per rule and align with the ESLint-level severity contract used by this plugin.",
    optionName: "defaultSeverity",
    ruleName: "disallow-stylelint-default-severity",
});

export default disallowStylelintDefaultSeverityRule;
