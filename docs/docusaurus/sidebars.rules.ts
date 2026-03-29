import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

/** Complete sidebar structure for docs site navigation. */
const sidebars: SidebarsConfig = {
    rules: [
        {
            className: "sb-doc-overview",
            id: "overview",
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
            className: "sb-cat-presets",
            collapsed: true,
            customProps: {
                badge: "presets",
            },
            type: "category",
            label: "Presets",
            link: {
                type: "doc",
                id: "presets/index",
            },
            items: [
                {
                    className: "sb-preset-recommended",
                    id: "presets/recommended",
                    label: "🟡 Recommended",
                    type: "doc",
                },
                {
                    className: "sb-preset-stylesheets",
                    id: "presets/stylesheets",
                    label: "🎨 Stylesheets",
                    type: "doc",
                },
                {
                    className: "sb-preset-configs",
                    id: "presets/configs",
                    label: "🛠️ Configs",
                    type: "doc",
                },
                {
                    className: "sb-preset-all",
                    id: "presets/all",
                    label: "🟣 All",
                    type: "doc",
                },
            ],
        },
        {
            className: "sb-cat-rules",
            collapsed: true,
            customProps: {
                badge: "rules",
            },
            type: "category",
            label: "Rules",
            link: {
                type: "generated-index",
                title: "Rule Reference",
                slug: "/",
                description:
                    "Rule documentation for eslint-plugin-stylelint-2.",
            },
            items: [
                {
                    id: "stylelint",
                    label: "stylelint",
                    type: "doc",
                },
                {
                    id: "disallow-stylelint-formatter",
                    label: "disallow-stylelint-formatter",
                    type: "doc",
                },
                {
                    id: "disallow-stylelint-ignore-disables",
                    label: "disallow-stylelint-ignore-disables",
                    type: "doc",
                },
                {
                    id: "prefer-stylelint-define-config",
                    label: "prefer-stylelint-define-config",
                    type: "doc",
                },
                {
                    id: "prefer-stylelint-report-descriptionless-disables",
                    label: "prefer-stylelint-report-descriptionless-disables",
                    type: "doc",
                },
                {
                    id: "prefer-stylelint-report-invalid-scope-disables",
                    label: "prefer-stylelint-report-invalid-scope-disables",
                    type: "doc",
                },
                {
                    id: "prefer-stylelint-report-needless-disables",
                    label: "prefer-stylelint-report-needless-disables",
                    type: "doc",
                },
                {
                    id: "prefer-stylelint-report-unscoped-disables",
                    label: "prefer-stylelint-report-unscoped-disables",
                    type: "doc",
                },
            ],
        },
    ],
};

export default sidebars;
