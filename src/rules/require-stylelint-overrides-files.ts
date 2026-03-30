/**
 * @packageDocumentation
 * Require every Stylelint override entry to declare non-empty `files` matchers.
 */
import type { TSESTree } from "@typescript-eslint/utils";

import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import {
    getExportedStylelintConfigObject,
    getObjectPropertyByName,
    isStylelintConfigFile,
} from "../_internal/stylelint-config-object.js";
import { createTypedRule, toRuleListener } from "../_internal/typed-rule.js";

type MessageIds = "requireOverrideFiles";
type Options = readonly [];

const isPropertyExpressionValue = (
    value: Readonly<TSESTree.Property["value"]>
): value is TSESTree.Expression =>
    value.type !== "ArrayPattern" &&
    value.type !== "AssignmentPattern" &&
    value.type !== "ObjectPattern" &&
    value.type !== "TSEmptyBodyFunctionExpression";

const isNonEmptyStringLiteral = (
    expression: Readonly<TSESTree.Expression>
): expression is TSESTree.StringLiteral =>
    expression.type === "Literal" &&
    typeof expression.value === "string" &&
    expression.value.trim().length > 0;

const hasNonEmptyFilesMatcher = (
    expression: Readonly<TSESTree.Expression>
): boolean => {
    if (isNonEmptyStringLiteral(expression)) {
        return true;
    }

    if (expression.type !== "ArrayExpression") {
        return false;
    }

    for (const element of expression.elements) {
        if (
            element !== null &&
            element.type === "Literal" &&
            typeof element.value === "string" &&
            element.value.trim().length > 0
        ) {
            return true;
        }
    }

    return false;
};

/** Rule module that requires non-empty `files` in each Stylelint override. */
const requireStylelintOverridesFilesRule: RuleModuleWithDocs<
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

                const overridesProperty = getObjectPropertyByName(
                    configObject,
                    "overrides"
                );

                if (overridesProperty === undefined) {
                    return;
                }

                const overridesPropertyValue = overridesProperty.value;

                if (!isPropertyExpressionValue(overridesPropertyValue)) {
                    return;
                }

                if (overridesPropertyValue.type !== "ArrayExpression") {
                    return;
                }

                for (const element of overridesPropertyValue.elements) {
                    if (element?.type !== "ObjectExpression") {
                        continue;
                    }

                    const filesProperty = getObjectPropertyByName(
                        element,
                        "files"
                    );

                    if (filesProperty === undefined) {
                        context.report({
                            messageId: "requireOverrideFiles",
                            node: element,
                        });
                        continue;
                    }

                    const filesPropertyValue = filesProperty.value;

                    if (!isPropertyExpressionValue(filesPropertyValue)) {
                        continue;
                    }

                    if (hasNonEmptyFilesMatcher(filesPropertyValue)) {
                        continue;
                    }

                    context.report({
                        messageId: "requireOverrideFiles",
                        node: filesProperty,
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
                "require every Stylelint override entry to declare non-empty `files` matchers.",
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/require-stylelint-overrides-files",
        },
        messages: {
            requireOverrideFiles:
                "Each Stylelint `overrides` entry must define a non-empty `files` matcher so override scope is explicit.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "require-stylelint-overrides-files",
});

export default requireStylelintOverridesFilesRule;
