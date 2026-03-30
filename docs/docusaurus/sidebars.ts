import { existsSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

type SidebarDocItem = {
    className?: string;
    id: string;
    label: string;
    type: "doc";
};

type SidebarLinkItem = {
    className?: string;
    href: string;
    label: string;
    type: "link";
};

type SidebarGeneratedIndexLink = {
    description?: string;
    title?: string;
    type: "generated-index";
};

type SidebarDocCategoryLink = {
    id: string;
    type: "doc";
};

type SidebarCategoryItem = {
    className?: string;
    collapsed?: boolean;
    collapsible?: boolean;
    customProps?: Record<string, string>;
    items: SidebarItem[];
    label: string;
    link?: SidebarDocCategoryLink | SidebarGeneratedIndexLink;
    type: "category";
};

type SidebarItem = SidebarCategoryItem | SidebarDocItem | SidebarLinkItem;

const requireFromSidebar = createRequire(import.meta.url);
const sidebarDirectoryPath = dirname(fileURLToPath(import.meta.url));
const typedocSidebarPath = resolve(
    sidebarDirectoryPath,
    "site-docs",
    "developer",
    "api",
    "typedoc-sidebar.cjs"
);
const typedocIndexPath = resolve(
    sidebarDirectoryPath,
    "site-docs",
    "developer",
    "api",
    "index.md"
);
const rulesDirectoryPath = join(sidebarDirectoryPath, "..", "rules");
const nonRuleDocIds = new Set(["getting-started", "overview"]);
const pinnedRuleDocIds = ["stylelint"];
const pinnedRuleDocIdSet = new Set(pinnedRuleDocIds);

const isSidebarCategoryItem = (
    item: SidebarItem
): item is SidebarCategoryItem => item.type === "category";

const isSidebarDocItem = (item: SidebarItem): item is SidebarDocItem =>
    item.type === "doc";

const getTypedocClassName = (
    label: string,
    depth: number
): string | undefined => {
    if (depth === 0 && label === "plugin") {
        return "sb-cat-api-public";
    }

    if (depth === 0 && label === "_internal") {
        return "sb-cat-api-internal";
    }

    if (label === "Functions") {
        return "sb-cat-api-functions";
    }

    if (label === "Type Aliases") {
        return "sb-cat-api-types";
    }

    if (label === "Variables") {
        return "sb-cat-api-variables";
    }

    return undefined;
};

const normalizeTypedocDocId = (documentId: string): string =>
    documentId
        .replace(/^\.\.\/site-docs\//u, "")
        .replace(
            /stylelintconfig-references/gu,
            "stylelint2-config-references"
        );

const decorateTypedocSidebarItems = (
    items: SidebarItem[],
    depth = 0
): SidebarItem[] =>
    items.map((item) => {
        if (!isSidebarCategoryItem(item)) {
            if (!isSidebarDocItem(item)) {
                return item;
            }

            return {
                ...item,
                id: normalizeTypedocDocId(item.id),
            };
        }

        const typedocClassName = getTypedocClassName(item.label, depth);

        return {
            ...item,
            ...(typedocClassName === undefined
                ? {}
                : { className: typedocClassName }),
            ...(item.link?.type === "doc"
                ? {
                      link: {
                          ...item.link,
                          id: normalizeTypedocDocId(item.link.id),
                      },
                  }
                : {}),
            items: decorateTypedocSidebarItems(item.items, depth + 1),
        };
    });

const loadTypedocSidebarItems = (): SidebarItem[] => {
    if (!existsSync(typedocSidebarPath)) {
        return [];
    }

    const loadedItems = requireFromSidebar(typedocSidebarPath) as unknown;

    if (!Array.isArray(loadedItems)) {
        return [];
    }

    return decorateTypedocSidebarItems(loadedItems as SidebarItem[]);
};

const isMarkdownFile = (fileName: string): boolean => fileName.endsWith(".md");
const toRuleDocId = (fileName: string): string => fileName.slice(0, -3);

const discoveredRuleDocIds = readdirSync(rulesDirectoryPath, {
    withFileTypes: true,
})
    .filter((entry) => entry.isFile() && isMarkdownFile(entry.name))
    .map((entry) => toRuleDocId(entry.name))
    .filter((ruleDocId) => !nonRuleDocIds.has(ruleDocId));

const ruleDocIds = [
    ...pinnedRuleDocIds.filter((ruleDocId) =>
        discoveredRuleDocIds.includes(ruleDocId)
    ),
    ...discoveredRuleDocIds
        .filter((ruleDocId) => !pinnedRuleDocIdSet.has(ruleDocId))
        .sort((left, right) => left.localeCompare(right)),
];

const toNumberedRuleLabel = (ruleNumber: number, ruleDocId: string): string =>
    `${String(ruleNumber).padStart(2, "0")} ${ruleDocId}`;

const stylelintRuleLinkItems: SidebarLinkItem[] = ruleDocIds.map(
    (ruleDocId, index) => ({
        href: `/docs/rules/${ruleDocId}`,
        label: toNumberedRuleLabel(index + 1, ruleDocId),
        type: "link",
    })
);

const typedocSidebarItems = loadTypedocSidebarItems();
const developerSidebarItems: SidebarItem[] = [];

if (existsSync(typedocIndexPath)) {
    developerSidebarItems.push({
        className: "sb-cat-api-overview",
        id: "developer/api/index",
        label: "📘 API Overview",
        type: "doc",
    });
}

if (typedocSidebarItems.length > 0) {
    developerSidebarItems.push({
        className: "sb-cat-api-runtime",
        collapsed: false,
        collapsible: true,
        items: typedocSidebarItems,
        label: "🧠 TypeDoc API",
        link: {
            description:
                "Generated API reference for the public plugin surface and internal helpers.",
            title: "TypeDoc API",
            type: "generated-index",
        },
        type: "category",
    });
}

const docsSidebarItems: SidebarItem[] = [
    {
        className: "sb-doc-overview",
        id: "intro",
        label: "🏁 Overview",
        type: "doc",
    },
    {
        className: "sb-doc-getting-started",
        id: "getting-started",
        label: "🚀 Getting Started",
        type: "doc",
    },
    {
        className: "sb-cat-guides",
        collapsed: false,
        items: [
            {
                className: "sb-guide-stylelint-bridge",
                id: "stylelint-bridge",
                label: "🎨 Stylelint bridge",
                type: "doc",
            },
            {
                className: "sb-guide-config-authoring",
                id: "config-authoring",
                label: "🛠️ Config authoring",
                type: "doc",
            },
            {
                className: "sb-guide-faq",
                id: "faq",
                label: "❓ FAQ",
                type: "doc",
            },
        ],
        label: "🧭 Guides",
        type: "category",
    },
    {
        className: "sb-cat-presets",
        collapsed: true,
        collapsible: true,
        items: [
            {
                href: "/docs/rules/presets",
                label: "🎛️ Preset Reference",
                type: "link",
            },
            {
                className: "sb-preset-recommended",
                href: "/docs/rules/presets/recommended",
                label: "🟡 Recommended",
                type: "link",
            },
            {
                className: "sb-preset-stylelint-only",
                href: "/docs/rules/presets/stylelint-only",
                label: "🎨 Stylelint bridge only",
                type: "link",
            },
            {
                className: "sb-preset-configuration",
                href: "/docs/rules/presets/configuration",
                label: "🔧 Configuration only",
                type: "link",
            },
            {
                className: "sb-preset-all",
                href: "/docs/rules/presets/all",
                label: "🟣 All",
                type: "link",
            },
        ],
        label: "🎛️ Presets",
        type: "category",
    },
    {
        className: "sb-cat-rules",
        collapsed: false,
        collapsible: true,
        items: [
            {
                href: "/docs/rules/overview",
                label: "🏁 Rules Overview",
                type: "link",
            },
            {
                className: "sb-cat-rules-stylelint",
                collapsed: false,
                collapsible: true,
                items: [
                    {
                        href: "/docs/rules/category/stylelint",
                        label: "📚 stylelint Rule Catalog",
                        type: "link",
                    },
                    ...stylelintRuleLinkItems,
                ],
                label: "stylelint",
                type: "category",
            },
        ],
        label: "📏 Rules",
        type: "category",
    },
];

const sidebars = {
    developer: developerSidebarItems,
    docs: docsSidebarItems,
} as unknown as SidebarsConfig;

export default sidebars;
