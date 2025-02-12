import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { JSX } from "keycloakify/tools/JSX";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import { clsx } from "keycloakify/tools/clsx";
import { useState } from "react";
import type { KcContext } from "../KcContext";
import BackToLogin from "../components/BackToLogin";
import ButtonGroup from "../components/ButtonGroup";
import PasswordInput from "../components/PasswordInput";
import SubmitButton from "../components/SubmitButton";
import UsernameOrEmailInput from "../components/UsernameOrEmailInput";
import type { I18n } from "../i18n";

type RegisterProps = PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n> & {
    UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
    doMakeUserConfirmPassword: boolean;
};

export default function Register(props: RegisterProps) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { realm } = kcContext;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { messageHeader, url, messagesPerField, recaptchaRequired, recaptchaVisible, recaptchaSiteKey, recaptchaAction, termsAcceptanceRequired } =
        kcContext;

    const { msg, msgStr, advancedMsg } = i18n;

    const [areTermsAccepted, setAreTermsAccepted] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={messageHeader !== undefined ? advancedMsg(messageHeader) : msg("registerTitle")}
            displayMessage={messagesPerField.exists("global")}
        >
            <form id="kc-register-form" className={clsx(kcClsx("kcFormClass"), "formSpaceClass")} action={url.registrationAction} method="post">
                <UsernameOrEmailInput
                    tabIndex={2}
                    doUseDefaultCss={doUseDefaultCss}
                    classes={classes}
                    i18n={i18n}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    loginWithEmailAllowed={true}
                    registrationEmailAsUsername={true}
                    loginUsername=""
                    invalid={messagesPerField.existsError("email")}
                    errorExists={messagesPerField.existsError("email")}
                    errorMsg={messagesPerField.get("email")}
                    autoFocus={true}
                    errorId="input-error-email"
                ></UsernameOrEmailInput>

                {!realm.registrationEmailAsUsername && (
                    <UsernameOrEmailInput
                        tabIndex={3}
                        doUseDefaultCss={doUseDefaultCss}
                        classes={classes}
                        i18n={i18n}
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        loginWithEmailAllowed={false}
                        registrationEmailAsUsername={true}
                        loginUsername=""
                        invalid={messagesPerField.existsError("username")}
                        errorExists={messagesPerField.existsError("username")}
                        errorMsg={messagesPerField.get("username")}
                        autoFocus={false}
                        errorId="input-error-username"
                    ></UsernameOrEmailInput>
                )}

                <PasswordInput
                    tabIndex={4}
                    doUseDefaultCss={doUseDefaultCss}
                    classes={classes}
                    i18n={i18n}
                    id="password"
                    name="password"
                    autoComplete="new-password"
                    placeholder={msgStr("password")}
                    labelContent={msgStr("password")}
                    usernameHidden={true}
                    invalid={messagesPerField.existsError("password", "password-confirm")}
                    errorMsg={messagesPerField.getFirstError("password", "password-confirm")}
                    errorId="input-error-password"
                ></PasswordInput>

                <PasswordInput
                    tabIndex={6}
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

                {termsAcceptanceRequired && (
                    <TermsAcceptance
                        i18n={i18n}
                        kcClsx={kcClsx}
                        messagesPerField={messagesPerField}
                        areTermsAccepted={areTermsAccepted}
                        onAreTermsAcceptedValueChange={setAreTermsAccepted}
                    />
                )}

                {recaptchaRequired && (recaptchaVisible || recaptchaAction === undefined) && (
                    <div className="form-group">
                        <div className={kcClsx("kcInputWrapperClass")}>
                            <div className="g-recaptcha" data-size="compact" data-sitekey={recaptchaSiteKey} data-action={recaptchaAction}></div>
                        </div>
                    </div>
                )}

                <ButtonGroup>
                    <SubmitButton tabIndex={11} doUseDefaultCss={doUseDefaultCss} classes={classes}>
                        {msg("doRegister")}
                    </SubmitButton>
                </ButtonGroup>

                <BackToLogin tabIndex={12} i18n={i18n} loginUrl={url.loginUrl}></BackToLogin>
            </form>
        </Template>
    );
}

function TermsAcceptance(props: {
    i18n: I18n;
    kcClsx: KcClsx;
    messagesPerField: Pick<KcContext["messagesPerField"], "existsError" | "get">;
    areTermsAccepted: boolean;
    onAreTermsAcceptedValueChange: (areTermsAccepted: boolean) => void;
}) {
    const { i18n, kcClsx, messagesPerField, areTermsAccepted, onAreTermsAcceptedValueChange } = props;

    const { msg } = i18n;

    return (
        <div className="kcFormSettingClass">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="termsAccepted"
                    name="termsAccepted"
                    className="checkBoxClass"
                    checked={areTermsAccepted}
                    onChange={e => onAreTermsAcceptedValueChange(e.target.checked)}
                    aria-invalid={messagesPerField.existsError("termsAccepted")}
                />{" "}
                <label htmlFor="termsAccepted" className={kcClsx("kcLabelClass")}>
                    {msg("acceptTerms")}
                </label>
                <div className="ml-2 text-secondary-600 text-sm">{msg("termsText")}</div>
            </div>
            {messagesPerField.existsError("termsAccepted") && (
                <div className={kcClsx("kcLabelWrapperClass")}>
                    <span
                        id="input-error-terms-accepted"
                        className={kcClsx("kcInputErrorMessageClass")}
                        aria-live="polite"
                        dangerouslySetInnerHTML={{
                            __html: kcSanitize(messagesPerField.get("termsAccepted"))
                        }}
                    />
                </div>
            )}
        </div>
    );
}
