/**
 * @packageDocumentation
 * Canonical runtime registry of all rule modules shipped by eslint-plugin-stylelint-2.
 */
import preferStylelintDefineConfigRule from "../rules/prefer-stylelint-define-config.js";
import stylelintRule from "../rules/stylelint.js";

import type { RuleModuleWithDocs } from "./typed-rule.js";

/** Runtime map of all rule modules keyed by unqualified rule name. */
export const stylelint2Rules: Readonly<{
    "prefer-stylelint-define-config": RuleModuleWithDocs<
        string,
        readonly unknown[]
    >;
    stylelint: RuleModuleWithDocs<string, readonly unknown[]>;
}> = {
    "prefer-stylelint-define-config": preferStylelintDefineConfigRule,
    stylelint: stylelintRule satisfies RuleModuleWithDocs<
        string,
        readonly unknown[]
    > as RuleModuleWithDocs<string, readonly unknown[]>,
} as const;

/** Unqualified rule name supported by this plugin. */
export type Stylelint2RuleNamePattern = keyof typeof stylelint2Rules;

export default stylelint2Rules;
