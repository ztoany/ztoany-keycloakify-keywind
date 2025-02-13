import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useScript } from "keycloakify/login/pages/WebauthnAuthenticate.useScript";
import { clsx } from "keycloakify/tools/clsx";
import { Fragment } from "react";
import type { KcContext } from "../KcContext";
import ButtonGroup from "../components/ButtonGroup";
import SubmitButton from "../components/SubmitButton";
import type { I18n } from "../i18n";
import RegistrationInfo from "../components/RegistrationInfo";

export default function WebauthnAuthenticate(props: PageProps<Extract<KcContext, { pageId: "webauthn-authenticate.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { url, realm, registrationDisabled, authenticators, shouldDisplayAuthenticators } = kcContext;

    const { msg, advancedMsg } = i18n;

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
            displayInfo={realm.registrationAllowed && !registrationDisabled}
            infoNode={<RegistrationInfo i18n={i18n} registrationUrl={url.registrationUrl}></RegistrationInfo>}
            headerNode={msg("webauthn-login-title")}
        >
            <div id="kc-form-webauthn" className={kcClsx("kcFormClass")}>
                <form id="webauth" action={url.loginAction} method="post">
                    <input type="hidden" id="clientDataJSON" name="clientDataJSON" />
                    <input type="hidden" id="authenticatorData" name="authenticatorData" />
                    <input type="hidden" id="signature" name="signature" />
                    <input type="hidden" id="credentialId" name="credentialId" />
                    <input type="hidden" id="userHandle" name="userHandle" />
                    <input type="hidden" id="error" name="error" />
                </form>
                <div className={clsx(kcClsx("kcFormGroupClass"), "no-bottom-margin")}>
                    {authenticators && (
                        <>
                            <form id="authn_select" className={kcClsx("kcFormClass")}>
                                {authenticators.authenticators.map(authenticator => (
                                    <input key={authenticator.credentialId} type="hidden" name="authn_use_chk" value={authenticator.credentialId} />
                                ))}
                            </form>

                            {shouldDisplayAuthenticators && (
                                <>
                                    {authenticators.authenticators.length > 1 && (
                                        <p className={kcClsx("kcSelectAuthListItemTitle")}>{msg("webauthn-available-authenticators")}</p>
                                    )}
                                    <div className={kcClsx("kcFormOptionsClass")}>
                                        {authenticators.authenticators.map((authenticator, i) => (
                                            <div key={i} id={`kc-webauthn-authenticator-item-${i}`} className={kcClsx("kcSelectAuthListItemClass")}>
                                                <div className={kcClsx("kcSelectAuthListItemIconClass")}>
                                                    <i
                                                        className={clsx(
                                                            (() => {
                                                                const className = kcClsx(authenticator.transports.iconClass as any);
                                                                if (className === authenticator.transports.iconClass) {
                                                                    return kcClsx("kcWebAuthnDefaultIcon");
                                                                }
                                                                return className;
                                                            })(),
                                                            kcClsx("kcSelectAuthListItemIconPropertyClass")
                                                        )}
                                                    />
                                                </div>
                                                <div className={kcClsx("kcSelectAuthListItemArrowIconClass")}>
                                                    <div
                                                        id={`kc-webauthn-authenticator-label-${i}`}
                                                        className={kcClsx("kcSelectAuthListItemHeadingClass")}
                                                    >
                                                        {advancedMsg(authenticator.label)}
                                                    </div>
                                                    {authenticator.transports.displayNameProperties?.length && (
                                                        <div
                                                            id={`kc-webauthn-authenticator-transport-${i}`}
                                                            className={kcClsx("kcSelectAuthListItemDescriptionClass")}
                                                        >
                                                            {authenticator.transports.displayNameProperties
                                                                .map((displayNameProperty, i, arr) => ({
                                                                    displayNameProperty,
                                                                    hasNext: i !== arr.length - 1
                                                                }))
                                                                .map(({ displayNameProperty, hasNext }) => (
                                                                    <Fragment key={displayNameProperty}>
                                                                        {advancedMsg(displayNameProperty)}
                                                                        {hasNext && <span>, </span>}
                                                                    </Fragment>
                                                                ))}
                                                        </div>
                                                    )}
                                                    <div className={kcClsx("kcSelectAuthListItemDescriptionClass")}>
                                                        <span id={`kc-webauthn-authenticator-createdlabel-${i}`}>
                                                            {msg("webauthn-createdAt-label")}
                                                        </span>
                                                        <span id={`kc-webauthn-authenticator-created-${i}`}>{authenticator.createdAt}</span>
                                                    </div>
                                                    <div className={kcClsx("kcSelectAuthListItemFillClass")} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    )}
                    <ButtonGroup>
                        <SubmitButton id={authButtonId} doUseDefaultCss={doUseDefaultCss} classes={classes}>
                            {msg("webauthn-doAuthenticate")}
                        </SubmitButton>
                    </ButtonGroup>
                </div>
            </div>
        </Template>
    );
}
