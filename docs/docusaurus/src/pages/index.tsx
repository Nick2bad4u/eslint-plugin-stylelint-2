import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

export default function Home(): React.JSX.Element {
    return (
        <Layout
            title="eslint-plugin-stylelint-2"
            description="Run Stylelint through ESLint and add Stylelint-focused config rules."
        >
            <main className={styles.hero}>
                <div className="container">
                    <Heading as="h1">eslint-plugin-stylelint-2</Heading>
                    <p className={styles.tagline}>
                        Run Stylelint through ESLint and keep stylesheet checks
                        in the same workflow as the rest of your linting.
                    </p>
                    <div className={styles.actions}>
                        <Link
                            className="button button--primary button--lg"
                            to="/docs/intro"
                        >
                            Open docs
                        </Link>
                        <Link
                            className="button button--secondary button--lg"
                            to="/docs/rules/overview"
                        >
                            Browse rules
                        </Link>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
