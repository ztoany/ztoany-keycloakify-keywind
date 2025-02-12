import { ClassKey, getKcClsx } from "keycloakify/login/lib/kcClsx";
import { clsx } from "keycloakify/tools/clsx";

export default function SubmitButton({
    tabIndex,
    doUseDefaultCss,
    classes,
    disabled,
    value
}: {
    tabIndex: number;
    doUseDefaultCss: boolean;
    classes?: Partial<Record<ClassKey, string>>;
    disabled: boolean | undefined;
    value: string;
}) {
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    return (
        <div
            id="kc-form-buttons"
            className={clsx(kcClsx("kcFormGroupClass"), "buttonGroupClass")}
        >
            <input
                tabIndex={tabIndex}
                disabled={disabled}
                className={clsx(
                    kcClsx(
                        "kcButtonClass",
                        "kcButtonPrimaryClass",
                        "kcButtonBlockClass",
                        "kcButtonLargeClass"
                    ),
                    "buttonFontSizeMediumClass"
                )}
                type="submit"
                value={value}
            />
        </div>
    );
}
