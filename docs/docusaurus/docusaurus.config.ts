import { themes as prismThemes } from "prism-react-renderer";

import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const organizationName = "Nick2bad4u";
const projectName = "eslint-plugin-stylelint";
const baseUrl =
    process.env["DOCUSAURUS_BASE_URL"] ?? "/eslint-plugin-stylelint/";
const siteUrl = "https://nick2bad4u.github.io";
const title = "eslint-plugin-stylelint-2";
const tagline =
    "Run Stylelint through ESLint and add Stylelint-focused authoring rules.";

const config: Config = {
    baseUrl,
    favicon: "img/logo.svg",
    i18n: {
        defaultLocale: "en",
        locales: ["en"],
    },
    onBrokenLinks: "warn",
    onBrokenMarkdownLinks: "warn",
    organizationName,
    plugins: [
        [
            "@docusaurus/plugin-content-docs",
            {
                id: "rules",
                path: "../rules",
                routeBasePath: "docs/rules",
                sidebarPath: "./sidebars.rules.ts",
            },
        ],
    ],
    presets: [
        [
            "classic",
            {
                blog: false,
                docs: {
                    path: "site-docs",
                    routeBasePath: "docs",
                    sidebarPath: "./sidebars.ts",
                },
                theme: {
                    customCss: "./src/css/custom.css",
                },
            } satisfies Preset.Options,
        ],
    ],
    projectName,
    tagline,
    themeConfig: {
        colorMode: {
            respectPrefersColorScheme: true,
        },
        footer: {
            copyright: `© ${new Date().getFullYear()} Nick2bad4u`,
        },
        image: "img/logo.png",
        navbar: {
            items: [
                {
                    label: "Docs",
                    to: "/docs/intro",
                },
                {
                    label: "Rules",
                    to: "/docs/rules/overview",
                },
                {
                    href: "https://github.com/Nick2bad4u/eslint-plugin-stylelint",
                    label: "GitHub",
                    position: "right",
                },
                {
                    href: "https://www.npmjs.com/package/eslint-plugin-stylelint-2",
                    label: "npm",
                    position: "right",
                },
            ],
            title,
        },
        prism: {
            darkTheme: prismThemes.oneDark,
            theme: prismThemes.github,
        },
    } satisfies Preset.ThemeConfig,
    title,
    url: siteUrl,
};

export default config;
