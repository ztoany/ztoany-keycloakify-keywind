import { ClassKey } from "keycloakify/login";

import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { I18n } from "../i18n";

export default function LoginFormSetting({
    tabIndex,
    doUseDefaultCss,
    classes,
    i18n,
    rememberMeEnabled,
    usernameHidden,
    loginRememberMe,
    realmResetPasswordAllowed,
    loginResetCredentialsUrl
}: {
    tabIndex: number;
    doUseDefaultCss: boolean;
    classes?: Partial<Record<ClassKey, string>>;
    i18n: I18n;
    rememberMeEnabled: boolean;
    usernameHidden: boolean | undefined;
    loginRememberMe: string | undefined;
    realmResetPasswordAllowed: boolean;
    loginResetCredentialsUrl: string;
}) {
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { msg } = i18n;

    return (
        <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
            {rememberMeEnabled && !usernameHidden && (
                <div className="flex items-center">
                    <input
                        tabIndex={tabIndex}
                        id="rememberMe"
                        name="rememberMe"
                        type="checkbox"
                        defaultChecked={!!loginRememberMe}
                        className="checkBoxClass"
                    />{" "}
                    <label className="ml-2 text-secondary-600 text-sm">
                        {msg("rememberMe")}
                    </label>
                </div>
            )}
            {realmResetPasswordAllowed && (
                <a
                    className="linkPrimaryClass text-sm"
                    tabIndex={tabIndex + 1}
                    href={loginResetCredentialsUrl}
                >
                    {msg("doForgotPassword")}
                </a>
            )}
        </div>
    );
}
