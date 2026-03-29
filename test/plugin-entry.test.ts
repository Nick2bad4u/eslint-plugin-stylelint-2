/**
 * @packageDocumentation
 * Vitest coverage for the public plugin entry module.
 */
import { createRequire } from "node:module";
import { describe, expect, it } from "vitest";

import stylelint2Plugin from "../src/plugin";

const requireFromTestModule = createRequire(import.meta.url);
const packageJson = requireFromTestModule("../package.json") as {
    name: string;
    version: string;
};

const expectedPluginVersion = packageJson.version;

describe("plugin entry module", () => {
    it("exports the default plugin object with rule and config registries", () => {
        expect(stylelint2Plugin).toEqual(
            expect.objectContaining({
                configs: expect.any(Object),
                meta: expect.any(Object),
                processors: expect.any(Object),
                rules: expect.any(Object),
            })
        );

        expect(stylelint2Plugin.meta).toEqual(
            expect.objectContaining({
                name: "eslint-plugin-stylelint-2",
                namespace: "stylelint-2",
                version: expectedPluginVersion,
            })
        );
    });

    it("exports the rebuilt rule names", () => {
        expect(Object.keys(stylelint2Plugin.rules).toSorted()).toStrictEqual([
            "prefer-stylelint-define-config",
            "stylelint",
        ]);
    });

    it("resolves the package through self-reference ESM import", async () => {
        const packageName = packageJson.name ?? "eslint-plugin-stylelint-2";
        const runtimeModule = (await import(packageName)) as {
            default: unknown;
        };

        expect(runtimeModule.default).toEqual(
            expect.objectContaining({
                meta: expect.objectContaining({
                    name: "eslint-plugin-stylelint-2",
                    namespace: "stylelint-2",
                    version: expectedPluginVersion,
                }),
            })
        );
    });

    it("resolves the package through self-reference CJS require", () => {
        const runtimePlugin = requireFromTestModule(
            "eslint-plugin-stylelint-2"
        ) as {
            meta?: {
                name?: string;
                namespace?: string;
                version?: string;
            };
        };

        expect(runtimePlugin.meta).toEqual(
            expect.objectContaining({
                name: "eslint-plugin-stylelint-2",
                namespace: "stylelint-2",
                version: expectedPluginVersion,
            })
        );
    });
});
