import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import ButtonGroup from "../components/ButtonGroup";
import SubmitButton from "../components/SubmitButton";
import type { I18n } from "../i18n";

export default function LoginIdpLinkConfirm(props: PageProps<Extract<KcContext, { pageId: "login-idp-link-confirm.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, idpAlias } = kcContext;

    const { msg } = i18n;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={msg("confirmLinkIdpTitle")}>
            <form id="kc-register-form" action={url.loginAction} method="post" className="formSpaceClass">
                <ButtonGroup>
                    <SubmitButton id="updateProfile" name="submitAction" value="updateProfile" doUseDefaultCss={doUseDefaultCss} classes={classes}>
                        {msg("confirmLinkIdpReviewProfile")}
                    </SubmitButton>
                </ButtonGroup>
                <ButtonGroup>
                    <SubmitButton id="linkAccount" name="submitAction" value="linkAccount" doUseDefaultCss={doUseDefaultCss} classes={classes}>
                        {msg("confirmLinkIdpContinue", idpAlias)}
                    </SubmitButton>
                </ButtonGroup>
            </form>
        </Template>
    );
}
