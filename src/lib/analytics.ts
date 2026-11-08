// GA4 behind consent. The gtag script is not requested until the visitor accepts; `track` is a no-op before that.
export const GA_ID = "G-CL70JD84BC";
export const CONSENT_KEY = "jf_consent";
export const CONSENT_EVENT = "jf:consent";
export const OPEN_EVENT = "jf:open-consent";

const LINKER_DOMAINS = ["jetforgelabs.com", "getdilo.co", "macbrow.co"];

type Gtag = (...args: unknown[]) => void;
type GtagWindow = Window & { dataLayer?: unknown[]; gtag?: Gtag };

export function readConsent(): "granted" | "denied" | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function writeConsent(value: "granted" | "denied") {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {}
}

export function loadGtag() {
  const w = window as GtagWindow;
  if (w.gtag) return;
  w.dataLayer = w.dataLayer || [];
  w.gtag = function () {
    // gtag.js only understands the `arguments` object, not an array.
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  };
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
  w.gtag("js", new Date());
  w.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  w.gtag("config", GA_ID, { linker: { domains: LINKER_DOMAINS } });
}

export function track(event: string, params: Record<string, string | undefined>) {
  const gtag = (window as GtagWindow).gtag;
  if (!gtag) return;
  try {
    gtag("event", event, { ...Object.fromEntries(Object.entries(params).filter(([, v]) => v)), transport_type: "beacon" });
  } catch {}
}

/** Withdraw consent: stop collection first, then clear the GA cookies. The caller reloads the page afterwards. */
export function withdrawGtag() {
  const w = window as unknown as GtagWindow & Record<string, unknown>;
  w[`ga-disable-${GA_ID}`] = true;
  try {
    w.gtag?.("consent", "update", { analytics_storage: "denied" });
  } catch {}
  const host = location.hostname;
  const domains = [undefined, host, `.${host}`, ".jetforgelabs.com"];
  for (const pair of document.cookie.split(";")) {
    const name = pair.split("=")[0].trim();
    if (name !== "_ga" && !name.startsWith("_ga_")) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}
