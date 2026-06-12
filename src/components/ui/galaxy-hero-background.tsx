"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Code-split the Spline runtime (~heavy) and keep it client-only — the scene
// needs canvas/WebGL, so SSR would crash or waste bytes.
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => null,
});

const SCENE_URL = "https://prod.spline.design/us3ALejTXl6usHZ7/scene.splinecode";

/**
 * GalaxyHeroBackground — interactive Spline galaxy behind the hero.
 *
 * Layering, bottom to top:
 *  1. Static radial base in the page palette — visible while the scene
 *     streams in, and the permanent fallback under prefers-reduced-motion
 *     (the Spline scene is constant motion, so it's skipped entirely there).
 *  2. The Spline canvas (pointer-events on, so the galaxy tracks the cursor).
 *  3. A legibility vignette: side fades + bottom fade into --color-bg so the
 *     scene melts into the page instead of ending at a hard edge.
 *
 * The parent section must be `relative overflow-hidden`; hero content above
 * should be `pointer-events-none` with `pointer-events-auto` restored on
 * interactive elements, so mouse movement reaches the canvas.
 */
export function GalaxyHeroBackground() {
  // null until mounted — avoids hydration mismatch and never loads the
  // runtime for reduced-motion users.
  const [showScene, setShowScene] = useState<boolean | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setShowScene(!reduce);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* 1 — static base, palette-native */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_oklch(0.19_0.022_262)_0%,_oklch(0.13_0.014_265)_65%)]" />

      {/* 2 — interactive galaxy. The scene ships pink/magenta nebulae; the
          hue-rotate pulls them into the ion blue/violet range so the galaxy
          sits inside the site palette instead of fighting it. */}
      {showScene && (
        <div
          className="absolute inset-0"
          style={{ filter: "hue-rotate(-60deg) saturate(0.9)" }}
        >
          <Spline
            scene={SCENE_URL}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "auto",
            }}
          />
        </div>
      )}

      {/* 3 — legibility vignette, blends the scene into the page bg */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(52% 48% at 50% 54%, oklch(0.13 0.014 265 / 0.55) 0%, oklch(0.13 0.014 265 / 0.25) 55%, transparent 78%),
            linear-gradient(to right, oklch(0.13 0.014 265 / 0.85), transparent 28%, transparent 72%, oklch(0.13 0.014 265 / 0.85)),
            linear-gradient(to bottom, oklch(0.13 0.014 265 / 0.45) 0%, transparent 26%, transparent 52%, oklch(0.13 0.014 265 / 0.7) 82%, oklch(0.13 0.014 265) 93%)
          `,
        }}
      />
    </div>
  );
}
