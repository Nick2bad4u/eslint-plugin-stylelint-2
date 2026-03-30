import type { RuleModuleWithDocs } from "./typed-rule.js";

/**
 * @packageDocumentation
 * Canonical runtime registry of all rule modules shipped by eslint-plugin-stylelint-2.
 */
import disallowStylelintCacheRule from "../rules/disallow-stylelint-cache.js";
import disallowStylelintDefaultSeverityRule from "../rules/disallow-stylelint-default-severity.js";
import disallowStylelintFixRule from "../rules/disallow-stylelint-fix.js";
import disallowStylelintFormatterRule from "../rules/disallow-stylelint-formatter.js";
import disallowStylelintIgnoreDisablesRule from "../rules/disallow-stylelint-ignore-disables.js";
import disallowStylelintIgnoreFilesRule from "../rules/disallow-stylelint-ignore-files.js";
import preferStylelintDefineConfigRule from "../rules/prefer-stylelint-define-config.js";
import preferStylelintReportDescriptionlessDisablesRule from "../rules/prefer-stylelint-report-descriptionless-disables.js";
import preferStylelintReportInvalidScopeDisablesRule from "../rules/prefer-stylelint-report-invalid-scope-disables.js";
import preferStylelintReportNeedlessDisablesRule from "../rules/prefer-stylelint-report-needless-disables.js";
import preferStylelintReportUnscopedDisablesRule from "../rules/prefer-stylelint-report-unscoped-disables.js";
import stylelintRule from "../rules/stylelint.js";

/** Runtime map of all rule modules keyed by unqualified rule name. */
export const stylelint2Rules: Readonly<{
    "disallow-stylelint-cache": RuleModuleWithDocs<string, readonly unknown[]>;
    "disallow-stylelint-default-severity": RuleModuleWithDocs<
        string,
        readonly unknown[]
    >;
    "disallow-stylelint-fix": RuleModuleWithDocs<string, readonly unknown[]>;
    "disallow-stylelint-formatter": RuleModuleWithDocs<
        string,
        readonly unknown[]
    >;
    "disallow-stylelint-ignore-disables": RuleModuleWithDocs<
        string,
        readonly unknown[]
    >;
    "disallow-stylelint-ignore-files": RuleModuleWithDocs<
        string,
        readonly unknown[]
    >;
    "prefer-stylelint-define-config": RuleModuleWithDocs<
        string,
        readonly unknown[]
    >;
    "prefer-stylelint-report-descriptionless-disables": RuleModuleWithDocs<
        string,
        readonly unknown[]
    >;
    "prefer-stylelint-report-invalid-scope-disables": RuleModuleWithDocs<
        string,
        readonly unknown[]
    >;
    "prefer-stylelint-report-needless-disables": RuleModuleWithDocs<
        string,
        readonly unknown[]
    >;
    "prefer-stylelint-report-unscoped-disables": RuleModuleWithDocs<
        string,
        readonly unknown[]
    >;
    stylelint: RuleModuleWithDocs<string, readonly unknown[]>;
}> = {
    "disallow-stylelint-cache": disallowStylelintCacheRule,
    "disallow-stylelint-default-severity": disallowStylelintDefaultSeverityRule,
    "disallow-stylelint-fix": disallowStylelintFixRule,
    "disallow-stylelint-formatter": disallowStylelintFormatterRule,
    "disallow-stylelint-ignore-disables": disallowStylelintIgnoreDisablesRule,
    "disallow-stylelint-ignore-files": disallowStylelintIgnoreFilesRule,
    "prefer-stylelint-define-config": preferStylelintDefineConfigRule,
    "prefer-stylelint-report-descriptionless-disables":
        preferStylelintReportDescriptionlessDisablesRule,
    "prefer-stylelint-report-invalid-scope-disables":
        preferStylelintReportInvalidScopeDisablesRule,
    "prefer-stylelint-report-needless-disables":
        preferStylelintReportNeedlessDisablesRule,
    "prefer-stylelint-report-unscoped-disables":
        preferStylelintReportUnscopedDisablesRule,
    stylelint: stylelintRule satisfies RuleModuleWithDocs<
        string,
        readonly unknown[]
    > as RuleModuleWithDocs<string, readonly unknown[]>,
} as const;

/** Unqualified rule name supported by this plugin. */
export type Stylelint2RuleNamePattern = keyof typeof stylelint2Rules;

export default stylelint2Rules;
