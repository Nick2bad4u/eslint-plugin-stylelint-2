/**
 * @packageDocumentation
 * Disallow top-level Stylelint ignoreFiles configuration in authored config files.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigDisallowedOptionRule } from "../_internal/stylelint-config-disallowed-option-rule.js";

/** Rule module that disallows `ignoreFiles` in Stylelint config files. */
const disallowStylelintIgnoreFilesRule: RuleModuleWithDocs<
    string,
    readonly unknown[]
> = createStylelintConfigDisallowedOptionRule({
    description:
        "disallow configuring Stylelint's top-level `ignoreFiles` option inside authored Stylelint config files.",
    message:
        "Remove `ignoreFiles` from the shared Stylelint config. Ignore coverage should be defined in .stylelintignore or invocation-level file globs so repositories keep predictable lint scope.",
    optionName: "ignoreFiles",
    ruleName: "disallow-stylelint-ignore-files",
});

export default disallowStylelintIgnoreFilesRule;
