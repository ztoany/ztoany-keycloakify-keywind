import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useScript } from "keycloakify/login/pages/LoginRecoveryAuthnCodeConfig.useScript";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { clsx } from "keycloakify/tools/clsx";
import type { KcContext } from "../KcContext";
import Alter from "../components/Altert";
import ButtonGroup from "../components/ButtonGroup";
import LogoutOtherSessions from "../components/LogoutOtherSessions";
import SubmitButton from "../components/SubmitButton";
import type { I18n } from "../i18n";

export default function LoginRecoveryAuthnCodeConfig(props: PageProps<Extract<KcContext, { pageId: "login-recovery-authn-code-config.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { recoveryAuthnCodesConfigBean, isAppInitiatedAction } = kcContext;

    const { msg, msgStr } = i18n;

    const olRecoveryCodesListId = "kc-recovery-codes-list";

    useScript({ olRecoveryCodesListId, i18n });

    const alterMsg = `
    <div className="space-y-2">
    <h4 className="font-medium">${msgStr("recovery-code-config-warning-title")}</h4>
    <p>${msgStr("recovery-code-config-warning-message")}</p>
    </div>`;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("recovery-code-config-header")}
        >
            <div className="space-y-6">
                <Alter doUseDefaultCss={doUseDefaultCss} classes={classes} colorClass="alterWarningColorClass" message={alterMsg}></Alter>

                <ol id={olRecoveryCodesListId} className={kcClsx("kcRecoveryCodesList")}>
                    {recoveryAuthnCodesConfigBean.generatedRecoveryAuthnCodesList.map((code, index) => (
                        <li key={index}>
                            <span>{index + 1}:</span> {code.slice(0, 4)}-{code.slice(4, 8)}-{code.slice(8)}
                        </li>
                    ))}
                </ol>

                {/* actions */}
                <div className={kcClsx("kcRecoveryCodesActions")}>
                    <button
                        id="printRecoveryCodes"
                        className={clsx("pf-c-button", "pf-m-link", "kcButtonClass", "buttonSecondaryClass", "buttonFontSizeSmallClass")}
                        type="button"
                    >
                        <i className="pficon-print" aria-hidden="true" /> {msg("recovery-codes-print")}
                    </button>
                    <button
                        id="downloadRecoveryCodes"
                        className={clsx("pf-c-button", "pf-m-link", "kcButtonClass", "buttonSecondaryClass", "buttonFontSizeSmallClass")}
                        type="button"
                    >
                        <i className="pficon-save" aria-hidden="true" /> {msg("recovery-codes-download")}
                    </button>
                    <button
                        id="copyRecoveryCodes"
                        className={clsx("pf-c-button", "pf-m-link", "kcButtonClass", "buttonSecondaryClass", "buttonFontSizeSmallClass")}
                        type="button"
                    >
                        <i className="pficon-blueprint" aria-hidden="true" /> {msg("recovery-codes-copy")}
                    </button>
                </div>

                <form
                    action={kcContext.url.loginAction}
                    className={clsx(kcClsx("kcFormGroupClass"), "formSpaceClass")}
                    id="kc-recovery-codes-settings-form"
                    method="post"
                >
                    <input
                        type="hidden"
                        name="generatedRecoveryAuthnCodes"
                        value={recoveryAuthnCodesConfigBean.generatedRecoveryAuthnCodesAsString}
                    />
                    <input type="hidden" name="generatedAt" value={recoveryAuthnCodesConfigBean.generatedAt} />
                    <input type="hidden" id="userLabel" name="userLabel" value={msgStr("recovery-codes-label-default")} />

                    <LogoutOtherSessions kcClsx={kcClsx} i18n={i18n} />

                    {/* confirmation checkbox */}
                    <div className="flex items-center">
                        <input
                            id="kcRecoveryCodesConfirmationCheck"
                            name="kcRecoveryCodesConfirmationCheck"
                            type="checkbox"
                            className="checkBoxClass"
                            onChange={event => {
                                //@ts-expect-error: This is inherited from the original code
                                document.getElementById("saveRecoveryAuthnCodesBtn").disabled = !event.target.checked;
                            }}
                        />{" "}
                        <label className="ml-2 text-secondary-600 text-sm">{msg("recovery-codes-confirmation-message")}</label>
                    </div>

                    {isAppInitiatedAction ? (
                        <>
                            <ButtonGroup>
                                <>
                                    <SubmitButton doUseDefaultCss={doUseDefaultCss} classes={classes} id="saveRecoveryAuthnCodesBtn" disabled={true}>
                                        {msg("recovery-codes-action-complete")}
                                    </SubmitButton>
                                    <SubmitButton
                                        doUseDefaultCss={doUseDefaultCss}
                                        classes={classes}
                                        id="cancelRecoveryAuthnCodesBtn"
                                        name="cancel-aia"
                                        value="true"
                                        colorClass="buttonSecondaryClass"
                                    >
                                        {msg("recovery-codes-action-cancel")}
                                    </SubmitButton>
                                </>
                            </ButtonGroup>
                        </>
                    ) : (
                        <ButtonGroup>
                            <SubmitButton doUseDefaultCss={doUseDefaultCss} classes={classes} id="saveRecoveryAuthnCodesBtn" disabled={true}>
                                {msg("recovery-codes-action-complete")}
                            </SubmitButton>
                        </ButtonGroup>
                    )}
                </form>
            </div>
        </Template>
    );
}
