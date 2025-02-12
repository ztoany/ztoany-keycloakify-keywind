import { clsx } from "keycloakify/tools/clsx";

export default function Link({
    tabIndex = 0,
    id,
    href,
    colorClass = "linkPrimaryClass",
    fontSizeClass = "",
    children
}: {
    tabIndex?: number;
    id?: string;
    href: string;
    colorClass?: "linkPrimaryClass" | "linkSecondaryClass";
    fontSizeClass?: "linkFontSmallSizeClass" | "";
    children: JSX.Element;
}) {
    return (
        <a
            {...(id ? { id: id } : {})}
            className={clsx(colorClass, fontSizeClass, "inline-flex")}
            tabIndex={tabIndex}
            href={href}
        >
            {children}
        </a>
    );
}
