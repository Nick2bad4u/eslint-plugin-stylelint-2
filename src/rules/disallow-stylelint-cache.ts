/**
 * @packageDocumentation
 * Disallow top-level Stylelint cache configuration in authored config files.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigDisallowedOptionRule } from "../_internal/stylelint-config-disallowed-option-rule.js";

/** Rule module that disallows `cache` in Stylelint config files. */
const disallowStylelintCacheRule: RuleModuleWithDocs<
    string,
    readonly unknown[]
> = createStylelintConfigDisallowedOptionRule({
    description:
        "disallow configuring Stylelint's top-level `cache` option inside authored Stylelint config files.",
    message:
        "Remove `cache` from the shared Stylelint config. Cache policy belongs to the execution environment and should be managed at the CLI or task-runner level.",
    optionName: "cache",
    ruleName: "disallow-stylelint-cache",
});

export default disallowStylelintCacheRule;
