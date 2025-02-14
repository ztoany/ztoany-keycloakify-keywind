import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { PageProps } from "keycloakify/login/pages/PageProps";
import { clsx } from "keycloakify/tools/clsx";
import { KcContext } from "../KcContext";
import ButtonGroup from "../components/ButtonGroup";
import FormInput from "../components/FormInput";
import SubmitButton from "../components/SubmitButton";
import type { I18n } from "../i18n";

export default function LoginOauth2DeviceVerifyUserCode(
    props: PageProps<Extract<KcContext, { pageId: "login-oauth2-device-verify-user-code.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, classes, Template } = props;
    const { url } = kcContext;

    const { msg, msgStr } = i18n;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("oauth2DeviceVerificationTitle")}
        >
            <form
                id="kc-user-verify-device-user-code-form"
                className={clsx(kcClsx("kcFormClass"), "formSpaceClass")}
                action={url.oauth2DeviceVerificationAction}
                method="post"
            >
                <FormInput
                    doUseDefaultCss={doUseDefaultCss}
                    classes={classes}
                    id="device-user-code"
                    name="device_user_code"
                    autoComplete="off"
                    type="text"
                    invalid={false}
                    autoFocus={true}
                    errorMsg=""
                    errorId="input-error"
                    placeholder={msgStr("verifyOAuth2DeviceUserCode")}
                    labelContent={msgStr("verifyOAuth2DeviceUserCode")}
                ></FormInput>
                <ButtonGroup>
                    <SubmitButton doUseDefaultCss={doUseDefaultCss} classes={classes}>
                        {msg("doSubmit")}
                    </SubmitButton>
                </ButtonGroup>
            </form>
        </Template>
    );
}
