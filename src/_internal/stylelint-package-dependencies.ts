/**
 * @packageDocumentation
 * Workspace dependency lookup helpers for Stylelint config validation rules.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, isAbsolute, resolve } from "node:path";

type DependencyRecord = Readonly<Record<string, string>>;

type PackageJsonLike = Readonly<{
    dependencies?: DependencyRecord;
    devDependencies?: DependencyRecord;
    optionalDependencies?: DependencyRecord;
    peerDependencies?: DependencyRecord;
}>;

const nearestPackageJsonCache = new Map<string, string | undefined>();
const dependencyNameSetCache = new Map<
    string,
    ReadonlySet<string> | undefined
>();

const getNearestPackageJsonPath = (
    startDirectory: string
): string | undefined => {
    const normalizedStartDirectory = resolve(startDirectory);

    if (nearestPackageJsonCache.has(normalizedStartDirectory)) {
        return nearestPackageJsonCache.get(normalizedStartDirectory);
    }

    let currentDirectory = normalizedStartDirectory;

    while (true) {
        const packageJsonPath = resolve(currentDirectory, "package.json");

        if (existsSync(packageJsonPath)) {
            nearestPackageJsonCache.set(
                normalizedStartDirectory,
                packageJsonPath
            );

            return packageJsonPath;
        }

        const parentDirectory = dirname(currentDirectory);

        if (parentDirectory === currentDirectory) {
            nearestPackageJsonCache.set(normalizedStartDirectory, undefined);

            return undefined;
        }

        currentDirectory = parentDirectory;
    }
};

const toDependencyNameSet = (
    packageJson: PackageJsonLike
): ReadonlySet<string> => {
    const dependencyNames = new Set<string>();

    const dependencyRecords: readonly (DependencyRecord | undefined)[] = [
        packageJson.dependencies,
        packageJson.devDependencies,
        packageJson.peerDependencies,
        packageJson.optionalDependencies,
    ];

    for (const dependencyRecord of dependencyRecords) {
        if (dependencyRecord === undefined) {
            continue;
        }

        for (const dependencyName of Object.keys(dependencyRecord)) {
            dependencyNames.add(dependencyName);
        }
    }

    return dependencyNames;
};

const readDependencyNamesFromPackageJson = (
    packageJsonPath: string
): ReadonlySet<string> | undefined => {
    if (dependencyNameSetCache.has(packageJsonPath)) {
        return dependencyNameSetCache.get(packageJsonPath);
    }

    try {
        const packageJsonText = readFileSync(packageJsonPath, "utf8");
        const parsedPackageJson = JSON.parse(packageJsonText) as unknown;

        if (
            parsedPackageJson === null ||
            typeof parsedPackageJson !== "object"
        ) {
            dependencyNameSetCache.set(packageJsonPath, undefined);

            return undefined;
        }

        const dependencyNameSet = toDependencyNameSet(
            parsedPackageJson as PackageJsonLike
        );

        dependencyNameSetCache.set(packageJsonPath, dependencyNameSet);

        return dependencyNameSet;
    } catch {
        dependencyNameSetCache.set(packageJsonPath, undefined);

        return undefined;
    }
};

/**
 * Resolve dependency names from the nearest package.json for a linted file.
 *
 * @param physicalFilename - ESLint physical filename.
 * @param cwd - ESLint execution cwd.
 *
 * @returns Dependency-name set or `undefined` when unavailable.
 */
export const getDependencyNamesForFile = (
    physicalFilename: string,
    cwd: string
): ReadonlySet<string> | undefined => {
    const startDirectory = isAbsolute(physicalFilename)
        ? dirname(physicalFilename)
        : cwd;
    const packageJsonPath =
        getNearestPackageJsonPath(startDirectory) ??
        getNearestPackageJsonPath(resolve(cwd));

    if (packageJsonPath === undefined) {
        return undefined;
    }

    return readDependencyNamesFromPackageJson(packageJsonPath);
};

/**
 * Get package name root from a package specifier or subpath.
 *
 * @param specifier - Package specifier from Stylelint extends/plugins entry.
 *
 * @returns Package name root (for example `stylelint-order`) when parsable.
 */
export const getPackageNameFromSpecifier = (
    specifier: string
): string | undefined => {
    if (specifier.length === 0 || specifier.startsWith("node:")) {
        return undefined;
    }

    if (specifier.startsWith("@")) {
        const [scope, packageName] = specifier.split("/");

        if (scope === undefined || packageName === undefined) {
            return undefined;
        }

        return `${scope}/${packageName}`;
    }

    return specifier.split("/")[0];
};
