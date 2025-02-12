import { I18n } from "../i18n";
import Link from "./Link";

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
        <div id="kc-registration" className="text-center">
            <span>
                {msg("noAccount")}{" "}
                <Link
                    tabIndex={tabIndex}
                    href={registrationUrl}
                    colorClass="linkPrimaryClass"
                >
                    {msg("doRegister")}
                </Link>
            </span>
        </div>
    );
}
