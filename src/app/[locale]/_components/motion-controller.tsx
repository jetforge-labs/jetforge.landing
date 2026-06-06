"use client";

import { useEffect } from "react";

/**
 * Pointer- and scroll-driven motion that CSS can't express on its own:
 *  - [data-tilt]      → subtle 3D tilt + lift on hover (fine pointers only)
 *  - [data-magnetic]  → small magnetic pull toward the cursor (fine pointers only)
 *  - [data-parallax]  → transform-only scroll parallax (desktop only)
 *
 * Transform/opacity only. Bails out entirely under prefers-reduced-motion, and
 * pointer effects only attach on fine (mouse) pointers, so touch devices stay calm.
 */
export function MotionController() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    const cleanups: Array<() => void> = [];

    // ── Scroll parallax (desktop only) ──────────────────────────────
    const parallaxEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]")
    );
    if (!isMobile && parallaxEls.length) {
      let ticking = false;
      const update = () => {
        const y = window.scrollY;
        for (const el of parallaxEls) {
          const speed = parseFloat(el.dataset.parallax || "0.1");
          el.style.transform = `translate3d(0, ${(y * speed).toFixed(1)}px, 0)`;
        }
        ticking = false;
      };
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      update();
      cleanups.push(() => window.removeEventListener("scroll", onScroll));
    }

    // ── Tilt + magnetic (fine pointers only) ────────────────────────
    if (finePointer) {
      // Tilt — [data-tilt] consumers (service-card, build-showcase) were removed
      // in the 2026-06 redesign. This block is dead code. Keep it so re-adding
      // data-tilt to any element lights it up without further changes.
      document
        .querySelectorAll<HTMLElement>("[data-tilt]")
        .forEach((el) => {
          const MAX_DEG = 5;
          const onEnter = () => {
            el.style.willChange = "transform";
            el.style.transition = "none";
          };
          const onMove = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            el.style.transform = `perspective(900px) rotateX(${(
              -py * MAX_DEG
            ).toFixed(2)}deg) rotateY(${(px * MAX_DEG).toFixed(
              2
            )}deg) translateY(-4px)`;
          };
          const onLeave = () => {
            el.style.transition = `transform var(--dur-base) var(--ease-out)`;
            el.style.transform = "";
            el.style.willChange = "";
          };
          el.addEventListener("pointerenter", onEnter);
          el.addEventListener("pointermove", onMove);
          el.addEventListener("pointerleave", onLeave);
          cleanups.push(() => {
            el.removeEventListener("pointerenter", onEnter);
            el.removeEventListener("pointermove", onMove);
            el.removeEventListener("pointerleave", onLeave);
            el.style.transform = "";
            el.style.willChange = "";
            el.style.transition = "";
          });
        });

      // Magnetic
      document
        .querySelectorAll<HTMLElement>("[data-magnetic]")
        .forEach((el) => {
          const STRENGTH = 0.25;
          const MAX = 8;
          const clamp = (v: number) => Math.max(-MAX, Math.min(MAX, v));
          const onEnter = () => {
            el.style.willChange = "transform";
            el.style.transition = "none";
          };
          const onMove = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            const dx = e.clientX - (r.left + r.width / 2);
            const dy = e.clientY - (r.top + r.height / 2);
            el.style.transform = `translate(${clamp(dx * STRENGTH).toFixed(
              1
            )}px, ${clamp(dy * STRENGTH).toFixed(1)}px)`;
          };
          const onLeave = () => {
            el.style.transition = `transform var(--dur-base) var(--ease-out)`;
            el.style.transform = "";
            el.style.willChange = "";
          };
          el.addEventListener("pointerenter", onEnter);
          el.addEventListener("pointermove", onMove);
          el.addEventListener("pointerleave", onLeave);
          cleanups.push(() => {
            el.removeEventListener("pointerenter", onEnter);
            el.removeEventListener("pointermove", onMove);
            el.removeEventListener("pointerleave", onLeave);
            el.style.transform = "";
            el.style.willChange = "";
            el.style.transition = "";
          });
        });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
