/**
 * @packageDocumentation
 * Disallow top-level Stylelint configurationComment configuration in authored config files.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigDisallowedOptionRule } from "../_internal/stylelint-config-disallowed-option-rule.js";

/** Rule module that disallows `configurationComment` in Stylelint config files. */
const disallowStylelintConfigurationCommentRule: RuleModuleWithDocs<
    string,
    readonly unknown[]
> = createStylelintConfigDisallowedOptionRule({
    description:
        "disallow configuring Stylelint's top-level `configurationComment` option inside authored Stylelint config files.",
    message:
        "Remove `configurationComment` from the shared Stylelint config. Configuration comment policy should remain consistent across repositories and not drift through local override markers.",
    optionName: "configurationComment",
    ruleName: "disallow-stylelint-configuration-comment",
});

export default disallowStylelintConfigurationCommentRule;
