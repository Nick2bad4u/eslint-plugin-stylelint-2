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
const packageName = packageJson.name;

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
        expect(
            Object.keys(stylelint2Plugin.rules).toSorted((left, right) =>
                left.localeCompare(right)
            )
        ).toStrictEqual([
            "disallow-stylelint-cache",
            "disallow-stylelint-default-severity",
            "disallow-stylelint-fix",
            "disallow-stylelint-formatter",
            "disallow-stylelint-ignore-disables",
            "disallow-stylelint-ignore-files",
            "prefer-stylelint-define-config",
            "prefer-stylelint-report-descriptionless-disables",
            "prefer-stylelint-report-invalid-scope-disables",
            "prefer-stylelint-report-needless-disables",
            "prefer-stylelint-report-unscoped-disables",
            "stylelint",
        ]);
    });

    it("resolves the package through self-reference ESM import", async () => {
        // eslint-disable-next-line no-unsanitized/method -- packageName comes from the local package.json fixture for this repository.
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
