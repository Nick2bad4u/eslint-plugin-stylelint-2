/**
 * @packageDocumentation
 * Disallow relative path entries in Stylelint top-level extends option.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigDisallowRelativeArrayEntriesRule } from "../_internal/stylelint-config-string-array-option-rule.js";

const disallowStylelintRelativeExtendsPathsRule: RuleModuleWithDocs<
    string,
    readonly unknown[]
> = createStylelintConfigDisallowRelativeArrayEntriesRule({
    description:
        "disallow relative path entries in top-level Stylelint `extends` declarations.",
    message:
        "Avoid relative-path `extends` entries in shared config files. Prefer package-based config references for portability.",
    optionName: "extends",
    ruleName: "disallow-stylelint-relative-extends-paths",
});

export default disallowStylelintRelativeExtendsPathsRule;
