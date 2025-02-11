import { I18n } from "../i18n";

export default function BackToLogin({
    tabIndex,
    i18n,
    loginUrl
}: {
    tabIndex: number;
    i18n: I18n;
    loginUrl: string;
}) {
    const { msg } = i18n;
    return (
        <a className="linkSecondaryClass text-sm" tabIndex={tabIndex} href={loginUrl}>
            {msg("backToLogin")}
        </a>
    );
}
