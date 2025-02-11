import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { ClassKey, getKcClsx } from "keycloakify/login/lib/kcClsx";
import { I18n } from "../i18n";

export default function UsernameOrEmailInput({
    tabIndex,
    doUseDefaultCss,
    classes,
    i18n,
    id,
    type,
    name,
    autoComplete,
    loginWithEmailAllowed,
    registrationEmailAsUsername,
    loginUsername,
    invalid,
    errorExists,
    errorMsg,
    autoFocus
}: {
    tabIndex: number;
    doUseDefaultCss: boolean;
    classes?: Partial<Record<ClassKey, string>>;
    i18n: I18n;
    id: string;
    type: string;
    name: string;
    autoComplete: string;
    loginWithEmailAllowed: boolean;
    registrationEmailAsUsername: boolean;
    loginUsername: string | undefined;
    invalid: boolean;
    errorExists: boolean;
    errorMsg: string;
    autoFocus: boolean;
}) {
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { msg, msgStr } = i18n;

    return (
        <div className={kcClsx("kcFormGroupClass")}>
            <label htmlFor={id} className={kcClsx("kcLabelClass")}>
                {!loginWithEmailAllowed
                    ? msg("username")
                    : !registrationEmailAsUsername
                      ? msg("usernameOrEmail")
                      : msg("email")}
            </label>
            <input
                tabIndex={tabIndex}
                id={id}
                className={kcClsx("kcInputClass")}
                name={name}
                defaultValue={loginUsername ?? ""}
                type={type}
                autoFocus={autoFocus}
                autoComplete={autoComplete}
                aria-invalid={invalid}
                required
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
