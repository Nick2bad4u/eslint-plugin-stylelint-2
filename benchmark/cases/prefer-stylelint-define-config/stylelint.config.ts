import { defineConfig } from "stylelint-define-config";

export default defineConfig({
    reportDisables: true,
    reportUnscopedDisables: true,
    reportNeedlessDisables: true,
    reportInvalidScopeDisables: true,
    reportDescriptionlessDisables: true,
    fix: true,
    cache: true,
    formatter: "string",
    extends: ["stylelint-config-standard"],
    rules: {
        "alpha-value-notation": "number",
        "color-no-invalid-hex": true,
    },
});
