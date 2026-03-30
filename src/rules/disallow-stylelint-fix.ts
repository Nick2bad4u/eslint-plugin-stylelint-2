/**
 * @packageDocumentation
 * Disallow top-level Stylelint fix configuration in authored config files.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigDisallowedOptionRule } from "../_internal/stylelint-config-disallowed-option-rule.js";

/** Rule module that disallows `fix` in Stylelint config files. */
const disallowStylelintFixRule: RuleModuleWithDocs<string, readonly unknown[]> =
    createStylelintConfigDisallowedOptionRule({
        description:
            "disallow configuring Stylelint's top-level `fix` option inside authored Stylelint config files.",
        message:
            "Remove `fix` from the shared Stylelint config. Autofix behavior is an execution concern that should be controlled by the ESLint `--fix` flow or Stylelint invocation callsite.",
        optionName: "fix",
        ruleName: "disallow-stylelint-fix",
    });

export default disallowStylelintFixRule;
