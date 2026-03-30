/**
 * @packageDocumentation
 * Require Stylelint plugins package specifiers to resolve from dependencies.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigRequireInstalledPackageOptionRule } from "../_internal/stylelint-config-package-option-rule.js";

/**
 * Rule module that requires package-backed `plugins` entries to exist in
 * workspace dependencies.
 */
const requireStylelintPluginsPackagesInstalledRule: RuleModuleWithDocs<
    string,
    readonly unknown[]
> = createStylelintConfigRequireInstalledPackageOptionRule({
    description:
        "require top-level Stylelint `plugins` package specifiers to be listed in workspace dependencies.",
    message:
        "Add `{{packageName}}` to dependencies for this shared config, or remove the unresolved `plugins` reference.",
    optionName: "plugins",
    ruleName: "require-stylelint-plugins-packages-installed",
});

export default requireStylelintPluginsPackagesInstalledRule;
