import { PageProps } from "keycloakify/login/pages/PageProps";
import { KcContext } from "../KcContext";
import ButtonGroup from "../components/ButtonGroup";
import SubmitButton from "../components/SubmitButton";
import type { I18n } from "../i18n";

export default function LoginOauthGrant(props: PageProps<Extract<KcContext, { pageId: "login-oauth-grant.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, classes, Template } = props;
    const { url, oauth, client } = kcContext;

    const { msg, advancedMsg, advancedMsgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={
                <>
                    {client.attributes.logoUri && <img className="mb-4 mx-auto" src={client.attributes.logoUri} />}
                    <p>{client.name ? msg("oauthGrantTitle", advancedMsgStr(client.name)) : msg("oauthGrantTitle", client.clientId)}</p>
                </>
            }
        >
            <div id="kc-oauth" className="content-area">
                <h3>{msg("oauthGrantRequest")}</h3>
                <ul className="list-disc pl-4">
                    {oauth.clientScopesRequested.map(clientScope => (
                        <li key={clientScope.consentScreenText}>
                            <span>
                                {advancedMsg(clientScope.consentScreenText)}
                                {clientScope.dynamicScopeParameter && (
                                    <>
                                        : <b>{clientScope.dynamicScopeParameter}</b>
                                    </>
                                )}
                            </span>
                        </li>
                    ))}
                </ul>

                {client.attributes.policyUri ||
                    (client.attributes.tosUri && (
                        <h3>
                            {client.name ? msg("oauthGrantInformation", advancedMsgStr(client.name)) : msg("oauthGrantInformation", client.clientId)}
                            {client.attributes.tosUri && (
                                <>
                                    {msg("oauthGrantReview")}
                                    <a href={client.attributes.tosUri} target="_blank">
                                        {msg("oauthGrantTos")}
                                    </a>
                                </>
                            )}
                            {client.attributes.policyUri && (
                                <>
                                    {msg("oauthGrantReview")}
                                    <a href={client.attributes.policyUri} target="_blank">
                                        {msg("oauthGrantPolicy")}
                                    </a>
                                </>
                            )}
                        </h3>
                    ))}

                <form className="form-actions formSpaceClass" action={url.oauthAction} method="POST">
                    <input type="hidden" name="code" value={oauth.code} />
                    <ButtonGroup>
                        <>
                            <SubmitButton doUseDefaultCss={doUseDefaultCss} classes={classes} id="kc-login" name="accept">
                                {msg("doYes")}
                            </SubmitButton>
                            <SubmitButton
                                doUseDefaultCss={doUseDefaultCss}
                                classes={classes}
                                id="kc-cancel"
                                name="cancel"
                                colorClass="buttonSecondaryClass"
                            >
                                {msg("doNo")}
                            </SubmitButton>
                        </>
                    </ButtonGroup>
                </form>
            </div>
        </Template>
    );
}
