import { KcClsx } from "keycloakify/login/lib/kcClsx";
import { I18n } from "../i18n";

export default function LogoutOtherSessions(props: { kcClsx: KcClsx; i18n: I18n }) {
    const { kcClsx, i18n } = props;

    const { msg } = i18n;

    return (
        <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
            <div className={kcClsx("kcFormOptionsWrapperClass")}>
                <input
                    type="checkbox"
                    id="logout-sessions"
                    name="logout-sessions"
                    value="on"
                    defaultChecked={true}
                    className="checkBoxClass"
                />{" "}
                <label className="ml-2 text-secondary-600 text-sm">
                    {msg("logoutOtherSessions")}
                </label>
            </div>
        </div>
    );
}
