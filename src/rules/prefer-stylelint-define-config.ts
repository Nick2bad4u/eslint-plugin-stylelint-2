/**
 * @packageDocumentation
 * Encourage `defineConfig()` for authored Stylelint config modules.
 */
import { basename } from "node:path";

import type { TSESTree } from "@typescript-eslint/utils";

import {
    createTypedRule,
    type RuleModuleWithDocs,
    toRuleListener,
} from "../_internal/typed-rule.js";

type Options = readonly [];
type MessageIds = "preferDefineConfig";

const importSource = "stylelint-define-config" as const;
const defineConfigImport = `import { defineConfig } from \"${importSource}\";\n`;
const configBaseNamePattern =
    /^(?:stylelint\.config|\.stylelintrc)\.(?:[cm]?js|[cm]?ts)$/v;

const isConfigFile = (filename: string): boolean =>
    configBaseNamePattern.test(basename(filename));

const hasDefineConfigImport = (body: readonly TSESTree.Node[]): boolean =>
    body.some(
        (statement): statement is TSESTree.ImportDeclaration =>
            statement.type === "ImportDeclaration" &&
            statement.source.value === importSource &&
            statement.specifiers.some(
                (specifier) =>
                    specifier.type === "ImportSpecifier" &&
                    specifier.imported.type === "Identifier" &&
                    specifier.imported.name === "defineConfig"
            )
    );

const getImportInsertionOffset = (body: readonly TSESTree.Node[]): number => {
    const lastImport = [...body]
        .reverse()
        .find(
            (statement): statement is TSESTree.ImportDeclaration =>
                statement.type === "ImportDeclaration"
        );

    return lastImport?.range[1] ?? 0;
};

const preferStylelintDefineConfigRule: RuleModuleWithDocs<MessageIds, Options> =
    createTypedRule<MessageIds, Options>({
        create(context) {
            const sourceCode = context.sourceCode;
            const isCurrentFileAConfig = isConfigFile(context.physicalFilename);

            return toRuleListener({
                ExportDefaultDeclaration(node: unknown) {
                    if (!isCurrentFileAConfig) {
                        return;
                    }

                    const exportDefaultNode =
                        node as TSESTree.ExportDefaultDeclaration;

                    if (
                        exportDefaultNode.declaration.type !==
                        "ObjectExpression"
                    ) {
                        return;
                    }

                    context.report({
                        node: exportDefaultNode.declaration,
                        messageId: "preferDefineConfig",
                        fix(fixer) {
                            const fixes = [
                                fixer.replaceText(
                                    exportDefaultNode.declaration,
                                    `defineConfig(${sourceCode.getText(exportDefaultNode.declaration)})`
                                ),
                            ];

                            if (!hasDefineConfigImport(sourceCode.ast.body)) {
                                const insertionOffset =
                                    getImportInsertionOffset(
                                        sourceCode.ast
                                            .body as readonly TSESTree.Node[]
                                    );

                                fixes.unshift(
                                    fixer.insertTextBeforeRange(
                                        [insertionOffset, insertionOffset],
                                        insertionOffset === 0
                                            ? defineConfigImport
                                            : `\n${defineConfigImport}`
                                    )
                                );
                            }

                            return fixes;
                        },
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
                description:
                    "Prefer wrapping exported Stylelint config objects in `defineConfig()` from `stylelint-define-config`.",
                recommended: true,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-stylelint/docs/rules/prefer-stylelint-define-config",
            },
            fixable: "code",
            messages: {
                preferDefineConfig:
                    "Wrap the exported Stylelint config object in `defineConfig(...)` so editors and TypeScript can infer the config shape.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "prefer-stylelint-define-config",
    });

export default preferStylelintDefineConfigRule;
