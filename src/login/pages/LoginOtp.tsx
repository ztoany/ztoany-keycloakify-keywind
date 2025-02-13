import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { clsx } from "keycloakify/tools/clsx";
import type { KcContext } from "../KcContext";
import ButtonGroup from "../components/ButtonGroup";
import FormInput from "../components/FormInput";
import SubmitButton from "../components/SubmitButton";
import type { I18n } from "../i18n";

export default function LoginOtp(props: PageProps<Extract<KcContext, { pageId: "login-otp.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { otpLogin, url, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("totp")}
            headerNode={msg("doLogIn")}
        >
            <form id="kc-otp-login-form" className={clsx(kcClsx("kcFormClass"), "formSpaceClass")} action={url.loginAction} method="post">
                {otpLogin.userOtpCredentials.length > 1 && (
                    <div className={kcClsx("kcFormGroupClass")}>
                        <div className={clsx(kcClsx("kcInputWrapperClass"), "radioContainerClass")}>
                            {otpLogin.userOtpCredentials.map((otpCredential, index) => (
                                <div key={index}>
                                    <input
                                        id={`kc-otp-credential-${index}`}
                                        className={kcClsx("kcLoginOTPListInputClass")}
                                        type="radio"
                                        name="selectedCredentialId"
                                        value={otpCredential.id}
                                        defaultChecked={otpCredential.id === otpLogin.selectedCredentialId}
                                    />
                                    <label htmlFor={`kc-otp-credential-${index}`} className={kcClsx("kcLoginOTPListClass")} tabIndex={index}>
                                        <span className={kcClsx("kcLoginOTPListItemHeaderClass")}>
                                            <span className={kcClsx("kcLoginOTPListItemIconBodyClass")}>
                                                <i className={kcClsx("kcLoginOTPListItemIconClass")} aria-hidden="true"></i>
                                            </span>
                                            <span className={kcClsx("kcLoginOTPListItemTitleClass")}>{otpCredential.userLabel}</span>
                                        </span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <FormInput
                    doUseDefaultCss={doUseDefaultCss}
                    classes={classes}
                    type="text"
                    id="otp"
                    name="otp"
                    autoComplete="off"
                    invalid={messagesPerField.existsError("totp")}
                    autoFocus={true}
                    errorMsg={messagesPerField.get("totp")}
                    errorId="input-error-otp-code"
                    placeholder={msgStr("loginOtpOneTime") + " *"}
                    labelContent={msgStr("loginOtpOneTime")}
                ></FormInput>

                <ButtonGroup>
                    <SubmitButton doUseDefaultCss={doUseDefaultCss} classes={classes} name="login" id="kc-login">
                        {msg("doLogIn")}
                    </SubmitButton>
                </ButtonGroup>
            </form>
        </Template>
    );
}
