/**
 * @packageDocumentation
 * Shared rule creation helpers for eslint-plugin-stylelint-2.
 */
import type { TSESLint } from "@typescript-eslint/utils";
import { ESLintUtils } from "@typescript-eslint/utils";

import type { Stylelint2ConfigReference } from "./stylelint2-config-references.js";

import { createRuleDocsUrl } from "./rule-docs-url.js";

/** CSS/JS-agnostic listener map used by this plugin's rules. */
export type GenericRuleListener = Readonly<
    Record<string, (node: unknown) => void>
>;

/** Plugin-specific metadata extensions for `meta.docs`. */
export type Stylelint2RuleDocs = Readonly<{
    configs: readonly Stylelint2ConfigReference[] | Stylelint2ConfigReference;
    description: string;
    recommended: boolean;
    requiresTypeChecking: boolean;
    url: string;
}>;

/** Rule module contract used by registry and plugin wiring. */
export type RuleModuleWithDocs<
    MessageIds extends string,
    Options extends readonly unknown[],
> = TSESLint.RuleModule<MessageIds, Options> & {
    defaultOptions: Options;
    meta: TSESLint.RuleMetaData<MessageIds> & {
        docs: Stylelint2RuleDocs;
    };
    name: string;
};

/** Identity-preserving rule creator with canonical docs URL enforcement. */
export const createTypedRule = <
    MessageIds extends string,
    Options extends readonly unknown[],
>(
    ruleDefinition: RuleModuleWithDocs<MessageIds, Options>
): RuleModuleWithDocs<MessageIds, Options> => {
    const canonicalDocsUrl = createRuleDocsUrl(ruleDefinition.name);

    if (ruleDefinition.meta.docs.url !== canonicalDocsUrl) {
        throw new TypeError(
            `Rule '${ruleDefinition.name}' must declare docs.url as '${canonicalDocsUrl}'.`
        );
    }

    return ESLintUtils.RuleCreator<Stylelint2RuleDocs>((ruleName) =>
        createRuleDocsUrl(ruleName)
    )({
        ...ruleDefinition,
        meta: {
            ...ruleDefinition.meta,
            defaultOptions: ruleDefinition.defaultOptions,
            docs: ruleDefinition.meta.docs,
        },
    }) as RuleModuleWithDocs<MessageIds, Options>;
};

/** Convert a generic string-keyed listener map into an ESLint rule listener. */
export const toRuleListener = (
    listener: GenericRuleListener
): TSESLint.RuleListener => listener as unknown as TSESLint.RuleListener;

/** Small helper for rule context typing in local helpers. */
export type GenericRuleContext<
    MessageIds extends string,
    Options extends readonly unknown[],
> = Readonly<TSESLint.RuleContext<MessageIds, Options>>;

/** Create a single range replacement fixer for a Stylelint edit. */
export const replaceTextRange = (
    fixer: TSESLint.RuleFixer,
    range: readonly [number, number],
    text: string
): TSESLint.RuleFix => fixer.replaceTextRange([...range], text);
