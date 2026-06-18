import type { JSX } from "react";

import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import clsx from "clsx";

import styles from "./styles.module.css";

type ExternalFeature = Readonly<{
    description: string;
    href: string;
    icon: string;
    linkLabel: string;
    title: string;
    toneClassName: string;
}>;

type Feature = ExternalFeature | InternalFeature;

type InternalFeature = Readonly<{
    description: string;
    icon: string;
    linkLabel: string;
    title: string;
    to: string;
    toneClassName: string;
}>;

const features: readonly Feature[] = [
    {
        description:
            "Install the plugin, enable a preset, and start enforcing modern Stylelint config and rule-authoring patterns.",
        icon: "",
        linkLabel: "Open section →",
        title: "Get Started",
        to: "/docs/rules/getting-started",
        toneClassName: styles.cardStarted ?? "",
    },
    {
        description:
            "Choose the right preset for your team, from minimal baseline policy to full strict config-authoring coverage.",
        icon: "",
        linkLabel: "Open section →",
        title: "Presets",
        to: "/docs/rules/presets",
        toneClassName: styles.cardPresets ?? "",
    },
    {
        description:
            "Browse every rule with concrete incorrect/correct examples, actionable diagnostics, and migration guidance.",
        icon: "󰘥",
        linkLabel: "Open section →",
        title: "Rule Reference",
        to: "/docs/rules/overview",
        toneClassName: styles.cardRules ?? "",
    },
];

/** Render the homepage feature cards that route users into core docs areas. */
export default function HomepageFeatures(): JSX.Element {
    const cardClassName = styles.card ?? "";
    const featuresClassName = styles.features ?? "";
    const gridClassName = styles.grid ?? "";
    const linkClassName = styles.link ?? "";
    const descriptionClassName = styles.description ?? "";
    const footerClassName = styles.featureFooter ?? "";
    const iconClassName = styles.icon ?? "";

    return (
        <section className={featuresClassName}>
            <div className="container">
                <div className={gridClassName}>
                    {features.map((feature) => (
                        <article
                            className={clsx(
                                "card",
                                cardClassName,
                                feature.toneClassName
                            )}
                            data-sb-hover="lift"
                            key={feature.title}
                        >
                            <Heading as="h2">{feature.title}</Heading>
                            <p className={descriptionClassName}>
                                {feature.description}
                            </p>
                            <div className={footerClassName}>
                                {"href" in feature ? (
                                    <Link
                                        className={linkClassName}
                                        href={feature.href}
                                    >
                                        {feature.linkLabel}
                                    </Link>
                                ) : (
                                    <Link
                                        className={linkClassName}
                                        to={feature.to}
                                    >
                                        {feature.linkLabel}
                                    </Link>
                                )}
                                <span
                                    aria-hidden="true"
                                    className={iconClassName}
                                >
                                    {feature.icon}
                                </span>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
