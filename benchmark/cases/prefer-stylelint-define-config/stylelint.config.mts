import { defineConfig } from "stylelint-define-config";

const sharedRules = {
    "declaration-no-important": true,
    "font-family-no-missing-generic-family-keyword": true,
};

export default defineConfig({
    reportDisables: true,
    reportUnscopedDisables: true,
    reportNeedlessDisables: true,
    reportInvalidScopeDisables: true,
    reportDescriptionlessDisables: true,
    fix: true,
    cache: true,
    formatter: "string",
    overrides: [
        {
            customSyntax: "postcss-scss",
            files: ["**/*.scss"],
            rules: sharedRules,
        },
    ],
    rules: {
        ...sharedRules,
    },
});
