/**
 * @packageDocumentation
 * Enforce sorted entries in Stylelint top-level plugins option.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigSortArrayEntriesRule } from "../_internal/stylelint-config-string-array-option-rule.js";

const sortStylelintPluginsRule: RuleModuleWithDocs<string, readonly unknown[]> =
    createStylelintConfigSortArrayEntriesRule({
        description:
            "enforce sorted entries in top-level Stylelint `plugins` declarations.",
        message:
            "Sort top-level `plugins` entries for deterministic plugin ordering and cleaner diffs.",
        optionName: "plugins",
        ruleName: "sort-stylelint-plugins",
    });

export default sortStylelintPluginsRule;
