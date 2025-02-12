import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { clsx } from "keycloakify/tools/clsx";
import AppleIcon from "./AppleIcon";
import BitbucketIcon from "./BitbucketIcon";
import DiscordIcon from "./DiscordIcon";
import FacebookIcon from "./FacebookIcon";
import GitHubIcon from "./GitHubIcon";
import GitLabIcon from "./GitLabIcon";
import GoogleIcon from "./GoogleIcon";
import InstagramIcon from "./InstagramIcon";
import LinkedInIcon from "./LinkedInIcon";
import MicrosoftIcon from "./MicrosoftIcon";
import OidcIcon from "./OidcIcon";
import OpenShiftIcon from "./OpenShiftIcon";
import PayPalIcon from "./PayPalIcon";
import SlackIcon from "./SlackIcon";
import StackOverflowIcon from "./StackOverflowIcon";
import TwitterIcon from "./TwitterIcon";

export default function SocialProvider({
    id,
    loginUrl,
    providerAlias,
    providerDisplayName
}: {
    id: string;
    loginUrl: string;
    providerAlias: string;
    providerDisplayName: string;
}) {
    const providerIconElement = getProviderIconElement(providerAlias);
    return (
        <a
            id={id}
            className={clsx(getColorClass(providerAlias), "socialProviderClass")}
            href={loginUrl}
            type="button"
        >
            {providerIconElement !== null ? (
                <div className="h-6 w-6">{providerIconElement}</div>
            ) : (
                <span
                    dangerouslySetInnerHTML={{ __html: kcSanitize(providerDisplayName) }}
                ></span>
            )}
        </a>
    );
}

function getProviderIconElement(providerAlias: string) {
    switch (providerAlias) {
        case "apple":
            return <AppleIcon />;
        case "bitbucket":
            return <BitbucketIcon />;
        case "discord":
            return <DiscordIcon />;
        case "facebook":
            return <FacebookIcon />;
        case "github":
            return <GitHubIcon />;
        case "gitlab":
            return <GitLabIcon />;
        case "google":
            return <GoogleIcon />;
        case "instagram":
            return <InstagramIcon />;
        case "linkedin-openid-connect":
            return <LinkedInIcon />;
        case "microsoft":
            return <MicrosoftIcon />;
        case "oidc":
            return <OidcIcon />;
        case "openshift-v3":
            return <OpenShiftIcon />;
        case "openshift-v4":
            return <OpenShiftIcon />;
        case "paypal":
            return <PayPalIcon />;
        case "slack":
            return <SlackIcon />;
        case "stackoverflow":
            return <StackOverflowIcon />;
        case "twitter":
            return <TwitterIcon />;
        default:
            return null;
    }
}

function getColorClass(providerAlias: string) {
    switch (providerAlias) {
        case "apple":
            return "appleProviderColorClass";
        case "bitbucket":
            return "bitbucketProviderColorClass";
        case "discord":
            return "discordProviderColorClass";
        case "facebook":
            return "facebookProviderColorClass";
        case "github":
            return "githubProviderColorClass";
        case "gitlab":
            return "gitlabProviderColorClass";
        case "google":
            return "googleProviderColorClass";
        case "instagram":
            return "instagramProviderColorClass";
        case "linkedin-openid-connect":
            return "linkedinProviderColorClass";
        case "microsoft":
            return "microsoftProviderColorClass";
        case "oidc":
            return "oidcProviderColorClass";
        case "openshift-v3":
            return "openshiftProviderColorClass";
        case "openshift-v4":
            return "openshiftProviderColorClass";
        case "paypal":
            return "paypalProviderColorClass";
        case "slack":
            return "slackProviderColorClass";
        case "stackoverflow":
            return "stackoverflowProviderColorClass";
        case "twitter":
            return "twitterProviderColorClass";
        default:
            return "defaultProviderColorClass";
    }
}
