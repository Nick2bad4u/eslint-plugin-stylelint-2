/**
 * @packageDocumentation
 * Shared rule factories for top-level Stylelint string-array configuration options.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    getExportedStylelintConfigObject,
    getObjectPropertyByName,
    isStylelintConfigFile,
} from "./stylelint-config-object.js";
import {
    getStringArrayOptionValue,
    isRelativeSpecifier,
} from "./stylelint-config-string-array-option.js";
import {
    createTypedRule,
    type RuleModuleWithDocs,
    toRuleListener,
} from "./typed-rule.js";

type ConfigOptionRuleDefinition = Readonly<{
    description: string;
    message: string;
    optionName: string;
    ruleName: string;
}>;

type Options = readonly [];

const getLiteralText = (
    sourceCode: Readonly<TSESLint.SourceCode>,
    literal: Readonly<TSESTree.StringLiteral>
): string => sourceCode.getText(literal);

const getUniqueLiterals = (
    literals: readonly Readonly<TSESTree.StringLiteral>[]
): readonly Readonly<TSESTree.StringLiteral>[] => {
    const seenValues = new Set<string>();
    const uniqueLiterals: Readonly<TSESTree.StringLiteral>[] = [];

    for (const literal of literals) {
        const literalValue = literal.value;

        if (typeof literalValue !== "string") {
            continue;
        }

        if (seenValues.has(literalValue)) {
            continue;
        }

        seenValues.add(literalValue);
        uniqueLiterals.push(literal);
    }

    return uniqueLiterals;
};

const hasDuplicates = (
    literals: readonly Readonly<TSESTree.StringLiteral>[]
): boolean => getUniqueLiterals(literals).length !== literals.length;

const getSortedLiteralItems = (
    sourceCode: Readonly<TSESLint.SourceCode>,
    literals: readonly Readonly<TSESTree.StringLiteral>[]
): readonly Readonly<{
    index: number;
    text: string;
    value: string;
}>[] =>
    literals
        .map((literal, index) => ({
            index,
            text: getLiteralText(sourceCode, literal),
            value: literal.value,
        }))
        .toSorted((left, right) => {
            const valueOrder = left.value.localeCompare(right.value);

            return valueOrder === 0 ? left.index - right.index : valueOrder;
        });

const isAlreadySorted = (
    sourceCode: Readonly<TSESLint.SourceCode>,
    literals: readonly Readonly<TSESTree.StringLiteral>[]
): boolean => {
    const sortedItems = getSortedLiteralItems(sourceCode, literals);

    return sortedItems.every((item, index) => item.index === index);
};

const toArrayReplacementText = (
    sourceCode: Readonly<TSESLint.SourceCode>,
    literals: readonly Readonly<TSESTree.StringLiteral>[]
): string =>
    `[${literals.map((literal) => getLiteralText(sourceCode, literal)).join(", ")}]`;

const getSortedLiteralTexts = (
    sourceCode: Readonly<TSESLint.SourceCode>,
    literals: readonly Readonly<TSESTree.StringLiteral>[]
): string[] => {
    const sortedItems = getSortedLiteralItems(sourceCode, literals);
    const sortedTexts: string[] = [];

    for (const sortedItem of sortedItems) {
        sortedTexts.push(sortedItem.text);
    }

    return sortedTexts;
};

const getRelativeLiterals = (
    optionValue: ReturnType<typeof getStringArrayOptionValue>
): readonly TSESTree.StringLiteral[] => {
    if (optionValue === undefined) {
        return [];
    }

    if (optionValue.kind === "string") {
        const literalValue = optionValue.stringLiteral.value;

        if (isRelativeSpecifier(literalValue)) {
            return [optionValue.stringLiteral];
        }

        return [];
    }

    return optionValue.stringLiterals.filter((literal) =>
        isRelativeSpecifier(literal.value)
    );
};

/**
 * Create a rule that prefers array form for one top-level Stylelint
 * string-array option.
 */
export const createStylelintConfigPreferArrayOptionRule = (
    definition: Readonly<ConfigOptionRuleDefinition>
): RuleModuleWithDocs<"preferArray", Options> => {
    const { description, message, optionName, ruleName } = definition;

    return createTypedRule({
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

                    const optionProperty = getObjectPropertyByName(
                        configObject,
                        optionName
                    );

                    if (optionProperty === undefined) {
                        return;
                    }

                    const optionValue =
                        getStringArrayOptionValue(optionProperty);

                    if (optionValue?.kind !== "string") {
                        return;
                    }

                    context.report({
                        fix(fixer) {
                            return fixer.replaceText(
                                optionValue.stringLiteral,
                                `[${getLiteralText(sourceCode, optionValue.stringLiteral)}]`
                            );
                        },
                        messageId: "preferArray",
                        node: optionProperty,
                    });
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
                description,
                recommended: true,
                requiresTypeChecking: false,
                url: `https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/${ruleName}`,
            },
            fixable: "code",
            messages: {
                preferArray: message,
            },
            schema: [],
            type: "suggestion",
        },
        name: ruleName,
    }) satisfies RuleModuleWithDocs<"preferArray", Options>;
};

/**
 * Create a rule that disallows duplicate entries in one top-level Stylelint
 * string-array option.
 */
export const createStylelintConfigDisallowDuplicateArrayEntriesRule = (
    definition: Readonly<ConfigOptionRuleDefinition>
): RuleModuleWithDocs<"disallowDuplicates", Options> => {
    const { description, message, optionName, ruleName } = definition;

    return createTypedRule({
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

                    const optionProperty = getObjectPropertyByName(
                        configObject,
                        optionName
                    );

                    if (optionProperty === undefined) {
                        return;
                    }

                    const optionValue =
                        getStringArrayOptionValue(optionProperty);

                    if (optionValue?.kind !== "array") {
                        return;
                    }

                    if (!hasDuplicates(optionValue.stringLiterals)) {
                        return;
                    }

                    context.report({
                        fix(fixer) {
                            const uniqueLiterals = getUniqueLiterals(
                                optionValue.stringLiterals
                            );

                            return fixer.replaceText(
                                optionValue.arrayExpression,
                                toArrayReplacementText(
                                    sourceCode,
                                    uniqueLiterals
                                )
                            );
                        },
                        messageId: "disallowDuplicates",
                        node: optionProperty,
                    });
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
                description,
                recommended: true,
                requiresTypeChecking: false,
                url: `https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/${ruleName}`,
            },
            fixable: "code",
            messages: {
                disallowDuplicates: message,
            },
            schema: [],
            type: "suggestion",
        },
        name: ruleName,
    }) satisfies RuleModuleWithDocs<"disallowDuplicates", Options>;
};

/**
 * Create a rule that enforces sorted entries in one top-level Stylelint
 * string-array option.
 */
export const createStylelintConfigSortArrayEntriesRule = (
    definition: Readonly<ConfigOptionRuleDefinition>
): RuleModuleWithDocs<"sortArray", Options> => {
    const { description, message, optionName, ruleName } = definition;

    return createTypedRule({
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

                    const optionProperty = getObjectPropertyByName(
                        configObject,
                        optionName
                    );

                    if (optionProperty === undefined) {
                        return;
                    }

                    const optionValue =
                        getStringArrayOptionValue(optionProperty);

                    if (optionValue?.kind !== "array") {
                        return;
                    }

                    if (
                        isAlreadySorted(sourceCode, optionValue.stringLiterals)
                    ) {
                        return;
                    }

                    context.report({
                        fix(fixer) {
                            const sortedLiterals = getSortedLiteralTexts(
                                sourceCode,
                                optionValue.stringLiterals
                            );

                            return fixer.replaceText(
                                optionValue.arrayExpression,
                                `[${sortedLiterals.join(", ")}]`
                            );
                        },
                        messageId: "sortArray",
                        node: optionProperty,
                    });
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
                description,
                recommended: true,
                requiresTypeChecking: false,
                url: `https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/${ruleName}`,
            },
            fixable: "code",
            messages: {
                sortArray: message,
            },
            schema: [],
            type: "suggestion",
        },
        name: ruleName,
    }) satisfies RuleModuleWithDocs<"sortArray", Options>;
};

/**
 * Create a rule that disallows relative-path entries in one top-level Stylelint
 * string-array option.
 */
export const createStylelintConfigDisallowRelativeArrayEntriesRule = (
    definition: Readonly<ConfigOptionRuleDefinition>
): RuleModuleWithDocs<"disallowRelative", Options> => {
    const { description, message, optionName, ruleName } = definition;

    return createTypedRule({
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

                    const optionProperty = getObjectPropertyByName(
                        configObject,
                        optionName
                    );

                    if (optionProperty === undefined) {
                        return;
                    }

                    const optionValue =
                        getStringArrayOptionValue(optionProperty);
                    const relativeLiterals = getRelativeLiterals(optionValue);

                    for (const relativeLiteral of relativeLiterals) {
                        context.report({
                            messageId: "disallowRelative",
                            node: relativeLiteral,
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
                description,
                recommended: true,
                requiresTypeChecking: false,
                url: `https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/${ruleName}`,
            },
            messages: {
                disallowRelative: message,
            },
            schema: [],
            type: "suggestion",
        },
        name: ruleName,
    }) satisfies RuleModuleWithDocs<"disallowRelative", Options>;
};
