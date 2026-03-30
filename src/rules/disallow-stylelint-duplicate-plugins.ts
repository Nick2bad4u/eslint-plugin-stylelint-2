/**
 * @packageDocumentation
 * Disallow duplicate entries in Stylelint top-level plugins option.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigDisallowDuplicateArrayEntriesRule } from "../_internal/stylelint-config-string-array-option-rule.js";

const disallowStylelintDuplicatePluginsRule: RuleModuleWithDocs<
    string,
    readonly unknown[]
> = createStylelintConfigDisallowDuplicateArrayEntriesRule({
    description:
        "disallow duplicate entries in top-level Stylelint `plugins` declarations.",
    message:
        "Remove duplicate `plugins` entries so plugin activation order remains explicit and clean.",
    optionName: "plugins",
    ruleName: "disallow-stylelint-duplicate-plugins",
});

export default disallowStylelintDuplicatePluginsRule;
