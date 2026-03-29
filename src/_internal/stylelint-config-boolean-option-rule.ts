/**
 * @packageDocumentation
 * Shared rule factory for requiring top-level boolean Stylelint config options.
 */
import type { TSESTree } from "@typescript-eslint/utils";

import {
    getExportedStylelintConfigObject,
    getObjectPropertyByName,
    isStylelintConfigFile,
} from "./stylelint-config-object.js";
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

type MessageIds = "requireConfigOption";
type Options = readonly [];

const isPropertyExpressionValue = (
    value: Readonly<TSESTree.Property["value"]>
): value is TSESTree.Expression =>
    value.type !== "ArrayPattern" &&
    value.type !== "AssignmentPattern" &&
    value.type !== "ObjectPattern" &&
    value.type !== "TSEmptyBodyFunctionExpression";

const isBooleanTrueLiteral = (
    node: Readonly<TSESTree.Expression>
): node is TSESTree.BooleanLiteral =>
    node.type === "Literal" && node.value === true;

const isOptionEnabled = (value: Readonly<TSESTree.Expression>): boolean => {
    if (isBooleanTrueLiteral(value)) {
        return true;
    }

    if (value.type !== "ArrayExpression") {
        return false;
    }

    const [firstElement] = value.elements;

    return firstElement?.type === "Literal" && firstElement.value === true;
};

const getLineEnding = (text: string): "\n" | "\r\n" =>
    text.includes("\r\n") ? "\r\n" : "\n";

const getIndentation = (node: Readonly<TSESTree.Node> | undefined): string =>
    node === undefined ? "    " : " ".repeat(node.loc.start.column);

/**
 * Create a rule that requires one top-level Stylelint boolean or report-style
 * option to be enabled.
 *
 * @param definition - Static rule definition details.
 *
 * @returns Fully assembled rule module.
 */
export const createStylelintConfigBooleanOptionRule = (
    definition: Readonly<ConfigOptionRuleDefinition>
): RuleModuleWithDocs<MessageIds, Options> => {
    const { description, message, optionName, ruleName } = definition;

    return createTypedRule({
        create(context) {
            if (!isStylelintConfigFile(context.physicalFilename)) {
                return {};
            }

            const sourceCode = context.sourceCode;
            const lineEnding = getLineEnding(sourceCode.text);

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

                    const existingProperty = getObjectPropertyByName(
                        configObject,
                        optionName
                    );

                    if (existingProperty === undefined) {
                        context.report({
                            fix(fixer) {
                                const firstProperty =
                                    configObject.properties[0];

                                if (firstProperty === undefined) {
                                    return fixer.replaceText(
                                        configObject,
                                        `{${lineEnding}    ${optionName}: true,${lineEnding}}`
                                    );
                                }

                                const indentation =
                                    getIndentation(firstProperty);

                                return fixer.insertTextBefore(
                                    firstProperty,
                                    `${optionName}: true,${lineEnding}${indentation}`
                                );
                            },
                            messageId: "requireConfigOption",
                            node: configObject,
                        });
                        return;
                    }

                    const propertyValue = existingProperty.value;

                    if (!isPropertyExpressionValue(propertyValue)) {
                        return;
                    }

                    if (isOptionEnabled(propertyValue)) {
                        return;
                    }

                    context.report({
                        fix(fixer) {
                            if (propertyValue.type === "ArrayExpression") {
                                const [firstElement] = propertyValue.elements;

                                if (
                                    firstElement !== undefined &&
                                    firstElement !== null
                                ) {
                                    return fixer.replaceText(
                                        firstElement,
                                        "true"
                                    );
                                }
                            }

                            return fixer.replaceText(propertyValue, "true");
                        },
                        messageId: "requireConfigOption",
                        node: existingProperty,
                    });
                },
            });
        },
        defaultOptions: [],
        meta: {
            docs: {
                configs: [
                    "stylelint2.configs.recommended",
                    "stylelint2.configs.configs",
                    "stylelint2.configs.all",
                ],
                description,
                recommended: true,
                requiresTypeChecking: false,
                url: `https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/${ruleName}`,
            },
            fixable: "code",
            messages: {
                requireConfigOption: message,
            },
            schema: [],
            type: "suggestion",
        },
        name: ruleName,
    }) satisfies RuleModuleWithDocs<MessageIds, Options>;
};
