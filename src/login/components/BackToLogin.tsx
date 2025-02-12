import { I18n } from "../i18n";
import Link from "./Link";

export default function BackToLogin({
    tabIndex = 0,
    i18n,
    loginUrl
}: {
    tabIndex?: number;
    i18n: I18n;
    loginUrl: string;
}) {
    const { msg } = i18n;
    return (
        <Link
            tabIndex={tabIndex}
            colorClass="linkSecondaryClass"
            fontSizeClass="linkFontSmallSizeClass"
            href={loginUrl}
        >
            {msg("backToLogin")}
        </Link>
    );
}
