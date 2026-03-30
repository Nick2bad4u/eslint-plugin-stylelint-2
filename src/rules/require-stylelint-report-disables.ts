/**
 * @packageDocumentation
 * Require top-level Stylelint reportDisables configuration in authored config files.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigBooleanOptionRule } from "../_internal/stylelint-config-boolean-option-rule.js";

/** Rule module that requires `reportDisables: true` in Stylelint config files. */
const requireStylelintReportDisablesRule: RuleModuleWithDocs<
    string,
    readonly unknown[]
> = createStylelintConfigBooleanOptionRule({
    description:
        "require `reportDisables: true` in authored Stylelint config files.",
    message:
        "Enable `reportDisables: true` so disable-comment usage remains visible and reviewable.",
    optionName: "reportDisables",
    ruleName: "require-stylelint-report-disables",
});

export default requireStylelintReportDisablesRule;
