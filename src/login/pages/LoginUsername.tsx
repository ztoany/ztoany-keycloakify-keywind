import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useState } from "react";
import type { KcContext } from "../KcContext";
import LoginButton from "../components/LoginButton";
import LoginFormSetting from "../components/LoginFormSetting";
import RegistrationInfo from "../components/RegistrationInfo";
import UsernameInput from "../components/UsernameInput";
import SocialProviders from "../components/providers/SocialProviders";
import type { I18n } from "../i18n";

export default function LoginUsername(props: PageProps<Extract<KcContext, { pageId: "login-username.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { social, realm, url, usernameHidden, login, registrationDisabled, messagesPerField } = kcContext;

    const { msg } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={<RegistrationInfo tabIndex={6} i18n={i18n} registrationUrl={url.registrationUrl}></RegistrationInfo>}
            headerNode={msg("doLogIn")}
            socialProvidersNode={
                <SocialProviders doUseDefaultCss={doUseDefaultCss} classes={classes} i18n={i18n} social={social} realm={realm}></SocialProviders>
            }
        >
            <div id="kc-form">
                <div id="kc-form-wrapper">
                    {realm.password && (
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
                            {!usernameHidden && (
                                <UsernameInput
                                    tabIndex={2}
                                    doUseDefaultCss={doUseDefaultCss}
                                    classes={classes}
                                    i18n={i18n}
                                    loginWithEmailAllowed={realm.loginWithEmailAllowed}
                                    registrationEmailAsUsername={realm.registrationEmailAsUsername}
                                    loginUsername={login.username}
                                    messagesPerField={messagesPerField}
                                    errorMsgOnlyUsername={true}
                                ></UsernameInput>
                            )}

                            <LoginFormSetting
                                tabIndex={3}
                                doUseDefaultCss={doUseDefaultCss}
                                classes={classes}
                                i18n={i18n}
                                rememberMeEnabled={realm.rememberMe}
                                usernameHidden={usernameHidden}
                                loginRememberMe={login.rememberMe}
                                realmResetPasswordAllowed={false}
                                loginResetCredentialsUrl={url.loginResetCredentialsUrl}
                            ></LoginFormSetting>

                            <LoginButton
                                tabIndex={4}
                                doUseDefaultCss={doUseDefaultCss}
                                classes={classes}
                                i18n={i18n}
                                isLoginButtonDisabled={isLoginButtonDisabled}
                            ></LoginButton>
                        </form>
                    )}
                </div>
            </div>
        </Template>
    );
}
