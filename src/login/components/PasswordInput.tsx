import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { ClassKey, getKcClsx, KcClsx } from "keycloakify/login/lib/kcClsx";
import { clsx } from "keycloakify/tools/clsx";
import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed";
import { I18n } from "../i18n";
import EyeIcon from "./icons/EyeIcon";
import EyeSlashIcon from "./icons/EyeSlashIcon";

export default function PasswordInput({
    tabIndex = 0,
    doUseDefaultCss,
    classes,
    i18n,
    id,
    name,
    autoComplete,
    placeholder,
    labelContent,
    usernameHidden,
    invalid,
    errorMsg,
    autoFocus = false,
    errorId = "input-error"
}: {
    tabIndex?: number;
    doUseDefaultCss: boolean;
    classes?: Partial<Record<ClassKey, string>>;
    i18n: I18n;
    id: string;
    name: string;
    autoComplete: string;
    placeholder: string;
    labelContent: string;
    usernameHidden: boolean | undefined;
    invalid: boolean;
    errorMsg: string;
    autoFocus?: boolean;
    errorId?: string;
}) {
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    return (
        <div className={kcClsx("kcFormGroupClass")}>
            <label htmlFor={id} className={kcClsx("kcLabelClass")}>
                {labelContent}
            </label>
            <PasswordWrapper
                kcClsx={kcClsx}
                i18n={i18n}
                passwordInputId={id}
                tabIndex={tabIndex === 0 ? 0 : tabIndex + 1}
            >
                <input
                    tabIndex={tabIndex}
                    id={id}
                    className={kcClsx("kcInputClass")}
                    name={name}
                    type="password"
                    autoComplete={autoComplete}
                    aria-invalid={invalid}
                    placeholder={placeholder}
                    autoFocus={autoFocus}
                    required
                />
            </PasswordWrapper>
            {usernameHidden && invalid && (
                <div
                    id={errorId}
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
    tabIndex: number;
}) {
    const { kcClsx, i18n, passwordInputId, children, tabIndex } = props;

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
                tabIndex={tabIndex}
            >
                {isPasswordRevealed ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
        </div>
    );
}
