/**
 * @packageDocumentation
 * Bridge Stylelint diagnostics and computed autofixes into ESLint.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    createTypedRule,
    replaceTextRange,
    type RuleModuleWithDocs,
    toRuleListener,
} from "../_internal/typed-rule.js";
import { runStylelintSynchronously } from "../_internal/stylelint-runner.js";

type StylelintRuleOption = Readonly<{
    allowEmptyInput?: boolean;
    configBasedir?: string;
    configFile?: string;
    customSyntax?: string;
    quiet?: boolean;
}>;

type Options = readonly [StylelintRuleOption?];
type MessageIds =
    | "stylelintConfigWarning"
    | "stylelintParseError"
    | "stylelintProblem";

const defaultOptions = [{}] as const satisfies Options;
type ReportLocation = Readonly<{
    end: { column: number; line: number };
    start: { column: number; line: number };
}>;

const toEslintLoc = (
    problem: Readonly<{
        column: number;
        endColumn?: number;
        endLine?: number;
        line: number;
    }>
): ReportLocation => ({
    end: {
        column: Math.max((problem.endColumn ?? problem.column + 1) - 1, 0),
        line: problem.endLine ?? problem.line,
    },
    start: {
        column: Math.max(problem.column - 1, 0),
        line: problem.line,
    },
});

const stylelintRule: RuleModuleWithDocs<MessageIds, Options> = createTypedRule<
    MessageIds,
    Options
>({
    create(context) {
        return toRuleListener({
            StyleSheet() {
                const [rawOptions = {}] = context.options;
                const sourceCode = context.sourceCode;
                const lintResult = runStylelintSynchronously({
                    code: sourceCode.text,
                    codeFilename: context.physicalFilename,
                    cwd: context.cwd,
                    ...(rawOptions.allowEmptyInput === undefined
                        ? {}
                        : { allowEmptyInput: rawOptions.allowEmptyInput }),
                    ...(rawOptions.configBasedir === undefined
                        ? {}
                        : { configBasedir: rawOptions.configBasedir }),
                    ...(rawOptions.configFile === undefined
                        ? {}
                        : { configFile: rawOptions.configFile }),
                    ...(rawOptions.customSyntax === undefined
                        ? {}
                        : { customSyntax: rawOptions.customSyntax }),
                    ...(rawOptions.quiet === undefined
                        ? {}
                        : { quiet: rawOptions.quiet }),
                });
                const reportNode = sourceCode.ast as unknown as TSESTree.Node;

                for (const parseError of lintResult.parseErrors) {
                    context.report({
                        loc: toEslintLoc(parseError),
                        messageId: "stylelintParseError",
                        node: reportNode,
                        data: {
                            message: parseError.message,
                        },
                    });
                }

                for (const warning of lintResult.warnings) {
                    const fixData = warning.fix;

                    context.report({
                        loc: toEslintLoc(warning),
                        messageId: "stylelintProblem",
                        node: reportNode,
                        data: {
                            rule: warning.rule,
                            text: warning.text,
                        },
                        ...(fixData === undefined
                            ? {}
                            : {
                                  fix: (fixer: TSESLint.RuleFixer) =>
                                      replaceTextRange(
                                          fixer,
                                          fixData.range,
                                          fixData.text
                                      ),
                              }),
                    });
                }

                for (const invalidOptionWarning of lintResult.invalidOptionWarnings) {
                    context.report({
                        loc: {
                            end: { column: 0, line: 1 },
                            start: { column: 0, line: 1 },
                        },
                        messageId: "stylelintConfigWarning",
                        node: reportNode,
                        data: {
                            message: invalidOptionWarning,
                        },
                    });
                }

                for (const deprecation of lintResult.deprecations) {
                    context.report({
                        loc: {
                            end: { column: 0, line: 1 },
                            start: { column: 0, line: 1 },
                        },
                        messageId: "stylelintConfigWarning",
                        node: reportNode,
                        data: {
                            message: deprecation,
                        },
                    });
                }
            },
        });
    },
    defaultOptions,
    meta: {
        docs: {
            configs: [
                "stylelint2.configs.recommended",
                "stylelint2.configs.stylesheets",
                "stylelint2.configs.all",
            ],
            description:
                "Run Stylelint against CSS files from ESLint and surface Stylelint autofixes through ESLint's fixer pipeline.",
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-stylelint/docs/rules/stylelint",
        },
        fixable: "code",
        messages: {
            stylelintConfigWarning:
                "Stylelint configuration warning: {{message}}",
            stylelintParseError: "Stylelint parse error: {{message}}",
            stylelintProblem: "Stylelint ({{rule}}): {{text}}",
        },
        schema: [
            {
                additionalProperties: false,
                properties: {
                    allowEmptyInput: { type: "boolean" },
                    configBasedir: { type: "string" },
                    configFile: { type: "string" },
                    customSyntax: { type: "string" },
                    quiet: { type: "boolean" },
                },
                type: "object",
            },
        ],
        type: "layout",
    },
    name: "stylelint",
});

export default stylelintRule;
