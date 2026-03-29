import type { JSX } from "react";

import clsx from "clsx";
import Link from "@docusaurus/Link";

type GitHubStat = Readonly<{
    alt: string;
    href: string;
    src: string;
}>;

type GitHubStatsProperties = Readonly<{
    className?: string;
}>;

const stats: readonly GitHubStat[] = [
    {
        alt: "npm license",
        href: "https://github.com/Nick2bad4u/eslint-plugin-stylelint-2/blob/main/LICENSE",
        src: "https://flat.badgen.net/npm/license/eslint-plugin-stylelint-2?color=7c3aed",
    },
    {
        alt: "npm downloads",
        href: "https://www.npmjs.com/package/eslint-plugin-stylelint-2",
        src: "https://flat.badgen.net/npm/dt/eslint-plugin-stylelint-2?color=ec4899",
    },
    {
        alt: "GitHub stars",
        href: "https://github.com/Nick2bad4u/eslint-plugin-stylelint-2/stargazers",
        src: "https://flat.badgen.net/github/stars/Nick2bad4u/eslint-plugin-stylelint-2?color=eab308",
    },
    {
        alt: "GitHub issues",
        href: "https://github.com/Nick2bad4u/eslint-plugin-stylelint-2/issues",
        src: "https://flat.badgen.net/github/open-issues/Nick2bad4u/eslint-plugin-stylelint-2?color=ef4444",
    },
];

export default function GitHubStats({
    className,
}: GitHubStatsProperties): JSX.Element {
    return (
        <div className={clsx(className)}>
            {stats.map((stat) => (
                <Link
                    key={stat.alt}
                    href={stat.href}
                    rel="noreferrer"
                    target="_blank"
                >
                    <img alt={stat.alt} src={stat.src} />
                </Link>
            ))}
        </div>
    );
}
