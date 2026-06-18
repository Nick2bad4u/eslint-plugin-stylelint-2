import type { JSX } from "react";

import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Heading from "@theme/Heading";
import Layout from "@theme/Layout";

import GitHubStats from "../components/GitHubStats";
import HomepageFeatures from "../components/HomepageFeatures";
import styles from "./index.module.css";

type HeroBadge = Readonly<{
    description: string;
    icon: string;
    label: string;
}>;

type HeroQuickLink = Readonly<
    | {
          href: string;
          label: string;
      }
    | {
          label: string;
          to: string;
      }
>;

const heroBadges = [
    {
        description:
            "Drop-in bridge for running Stylelint inside your existing ESLint command and editor workflow.",
        icon: "\u{F013}",
        label: "ESLint-first workflow",
    },
    {
        description:
            "Configuration-focused rules that make Stylelint disable comments and reporting defaults safer.",
        icon: "\u{E628}",
        label: "Safer config authoring",
    },
    {
        description:
            "Actionable diagnostics with autofixes and suggestions where automatic changes are safe.",
        icon: "\u{F0AD}",
        label: "DX-focused diagnostics",
    },
] as const satisfies readonly HeroBadge[];

const heroQuickLinks = [
    {
        label: "📏 Rule catalog",
        to: "/docs/rules",
    },
    {
        label: "🎛️ Presets",
        to: "/docs/rules/presets",
    },
    {
        label: "🎨 Stylelint bridge",
        to: "/docs/rules/guides/stylelint-bridge",
    },
    {
        href: "https://stylelint.io/",
        label: "🧾 Stylelint docs",
    },
    {
        href: "https://github.com/Nick2bad4u/eslint-plugin-stylelint-2",
        label: "󰊤 GitHub",
    },
] as const satisfies readonly HeroQuickLink[];

const comparePresetsButtonIcon = "\u{F1492}";
const heroKickerIcon = "\u{F0AD}";
const heroKickerIcon2 = "\u{F135}";
const overviewButtonIcon = "\u{F071D}";

const homepageDescription =
    "Explore eslint-plugin-stylelint-2 docs, presets, and rules for running Stylelint through ESLint and enforcing safer Stylelint config authoring patterns.";
const homepageKeywords =
    "eslint-plugin-stylelint-2, stylelint, eslint, eslint plugin, stylesheet linting, flat config, stylelint config";
const homepageSocialImageUrl =
    "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/img/logo.png";
const homepageStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    codeRepository: "https://github.com/Nick2bad4u/eslint-plugin-stylelint-2",
    description: homepageDescription,
    image: homepageSocialImageUrl,
    license:
        "https://github.com/Nick2bad4u/eslint-plugin-stylelint-2/blob/main/LICENSE",
    name: "eslint-plugin-stylelint-2",
    programmingLanguage: "TypeScript",
    runtimePlatform: "Node.js",
    url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/",
} as const;

/** Render the docs landing page hero, quick links, and entry-point content. */
export default function Home(): JSX.Element {
    const logoSrc = useBaseUrl("/img/logo.svg");

    return (
        <Layout
            description={homepageDescription}
            title="Stylelint + ESLint in one workflow | eslint-plugin-stylelint-2"
        >
            <Head>
                <meta content={homepageKeywords} name="keywords" />
                <meta content={homepageSocialImageUrl} property="og:image" />
                <meta content="summary_large_image" name="twitter:card" />
                <meta content={homepageSocialImageUrl} name="twitter:image" />
                <script type="application/ld+json">
                    {JSON.stringify(homepageStructuredData)}
                </script>
            </Head>
            <header className={styles["heroBanner"]}>
                <div className={`container ${styles["heroContent"]}`}>
                    <div className={styles["heroGrid"]}>
                        <div>
                            <p className={styles["heroKicker"]}>
                                {`${heroKickerIcon} ESLint plugin for modern style workflows ${heroKickerIcon2}`}
                            </p>
                            <Heading as="h1" className={styles["heroTitle"]}>
                                eslint-plugin-stylelint-2
                            </Heading>
                            <p className={styles["heroSubtitle"]}>
                                ESLint rules and bridge tooling that run{" "}
                                <Link
                                    className={`${styles["heroInlineLink"]} ${styles["heroInlineLinkStylelint"]}`}
                                    href="https://stylelint.io/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    Stylelint
                                </Link>{" "}
                                inside{" "}
                                <Link
                                    className={`${styles["heroInlineLink"]} ${styles["heroInlineLinkEslint"]}`}
                                    href="https://eslint.org/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    ESLint
                                </Link>{" "}
                                while enforcing safer Stylelint configuration
                                patterns so diagnostics, autofixes, and CI stay
                                unified.
                            </p>
                            <div className={styles["heroBadgeRow"]}>
                                {heroBadges.map((badge) => (
                                    <article
                                        className={styles["heroBadge"]}
                                        key={badge.label}
                                    >
                                        <p className={styles["heroBadgeLabel"]}>
                                            <span
                                                aria-hidden="true"
                                                className={
                                                    styles["heroBadgeIcon"]
                                                }
                                            >
                                                {badge.icon}
                                            </span>
                                            {badge.label}
                                        </p>
                                        <p
                                            className={
                                                styles["heroBadgeDescription"]
                                            }
                                        >
                                            {badge.description}
                                        </p>
                                    </article>
                                ))}
                            </div>
                            <div className={styles["heroActions"]}>
                                <Link
                                    className={`button button--lg ${styles["heroActionButton"]} ${styles["heroActionPrimary"]}`}
                                    to="/docs/rules/overview"
                                >
                                    {overviewButtonIcon} Start with Overview
                                </Link>
                                <Link
                                    className={`button button--lg ${styles["heroActionButton"]} ${styles["heroActionSecondary"]}`}
                                    to="/docs/rules/presets"
                                >
                                    {comparePresetsButtonIcon} Compare Presets
                                </Link>
                            </div>
                        </div>
                        <aside className={styles["heroPanel"]}>
                            <img
                                alt="eslint-plugin-stylelint-2 logo"
                                className={styles["heroPanelLogo"]}
                                decoding="async"
                                height="240"
                                loading="eager"
                                src={logoSrc}
                                width="240"
                            />
                        </aside>
                    </div>
                    <GitHubStats
                        className={styles["heroLiveBadges"] ?? "heroLiveBadges"}
                    />
                    <nav
                        aria-label="Quick documentation links"
                        className={styles["heroQuickLinks"]}
                    >
                        {heroQuickLinks.map((quickLink) => (
                            <Link
                                className={
                                    styles["heroQuickLink"] ?? "heroQuickLink"
                                }
                                key={quickLink.label}
                                {...("to" in quickLink
                                    ? { to: quickLink.to }
                                    : {
                                          href: quickLink.href,
                                          rel: "noopener noreferrer",
                                          target: "_blank",
                                      })}
                            >
                                {quickLink.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </header>
            <HomepageFeatures />
        </Layout>
    );
}
