/**
 * @packageDocumentation
 * Disallow `null` Stylelint rule configurations in authored config files.
 */
import type { TSESTree } from "@typescript-eslint/utils";

import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import {
    getExportedStylelintConfigObject,
    isStylelintConfigFile,
} from "../_internal/stylelint-config-object.js";
import {
    getTopLevelRuleEntries,
    getTopLevelRulesObject,
} from "../_internal/stylelint-config-rules-object.js";
import { createTypedRule, toRuleListener } from "../_internal/typed-rule.js";

type MessageIds = "disallowNullRuleConfig";
type Options = readonly [];

const isPropertyExpressionValue = (
    value: Readonly<TSESTree.Property["value"]>
): value is TSESTree.Expression =>
    value.type !== "ArrayPattern" &&
    value.type !== "AssignmentPattern" &&
    value.type !== "ObjectPattern" &&
    value.type !== "TSEmptyBodyFunctionExpression";

const getRuleName = (
    property: Readonly<TSESTree.Property>
): string | undefined => {
    const propertyKey = property.key;

    if (propertyKey.type === "Identifier") {
        return propertyKey.name;
    }

    if (
        propertyKey.type === "Literal" &&
        typeof propertyKey.value === "string"
    ) {
        return propertyKey.value;
    }

    return undefined;
};

/** Rule module that disallows top-level `rules: { some-rule: null }` entries. */
const disallowStylelintNullRuleConfigRule: RuleModuleWithDocs<
    MessageIds,
    Options
> = createTypedRule({
    create(context) {
        if (!isStylelintConfigFile(context.physicalFilename)) {
            return {};
        }

        return toRuleListener({
            ExportDefaultDeclaration(node: unknown) {
                if (node === null || typeof node !== "object") {
                    return;
                }

                const exportDefaultNode =
                    node as TSESTree.ExportDefaultDeclaration;
                const configObject = getExportedStylelintConfigObject(
                    exportDefaultNode.declaration
                );

                if (configObject === undefined) {
                    return;
                }

                const rulesObject = getTopLevelRulesObject(configObject);

                if (rulesObject === undefined) {
                    return;
                }

                const ruleEntries = getTopLevelRuleEntries(rulesObject);

                for (const ruleEntry of ruleEntries) {
                    const ruleEntryValue = ruleEntry.value;

                    if (!isPropertyExpressionValue(ruleEntryValue)) {
                        continue;
                    }

                    if (
                        ruleEntryValue.type !== "Literal" ||
                        ruleEntryValue.value !== null
                    ) {
                        continue;
                    }

                    const ruleName = getRuleName(ruleEntry);

                    context.report({
                        data:
                            ruleName === undefined
                                ? {}
                                : {
                                      ruleName,
                                  },
                        messageId: "disallowNullRuleConfig",
                        node: ruleEntry,
                    });
                }
            },
        });
    },
    defaultOptions: [],
    meta: {
        docs: {
            configs: [
                "stylelint2.configs.recommended",
                "stylelint2.configs.configuration",
                "stylelint2.configs.all",
            ],
            description:
                "disallow `null` values in top-level Stylelint `rules` entries.",
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-null-rule-config",
        },
        messages: {
            disallowNullRuleConfig:
                "Avoid configuring Stylelint rule `{{ruleName}}` as `null` in shared config. Prefer explicit rule behavior that is reviewable in preset policy.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "disallow-stylelint-null-rule-config",
});

export default disallowStylelintNullRuleConfigRule;
