/**
 * @packageDocumentation
 * Disallow relative path entries in Stylelint top-level plugins option.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigDisallowRelativeArrayEntriesRule } from "../_internal/stylelint-config-string-array-option-rule.js";

const disallowStylelintRelativePluginPathsRule: RuleModuleWithDocs<
    string,
    readonly unknown[]
> = createStylelintConfigDisallowRelativeArrayEntriesRule({
    description:
        "disallow relative path entries in top-level Stylelint `plugins` declarations.",
    message:
        "Avoid relative-path `plugins` entries in shared config files. Prefer package-based plugin references for reproducible installs.",
    optionName: "plugins",
    ruleName: "disallow-stylelint-relative-plugin-paths",
});

export default disallowStylelintRelativePluginPathsRule;
