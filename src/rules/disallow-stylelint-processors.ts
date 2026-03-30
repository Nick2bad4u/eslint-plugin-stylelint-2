/**
 * @packageDocumentation
 * Disallow top-level Stylelint processors configuration in authored config files.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigDisallowedOptionRule } from "../_internal/stylelint-config-disallowed-option-rule.js";

/** Rule module that disallows `processors` in Stylelint config files. */
const disallowStylelintProcessorsRule: RuleModuleWithDocs<
    string,
    readonly unknown[]
> = createStylelintConfigDisallowedOptionRule({
    description:
        "disallow configuring Stylelint's top-level `processors` option inside authored Stylelint config files.",
    message:
        "Remove `processors` from the shared Stylelint config. Modern Stylelint workflows should rely on syntax-aware parsing and explicit config composition rather than processor pipelines.",
    optionName: "processors",
    ruleName: "disallow-stylelint-processors",
});

export default disallowStylelintProcessorsRule;
