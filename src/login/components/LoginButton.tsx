import { ClassKey, getKcClsx } from "keycloakify/login/lib/kcClsx";
import { clsx } from "keycloakify/tools/clsx";
import { I18n } from "../i18n";

export default function LoginButton({
    tabIndex,
    doUseDefaultCss,
    classes,
    i18n,
    isLoginButtonDisabled
}: {
    tabIndex: number;
    doUseDefaultCss: boolean;
    classes?: Partial<Record<ClassKey, string>>;
    i18n: I18n;
    isLoginButtonDisabled: boolean;
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
                disabled={isLoginButtonDisabled}
                className={clsx(
                    kcClsx(
                        "kcButtonClass",
                        "kcButtonPrimaryClass",
                        "kcButtonBlockClass",
                        "kcButtonLargeClass"
                    ),
                    "buttonFontSizeMediumClass"
                )}
                name="login"
                id="kc-login"
                type="submit"
                value={msgStr("doLogIn")}
            />
        </div>
    );
}
