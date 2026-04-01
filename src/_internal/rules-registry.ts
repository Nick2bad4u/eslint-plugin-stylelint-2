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
import disallowStylelintDuplicateExtendsRule from "../rules/disallow-stylelint-duplicate-extends.js";
import disallowStylelintDuplicatePluginsRule from "../rules/disallow-stylelint-duplicate-plugins.js";
import disallowStylelintDuplicateRuleOptionValuesRule from "../rules/disallow-stylelint-duplicate-rule-option-values.js";
import disallowStylelintEmptyRulesObjectRule from "../rules/disallow-stylelint-empty-rules-object.js";
import disallowStylelintFixRule from "../rules/disallow-stylelint-fix.js";
import disallowStylelintFormatterRule from "../rules/disallow-stylelint-formatter.js";
import disallowStylelintIgnoreDisablesRule from "../rules/disallow-stylelint-ignore-disables.js";
import disallowStylelintIgnoreFilesRule from "../rules/disallow-stylelint-ignore-files.js";
import disallowStylelintNullRuleConfigRule from "../rules/disallow-stylelint-null-rule-config.js";
import disallowStylelintOverridesRuntimeOptionsRule from "../rules/disallow-stylelint-overrides-runtime-options.js";
import disallowStylelintProcessorsRule from "../rules/disallow-stylelint-processors.js";
import disallowStylelintRelativeExtendsPathsRule from "../rules/disallow-stylelint-relative-extends-paths.js";
import disallowStylelintRelativePluginPathsRule from "../rules/disallow-stylelint-relative-plugin-paths.js";
import preferStylelintDefineConfigRule from "../rules/prefer-stylelint-define-config.js";
import preferStylelintExtendsArrayRule from "../rules/prefer-stylelint-extends-array.js";
import preferStylelintPluginsArrayRule from "../rules/prefer-stylelint-plugins-array.js";
import preferStylelintReportDescriptionlessDisablesRule from "../rules/prefer-stylelint-report-descriptionless-disables.js";
import preferStylelintReportInvalidScopeDisablesRule from "../rules/prefer-stylelint-report-invalid-scope-disables.js";
import preferStylelintReportNeedlessDisablesRule from "../rules/prefer-stylelint-report-needless-disables.js";
import preferStylelintReportUnscopedDisablesRule from "../rules/prefer-stylelint-report-unscoped-disables.js";
import requireStylelintConfigFileNamingConventionRule from "../rules/require-stylelint-config-file-naming-convention.js";
import requireStylelintCustomSyntaxInOverridesRule from "../rules/require-stylelint-custom-syntax-in-overrides.js";
import requireStylelintExtendsPackagesInstalledRule from "../rules/require-stylelint-extends-packages-installed.js";
import requireStylelintOverridesConfigurationRule from "../rules/require-stylelint-overrides-configuration.js";
import requireStylelintOverridesFilesArrayRule from "../rules/require-stylelint-overrides-files-array.js";
import requireStylelintOverridesFilesRule from "../rules/require-stylelint-overrides-files.js";
import requireStylelintPluginsPackagesInstalledRule from "../rules/require-stylelint-plugins-packages-installed.js";
import requireStylelintReportDisablesRule from "../rules/require-stylelint-report-disables.js";
import requireStylelintRulesObjectRule from "../rules/require-stylelint-rules-object.js";
import sortStylelintExtendsRule from "../rules/sort-stylelint-extends.js";
import sortStylelintPluginsRule from "../rules/sort-stylelint-plugins.js";
import sortStylelintRuleKeysRule from "../rules/sort-stylelint-rule-keys.js";
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
    "disallow-stylelint-duplicate-extends": RuleModuleWithDocs<
        string,
        readonly unknown[]
    >;
    "disallow-stylelint-duplicate-plugins": RuleModuleWithDocs<
        string,
        readonly unknown[]
    >;
    "disallow-stylelint-duplicate-rule-option-values": RuleModuleWithDocs<
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
    "disallow-stylelint-null-rule-config": RuleModuleWithDocs<
        string,
        readonly unknown[]
    >;
    "disallow-stylelint-overrides-runtime-options": RuleModuleWithDocs<
        string,
        readonly unknown[]
    >;
    "disallow-stylelint-processors": RuleModuleWithDocs<
        string,
        readonly unknown[]
    >;
    "disallow-stylelint-relative-extends-paths": RuleModuleWithDocs<
        string,
        readonly unknown[]
    >;
    "disallow-stylelint-relative-plugin-paths": RuleModuleWithDocs<
        string,
        readonly unknown[]
    >;
    "prefer-stylelint-define-config": RuleModuleWithDocs<
        string,
        readonly unknown[]
    >;
    "prefer-stylelint-extends-array": RuleModuleWithDocs<
        string,
        readonly unknown[]
    >;
    "prefer-stylelint-plugins-array": RuleModuleWithDocs<
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
    "require-stylelint-config-file-naming-convention": RuleModuleWithDocs<
        string,
        readonly unknown[]
    >;
    "require-stylelint-custom-syntax-in-overrides": RuleModuleWithDocs<
        string,
        readonly unknown[]
    >;
    "require-stylelint-extends-packages-installed": RuleModuleWithDocs<
        string,
        readonly unknown[]
    >;
    "require-stylelint-overrides-configuration": RuleModuleWithDocs<
        string,
        readonly unknown[]
    >;
    "require-stylelint-overrides-files": RuleModuleWithDocs<
        string,
        readonly unknown[]
    >;
    "require-stylelint-overrides-files-array": RuleModuleWithDocs<
        string,
        readonly unknown[]
    >;
    "require-stylelint-plugins-packages-installed": RuleModuleWithDocs<
        string,
        readonly unknown[]
    >;
    "require-stylelint-report-disables": RuleModuleWithDocs<
        string,
        readonly unknown[]
    >;
    "require-stylelint-rules-object": RuleModuleWithDocs<
        string,
        readonly unknown[]
    >;
    "sort-stylelint-extends": RuleModuleWithDocs<string, readonly unknown[]>;
    "sort-stylelint-plugins": RuleModuleWithDocs<string, readonly unknown[]>;
    "sort-stylelint-rule-keys": RuleModuleWithDocs<string, readonly unknown[]>;
    stylelint: RuleModuleWithDocs<string, readonly unknown[]>;
}> = {
    "disallow-stylelint-allow-empty-input":
        disallowStylelintAllowEmptyInputRule,
    "disallow-stylelint-cache": disallowStylelintCacheRule,
    "disallow-stylelint-configuration-comment":
        disallowStylelintConfigurationCommentRule,
    "disallow-stylelint-custom-syntax": disallowStylelintCustomSyntaxRule,
    "disallow-stylelint-default-severity": disallowStylelintDefaultSeverityRule,
    "disallow-stylelint-duplicate-extends":
        disallowStylelintDuplicateExtendsRule,
    "disallow-stylelint-duplicate-plugins":
        disallowStylelintDuplicatePluginsRule,
    "disallow-stylelint-duplicate-rule-option-values":
        disallowStylelintDuplicateRuleOptionValuesRule,
    "disallow-stylelint-empty-rules-object":
        disallowStylelintEmptyRulesObjectRule,
    "disallow-stylelint-fix": disallowStylelintFixRule,
    "disallow-stylelint-formatter": disallowStylelintFormatterRule,
    "disallow-stylelint-ignore-disables": disallowStylelintIgnoreDisablesRule,
    "disallow-stylelint-ignore-files": disallowStylelintIgnoreFilesRule,
    "disallow-stylelint-null-rule-config": disallowStylelintNullRuleConfigRule,
    "disallow-stylelint-overrides-runtime-options":
        disallowStylelintOverridesRuntimeOptionsRule,
    "disallow-stylelint-processors": disallowStylelintProcessorsRule,
    "disallow-stylelint-relative-extends-paths":
        disallowStylelintRelativeExtendsPathsRule,
    "disallow-stylelint-relative-plugin-paths":
        disallowStylelintRelativePluginPathsRule,
    "prefer-stylelint-define-config": preferStylelintDefineConfigRule,
    "prefer-stylelint-extends-array": preferStylelintExtendsArrayRule,
    "prefer-stylelint-plugins-array": preferStylelintPluginsArrayRule,
    "prefer-stylelint-report-descriptionless-disables":
        preferStylelintReportDescriptionlessDisablesRule,
    "prefer-stylelint-report-invalid-scope-disables":
        preferStylelintReportInvalidScopeDisablesRule,
    "prefer-stylelint-report-needless-disables":
        preferStylelintReportNeedlessDisablesRule,
    "prefer-stylelint-report-unscoped-disables":
        preferStylelintReportUnscopedDisablesRule,
    "require-stylelint-config-file-naming-convention":
        requireStylelintConfigFileNamingConventionRule,
    "require-stylelint-custom-syntax-in-overrides":
        requireStylelintCustomSyntaxInOverridesRule,
    "require-stylelint-extends-packages-installed":
        requireStylelintExtendsPackagesInstalledRule,
    "require-stylelint-overrides-configuration":
        requireStylelintOverridesConfigurationRule,
    "require-stylelint-overrides-files": requireStylelintOverridesFilesRule,
    "require-stylelint-overrides-files-array":
        requireStylelintOverridesFilesArrayRule,
    "require-stylelint-plugins-packages-installed":
        requireStylelintPluginsPackagesInstalledRule,
    "require-stylelint-report-disables": requireStylelintReportDisablesRule,
    "require-stylelint-rules-object": requireStylelintRulesObjectRule,
    "sort-stylelint-extends": sortStylelintExtendsRule,
    "sort-stylelint-plugins": sortStylelintPluginsRule,
    "sort-stylelint-rule-keys": sortStylelintRuleKeysRule,
    stylelint: stylelintRule,
} as const;

/** Unqualified rule name supported by this plugin. */
export type Stylelint2RuleNamePattern = keyof typeof stylelint2Rules;

export default stylelint2Rules;
