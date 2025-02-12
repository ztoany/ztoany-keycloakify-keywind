import { ClassKey, getKcClsx } from "keycloakify/login/lib/kcClsx";
import { clsx } from "keycloakify/tools/clsx";

type LinkButtonProps = {
    tabIndex?: number;
    doUseDefaultCss: boolean;
    classes?: Partial<Record<ClassKey, string>>;
    children: JSX.Element;
    id: string;
    colorClass?: "buttonPrimaryClass" | "buttonSecondaryClass";
    href: string;
};

export default function LinkButton(props: LinkButtonProps) {
    const {
        tabIndex = 0,
        doUseDefaultCss,
        classes,
        children,
        id,
        colorClass = "buttonPrimaryClass",
        href
    } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    return (
        <a
            id={id}
            tabIndex={tabIndex}
            className={clsx(
                kcClsx(
                    "kcButtonClass",
                    "kcButtonPrimaryClass",
                    "kcButtonBlockClass",
                    "kcButtonLargeClass"
                ),
                colorClass,
                "buttonFontSizeMediumClass"
            )}
            href={href}
        >
            {children}
        </a>
    );
}
