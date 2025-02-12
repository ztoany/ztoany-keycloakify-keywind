import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useState } from "react";
import type { KcContext } from "../KcContext";
import ButtonGroup from "../components/ButtonGroup";
import LoginFormSetting from "../components/LoginFormSetting";
import PasswordInput from "../components/PasswordInput";
import SubmitButton from "../components/SubmitButton";
import type { I18n } from "../i18n";

export default function LoginPassword(props: PageProps<Extract<KcContext, { pageId: "login-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { realm, url, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("doLogIn")}
            displayMessage={!messagesPerField.existsError("password")}
        >
            <div id="kc-form">
                <div id="kc-form-wrapper">
                    <form
                        id="kc-form-login"
                        onSubmit={() => {
                            setIsLoginButtonDisabled(true);
                            return true;
                        }}
                        action={url.loginAction}
                        method="post"
                        className="formSpaceClass"
                    >
                        <PasswordInput
                            tabIndex={2}
                            doUseDefaultCss={doUseDefaultCss}
                            classes={classes}
                            i18n={i18n}
                            id="password"
                            name="password"
                            autoComplete="on"
                            placeholder={msgStr("password")}
                            labelContent={msgStr("password")}
                            usernameHidden={true}
                            invalid={messagesPerField.existsError("password")}
                            errorMsg={messagesPerField.get("password")}
                            autoFocus={true}
                        ></PasswordInput>

                        <LoginFormSetting
                            tabIndex={3}
                            doUseDefaultCss={doUseDefaultCss}
                            classes={classes}
                            i18n={i18n}
                            rememberMeEnabled={false}
                            usernameHidden={true}
                            loginRememberMe=""
                            realmResetPasswordAllowed={realm.resetPasswordAllowed}
                            loginResetCredentialsUrl={url.loginResetCredentialsUrl}
                        ></LoginFormSetting>

                        <ButtonGroup>
                            <SubmitButton
                                tabIndex={5}
                                doUseDefaultCss={doUseDefaultCss}
                                classes={classes}
                                disabled={isLoginButtonDisabled}
                                content={msgStr("doLogIn")}
                            ></SubmitButton>
                        </ButtonGroup>
                    </form>
                </div>
            </div>
        </Template>
    );
}
