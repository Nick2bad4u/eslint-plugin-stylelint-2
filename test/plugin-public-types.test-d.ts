import type {
    Stylelint2ConfigName,
    Stylelint2Plugin,
    Stylelint2RuleId,
    Stylelint2RuleName,
} from "../src/plugin";

import { assertType } from "vitest";

const validConfigName = "recommended";
assertType<Stylelint2ConfigName>(validConfigName);
// @ts-expect-error Invalid preset key must not satisfy Stylelint2ConfigName.
assertType<Stylelint2ConfigName>("recommended-type-checked");

const validRuleId = "stylelint-2/stylelint";
assertType<Stylelint2RuleId>(validRuleId);
// @ts-expect-error Rule ids must include the stylelint-2 namespace.
assertType<Stylelint2RuleId>("stylelint");

declare const pluginContract: Stylelint2Plugin;

assertType<Stylelint2RuleName>("stylelint");
assertType(pluginContract.configs.recommended);
assertType(pluginContract.configs.stylesheets);
assertType(pluginContract.configs.configs);
assertType(pluginContract.meta.name);
assertType(pluginContract.meta.namespace);
