/**
 * @packageDocumentation
 * Rule factory helpers for validating package-backed Stylelint option entries.
 */
import type { TSESTree } from "@typescript-eslint/utils";

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
    getDependencyNamesForFile,
    getPackageNameFromSpecifier,
} from "./stylelint-package-dependencies.js";
import {
    createTypedRule,
    type RuleModuleWithDocs,
    toRuleListener,
} from "./typed-rule.js";

type ConfigOptionRuleDefinition = Readonly<{
    description: string;
    message: string;
    optionName: "extends" | "plugins";
    ruleName: string;
}>;
type Options = readonly [];

/**
 * Create a rule that requires package-backed specifiers in one top-level
 * Stylelint string-array option to be present in workspace dependencies.
 */
export const createStylelintConfigRequireInstalledPackageOptionRule = (
    definition: Readonly<ConfigOptionRuleDefinition>
): RuleModuleWithDocs<"requireInstalledPackage", Options> => {
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

                    if (optionValue === undefined) {
                        return;
                    }

                    const dependencyNames = getDependencyNamesForFile(
                        context.physicalFilename,
                        context.cwd
                    );

                    if (dependencyNames === undefined) {
                        return;
                    }

                    const stringLiterals =
                        optionValue.kind === "string"
                            ? [optionValue.stringLiteral]
                            : optionValue.stringLiterals;

                    for (const stringLiteral of stringLiterals) {
                        const specifier = stringLiteral.value.trim();

                        if (
                            specifier.length === 0 ||
                            isRelativeSpecifier(specifier)
                        ) {
                            continue;
                        }

                        const packageName =
                            getPackageNameFromSpecifier(specifier);

                        if (
                            packageName === undefined ||
                            dependencyNames.has(packageName)
                        ) {
                            continue;
                        }

                        context.report({
                            data: {
                                packageName,
                            },
                            messageId: "requireInstalledPackage",
                            node: stringLiteral,
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
                requireInstalledPackage: message,
            },
            schema: [],
            type: "problem",
        },
        name: ruleName,
    }) satisfies RuleModuleWithDocs<"requireInstalledPackage", Options>;
};
