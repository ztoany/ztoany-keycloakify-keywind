import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { clsx } from "keycloakify/tools/clsx";
import type { KcContext } from "../KcContext";
import ButtonGroup from "../components/ButtonGroup";
import FormInput from "../components/FormInput";
import SubmitButton from "../components/SubmitButton";
import type { I18n } from "../i18n";

export default function LoginRecoveryAuthnCodeInput(props: PageProps<Extract<KcContext, { pageId: "login-recovery-authn-code-input.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, messagesPerField, recoveryAuthnCodesInputBean } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("auth-recovery-code-header")}
            displayMessage={!messagesPerField.existsError("recoveryCodeInput")}
        >
            <form id="kc-recovery-code-login-form" className={clsx(kcClsx("kcFormClass"), "formSpaceClass")} action={url.loginAction} method="post">
                <FormInput
                    doUseDefaultCss={doUseDefaultCss}
                    classes={classes}
                    type="text"
                    id="recoveryCodeInput"
                    name="recoveryCodeInput"
                    autoComplete="off"
                    invalid={messagesPerField.existsError("recoveryCodeInput")}
                    autoFocus={true}
                    errorMsg={messagesPerField.get("recoveryCodeInput")}
                    errorId="input-error"
                    placeholder={msgStr("auth-recovery-code-prompt", `${recoveryAuthnCodesInputBean.codeNumber}`)}
                    labelContent={msgStr("auth-recovery-code-prompt", `${recoveryAuthnCodesInputBean.codeNumber}`)}
                ></FormInput>

                <ButtonGroup>
                    <SubmitButton doUseDefaultCss={doUseDefaultCss} classes={classes} name="login" id="kc-login">
                        {msg("doLogIn")}
                    </SubmitButton>
                </ButtonGroup>
            </form>
        </Template>
    );
}
