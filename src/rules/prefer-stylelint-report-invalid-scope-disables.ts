/**
 * @packageDocumentation
 * Require enabling Stylelint's built-in reporting for invalid-scope disable comments.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigBooleanOptionRule } from "../_internal/stylelint-config-boolean-option-rule.js";

/**
 * Rule module that requires `reportInvalidScopeDisables` in Stylelint config
 * files.
 */
const preferStylelintReportInvalidScopeDisablesRule: RuleModuleWithDocs<
    string,
    readonly unknown[]
> = createStylelintConfigBooleanOptionRule({
    description:
        "require enabling Stylelint's `reportInvalidScopeDisables` config option in authored Stylelint config files.",
    message:
        "Enable `reportInvalidScopeDisables` so Stylelint reports disable comments that reference rules outside the active configuration.",
    optionName: "reportInvalidScopeDisables",
    ruleName: "prefer-stylelint-report-invalid-scope-disables",
});

export default preferStylelintReportInvalidScopeDisablesRule;
