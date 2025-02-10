import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { clsx } from "keycloakify/tools/clsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useEffect } from "react";
import ArrowTopRightOnSquareIcon from "./components/icons/ArrowTopRightOnSquareIcon";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        bodyClassName,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { msg, msgStr, currentLanguage, enabledLanguages } = i18n;

    const { realm, auth, url, message, isAppInitiatedAction } = kcContext;

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", kcContext.realm.displayName);
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });

    useSetClassName({
        qualifiedName: "body",
        className: bodyClassName ?? kcClsx("kcBodyClass")
    });

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    if (!isReadyToRender) {
        return null;
    }

    return (
        <div className="loginContainerClass">
            <div className="cardContainerClass">
                <div id="kc-card-header" className="cardSpaceClass">
                    {/* realms display name or logo */}
                    <div id="kc-logo" className="logoClass">
                        {msg("loginTitleHtml", realm.displayNameHtml)}
                    </div>
                    {/* page title, e.g. Sign in to your account */}
                    {!(auth !== undefined && auth.showUsername && !auth.showResetCredentials) ? (
                        <h1 id="kc-page-title" className="text-center text-xl">
                            {headerNode}
                        </h1>
                    ) : (
                        <div id="kc-username" className="resetLoginClass">
                            <label id="kc-attempted-username" className="font-medium">
                                {auth.attemptedUsername}
                            </label>
                            <a
                                id="reset-login"
                                href={url.loginRestartFlowUrl}
                                aria-label={msgStr("restartLoginTooltip")}
                                className="linkPrimaryClass"
                            >
                                <div className="kc-login-tooltip">
                                    <ArrowTopRightOnSquareIcon />
                                    {/* <span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span> */}
                                </div>
                            </a>
                        </div>
                    )}
                </div>
                <div id="kc-card-content" className="cardSpaceClass">
                    {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
                    {/* alter */}
                    {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                        <div
                            className={clsx("kcAlertClass", getAlterColorClass(message.type))}
                            dangerouslySetInnerHTML={{
                                __html: kcSanitize(message.summary)
                            }}
                        ></div>
                    )}
                    {children}
                    {displayRequiredFields && <p className="text-secondary-600 text-sm">* ${msg("requiredFields")}</p>}
                    {auth !== undefined && auth.showTryAnotherWayLink && (
                        <form id="kc-select-try-another-way-form" action={url.loginAction} method="post">
                            <input type="hidden" name="tryAnotherWay" value="on" />
                            <button type="submit" className={clsx(kcClsx("kcButtonClass"), "buttonSecondaryClass", "buttonFontSizeMediumClass")}>
                                {msg("doTryAnotherWay")}
                            </button>
                        </form>
                    )}
                    {socialProvidersNode}
                </div>
                <div id="kc-card-footer" className="cardSpaceClass">
                    {displayInfo && (
                        <div id="kc-info" className={kcClsx("kcSignUpClass")}>
                            <div id="kc-info-wrapper" className={kcClsx("kcInfoAreaWrapperClass")}>
                                {infoNode}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div id="kc-nav" className="navContainerClass">
                {enabledLanguages.length > 1 && (
                    <Menu as="div" className="relative">
                        <div>
                            <MenuButton className="linkSecondaryClass">
                                <div className="flex items-center">
                                    <span className="mr-1 text-sm">{currentLanguage.label}</span>
                                    <ChevronDownIcon aria-hidden="true" className="h-5 w-5" />
                                </div>
                            </MenuButton>
                        </div>

                        <MenuItems transition className={kcClsx("kcLocaleListClass")}>
                            {enabledLanguages.map(({ languageTag, label, href }, i) => (
                                <MenuItem key={languageTag}>
                                    <div className={kcClsx("kcLocaleListItemClass")}>
                                        <a
                                            role="menuitem"
                                            id={`language-${i + 1}`}
                                            className={clsx(kcClsx("kcLocaleItemClass"), "linkSecondaryClass")}
                                            href={href}
                                        >
                                            {label}
                                        </a>
                                    </div>
                                </MenuItem>
                            ))}
                        </MenuItems>
                    </Menu>
                )}
            </div>
        </div>
    );
}

function getAlterColorClass(msgType: string): string {
    switch (msgType) {
        case "success":
            return "alterSuccessColorClass";
        case "warning":
            return "alterWarningColorClass";
        case "error":
            return "alterErrorColorClass";
        case "info":
            return "alterInfoColorClass";
        default:
            return "alterDefaultColorClass";
    }
}
