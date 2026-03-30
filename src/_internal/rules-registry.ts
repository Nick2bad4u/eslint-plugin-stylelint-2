import type { RuleModuleWithDocs } from "./typed-rule.js";

/**
 * @packageDocumentation
 * Canonical runtime registry of all rule modules shipped by eslint-plugin-stylelint-2.
 */
import disallowStylelintAllowEmptyInputRule from "../rules/disallow-stylelint-allow-empty-input.js";
import disallowStylelintCacheRule from "../rules/disallow-stylelint-cache.js";
import disallowStylelintConfigurationCommentRule from "../rules/disallow-stylelint-configuration-comment.js";
import disallowStylelintCustomSyntaxRule from "../rules/disallow-stylelint-custom-syntax.js";
import disallowStylelintDefaultSeverityRule from "../rules/disallow-stylelint-default-severity.js";
import disallowStylelintEmptyRulesObjectRule from "../rules/disallow-stylelint-empty-rules-object.js";
import disallowStylelintFixRule from "../rules/disallow-stylelint-fix.js";
import disallowStylelintFormatterRule from "../rules/disallow-stylelint-formatter.js";
import disallowStylelintIgnoreDisablesRule from "../rules/disallow-stylelint-ignore-disables.js";
import disallowStylelintIgnoreFilesRule from "../rules/disallow-stylelint-ignore-files.js";
import disallowStylelintProcessorsRule from "../rules/disallow-stylelint-processors.js";
import preferStylelintDefineConfigRule from "../rules/prefer-stylelint-define-config.js";
import preferStylelintReportDescriptionlessDisablesRule from "../rules/prefer-stylelint-report-descriptionless-disables.js";
import preferStylelintReportInvalidScopeDisablesRule from "../rules/prefer-stylelint-report-invalid-scope-disables.js";
import preferStylelintReportNeedlessDisablesRule from "../rules/prefer-stylelint-report-needless-disables.js";
import preferStylelintReportUnscopedDisablesRule from "../rules/prefer-stylelint-report-unscoped-disables.js";
import requireStylelintCustomSyntaxInOverridesRule from "../rules/require-stylelint-custom-syntax-in-overrides.js";
import requireStylelintOverridesFilesRule from "../rules/require-stylelint-overrides-files.js";
import requireStylelintRulesObjectRule from "../rules/require-stylelint-rules-object.js";
import stylelintRule from "../rules/stylelint.js";

/** Runtime map of all rule modules keyed by unqualified rule name. */
export const stylelint2Rules: Readonly<{
    "disallow-stylelint-allow-empty-input": RuleModuleWithDocs<
        string,
        readonly unknown[]
    >;
    "disallow-stylelint-cache": RuleModuleWithDocs<string, readonly unknown[]>;
    "disallow-stylelint-configuration-comment": RuleModuleWithDocs<
        string,
        readonly unknown[]
    >;
    "disallow-stylelint-custom-syntax": RuleModuleWithDocs<
        string,
        readonly unknown[]
    >;
    "disallow-stylelint-default-severity": RuleModuleWithDocs<
        string,
        readonly unknown[]
    >;
    "disallow-stylelint-empty-rules-object": RuleModuleWithDocs<
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
    "disallow-stylelint-processors": RuleModuleWithDocs<
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
    "require-stylelint-custom-syntax-in-overrides": RuleModuleWithDocs<
        string,
        readonly unknown[]
    >;
    "require-stylelint-overrides-files": RuleModuleWithDocs<
        string,
        readonly unknown[]
    >;
    "require-stylelint-rules-object": RuleModuleWithDocs<
        string,
        readonly unknown[]
    >;
    stylelint: RuleModuleWithDocs<string, readonly unknown[]>;
}> = {
    "disallow-stylelint-allow-empty-input":
        disallowStylelintAllowEmptyInputRule,
    "disallow-stylelint-cache": disallowStylelintCacheRule,
    "disallow-stylelint-configuration-comment":
        disallowStylelintConfigurationCommentRule,
    "disallow-stylelint-custom-syntax": disallowStylelintCustomSyntaxRule,
    "disallow-stylelint-default-severity": disallowStylelintDefaultSeverityRule,
    "disallow-stylelint-empty-rules-object":
        disallowStylelintEmptyRulesObjectRule,
    "disallow-stylelint-fix": disallowStylelintFixRule,
    "disallow-stylelint-formatter": disallowStylelintFormatterRule,
    "disallow-stylelint-ignore-disables": disallowStylelintIgnoreDisablesRule,
    "disallow-stylelint-ignore-files": disallowStylelintIgnoreFilesRule,
    "disallow-stylelint-processors": disallowStylelintProcessorsRule,
    "prefer-stylelint-define-config": preferStylelintDefineConfigRule,
    "prefer-stylelint-report-descriptionless-disables":
        preferStylelintReportDescriptionlessDisablesRule,
    "prefer-stylelint-report-invalid-scope-disables":
        preferStylelintReportInvalidScopeDisablesRule,
    "prefer-stylelint-report-needless-disables":
        preferStylelintReportNeedlessDisablesRule,
    "prefer-stylelint-report-unscoped-disables":
        preferStylelintReportUnscopedDisablesRule,
    "require-stylelint-custom-syntax-in-overrides":
        requireStylelintCustomSyntaxInOverridesRule,
    "require-stylelint-overrides-files": requireStylelintOverridesFilesRule,
    "require-stylelint-rules-object": requireStylelintRulesObjectRule,
    stylelint: stylelintRule satisfies RuleModuleWithDocs<
        string,
        readonly unknown[]
    > as RuleModuleWithDocs<string, readonly unknown[]>,
} as const;

/** Unqualified rule name supported by this plugin. */
export type Stylelint2RuleNamePattern = keyof typeof stylelint2Rules;

export default stylelint2Rules;
