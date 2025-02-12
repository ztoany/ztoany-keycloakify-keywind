import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import Alter from "../components/Altert";
import Link from "../components/Link";
import type { I18n } from "../i18n";

export default function Error(props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { message, client, skipLink } = kcContext;

    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={msg("errorTitle")}
        >
            <div id="kc-error-message" className="m-0 space-y-4">
                <Alter doUseDefaultCss={doUseDefaultCss} classes={classes} message={message.summary} colorClass="alterErrorColorClass"></Alter>
                {!skipLink && client !== undefined && client.baseUrl !== undefined && (
                    <p>
                        <Link id="backToApplication" href={client.baseUrl} colorClass="linkSecondaryClass" fontSizeClass="linkFontSmallSizeClass">
                            {msg("backToApplication")}
                        </Link>
                    </p>
                )}
            </div>
        </Template>
    );
}
