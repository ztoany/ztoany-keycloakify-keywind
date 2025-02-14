import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useScript } from "keycloakify/login/pages/WebauthnRegister.useScript";
import type { KcContext } from "../KcContext";
import ButtonGroup from "../components/ButtonGroup";
import LogoutOtherSessions from "../components/LogoutOtherSessions";
import SubmitButton from "../components/SubmitButton";
import type { I18n } from "../i18n";

export default function WebauthnRegister(props: PageProps<Extract<KcContext, { pageId: "webauthn-register.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { url, isSetRetry, isAppInitiatedAction } = kcContext;

    const { msg } = i18n;

    const authButtonId = "authenticateWebAuthnButton";

    useScript({
        authButtonId,
        kcContext,
        i18n
    });

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={
                <>
                    <span className={kcClsx("kcWebAuthnKeyIcon")} />
                    {msg("webauthn-registration-title")}
                </>
            }
        >
            <form id="register" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                <div className={kcClsx("kcFormGroupClass")}>
                    <input type="hidden" id="clientDataJSON" name="clientDataJSON" />
                    <input type="hidden" id="attestationObject" name="attestationObject" />
                    <input type="hidden" id="publicKeyCredentialId" name="publicKeyCredentialId" />
                    <input type="hidden" id="authenticatorLabel" name="authenticatorLabel" />
                    <input type="hidden" id="transports" name="transports" />
                    <input type="hidden" id="error" name="error" />
                    <LogoutOtherSessions kcClsx={kcClsx} i18n={i18n} />
                </div>
            </form>

            <ButtonGroup>
                <>
                    <SubmitButton doUseDefaultCss={doUseDefaultCss} classes={classes} id={authButtonId}>
                        {msg("doRegisterSecurityKey")}
                    </SubmitButton>
                    {!isSetRetry && isAppInitiatedAction && (
                        <form action={url.loginAction} className={kcClsx("kcFormClass")} id="kc-webauthn-settings-form" method="post">
                            <SubmitButton
                                doUseDefaultCss={doUseDefaultCss}
                                classes={classes}
                                id="cancelWebAuthnAIA"
                                name="cancel-aia"
                                value="true"
                                colorClass="buttonSecondaryClass"
                            >
                                {msg("doCancel")}
                            </SubmitButton>
                        </form>
                    )}
                </>
            </ButtonGroup>
        </Template>
    );
}
