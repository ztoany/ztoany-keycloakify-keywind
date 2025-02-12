import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import ButtonGroup from "../components/ButtonGroup";
import LinkButton from "../components/LinkButton";
import type { I18n } from "../i18n";

export default function LoginPageExpired(props: PageProps<Extract<KcContext, { pageId: "login-page-expired.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url } = kcContext;

    const { msg } = i18n;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={msg("pageExpiredTitle")}>
            <ButtonGroup>
                <>
                    <LinkButton id="loginRestartLink" href={url.loginRestartFlowUrl} doUseDefaultCss={doUseDefaultCss} classes={classes}>
                        {msg("doTryAgain")}
                    </LinkButton>
                    <LinkButton
                        id="loginContinueLink"
                        href={url.loginAction}
                        doUseDefaultCss={doUseDefaultCss}
                        classes={classes}
                        colorClass="buttonSecondaryClass"
                    >
                        {msg("doContinue")}
                    </LinkButton>
                </>
            </ButtonGroup>
        </Template>
    );
}
