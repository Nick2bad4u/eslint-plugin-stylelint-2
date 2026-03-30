/**
 * @packageDocumentation
 * Require Stylelint extends package specifiers to resolve from dependencies.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigRequireInstalledPackageOptionRule } from "../_internal/stylelint-config-package-option-rule.js";

/**
 * Rule module that requires package-backed `extends` entries to exist in
 * workspace dependencies.
 */
const requireStylelintExtendsPackagesInstalledRule: RuleModuleWithDocs<
    string,
    readonly unknown[]
> = createStylelintConfigRequireInstalledPackageOptionRule({
    description:
        "require top-level Stylelint `extends` package specifiers to be listed in workspace dependencies.",
    message:
        "Add `{{packageName}}` to dependencies for this shared config, or remove the unresolved `extends` reference.",
    optionName: "extends",
    ruleName: "require-stylelint-extends-packages-installed",
});

export default requireStylelintExtendsPackagesInstalledRule;
