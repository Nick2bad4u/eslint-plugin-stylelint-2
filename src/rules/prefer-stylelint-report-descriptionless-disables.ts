/**
 * @packageDocumentation
 * Require enabling Stylelint's built-in reporting for descriptionless disable comments.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigBooleanOptionRule } from "../_internal/stylelint-config-boolean-option-rule.js";

/**
 * Rule module that requires `reportDescriptionlessDisables` in Stylelint config
 * files.
 */
const preferStylelintReportDescriptionlessDisablesRule: RuleModuleWithDocs<
    string,
    readonly unknown[]
> = createStylelintConfigBooleanOptionRule({
    description:
        "require enabling Stylelint's `reportDescriptionlessDisables` config option in authored Stylelint config files.",
    message:
        "Enable `reportDescriptionlessDisables` so Stylelint reports disable comments that do not explain why the rule was turned off.",
    optionName: "reportDescriptionlessDisables",
    ruleName: "prefer-stylelint-report-descriptionless-disables",
});

export default preferStylelintReportDescriptionlessDisablesRule;
