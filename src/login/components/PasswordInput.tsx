import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { KcContext } from "keycloakify/login/KcContext/KcContext";
import { ClassKey, getKcClsx, KcClsx } from "keycloakify/login/lib/kcClsx";
import { clsx } from "keycloakify/tools/clsx";
import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed";
import { I18n } from "../i18n";
import EyeIcon from "./icons/EyeIcon";
import EyeSlashIcon from "./icons/EyeSlashIcon";

export default function PasswordInput({
    tabIndex,
    doUseDefaultCss,
    classes,
    i18n,
    usernameHidden,
    messagesPerField,
    onlyPasswordInput
}: {
    tabIndex: number;
    doUseDefaultCss: boolean;
    classes?: Partial<Record<ClassKey, string>>;
    i18n: I18n;
    usernameHidden: boolean | undefined;
    messagesPerField: KcContext.Common["messagesPerField"];
    onlyPasswordInput: boolean;
}) {
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { msg, msgStr } = i18n;

    const errorExists = onlyPasswordInput
        ? messagesPerField.existsError("password")
        : messagesPerField.existsError("username", "password");

    const errorMsg = onlyPasswordInput
        ? messagesPerField.get("password")
        : messagesPerField.getFirstError("username", "password");

    return (
        <div className={kcClsx("kcFormGroupClass")}>
            <label htmlFor="password" className={kcClsx("kcLabelClass")}>
                {msg("password")}
            </label>
            <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="password">
                <input
                    tabIndex={tabIndex}
                    id="password"
                    className={kcClsx("kcInputClass")}
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    aria-invalid={messagesPerField.existsError("username", "password")}
                    placeholder={msgStr("password")}
                    autoFocus={onlyPasswordInput}
                />
            </PasswordWrapper>
            {usernameHidden && errorExists && (
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

function PasswordWrapper(props: {
    kcClsx: KcClsx;
    i18n: I18n;
    passwordInputId: string;
    children: JSX.Element;
}) {
    const { kcClsx, i18n, passwordInputId, children } = props;

    const { msgStr } = i18n;

    const { isPasswordRevealed, toggleIsPasswordRevealed } = useIsPasswordRevealed({
        passwordInputId
    });

    return (
        <div className={clsx(kcClsx("kcInputGroup"), "relative")}>
            {children}
            <button
                type="button"
                className={kcClsx("kcFormPasswordVisibilityButtonClass")}
                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                aria-controls={passwordInputId}
                onClick={toggleIsPasswordRevealed}
            >
                {isPasswordRevealed ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
        </div>
    );
}
