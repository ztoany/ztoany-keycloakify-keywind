import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import ButtonGroup from "../components/ButtonGroup";
import SubmitButton from "../components/SubmitButton";
import type { I18n } from "../i18n";

export default function Terms(props: PageProps<Extract<KcContext, { pageId: "terms.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { msg } = i18n;

    const { url } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={msg("termsTitle")}
        >
            <div id="kc-terms-text">{msg("termsText")}</div>
            <form className="form-actions formSpaceClass" action={url.loginAction} method="POST">
                <ButtonGroup>
                    <>
                        <SubmitButton doUseDefaultCss={doUseDefaultCss} classes={classes} id="kc-accept" name="accept">
                            {msg("doAccept")}
                        </SubmitButton>
                        <SubmitButton
                            doUseDefaultCss={doUseDefaultCss}
                            classes={classes}
                            id="kc-decline"
                            name="cancel"
                            colorClass="buttonSecondaryClass"
                        >
                            {msg("doDecline")}
                        </SubmitButton>
                    </>
                </ButtonGroup>
            </form>
        </Template>
    );
}
