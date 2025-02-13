import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { clsx } from "keycloakify/tools/clsx";
import type { KcContext } from "../KcContext";
import ButtonGroup from "../components/ButtonGroup";
import SubmitButton from "../components/SubmitButton";
import type { I18n } from "../i18n";

export default function LoginX509Info(props: PageProps<Extract<KcContext, { pageId: "login-x509-info.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, x509 } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={msg("doLogIn")}>
            <div className={kcClsx("kcFormGroupClass")}>
                <div className={kcClsx("kcLabelWrapperClass")}>
                    <label htmlFor="certificate_subjectDN" className={kcClsx("kcLabelClass")}>
                        {msg("clientCertificate")}
                    </label>
                </div>
                {x509.formData.subjectDN ? (
                    <div className={kcClsx("kcLabelWrapperClass")}>
                        <label id="certificate_subjectDN" className={kcClsx("kcLabelClass")}>
                            {x509.formData.subjectDN}
                        </label>
                    </div>
                ) : (
                    <div className={kcClsx("kcLabelWrapperClass")}>
                        <label id="certificate_subjectDN" className={kcClsx("kcLabelClass")}>
                            {msg("noCertificate")}
                        </label>
                    </div>
                )}
            </div>
            <div className={kcClsx("kcFormGroupClass")}>
                {x509.formData.isUserEnabled && (
                    <>
                        <div className={kcClsx("kcLabelWrapperClass")}>
                            <label htmlFor="username" className={kcClsx("kcLabelClass")}>
                                {msg("doX509Login")}
                            </label>
                        </div>
                        <div className={kcClsx("kcLabelWrapperClass")}>
                            <label id="username" className={kcClsx("kcLabelClass")}>
                                {x509.formData.username}
                            </label>
                        </div>
                    </>
                )}
            </div>
            <form id="kc-x509-login-info" className={clsx(kcClsx("kcFormClass"), "formSpaceClass")} action={url.loginAction} method="post">
                <ButtonGroup>
                    <>
                        <SubmitButton doUseDefaultCss={doUseDefaultCss} classes={classes} name="login" id="kc-login">
                            {msg("doContinue")}
                        </SubmitButton>
                        {x509.formData.isUserEnabled && (
                            <SubmitButton
                                doUseDefaultCss={doUseDefaultCss}
                                classes={classes}
                                id="kc-cancel"
                                name="cancel"
                                colorClass="buttonSecondaryClass"
                            >
                                {msg("doIgnore")}
                            </SubmitButton>
                        )}
                    </>
                </ButtonGroup>
            </form>
        </Template>
    );
}
