/**
 * @packageDocumentation
 * Require Stylelint override `files` declarations to use explicit non-empty glob arrays.
 */
import type { TSESTree } from "@typescript-eslint/utils";

import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import {
    getExportedStylelintConfigObject,
    getObjectPropertyByName,
    isStylelintConfigFile,
} from "../_internal/stylelint-config-object.js";
import { createTypedRule, toRuleListener } from "../_internal/typed-rule.js";

type ArrayExpressionElement = TSESTree.ArrayExpression["elements"][number];
type MessageIds = "requireOverrideFilesArray";
type Options = readonly [];

const isPropertyExpressionValue = (
    value: Readonly<TSESTree.Property["value"]>
): value is TSESTree.Expression =>
    value.type !== "ArrayPattern" &&
    value.type !== "AssignmentPattern" &&
    value.type !== "ObjectPattern" &&
    value.type !== "TSEmptyBodyFunctionExpression";

const isNonEmptyStringLiteralElement = (
    element: Readonly<ArrayExpressionElement>
): boolean =>
    element !== null &&
    element.type === "Literal" &&
    typeof element.value === "string" &&
    element.value.trim().length > 0;

const hasStrictFilesArrayShape = (
    expression: Readonly<TSESTree.Expression>
): boolean => {
    if (expression.type !== "ArrayExpression") {
        return false;
    }

    if (expression.elements.length === 0) {
        return false;
    }

    for (const element of expression.elements) {
        if (isNonEmptyStringLiteralElement(element)) {
            continue;
        }

        return false;
    }

    return true;
};

/** Rule module enforcing array-only override file globs with explicit strings. */
const requireStylelintOverridesFilesArrayRule: RuleModuleWithDocs<
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

                for (const overrideEntry of overridesPropertyValue.elements) {
                    if (overrideEntry?.type !== "ObjectExpression") {
                        continue;
                    }

                    const filesProperty = getObjectPropertyByName(
                        overrideEntry,
                        "files"
                    );

                    if (filesProperty === undefined) {
                        continue;
                    }

                    const filesPropertyValue = filesProperty.value;

                    if (!isPropertyExpressionValue(filesPropertyValue)) {
                        continue;
                    }

                    if (hasStrictFilesArrayShape(filesPropertyValue)) {
                        continue;
                    }

                    context.report({
                        messageId: "requireOverrideFilesArray",
                        node: filesProperty,
                    });
                }
            },
        });
    },
    meta: {
        deprecated: false,
        docs: {
            configs: [
                "stylelint2.configs.recommended",
                "stylelint2.configs.configuration",
                "stylelint2.configs.all",
            ],
            description:
                "require Stylelint override `files` declarations to be explicit non-empty arrays of glob strings.",
            frozen: false,
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/require-stylelint-overrides-files-array",
        },
        messages: {
            requireOverrideFilesArray:
                'Stylelint override `files` must be a non-empty array of non-empty glob strings (for example `["**/*.scss"]`).',
        },
        schema: [],
        type: "suggestion",
    },
    name: "require-stylelint-overrides-files-array",
});

export default requireStylelintOverridesFilesArrayRule;
