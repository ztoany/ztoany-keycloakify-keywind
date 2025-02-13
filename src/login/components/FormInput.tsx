import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { ClassKey, getKcClsx } from "keycloakify/login/lib/kcClsx";

type FormInputProps = {
    tabIndex?: number;
    doUseDefaultCss: boolean;
    classes?: Partial<Record<ClassKey, string>>;
    id: string;
    type: string;
    name: string;
    defaultValue?: string;
    placeholder?: string;
    autoComplete: string;
    labelContent: string;
    invalid: boolean;
    errorMsg: string;
    required?: boolean;
    autoFocus?: boolean;
    errorId: string;
};

export default function FormInput(props: FormInputProps) {
    const {
        tabIndex = 0,
        doUseDefaultCss,
        classes,
        id,
        type,
        name,
        defaultValue = "",
        placeholder = "",
        autoComplete,
        labelContent,
        invalid,
        errorMsg,
        required = true,
        autoFocus = false,
        errorId
    } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    return (
        <div className={kcClsx("kcFormGroupClass")}>
            <label htmlFor={id} className={kcClsx("kcLabelClass")}>
                {labelContent}
            </label>
            <input
                tabIndex={tabIndex}
                id={id}
                className={kcClsx("kcInputClass")}
                name={name}
                defaultValue={defaultValue}
                type={type}
                autoFocus={autoFocus}
                autoComplete={autoComplete}
                aria-invalid={invalid}
                required={required}
                placeholder={placeholder}
            />
            {invalid && (
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
