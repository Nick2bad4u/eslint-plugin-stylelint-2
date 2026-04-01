/**
 * @packageDocumentation
 * Disallow runtime-only Stylelint options inside `overrides` entries.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import {
    createFixToRemoveObjectProperty,
    getExportedStylelintConfigObject,
    isPropertyNamed,
    isStylelintConfigFile,
} from "../_internal/stylelint-config-object.js";
import { createTypedRule, toRuleListener } from "../_internal/typed-rule.js";

type MessageIds = "disallowRuntimeOptionInOverride";
type Options = readonly [];

const isDisallowedRuntimeOptionName = (
    name: string
): name is "allowEmptyInput" | "cache" | "fix" =>
    name === "allowEmptyInput" || name === "cache" || name === "fix";

const isPropertyExpressionValue = (
    value: Readonly<TSESTree.Property["value"]>
): value is TSESTree.Expression =>
    value.type !== "ArrayPattern" &&
    value.type !== "AssignmentPattern" &&
    value.type !== "ObjectPattern" &&
    value.type !== "TSEmptyBodyFunctionExpression";

const getOverridesEntries = (
    configObject: Readonly<TSESTree.ObjectExpression>
): readonly TSESTree.ObjectExpression[] => {
    for (const propertyNode of configObject.properties) {
        if (
            propertyNode.type !== "Property" ||
            !isPropertyNamed(propertyNode, "overrides")
        ) {
            continue;
        }

        const propertyValue = propertyNode.value;

        if (!isPropertyExpressionValue(propertyValue)) {
            return [];
        }

        if (propertyValue.type !== "ArrayExpression") {
            return [];
        }

        const overrideEntries: TSESTree.ObjectExpression[] = [];

        for (const entry of propertyValue.elements) {
            if (entry?.type !== "ObjectExpression") {
                continue;
            }

            overrideEntries.push(entry);
        }

        return overrideEntries;
    }

    return [];
};

const getRuntimeOptionName = (
    propertyNode: Readonly<TSESTree.Property>
): string | undefined => {
    if (propertyNode.computed) {
        return undefined;
    }

    const propertyKey = propertyNode.key;
    let propertyName: string | undefined = undefined;

    if (propertyKey.type === "Identifier") {
        propertyName = propertyKey.name;
    } else if (
        propertyKey.type === "Literal" &&
        typeof propertyKey.value === "string"
    ) {
        propertyName = propertyKey.value;
    }

    if (propertyName === undefined) {
        return undefined;
    }

    return isDisallowedRuntimeOptionName(propertyName)
        ? propertyName
        : undefined;
};

const reportRuntimeOption = (
    context: Readonly<TSESLint.RuleContext<MessageIds, Options>>,
    overrideEntry: Readonly<TSESTree.ObjectExpression>,
    propertyNode: Readonly<TSESTree.Property>,
    optionName: string
): void => {
    context.report({
        data: {
            optionName,
        },
        fix(fixer) {
            return createFixToRemoveObjectProperty({
                fixer,
                objectExpression: overrideEntry,
                property: propertyNode,
            });
        },
        messageId: "disallowRuntimeOptionInOverride",
        node: propertyNode,
    });
};

/** Rule module that disallows runtime options in Stylelint overrides. */
const disallowStylelintOverridesRuntimeOptionsRule: RuleModuleWithDocs<
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

                const overridesEntries = getOverridesEntries(configObject);

                for (const overrideEntry of overridesEntries) {
                    for (const propertyNode of overrideEntry.properties) {
                        if (propertyNode.type !== "Property") {
                            continue;
                        }

                        const runtimeOptionName =
                            getRuntimeOptionName(propertyNode);

                        if (runtimeOptionName === undefined) {
                            continue;
                        }

                        reportRuntimeOption(
                            context,
                            overrideEntry,
                            propertyNode,
                            runtimeOptionName
                        );
                    }
                }
            },
        });
    },
    defaultOptions: [],
    meta: {
        deprecated: false,
        docs: {
            configs: [
                "stylelint2.configs.recommended",
                "stylelint2.configs.configuration",
                "stylelint2.configs.all",
            ],
            description:
                "disallow runtime-only Stylelint options (`allowEmptyInput`, `cache`, `fix`) inside `overrides` entries.",
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-overrides-runtime-options",
        },
        fixable: "code",
        messages: {
            disallowRuntimeOptionInOverride:
                "Move `{{optionName}}` out of `overrides`. This runtime option should not be configured per-file and belongs at invocation scope instead.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "disallow-stylelint-overrides-runtime-options",
});

export default disallowStylelintOverridesRuntimeOptionsRule;
