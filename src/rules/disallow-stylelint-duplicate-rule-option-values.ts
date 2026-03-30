/**
 * @packageDocumentation
 * Disallow duplicate values in array-valued Stylelint secondary rule options.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

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

type ComparableLiteral = boolean | null | number | string;
type MessageIds = "disallowDuplicateRuleOptionValues";
type Options = readonly [];

const isPropertyExpressionValue = (
    value: Readonly<TSESTree.Property["value"]>
): value is TSESTree.Expression =>
    value.type !== "ArrayPattern" &&
    value.type !== "AssignmentPattern" &&
    value.type !== "ObjectPattern" &&
    value.type !== "TSEmptyBodyFunctionExpression";

const getComparableLiteral = (
    expression: Readonly<TSESTree.Expression>
): ComparableLiteral | undefined => {
    if (expression.type !== "Literal") {
        return undefined;
    }

    if (
        typeof expression.value === "string" ||
        typeof expression.value === "number" ||
        typeof expression.value === "boolean" ||
        expression.value === null
    ) {
        return expression.value;
    }

    return undefined;
};

const getArrayLiteralElements = (
    arrayExpression: Readonly<TSESTree.ArrayExpression>
): readonly Readonly<TSESTree.Expression>[] | undefined => {
    const elements: Readonly<TSESTree.Expression>[] = [];

    for (const element of arrayExpression.elements) {
        if (element === null || element.type === "SpreadElement") {
            return undefined;
        }

        elements.push(element);
    }

    return elements;
};

const hasDuplicateComparableLiterals = (
    elements: readonly Readonly<TSESTree.Expression>[]
): boolean => {
    const seenValues = new Set<string>();

    for (const element of elements) {
        const comparableLiteral = getComparableLiteral(element);

        if (comparableLiteral === undefined) {
            return false;
        }

        const signature = `${typeof comparableLiteral}:${String(comparableLiteral)}`;

        if (seenValues.has(signature)) {
            return true;
        }

        seenValues.add(signature);
    }

    return false;
};

const getDedupedElements = (
    elements: readonly Readonly<TSESTree.Expression>[]
): readonly Readonly<TSESTree.Expression>[] => {
    const dedupedElements: Readonly<TSESTree.Expression>[] = [];
    const seenValues = new Set<string>();

    for (const element of elements) {
        const comparableLiteral = getComparableLiteral(element);

        if (comparableLiteral === undefined) {
            return elements;
        }

        const signature = `${typeof comparableLiteral}:${String(comparableLiteral)}`;

        if (seenValues.has(signature)) {
            continue;
        }

        seenValues.add(signature);
        dedupedElements.push(element);
    }

    return dedupedElements;
};

const getArrayReplacement = (
    sourceCode: Readonly<TSESLint.SourceCode>,
    elements: readonly Readonly<TSESTree.Expression>[]
): string =>
    `[${elements.map((element) => sourceCode.getText(element)).join(", ")}]`;

/**
 * Rule module that removes duplicate scalar literals from array-valued
 * Stylelint secondary option properties.
 */
const disallowStylelintDuplicateRuleOptionValuesRule: RuleModuleWithDocs<
    MessageIds,
    Options
> = createTypedRule({
    create(context) {
        if (!isStylelintConfigFile(context.physicalFilename)) {
            return {};
        }

        const sourceCode = context.sourceCode;

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

                    if (
                        !isPropertyExpressionValue(ruleEntryValue) ||
                        ruleEntryValue.type !== "ArrayExpression"
                    ) {
                        continue;
                    }

                    for (const optionElement of ruleEntryValue.elements) {
                        if (optionElement?.type !== "ObjectExpression") {
                            continue;
                        }

                        for (const optionProperty of optionElement.properties) {
                            if (optionProperty.type !== "Property") {
                                continue;
                            }

                            const optionPropertyValue = optionProperty.value;

                            if (
                                !isPropertyExpressionValue(
                                    optionPropertyValue
                                ) ||
                                optionPropertyValue.type !== "ArrayExpression"
                            ) {
                                continue;
                            }

                            const arrayLiteralElements =
                                getArrayLiteralElements(optionPropertyValue);

                            if (arrayLiteralElements === undefined) {
                                continue;
                            }

                            if (
                                !hasDuplicateComparableLiterals(
                                    arrayLiteralElements
                                )
                            ) {
                                continue;
                            }

                            context.report({
                                fix(fixer) {
                                    const dedupedElements =
                                        getDedupedElements(
                                            arrayLiteralElements
                                        );

                                    return fixer.replaceText(
                                        optionPropertyValue,
                                        getArrayReplacement(
                                            sourceCode,
                                            dedupedElements
                                        )
                                    );
                                },
                                messageId: "disallowDuplicateRuleOptionValues",
                                node: optionPropertyValue,
                            });
                        }
                    }
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
                "disallow duplicate scalar literals in array-valued Stylelint secondary rule options.",
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-duplicate-rule-option-values",
        },
        fixable: "code",
        messages: {
            disallowDuplicateRuleOptionValues:
                "Remove duplicate values from this Stylelint secondary option array so rule behavior remains explicit.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "disallow-stylelint-duplicate-rule-option-values",
});

export default disallowStylelintDuplicateRuleOptionValuesRule;
