"use client";

import { useEffect } from "react";

/**
 * Drives the header's notch: sets data-app on the menu bar to the featured app whose chapter has started to take over the view,
 * and clears it elsewhere. Renders nothing. CSS does the rest (width, glow, which icon shows).
 *
 * One rule in both scroll directions: a chapter is active while it spans a line near the bottom of the viewport (HANDOFF),
 * so it takes the notch as soon as its top edge rises into the lower part of the screen. Chapters are stacked back to back,
 * so exactly one matches at any scroll position and the hand-off between two of them cannot flicker or leave a gap.
 */
const HANDOFF = 0.85;

export function NotchWatcher({ barId }: { barId: string }) {
  useEffect(() => {
    const bar = document.getElementById(barId);
    const chapters = Array.from(document.querySelectorAll<HTMLElement>(".ch[data-app]"));
    if (!bar || chapters.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * HANDOFF;
      const current = chapters.find((chapter) => {
        const rect = chapter.getBoundingClientRect();
        return rect.top <= line && rect.bottom > line;
      });
      if (current?.dataset.app) bar.dataset.app = current.dataset.app;
      else bar.removeAttribute("data-app");
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
      bar.removeAttribute("data-app");
    };
  }, [barId]);

  return null;
}
