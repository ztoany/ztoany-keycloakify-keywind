import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import BackToLogin from "../components/BackToLogin";
import SubmitButton from "../components/SubmitButton";
import UsernameOrEmailInput from "../components/UsernameOrEmailInput";
import type { I18n } from "../i18n";

export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, realm, auth, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo
            displayMessage={!messagesPerField.existsError("username")}
            infoNode={realm.duplicateEmailsAllowed ? msg("emailInstructionUsername") : msg("emailInstruction")}
            headerNode={msg("emailForgotTitle")}
        >
            <form id="kc-reset-password-form" className="formSpaceClass" action={url.loginAction} method="post">
                <UsernameOrEmailInput
                    tabIndex={2}
                    doUseDefaultCss={doUseDefaultCss}
                    classes={classes}
                    i18n={i18n}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="email"
                    loginWithEmailAllowed={realm.loginWithEmailAllowed}
                    registrationEmailAsUsername={realm.registrationEmailAsUsername}
                    loginUsername={auth.attemptedUsername ?? ""}
                    invalid={messagesPerField.existsError("username")}
                    errorExists={messagesPerField.existsError("username")}
                    errorMsg={messagesPerField.getFirstError("username")}
                    autoFocus={true}
                ></UsernameOrEmailInput>
                <SubmitButton
                    tabIndex={3}
                    doUseDefaultCss={doUseDefaultCss}
                    classes={classes}
                    disabled={false}
                    value={msgStr("doSubmit")}
                ></SubmitButton>

                <BackToLogin tabIndex={4} i18n={i18n} loginUrl={url.loginUrl}></BackToLogin>
            </form>
        </Template>
    );
}
