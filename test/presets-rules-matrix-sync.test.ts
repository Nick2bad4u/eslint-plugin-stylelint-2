/**
 * @packageDocumentation
 * Contract test that keeps the presets rule matrix synchronized with plugin metadata.
 */
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { describe, expect, it } from "vitest";

import {
    extractPresetsMatrixSection,
    generatePresetsRulesMatrixSectionFromRules,
} from "../scripts/sync-presets-rules-matrix.mjs";

describe("presets rules matrix synchronization", () => {
    it("matches the canonical matrix generated from plugin metadata", async () => {
        const presetsIndexPath = path.join(
            process.cwd(),
            "docs",
            "rules",
            "presets",
            "index.md"
        );
        const presetsMarkdown = await fs.readFile(presetsIndexPath, "utf8");

        expect(extractPresetsMatrixSection(presetsMarkdown).trim()).toBe(
            generatePresetsRulesMatrixSectionFromRules().trim()
        );
    });
});
