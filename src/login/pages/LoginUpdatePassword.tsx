import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { clsx } from "keycloakify/tools/clsx";
import type { KcContext } from "../KcContext";
import ButtonGroup from "../components/ButtonGroup";
import LogoutOtherSessions from "../components/LogoutOtherSessions";
import PasswordInput from "../components/PasswordInput";
import SubmitButton from "../components/SubmitButton";
import type { I18n } from "../i18n";

export default function LoginUpdatePassword(props: PageProps<Extract<KcContext, { pageId: "login-update-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { msg, msgStr } = i18n;

    const { url, messagesPerField, isAppInitiatedAction } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("password", "password-confirm")}
            headerNode={msg("updatePasswordTitle")}
        >
            <form id="kc-passwd-update-form" className={clsx(kcClsx("kcFormClass"), "formSpaceClass")} action={url.loginAction} method="post">
                <div className={kcClsx("kcFormGroupClass")}>
                    <PasswordInput
                        doUseDefaultCss={doUseDefaultCss}
                        classes={classes}
                        i18n={i18n}
                        id="password-new"
                        name="password-new"
                        autoComplete="new-password"
                        placeholder={msgStr("passwordNew")}
                        labelContent={msgStr("passwordNew")}
                        usernameHidden={true}
                        invalid={messagesPerField.existsError("password", "password-confirm")}
                        errorMsg={messagesPerField.getFirstError("password", "password-confirm")}
                        errorId="input-error-password"
                        autoFocus={true}
                    ></PasswordInput>
                </div>

                <div className={kcClsx("kcFormGroupClass")}>
                    <PasswordInput
                        doUseDefaultCss={doUseDefaultCss}
                        classes={classes}
                        i18n={i18n}
                        id="password-confirm"
                        name="password-confirm"
                        autoComplete="new-password"
                        placeholder={msgStr("passwordConfirm")}
                        labelContent={msgStr("passwordConfirm")}
                        usernameHidden={true}
                        invalid={messagesPerField.existsError("password-confirm")}
                        errorMsg={messagesPerField.getFirstError("password-confirm")}
                        errorId="input-error-password-confirm"
                    ></PasswordInput>
                </div>
                <div className={kcClsx("kcFormGroupClass")}>
                    <LogoutOtherSessions kcClsx={kcClsx} i18n={i18n} />
                </div>

                <ButtonGroup>
                    <>
                        <SubmitButton doUseDefaultCss={doUseDefaultCss} classes={classes} id="kc-form-submit-button">
                            {msg("doSubmit")}
                        </SubmitButton>
                        {isAppInitiatedAction && (
                            <SubmitButton
                                doUseDefaultCss={doUseDefaultCss}
                                classes={classes}
                                id="kc-form-cancel-button"
                                name="cancel-aia"
                                value="true"
                                colorClass="buttonSecondaryClass"
                            >
                                {msg("doCancel")}
                            </SubmitButton>
                        )}
                    </>
                </ButtonGroup>
            </form>
        </Template>
    );
}
