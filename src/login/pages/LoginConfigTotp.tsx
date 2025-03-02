import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { clsx } from "keycloakify/tools/clsx";
import type { KcContext } from "../KcContext";
import ButtonGroup from "../components/ButtonGroup";
import FormInput from "../components/FormInput";
import Link from "../components/Link";
import LogoutOtherSessions from "../components/LogoutOtherSessions";
import SubmitButton from "../components/SubmitButton";
import type { I18n } from "../i18n";

export default function LoginConfigTotp(props: PageProps<Extract<KcContext, { pageId: "login-config-totp.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, isAppInitiatedAction, totp, mode, messagesPerField } = kcContext;

    const { msg, msgStr, advancedMsg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("loginTotpTitle")}
            displayMessage={!messagesPerField.existsError("totp", "userLabel")}
        >
            <>
                <ol id="kc-totp-settings" className="list-decimal pl-4 space-y-2">
                    <li className="space-y-2">
                        <p>{msg("loginTotpStep1")}</p>
                        <ul id="kc-totp-supported-apps" className="list-disc pl-4">
                            {totp.supportedApplications.map(app => (
                                <li key={app}>{advancedMsg(app)}</li>
                            ))}
                        </ul>
                    </li>

                    {mode == "manual" ? (
                        <>
                            <li>
                                <p>{msg("loginTotpManualStep2")}</p>
                                <p className="font-medium text-xl">
                                    <span id="kc-totp-secret-key">{totp.totpSecretEncoded}</span>
                                </p>
                            </li>
                            <li>
                                <Link href={totp.qrUrl} id="mode-barcode" colorClass="linkPrimaryClass">
                                    {msg("loginTotpScanBarcode")}
                                </Link>
                            </li>
                            <li className="space-y-2">
                                <p>{msg("loginTotpManualStep3")}</p>
                                <ul className="list-disc pl-4">
                                    <li id="kc-totp-type">
                                        {msg("loginTotpType")}: {msg(`loginTotp.${totp.policy.type}`)}
                                    </li>
                                    <li id="kc-totp-algorithm">
                                        {msg("loginTotpAlgorithm")}: {totp.policy.getAlgorithmKey()}
                                    </li>
                                    <li id="kc-totp-digits">
                                        {msg("loginTotpDigits")}: {totp.policy.digits}
                                    </li>
                                    {totp.policy.type === "totp" ? (
                                        <li id="kc-totp-period">
                                            {msg("loginTotpInterval")}: {totp.policy.period}
                                        </li>
                                    ) : (
                                        <li id="kc-totp-counter">
                                            {msg("loginTotpCounter")}: {totp.policy.initialCounter}
                                        </li>
                                    )}
                                </ul>
                            </li>
                        </>
                    ) : (
                        <li>
                            <p>{msg("loginTotpStep2")}</p>
                            <img
                                id="kc-totp-secret-qr-code"
                                src={`data:image/png;base64, ${totp.totpSecretQrCode}`}
                                alt="Figure: Barcode"
                                className="mx-auto"
                            />
                            <p>
                                <Link href={totp.manualUrl} id="mode-manual" colorClass="linkPrimaryClass">
                                    {msg("loginTotpUnableToScan")}
                                </Link>
                            </p>
                        </li>
                    )}
                    <li>{msg("loginTotpStep3")}</li>
                    <li>{msg("loginTotpStep3DeviceName")}</li>
                </ol>

                <form action={url.loginAction} className={clsx(kcClsx("kcFormClass"), "formSpaceClass")} id="kc-totp-settings-form" method="post">
                    <input type="hidden" id="totpSecret" name="totpSecret" value={totp.totpSecret} />
                    {mode && <input type="hidden" id="mode" value={mode} />}

                    <FormInput
                        doUseDefaultCss={doUseDefaultCss}
                        classes={classes}
                        type="text"
                        id="totp"
                        name="totp"
                        autoComplete="off"
                        invalid={messagesPerField.existsError("totp")}
                        autoFocus={true}
                        errorMsg={messagesPerField.get("totp")}
                        errorId="input-error-otp-code"
                        placeholder={msgStr("authenticatorCode") + " *"}
                        labelContent={msgStr("authenticatorCode") + " *"}
                        required={false}
                    ></FormInput>

                    <FormInput
                        doUseDefaultCss={doUseDefaultCss}
                        classes={classes}
                        type="text"
                        id="userLabel"
                        name="userLabel"
                        autoComplete="off"
                        invalid={messagesPerField.existsError("userLabel")}
                        errorMsg={messagesPerField.get("userLabel")}
                        errorId="input-error-otp-label"
                        placeholder={msgStr("loginTotpDeviceName") + (totp.otpCredentials.length >= 1 ? " *" : "")}
                        labelContent={msgStr("loginTotpDeviceName") + (totp.otpCredentials.length >= 1 ? " *" : "")}
                        required={false}
                    ></FormInput>

                    <div className={kcClsx("kcFormGroupClass")}>
                        <LogoutOtherSessions kcClsx={kcClsx} i18n={i18n} />
                    </div>

                    {isAppInitiatedAction ? (
                        <ButtonGroup>
                            <>
                                <SubmitButton doUseDefaultCss={doUseDefaultCss} classes={classes} id="saveTOTPBtn">
                                    {msg("doSubmit")}
                                </SubmitButton>
                                <SubmitButton
                                    doUseDefaultCss={doUseDefaultCss}
                                    classes={classes}
                                    id="cancelTOTPBtn"
                                    name="cancel-aia"
                                    value="true"
                                    colorClass="buttonSecondaryClass"
                                >
                                    {msg("doCancel")}
                                </SubmitButton>
                            </>
                        </ButtonGroup>
                    ) : (
                        <ButtonGroup>
                            <SubmitButton doUseDefaultCss={doUseDefaultCss} classes={classes} id="saveTOTPBtn">
                                {msg("doSubmit")}
                            </SubmitButton>
                        </ButtonGroup>
                    )}
                </form>
            </>
        </Template>
    );
}
