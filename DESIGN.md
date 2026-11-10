# Jetforge Labs: design direction ("Mac screen")

The whole site is framed as a Mac screen. The header is the macOS menu bar, its notch shows the app whose chapter you are reading, the hero is a desktop with the three featured apps on it, and the other apps sit on a Dock. The look is light, quiet and typographic; the apps bring the colour.

Source of truth for tokens and components: `src/app/globals.css` (hand-written CSS, Tailwind is only imported for its reset). Content never lives in the CSS or the components: every visible string comes from `messages/en.json`, the app list from `src/app/[locale]/_components/apps.ts`.

## Rules that do not bend

- The wordmark is the text "Jetforge Labs" in Funnel Display. No lime square and no logo mark anywhere on the page (header, footer, 404, privacy).
- Lime (`--spark`) is Jetforge's only own colour and no app uses it. It is a fill (highlight under the hero line, primary button, selected chip), never text on light.
- Each featured app owns its palette through `[data-app]`. Do not mix them.
- Arrows are a convention, not decoration: `↗` external, `↓` download, `→` internal. A button without a destination change (submit, same-page anchor) has no arrow.
- Brand names carry `translate="no"`.
- Animations are finite (no infinite loops) and gated by `prefers-reduced-motion`. A global reduce rule also shortens whatever is left.
- Heading levels are sequential: one `h1` per page, chapters and sections `h2`, items inside them `h3`.

## Tokens

| Token | Value | Use |
|---|---|---|
| `--bg` | `oklch(0.982 0 0)` | page |
| `--surface` | `oklch(0.952 0 0)` | chips, quiet fills |
| `--ink` | `oklch(0.185 0 0)` | text, ink buttons |
| `--ink-2` / `--ink-3` | `oklch(0.38 0 0)` / `oklch(0.47 0 0)` | secondary text / small meta |
| `--line` / `--line-strong` | ink at 12% / 50% | hairlines / control borders |
| `--spark`, `--spark-hover`, `--spark-ink` | `#D4F73E`, `#C6EC2C`, `#2D3122` | Jetforge accent and the ink on it |
| `--night`, `--night-2` | `oklch(0.175 0 0)`, `oklch(0.215 0 0)` | contact band, footer, form fields |
| `--on-dark`, `--on-dark-2`, `--on-dark-3` | `#F3F5F6` at 100%, 80%, 68% | text on dark |
| `--dark-line`, `--dark-line-strong` | on-dark at 14% / 40% | hairlines on dark |

App palettes, set on any element with `data-app`:

| App | `--app-bg` | `--app-accent` | `--app-on` | `--app-tint` | `--app-deep` |
|---|---|---|---|---|---|
| dilo | `#0A1324` | `#7DB2FF` | `#061430` | `#EEF4FF` | `#1F5FE0` |
| macbrow | `#140D09` | `#FFA463` | `#2A1206` | `#FFF3EA` | `#A4430B` |
| checkmate | `#0B2E2D` | `#59C5BF` | `#0B2E2D` | `#EAF6F5` | `#00736F` |

Layout: `--max` 1280px, `--gutter` `clamp(20px,5vw,64px)`, `--bar-h` 52px, `--r` 16px. Easing `--ease` `cubic-bezier(.23,1,.32,1)`. Z-index scale: header 20, consent 40, skip link 50.

## Type

Funnel Display (headlines, wordmark, buttons excepted) and Funnel Sans (text), both variable (300 to 800), self-hosted from Latin subsets in `src/fonts/` through `next/font/local` (`--font-funnel-display`, `--font-funnel-sans`). The arrows are not in the fonts and fall back to the system font, so `adjustFontFallback` is off. The `--mac` stack (SF Pro) is only used inside the recreated app windows.

| Role | Size | Weight | Notes |
|---|---|---|---|
| Hero and page `h1` (`--t-hero`) | `clamp(3rem,7vw,6rem)` | 800 | leading .94, tracking -.035em |
| Chapter phrase (`--t-phrase`) | `clamp(2.6rem,5.8vw,5.25rem)` | 800 | opening quote hangs into the margin |
| Section `h2` (`--t-h2`) | `clamp(2.25rem,4.6vw,4rem)` | 800 | |
| Item `h3` (`--t-h3`) | `clamp(1.45rem,2.2vw,1.9rem)` | 800 | |
| Body | 1.0625rem | 400 | leading 1.6 |
| Lede | `clamp(1.125rem,1.45vw,1.3125rem)` | 400 | |

## Components

- **Menu bar (`SiteNav`)**: sticky, translucent, 52px. Wordmark left, links right, notch centred (hidden under 720px). The notch is black; `NotchWatcher` sets `data-app` on the bar while a chapter crosses the middle of the viewport, which widens the notch, tints its glow and fades in that app's icon.
- **Hero stage**: a 16/11 desktop. Dilo is the focal window (email lines filling in, its bar overlapping), Macbrow is the open notch, Checkmate a small task window. Decorative parts are `aria-hidden`; each object is a link to its chapter. On mobile it is one column.
- **Chapters (`.ch`)**: one per featured app on its own palette. Dilo and Macbrow are dark, Checkmate is the pale tint. They share `Phrase`, `Ident`, `GoActions` and `Signpost` from `chapter-parts.tsx`. The app windows (`dilo-shot`, `checkmate-shot`) are CSS recreations sized in `em` from a container query.
- **Dock (`MoreApps`)**: the other apps as icons on a translucent shelf; hover magnifies the icon and its neighbours.
- **Cards (`/apps`)**: featured apps get a dark card in their palette; the rest a white card.
- **Contact band**: night background, chip radios for the reason, spark submit button.
- **Cookie banner**: bottom-left card, full width and tighter under 560px.

## Buttons: four styles

All are pill-shaped, 52px (46px in cards), with an optional circular arrow cap.

| Class | Looks | Use |
|---|---|---|
| `btn-spark` | lime fill, ink cap | the one primary action on a light page (send message) |
| `btn-ink` | ink fill, lime cap | primary on light backgrounds and in the lime panel |
| `btn-app` / `btn-deep` | the app's accent (dark chapters) or deep colour (light chapter) | an app's own actions |
| `btn-line` | transparent with a 1px outline | secondary action |

Modifiers: `plain` removes the arrow cap and balances the padding. Direction comes from `data-go="out|file|in"`, which only moves the arrow on hover. `text-link` is the inline underlined link, not a button.

## Motion

Entrance animations run once (hero lines rise, the highlight wipes in, the notch opens, the Dilo email fills line by line, the cookie banner rises). The Dilo clean-up in the chapter plays once when the window is half in view (`DiloShot`). Scroll-linked reveals use `animation-timeline: view()` behind `@supports`. Waveforms and equalisers run a fixed number of iterations. Nothing loops.

## Accessibility

Skip link first in the tab order. 44px minimum targets. Visible focus ring on everything (`:focus-visible`), recoloured per chapter. Text on dark is 80% or 68% on-dark, chosen to clear 4.5:1 on every chapter background. Decorative recreations are `aria-hidden` with a single labelled wrapper (`role="img"`).

## Adding an app

1. Entry in `apps.ts` and an `Apps.<slug>` block in `messages/en.json`, plus an icon in `public/apps/` and an appcast URL in `src/lib/appcast.ts`.
2. For a featured app: a `[data-app="<slug>"]` palette in `globals.css`, a chapter component wired into `app-chapter.tsx`, and an icon in the notch (it is rendered from `APPS`, with `.bar[data-app="<slug>"] .notch img[data-for="<slug>"]` in the CSS).
3. Run `rm -rf .next` after editing `globals.css` if Turbopack serves stale CSS.
