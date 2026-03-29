/**
 * @packageDocumentation
 * Vitest coverage for public preset wiring.
 */
import { describe, expect, it } from "vitest";

import { stylelint2ConfigNames } from "../src/_internal/stylelint2-config-references";
import stylelint2Plugin from "../src/plugin";

describe("stylelint-2 plugin configs", () => {
    it("exports exactly the supported config keys", () => {
        expect(Object.keys(stylelint2Plugin.configs).toSorted()).toStrictEqual(
            [...stylelint2ConfigNames].toSorted()
        );
    });

    it("keeps stylesheet and config presets focused on different file sets", () => {
        expect(stylelint2Plugin.configs.stylesheets).toMatchObject({
            files: ["**/*.css"],
            language: "css/css",
        });

        expect(stylelint2Plugin.configs.configs).toMatchObject({
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
});
