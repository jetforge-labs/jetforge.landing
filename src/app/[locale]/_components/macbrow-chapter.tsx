import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { AppEntry } from "./apps";
import { Ident, Phrase, Plan } from "./chapter-parts";
import { MacbrowTour, type TourTab } from "./macbrow-tour";

// The two closed-notch strips are tiny and shown at their exact size, so they skip the optimizer (it rounds their aspect ratio).
// Real renders of the app, 2x PNGs in public/apps/macbrow/. Dimensions are half the pixel size.
const TOUR_IMAGES = {
  clipboard: { src: "/apps/macbrow/clipboard.png", width: 667, height: 223 },
  focus: { src: "/apps/macbrow/focus.png", width: 667, height: 223 },
  assistant: { src: "/apps/macbrow/assistant.png", width: 667, height: 245 },
  weather: { src: "/apps/macbrow/weather.png", width: 667, height: 586 },
  checkmate: { src: "/apps/macbrow/checkmate.png", width: 667, height: 534 },
} as const satisfies Record<string, { src: string; width: number; height: number }>;

// The images decide which tabs exist and in which order; the labels and alt texts come from the messages under Home.macbrow.tour.tabs.<id>.
const TOUR_IDS = Object.keys(TOUR_IMAGES) as (keyof typeof TOUR_IMAGES)[];

/** Macbrow: the top edge of the section is the Mac's top edge, and the open notch hangs from it. */
export async function MacbrowChapter({ app }: { app: AppEntry }) {
  const t = await getTranslations("Home.macbrow");
  const tApps = await getTranslations("Apps.macbrow");
  const tabs: TourTab[] = TOUR_IDS.map((id) => ({
    id,
    label: t(`tour.tabs.${id}.label`),
    hint: t(`tour.tabs.${id}.hint`),
    alt: t(`tour.tabs.${id}.alt`),
    ...TOUR_IMAGES[id],
  }));

  return (
    <section className="ch ch-macbrow" data-app="macbrow" id="macbrow" aria-labelledby="macbrow-phrase">
      {/* The Mac's menu bar, recreated: decorative */}
      <div className="menubar" aria-hidden="true">
        <span className="apps"><b>Finder</b><span>File</span><span>Edit</span><span>View</span><span>Go</span></span>
        <span>Wed 11:18</span>
      </div>
      <div className="notch-stage">
        <Image className="panel" src="/apps/macbrow/home.png" width={667} height={235} sizes="(max-width: 640px) 100vw, 667px" alt={t("panelAlt")} />
      </div>
      <div className="wrap">
        <div className="mb-intro">
          <div>
            <Phrase id="macbrow-phrase" text={t("phrase")} />
            <Ident icon={app.icon} name={tApps("name")} meta={t("meta")} />
          </div>
          <div>
            <p className="lede">{t("lede")}</p>
            <div className="offer">
              <a className="btn btn-accent" href={app.href} data-track-event="download_click" data-track-product={app.slug} data-track-location="chapter">
                {t("ctaTrial", { days: app.pro?.trialDays ?? 14 })} <span className="arrow" aria-hidden="true">&darr;</span>
              </a>
              <div className="price">
                <small>{t("priceLabel")}</small>
                <b>{t("price")}</b>
                {app.pro?.url && (
                  <a className="link-arrow" href={app.pro.url} data-track-event="checkout_click" data-track-product={app.slug} data-track-location="chapter">
                    {t("buyPro")} <span aria-hidden="true">&rarr;</span>
                  </a>
                )}
              </div>
            </div>
            <p className="fine">{t("fine")}</p>
          </div>
        </div>

        <div className="spot">
          <article>
            <p className="spot-k">{t("spot.screenshots.k")} <span className="tag">{t("proTag")}</span></p>
            <h3>{t("spot.screenshots.title")}</h3>
            <p>{t("spot.screenshots.text")}</p>
            <p className="spot-meta">{t("spot.screenshots.meta")}</p>
            <figure className="hang">
              <Image className="render" src="/apps/macbrow/shelf.png" width={667} height={223} sizes="(max-width: 640px) 100vw, 560px" alt={t("spot.screenshots.alt")} />
            </figure>
          </article>
          <article>
            <p className="spot-k">{t("spot.meetings.k")} <span className="tag">{t("proTag")}</span></p>
            <h3>{t("spot.meetings.title")}</h3>
            <p>{t("spot.meetings.text")}</p>
            <p className="spot-meta">{t("spot.meetings.meta")}</p>
            <figure className="closed-strip">
              <div className="bar" aria-hidden="true"><b>Finder</b><span>11:29</span></div>
              <Image src="/apps/macbrow/reminder.png" width={341} height={44} unoptimized style={{ width: "auto", height: 44 }} alt={t("spot.meetings.alt")} />
              <figcaption>{t("spot.meetings.caption")}</figcaption>
            </figure>
          </article>
        </div>

        <div className="plans mb-plans">
          <Plan ns="Home.macbrow.free" variant="basic" />
          <Plan ns="Home.macbrow.pro" variant="pro" />
        </div>

        <MacbrowTour title={t("tour.title")} text={t("tour.text")} tabsLabel={t("tour.tabsLabel")} tabs={tabs} />

        <div className="mb-also-row">
          <p className="mb-also">{t("also.text")}</p>
          <figure className="closed-strip">
            <div className="bar" aria-hidden="true"><b>Finder</b><span>11:29</span></div>
            <Image src="/apps/macbrow/closed-pet.png" width={309} height={44} unoptimized style={{ width: "auto", height: 44 }} alt={t("also.petAlt")} />
            <figcaption>{t("also.petCaption")}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
