import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { ClassKey, getKcClsx } from "keycloakify/login/lib/kcClsx";
import { clsx } from "keycloakify/tools/clsx";

export default function Alter({
    doUseDefaultCss,
    classes,
    message,
    colorClass
}: {
    doUseDefaultCss: boolean;
    classes?: Partial<Record<ClassKey, string>>;
    message: string;
    colorClass:
        | "alterErrorColorClass"
        | "alterInfoColorClass"
        | "alterSuccessColorClass"
        | "alterWarningColorClass"
        | "alterDefaultColorClass";
}) {
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });
    return (
        <div
            className={clsx(kcClsx("kcAlertClass"), colorClass)}
            dangerouslySetInnerHTML={{ __html: kcSanitize(message) }}
        ></div>
    );
}
