/**
 * @packageDocumentation
 * Disallow duplicate entries in Stylelint top-level extends option.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigDisallowDuplicateArrayEntriesRule } from "../_internal/stylelint-config-string-array-option-rule.js";

const disallowStylelintDuplicateExtendsRule: RuleModuleWithDocs<
    string,
    readonly unknown[]
> = createStylelintConfigDisallowDuplicateArrayEntriesRule({
    description:
        "disallow duplicate entries in top-level Stylelint `extends` declarations.",
    message:
        "Remove duplicate `extends` entries so shared config layering remains unambiguous.",
    optionName: "extends",
    ruleName: "disallow-stylelint-duplicate-extends",
});

export default disallowStylelintDuplicateExtendsRule;
