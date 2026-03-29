/**
 * @packageDocumentation
 * Disallow top-level Stylelint formatter configuration in authored config files.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigDisallowedOptionRule } from "../_internal/stylelint-config-disallowed-option-rule.js";

/** Rule module that disallows `formatter` in Stylelint config files. */
const disallowStylelintFormatterRule: RuleModuleWithDocs<
    string,
    readonly unknown[]
> = createStylelintConfigDisallowedOptionRule({
    description:
        "disallow configuring Stylelint's top-level `formatter` option inside authored Stylelint config files.",
    message:
        "Remove `formatter` from the Stylelint config. Formatter selection is an execution concern that belongs in the CLI or Node API callsite, not the shared config object.",
    optionName: "formatter",
    ruleName: "disallow-stylelint-formatter",
});

export default disallowStylelintFormatterRule;
