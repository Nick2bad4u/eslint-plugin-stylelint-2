/**
 * @packageDocumentation
 * Vitest coverage for public preset wiring.
 */
import { describe, expect, it } from "vitest";

import { stylelint2ConfigNames } from "../src/_internal/stylelint2-config-references";
import stylelint2Plugin from "../src/plugin";

const sortStrings = (values: readonly string[]): string[] => {
    const sortedValues: string[] = [];

    for (const value of values) {
        let insertionIndex = sortedValues.length;

        for (const [index, candidate] of sortedValues.entries()) {
            if (value.localeCompare(candidate) < 0) {
                insertionIndex = index;
                break;
            }
        }

        sortedValues.splice(insertionIndex, 0, value);
    }

    return sortedValues;
};

describe("stylelint-2 plugin configs", () => {
    it("exports exactly the supported config keys", () => {
        expect(
            sortStrings(Object.keys(stylelint2Plugin.configs))
        ).toStrictEqual(sortStrings(stylelint2ConfigNames));
    });

    it("keeps stylesheet and config presets focused on different file sets", () => {
        expect(stylelint2Plugin.configs.stylelintOnly).toMatchObject({
            files: ["**/*.css"],
            language: "css/css",
        });

        expect(stylelint2Plugin.configs.configuration).toMatchObject({
            files: [
                "**/stylelint.config.{js,mjs,cjs,ts,mts,cts}",
                "**/.stylelintrc.{js,mjs,cjs,ts,mts,cts}",
            ],
        });
    });

    it("keeps recommended and all as flat-config arrays", () => {
        expect(
            Array.isArray(stylelint2Plugin.configs.recommended)
        ).toBeTruthy();
        expect(Array.isArray(stylelint2Plugin.configs.all)).toBeTruthy();
        expect(stylelint2Plugin.configs.recommended).toHaveLength(2);
        expect(stylelint2Plugin.configs.all).toHaveLength(2);
    });

    it("keeps the stylesheet preset focused on the bridge rule only", () => {
        expect(stylelint2Plugin.configs.stylelintOnly).toMatchObject({
            rules: {
                "stylelint-2/stylelint": "error",
            },
        });
    });

    it("keeps the config preset focused on the config-hygiene rules", () => {
        expect(stylelint2Plugin.configs.configuration).toMatchObject({
            rules: {
                "stylelint-2/disallow-stylelint-allow-empty-input": "warn",
                "stylelint-2/disallow-stylelint-cache": "warn",
                "stylelint-2/disallow-stylelint-configuration-comment": "warn",
                "stylelint-2/disallow-stylelint-custom-syntax": "warn",
                "stylelint-2/disallow-stylelint-default-severity": "warn",
                "stylelint-2/disallow-stylelint-duplicate-extends": "warn",
                "stylelint-2/disallow-stylelint-duplicate-plugins": "warn",
                "stylelint-2/disallow-stylelint-duplicate-rule-option-values":
                    "warn",
                "stylelint-2/disallow-stylelint-empty-rules-object": "warn",
                "stylelint-2/disallow-stylelint-fix": "warn",
                "stylelint-2/disallow-stylelint-formatter": "warn",
                "stylelint-2/disallow-stylelint-ignore-disables": "warn",
                "stylelint-2/disallow-stylelint-ignore-files": "warn",
                "stylelint-2/disallow-stylelint-null-rule-config": "warn",
                "stylelint-2/disallow-stylelint-overrides-runtime-options":
                    "warn",
                "stylelint-2/disallow-stylelint-processors": "warn",
                "stylelint-2/disallow-stylelint-relative-extends-paths": "warn",
                "stylelint-2/disallow-stylelint-relative-plugin-paths": "warn",
                "stylelint-2/prefer-stylelint-define-config": "warn",
                "stylelint-2/prefer-stylelint-extends-array": "warn",
                "stylelint-2/prefer-stylelint-plugins-array": "warn",
                "stylelint-2/prefer-stylelint-report-descriptionless-disables":
                    "warn",
                "stylelint-2/prefer-stylelint-report-invalid-scope-disables":
                    "warn",
                "stylelint-2/prefer-stylelint-report-needless-disables": "warn",
                "stylelint-2/prefer-stylelint-report-unscoped-disables": "warn",
                "stylelint-2/require-stylelint-config-file-naming-convention":
                    "warn",
                "stylelint-2/require-stylelint-custom-syntax-in-overrides":
                    "warn",
                "stylelint-2/require-stylelint-extends-packages-installed":
                    "warn",
                "stylelint-2/require-stylelint-overrides-configuration": "warn",
                "stylelint-2/require-stylelint-overrides-files": "warn",
                "stylelint-2/require-stylelint-overrides-files-array": "warn",
                "stylelint-2/require-stylelint-plugins-packages-installed":
                    "warn",
                "stylelint-2/require-stylelint-report-disables": "warn",
                "stylelint-2/require-stylelint-rules-object": "warn",
                "stylelint-2/sort-stylelint-extends": "warn",
                "stylelint-2/sort-stylelint-plugins": "warn",
                "stylelint-2/sort-stylelint-rule-keys": "warn",
            },
        });
    });

    it("keeps the legacy alias presets wired to the preferred preset names", () => {
        expect(stylelint2Plugin.configs.stylesheets).toBe(
            stylelint2Plugin.configs.stylelintOnly
        );
        expect(stylelint2Plugin.configs.configs).toBe(
            stylelint2Plugin.configs.configuration
        );
    });
});
