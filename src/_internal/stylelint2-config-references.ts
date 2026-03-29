/**
 * @packageDocumentation
 * Shared preset/config reference constants for eslint-plugin-stylelint-2.
 */

/** Canonical flat-config preset keys exposed through `plugin.configs`. */
export const stylelint2ConfigNames = [
    "all",
    "configs",
    "recommended",
    "stylesheets",
] as const;

/** Canonical flat-config preset key type exposed through `plugin.configs`. */
export type Stylelint2ConfigName = (typeof stylelint2ConfigNames)[number];

/** Shared metadata used by docs, README rendering, and config tests. */
export type Stylelint2ConfigMetadata = Readonly<{
    icon: string;
    presetName: `stylelint2:${Stylelint2ConfigName}`;
    readmeOrder: number;
}>;

/** Canonical metadata for each exported preset. */
export const stylelint2ConfigMetadataByName: Readonly<
    Record<Stylelint2ConfigName, Stylelint2ConfigMetadata>
> = {
    all: {
        icon: "🟣",
        presetName: "stylelint2:all",
        readmeOrder: 4,
    },
    configs: {
        icon: "🛠️",
        presetName: "stylelint2:configs",
        readmeOrder: 3,
    },
    recommended: {
        icon: "🟡",
        presetName: "stylelint2:recommended",
        readmeOrder: 1,
    },
    stylesheets: {
        icon: "🎨",
        presetName: "stylelint2:stylesheets",
        readmeOrder: 2,
    },
};

/** Stable README legend/rendering order for preset icons. */
export const stylelint2ConfigNamesByReadmeOrder: readonly Stylelint2ConfigName[] =
    [
        "recommended",
        "stylesheets",
        "configs",
        "all",
    ];

/** Fully-qualified preset references used in rule metadata. */
export const stylelint2ConfigReferenceToName: Readonly<{
    "stylelint2.configs.all": "all";
    "stylelint2.configs.configs": "configs";
    "stylelint2.configs.recommended": "recommended";
    "stylelint2.configs.stylesheets": "stylesheets";
}> = {
    "stylelint2.configs.all": "all",
    "stylelint2.configs.configs": "configs",
    "stylelint2.configs.recommended": "recommended",
    "stylelint2.configs.stylesheets": "stylesheets",
};

/** Fully-qualified preset reference type accepted in docs metadata. */
export type Stylelint2ConfigReference =
    keyof typeof stylelint2ConfigReferenceToName;

/** Check whether a string is a supported preset reference. */
export const isStylelint2ConfigReference = (
    value: string
): value is Stylelint2ConfigReference =>
    Object.hasOwn(stylelint2ConfigReferenceToName, value);
