import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useState } from "react";
import type { KcContext } from "../KcContext";
import LoginButton from "../components/LoginButton";
import LoginFormSetting from "../components/LoginFormSetting";
import PasswordInput from "../components/PasswordInput";
import RegistrationInfo from "../components/RegistrationInfo";
import UsernameOrEmailInput from "../components/UsernameOrEmailInput";
import SocialProviders from "../components/providers/SocialProviders";
import type { I18n } from "../i18n";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={msg("loginAccountTitle")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={<RegistrationInfo tabIndex={8} i18n={i18n} registrationUrl={url.registrationUrl}></RegistrationInfo>}
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
                            <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
                            {!usernameHidden && (
                                <UsernameOrEmailInput
                                    tabIndex={2}
                                    doUseDefaultCss={doUseDefaultCss}
                                    classes={classes}
                                    i18n={i18n}
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    loginWithEmailAllowed={realm.loginWithEmailAllowed}
                                    registrationEmailAsUsername={realm.registrationEmailAsUsername}
                                    loginUsername={login.username}
                                    invalid={messagesPerField.existsError("username", "password")}
                                    errorExists={messagesPerField.existsError("username", "password")}
                                    errorMsg={messagesPerField.getFirstError("username", "password")}
                                    autoFocus={true}
                                ></UsernameOrEmailInput>
                            )}

                            <PasswordInput
                                tabIndex={3}
                                doUseDefaultCss={doUseDefaultCss}
                                classes={classes}
                                i18n={i18n}
                                id="password"
                                name="password"
                                autoComplete="current-password"
                                placeholder={msgStr("password")}
                                usernameHidden={usernameHidden}
                                invalid={messagesPerField.existsError("username", "password")}
                                errorMsg={messagesPerField.getFirstError("username", "password")}
                                autoFocus={false}
                            ></PasswordInput>

                            <LoginFormSetting
                                tabIndex={5}
                                doUseDefaultCss={doUseDefaultCss}
                                classes={classes}
                                i18n={i18n}
                                rememberMeEnabled={realm.rememberMe}
                                usernameHidden={usernameHidden}
                                loginRememberMe={login.rememberMe}
                                realmResetPasswordAllowed={realm.resetPasswordAllowed}
                                loginResetCredentialsUrl={url.loginResetCredentialsUrl}
                            ></LoginFormSetting>

                            <LoginButton
                                tabIndex={7}
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
