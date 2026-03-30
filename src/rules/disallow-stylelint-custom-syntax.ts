/**
 * @packageDocumentation
 * Disallow top-level Stylelint customSyntax configuration in authored config files.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigDisallowedOptionRule } from "../_internal/stylelint-config-disallowed-option-rule.js";

/** Rule module that disallows top-level `customSyntax` in Stylelint config
files. */
const disallowStylelintCustomSyntaxRule: RuleModuleWithDocs<
    string,
    readonly unknown[]
> = createStylelintConfigDisallowedOptionRule({
    description:
        "disallow configuring Stylelint's top-level `customSyntax` option inside authored Stylelint config files.",
    message:
        "Remove top-level `customSyntax` from the shared Stylelint config. Syntax selection should be scoped in `overrides` entries with explicit file globs.",
    optionName: "customSyntax",
    ruleName: "disallow-stylelint-custom-syntax",
});

export default disallowStylelintCustomSyntaxRule;
