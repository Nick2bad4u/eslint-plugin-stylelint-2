import type { Props as NavbarItemConfig } from "@theme/NavbarItem";
import type { ReactNode } from "react";

import {
    ErrorCauseBoundary,
    ThemeClassNames,
    useThemeConfig,
} from "@docusaurus/theme-common";
import {
    splitNavbarItems,
    useNavbarMobileSidebar,
} from "@docusaurus/theme-common/internal";
import NavbarColorModeToggle from "@theme/Navbar/ColorModeToggle";
import NavbarLogo from "@theme/Navbar/Logo";
import NavbarMobileSidebarToggle from "@theme/Navbar/MobileSidebar/Toggle";
import NavbarSearch from "@theme/Navbar/Search";
import NavbarItem from "@theme/NavbarItem";
import SearchBar from "@theme/SearchBar";
import clsx from "clsx";

import styles from "./styles.module.css";

const useNavbarItems = (): NavbarItemConfig[] =>
    /* Docusaurus validates navbar items at configuration load time, but its
     * public ThemeConfig type still widens each item's discriminant to string.
     * This mirrors the upstream theme's temporary cast until that type is fixed. */
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- Upstream Docusaurus ThemeConfig typing does not preserve validated navbar discriminants.
    useThemeConfig().navbar.items as NavbarItemConfig[];

/** Render the customized Docusaurus navbar content and search behavior. */
export default function NavbarContent(): ReactNode {
    const mobileSidebar = useNavbarMobileSidebar();
    const items = useNavbarItems();
    const [leftItems, rightItems] = splitNavbarItems(items);

    const rightSearchItems = rightItems.filter(
        (item) => item.type === "search"
    );
    const rightItemsWithoutSearch = rightItems.filter(
        (item) => item.type !== "search"
    );

    return (
        <NavbarContentLayout
            left={
                <>
                    {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
                    <NavbarLogo />
                    {renderNavbarItems(leftItems)}
                </>
            }
            right={
                <>
                    {renderNavbarItems(rightItemsWithoutSearch)}
                    <NavbarColorModeToggle
                        className={
                            styles["colorModeToggle"] ?? "colorModeToggle"
                        }
                    />
                    {rightSearchItems.length > 0 ? (
                        renderNavbarItems(rightSearchItems)
                    ) : (
                        <NavbarSearch>
                            <SearchBar />
                        </NavbarSearch>
                    )}
                </>
            }
        />
    );
}

function NavbarContentLayout({
    left,
    right,
}: Readonly<{
    left: ReactNode;
    right: ReactNode;
}>): ReactNode {
    return (
        <div className={clsx("navbar__inner", styles["navbarContent"])}>
            <div
                className={clsx(
                    ThemeClassNames.layout.navbar.containerLeft,
                    "navbar__items"
                )}
            >
                {left}
            </div>
            <div
                className={clsx(
                    ThemeClassNames.layout.navbar.containerRight,
                    "navbar__items navbar__items--right"
                )}
            >
                {right}
            </div>
        </div>
    );
}

function renderNavbarItems(
    items: readonly Readonly<NavbarItemConfig>[]
): ReactNode {
    return items.map((item, index) => (
        <ErrorCauseBoundary
            key={`${item.type ?? "default"}-${String(index)}`}
            onError={(error) =>
                new Error(
                    `A theme navbar item failed to render.\nPlease double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:\n${JSON.stringify(item, null, 2)}`,
                    { cause: error }
                )
            }
        >
            <NavbarItem {...item} />
        </ErrorCauseBoundary>
    ));
}
