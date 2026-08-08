import { appendFile, readFile, stat } from "node:fs/promises";
import { EOL } from "node:os";
import { resolve } from "node:path";
import process from "node:process";

if (process.env["GITHUB_ACTIONS"] === "true") {
    const githubPathFile = process.env["GITHUB_PATH"];
    if (githubPathFile === undefined || githubPathFile.length === 0) {
        throw new Error("GITHUB_PATH is required in GitHub Actions.");
    }

    const localBinPath = resolve("node_modules", ".bin");
    const localBinStats = await stat(localBinPath);
    if (!localBinStats.isDirectory()) {
        throw new Error(
            `Local binary path is not a directory: ${localBinPath}`
        );
    }

    const pathEntries = (await readFile(githubPathFile, "utf8"))
        .split(/\r?\n/u)
        .filter((entry) => entry.length > 0);

    if (!pathEntries.includes(localBinPath)) {
        await appendFile(githubPathFile, `${localBinPath}${EOL}`, "utf8");
    }
}
