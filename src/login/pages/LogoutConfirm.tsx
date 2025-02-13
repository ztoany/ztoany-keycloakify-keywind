import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import ButtonGroup from "../components/ButtonGroup";
import Link from "../components/Link";
import SubmitButton from "../components/SubmitButton";
import type { I18n } from "../i18n";

export default function LogoutConfirm(props: PageProps<Extract<KcContext, { pageId: "logout-confirm.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, client, logoutConfirm } = kcContext;

    const { msg } = i18n;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={msg("logoutConfirmTitle")}>
            <div id="kc-logout-confirm" className="content-area">
                <p className="instruction">{msg("logoutConfirmHeader")}</p>
                <div className="m-0 space-y-4">
                    <form className="form-actions formSpaceClass" action={url.logoutConfirmAction} method="POST">
                        <input type="hidden" name="session_code" value={logoutConfirm.code} />
                        <ButtonGroup>
                            <SubmitButton tabIndex={4} id="kc-logout" name="confirmLogout" doUseDefaultCss={doUseDefaultCss} classes={classes}>
                                {msg("doLogout")}
                            </SubmitButton>
                        </ButtonGroup>
                    </form>
                    <div id="kc-info-message">
                        {!logoutConfirm.skipLink && client.baseUrl && (
                            <p>
                                <Link
                                    id="backToApplication"
                                    href={client.baseUrl}
                                    colorClass="linkSecondaryClass"
                                    fontSizeClass="linkFontSmallSizeClass"
                                >
                                    {msg("backToApplication")}
                                </Link>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </Template>
    );
}
