import { ClassKey, getKcClsx } from "keycloakify/login/lib/kcClsx";
import { clsx } from "keycloakify/tools/clsx";
import { I18n } from "../i18n";

export default function RegisterButton({
    tabIndex,
    doUseDefaultCss,
    classes,
    i18n,
    disabled
}: {
    tabIndex: number;
    doUseDefaultCss: boolean;
    classes?: Partial<Record<ClassKey, string>>;
    i18n: I18n;
    disabled: boolean | undefined;
}) {
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { msgStr } = i18n;

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
                value={msgStr("doRegister")}
            />
        </div>
    );
}
