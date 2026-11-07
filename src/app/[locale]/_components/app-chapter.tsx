import type { AppEntry } from "./apps";
import { CheckmateChapter } from "./checkmate-chapter";
import { DiloChapter } from "./dilo-chapter";
import { MacbrowChapter } from "./macbrow-chapter";

/** One chapter per featured app, each with its own composition. Colours come from the [data-app] block in globals.css. */
export function AppChapter({ app }: { app: AppEntry }) {
  switch (app.slug) {
    case "dilo":
      return <DiloChapter app={app} />;
    case "macbrow":
      return <MacbrowChapter app={app} />;
    case "checkmate":
      return <CheckmateChapter app={app} />;
    default:
      return null;
  }
}
