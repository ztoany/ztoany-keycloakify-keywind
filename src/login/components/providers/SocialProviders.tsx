import { KcContext } from "keycloakify/login/KcContext/KcContext";
import { ClassKey, getKcClsx } from "keycloakify/login/lib/kcClsx";
import { clsx } from "keycloakify/tools/clsx";
import { I18n } from "../../i18n";
import SocialProvider from "./SocialProvider";

export default function SocialProviders({
    doUseDefaultCss,
    classes,
    i18n,
    social,
    realm
}: {
    doUseDefaultCss: boolean;
    classes?: Partial<Record<ClassKey, string>>;
    i18n: I18n;
    social: KcContext.Login["social"] | KcContext.LoginUsername["social"];
    realm: KcContext.Login["realm"] | KcContext.LoginUsername["realm"];
}) {
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { msg } = i18n;

    return (
        <>
            {realm.password &&
                social?.providers !== undefined &&
                social.providers.length !== 0 && (
                    <div
                        id="kc-social-providers"
                        className={clsx(
                            kcClsx("kcFormSocialAccountSectionClass"),
                            "cardSpaceClass"
                        )}
                    >
                        <div className="pt-4 separate text-secondary-600 text-sm">
                            {msg("identity-provider-login-label")}
                        </div>
                        <ul className={kcClsx("kcFormSocialAccountListClass")}>
                            {social.providers.map((...[p]) => (
                                <li key={p.alias}>
                                    <SocialProvider
                                        id={`social-${p.alias}`}
                                        loginUrl={p.loginUrl}
                                        providerAlias={p.alias}
                                        providerDisplayName={p.displayName}
                                    ></SocialProvider>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
        </>
    );
}
