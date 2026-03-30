/**
 * @packageDocumentation
 * Helpers for reading top-level Stylelint string-or-string-array options.
 */
import type { TSESTree } from "@typescript-eslint/utils";

const isPropertyExpressionValue = (
    value: Readonly<TSESTree.Property["value"]>
): value is TSESTree.Expression =>
    value.type !== "ArrayPattern" &&
    value.type !== "AssignmentPattern" &&
    value.type !== "ObjectPattern" &&
    value.type !== "TSEmptyBodyFunctionExpression";

const isStringLiteralExpression = (
    value: Readonly<TSESTree.Expression>
): value is TSESTree.StringLiteral =>
    value.type === "Literal" && typeof value.value === "string";

type StringArrayOptionValue = Readonly<
    | {
          arrayExpression: Readonly<TSESTree.ArrayExpression>;
          kind: "array";
          stringLiterals: readonly TSESTree.StringLiteral[];
      }
    | {
          kind: "string";
          stringLiteral: Readonly<TSESTree.StringLiteral>;
      }
>;

/**
 * Parse a top-level object property value as either a string literal or a
 * string-only array expression.
 *
 * @param property - Candidate object property.
 *
 * @returns Parsed value when the property can be handled safely.
 */
export const getStringArrayOptionValue = (
    property: Readonly<TSESTree.Property>
): StringArrayOptionValue | undefined => {
    const propertyValue = property.value;

    if (!isPropertyExpressionValue(propertyValue)) {
        return undefined;
    }

    if (isStringLiteralExpression(propertyValue)) {
        return {
            kind: "string",
            stringLiteral: propertyValue,
        };
    }

    if (propertyValue.type !== "ArrayExpression") {
        return undefined;
    }

    const stringLiterals: TSESTree.StringLiteral[] = [];

    for (const element of propertyValue.elements) {
        if (element === null) {
            return undefined;
        }

        if (element.type === "SpreadElement") {
            return undefined;
        }

        if (!isStringLiteralExpression(element)) {
            return undefined;
        }

        stringLiterals.push(element);
    }

    return {
        arrayExpression: propertyValue,
        kind: "array",
        stringLiterals,
    };
};

/**
 * Determine whether a Stylelint extends/plugins-like entry is a relative path.
 *
 * @param specifier - Candidate extends/plugins string value.
 *
 * @returns `true` when the entry starts with `./`, `../`, `.\\`, or `..\\`.
 */
export const isRelativeSpecifier = (specifier: string): boolean =>
    /^\.{1,2}[/\\]/u.test(specifier);
