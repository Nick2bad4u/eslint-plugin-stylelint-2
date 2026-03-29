import type { ESLint } from "eslint";

import stylelint2Plugin from "../src/plugin";
import { assertType } from "vitest";

assertType<ESLint.Plugin>(stylelint2Plugin);
assertType<ESLint.Plugin["configs"] | undefined>(stylelint2Plugin.configs);
assertType<string | undefined>(stylelint2Plugin.meta?.name);
assertType<string | undefined>(stylelint2Plugin.meta?.version);
assertType<ESLint.Plugin["rules"] | undefined>(stylelint2Plugin.rules);
