import { ClassKey, getKcClsx } from "keycloakify/login/lib/kcClsx";
import { clsx } from "keycloakify/tools/clsx";
import { MouseEventHandler } from "react";

type SubmitButtonProps = {
    tabIndex?: number;
    doUseDefaultCss: boolean;
    classes?: Partial<Record<ClassKey, string>>;
    disabled?: boolean | undefined;
    name?: string;
    value?: string;
    children: JSX.Element;
    id?: string;
    colorClass?: "buttonPrimaryClass" | "buttonSecondaryClass";
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
};

export default function SubmitButton(props: SubmitButtonProps) {
    const {
        tabIndex = 0,
        doUseDefaultCss,
        classes,
        disabled = false,
        value,
        children,
        name,
        id = "c-form-button",
        colorClass = "buttonPrimaryClass",
        onClick
    } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    return (
        <button
            id={id}
            tabIndex={tabIndex}
            disabled={disabled}
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
            type="submit"
            {...(name ? { name: name } : {})}
            {...(value ? { value: value } : {})}
            {...(onClick ? { onClick: onClick } : {})}
        >
            {children}
        </button>
    );
}
