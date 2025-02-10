import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { KcContext } from "keycloakify/login/KcContext/KcContext";
import { ClassKey, getKcClsx } from "keycloakify/login/lib/kcClsx";
import { I18n } from "../i18n";

export default function UsernameInput({
    tabIndex,
    doUseDefaultCss,
    classes,
    i18n,
    loginWithEmailAllowed,
    registrationEmailAsUsername,
    loginUsername,
    messagesPerField,
    errorMsgOnlyUsername
}: {
    tabIndex: number;
    doUseDefaultCss: boolean;
    classes?: Partial<Record<ClassKey, string>>;
    i18n: I18n;
    loginWithEmailAllowed: boolean;
    registrationEmailAsUsername: boolean;
    loginUsername: string | undefined;
    messagesPerField: KcContext.Common["messagesPerField"];
    errorMsgOnlyUsername: boolean;
}) {
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { msg, msgStr } = i18n;

    const errorExists = errorMsgOnlyUsername
        ? messagesPerField.existsError("username")
        : messagesPerField.existsError("username", "password");
    const errorMsg = errorMsgOnlyUsername
        ? messagesPerField.getFirstError("username")
        : messagesPerField.getFirstError("username", "password");

    return (
        <div className={kcClsx("kcFormGroupClass")}>
            <label htmlFor="username" className={kcClsx("kcLabelClass")}>
                {!loginWithEmailAllowed
                    ? msg("username")
                    : !registrationEmailAsUsername
                      ? msg("usernameOrEmail")
                      : msg("email")}
            </label>
            <input
                tabIndex={tabIndex}
                id="username"
                className={kcClsx("kcInputClass")}
                name="username"
                defaultValue={loginUsername ?? ""}
                type="text"
                autoFocus
                autoComplete="username"
                aria-invalid={errorExists}
                placeholder={
                    !loginWithEmailAllowed
                        ? msgStr("username")
                        : !registrationEmailAsUsername
                          ? msgStr("usernameOrEmail")
                          : msgStr("email")
                }
            />
            {errorExists && (
                <div
                    id="input-error"
                    className={kcClsx("kcInputErrorMessageClass")}
                    aria-live="polite"
                    dangerouslySetInnerHTML={{
                        __html: kcSanitize(errorMsg)
                    }}
                />
            )}
        </div>
    );
}
