import { I18n } from "../i18n";

export default function RegistrationInfo({
    tabIndex,
    i18n,
    registrationUrl
}: {
    tabIndex: number;
    i18n: I18n;
    registrationUrl: string;
}) {
    const { msg } = i18n;
    return (
        <div id="kc-registration-container">
            <div id="kc-registration">
                <span>
                    {msg("noAccount")}{" "}
                    <a
                        className="linkPrimaryClass"
                        tabIndex={tabIndex}
                        href={registrationUrl}
                    >
                        {msg("doRegister")}
                    </a>
                </span>
            </div>
        </div>
    );
}
