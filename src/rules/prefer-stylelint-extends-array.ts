/**
 * @packageDocumentation
 * Prefer array form for Stylelint top-level extends option.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigPreferArrayOptionRule } from "../_internal/stylelint-config-string-array-option-rule.js";

const preferStylelintExtendsArrayRule: RuleModuleWithDocs<
    string,
    readonly unknown[]
> = createStylelintConfigPreferArrayOptionRule({
    description:
        "prefer array form for top-level Stylelint `extends` declarations.",
    message:
        "Use array form for top-level `extends` so config composition remains stable and easy to append safely.",
    optionName: "extends",
    ruleName: "prefer-stylelint-extends-array",
});

export default preferStylelintExtendsArrayRule;
