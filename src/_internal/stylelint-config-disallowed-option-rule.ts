/**
 * @packageDocumentation
 * Shared rule factory for disallowing top-level Stylelint config options that are better handled elsewhere.
 */
import type { TSESTree } from "@typescript-eslint/utils";

import {
    createFixToRemoveObjectProperty,
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

type MessageIds = "disallowConfigOption";
type Options = readonly [];

/**
 * Create a rule that disallows one top-level Stylelint config option.
 *
 * @param definition - Static rule definition details.
 *
 * @returns Fully assembled rule module.
 */
export const createStylelintConfigDisallowedOptionRule = (
    definition: Readonly<ConfigOptionRuleDefinition>
): RuleModuleWithDocs<MessageIds, Options> => {
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

                    const existingProperty = getObjectPropertyByName(
                        configObject,
                        optionName
                    );

                    if (existingProperty === undefined) {
                        return;
                    }

                    context.report({
                        fix(fixer) {
                            return createFixToRemoveObjectProperty({
                                fixer,
                                objectExpression: configObject,
                                property: existingProperty,
                            });
                        },
                        messageId: "disallowConfigOption",
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
                disallowConfigOption: message,
            },
            schema: [],
            type: "suggestion",
        },
        name: ruleName,
    }) satisfies RuleModuleWithDocs<MessageIds, Options>;
};
