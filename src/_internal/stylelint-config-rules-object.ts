/**
 * @packageDocumentation
 * Shared helpers for accessing top-level Stylelint `rules` object entries.
 */
import type { TSESTree } from "@typescript-eslint/utils";

import { getObjectPropertyByName } from "./stylelint-config-object.js";

const isPropertyExpressionValue = (
    value: Readonly<TSESTree.Property["value"]>
): value is TSESTree.Expression =>
    value.type !== "ArrayPattern" &&
    value.type !== "AssignmentPattern" &&
    value.type !== "ObjectPattern" &&
    value.type !== "TSEmptyBodyFunctionExpression";

/**
 * Resolve the top-level Stylelint `rules` object expression.
 *
 * @param configObject - Exported Stylelint config object expression.
 *
 * @returns The `rules` object when present and statically analyzable.
 */
export const getTopLevelRulesObject = (
    configObject: Readonly<TSESTree.ObjectExpression>
): TSESTree.ObjectExpression | undefined => {
    const rulesProperty = getObjectPropertyByName(configObject, "rules");

    if (rulesProperty === undefined) {
        return undefined;
    }

    const rulesPropertyValue = rulesProperty.value;

    if (!isPropertyExpressionValue(rulesPropertyValue)) {
        return undefined;
    }

    return rulesPropertyValue.type === "ObjectExpression"
        ? rulesPropertyValue
        : undefined;
};

/**
 * Collect direct rule entries from a `rules` object (excluding spread elements
 * and methods).
 *
 * @param rulesObject - `rules` object expression.
 *
 * @returns Rule entry properties in source order.
 */
export const getTopLevelRuleEntries = (
    rulesObject: Readonly<TSESTree.ObjectExpression>
): readonly TSESTree.Property[] => {
    const ruleEntries: TSESTree.Property[] = [];

    for (const property of rulesObject.properties) {
        if (property.type !== "Property") {
            continue;
        }

        if (property.kind !== "init") {
            continue;
        }

        ruleEntries.push(property);
    }

    return ruleEntries;
};
