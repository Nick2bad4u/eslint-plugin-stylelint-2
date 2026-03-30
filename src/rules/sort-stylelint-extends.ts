/**
 * @packageDocumentation
 * Enforce sorted entries in Stylelint top-level extends option.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigSortArrayEntriesRule } from "../_internal/stylelint-config-string-array-option-rule.js";

const sortStylelintExtendsRule: RuleModuleWithDocs<string, readonly unknown[]> =
    createStylelintConfigSortArrayEntriesRule({
        description:
            "enforce sorted entries in top-level Stylelint `extends` declarations.",
        message:
            "Sort top-level `extends` entries for deterministic config diffs and simpler reviews.",
        optionName: "extends",
        ruleName: "sort-stylelint-extends",
    });

export default sortStylelintExtendsRule;
