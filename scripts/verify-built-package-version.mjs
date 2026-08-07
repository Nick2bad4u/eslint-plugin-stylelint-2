/**
 * Verify that both published runtime entrypoints expose the manifest version.
 */
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";

import esmPlugin from "../dist/plugin.js";

const requireFromScript = createRequire(import.meta.url);
const cjsPlugin = requireFromScript("../dist/plugin.cjs");
const packageJson = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8")
);

if (
    typeof packageJson !== "object" ||
    packageJson === null ||
    !("version" in packageJson) ||
    typeof packageJson.version !== "string"
) {
    throw new TypeError("package.json must contain a string version field.");
}

const expectedVersion = packageJson.version;
const entrypoints = [
    ["ESM", esmPlugin],
    ["CommonJS", cjsPlugin],
];

for (const [entrypointName, plugin] of entrypoints) {
    if (
        typeof plugin !== "object" ||
        plugin === null ||
        !("meta" in plugin) ||
        typeof plugin.meta !== "object" ||
        plugin.meta === null ||
        !("version" in plugin.meta) ||
        plugin.meta.version !== expectedVersion
    ) {
        throw new Error(
            `${entrypointName} entrypoint does not expose version ${expectedVersion}.`
        );
    }
}

console.log(
    `Verified ESM and CommonJS package entrypoints at version ${expectedVersion}.`
);
