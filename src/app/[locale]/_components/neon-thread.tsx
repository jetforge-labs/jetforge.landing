"use client";

import { useEffect, useRef } from "react";

type Pt = { x: number; y: number };

/**
 * NeonThread — scroll-driven ember filament.
 *
 * A single SVG path that weaves down the page background between the
 * sections (services → build → about) and terminates at the contact card.
 * The path draws itself as the user scrolls (stroke-dashoffset tied to a
 * "tip" point that tracks ~70% of the viewport height), with a glowing
 * spark riding the tip. When the tip reaches the end, the contact card and
 * its submit button "ignite" (class `thread-ignited` on the
 * [data-thread-end] / [data-thread-ignite] elements).
 *
 * Neon look is layered strokes (4 widths/opacities sharing one `d`) — no
 * SVG filters, so per-frame dashoffset updates stay cheap. Geometry rebuilds
 * on body resize (ResizeObserver, debounced). Under prefers-reduced-motion
 * the full path renders statically at low opacity with no tip and no
 * listeners.
 */
export function NeonThread() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRefs = useRef<Array<SVGPathElement | null>>([]);
  const tipRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    const tip = tipRef.current;
    if (!container || !svg || !tip) return;

    const paths = pathRefs.current.filter(Boolean) as SVGPathElement[];
    const measure = paths[0];
    if (!measure) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let totalLen = 0;
    let startY = 0;
    let endY = 0;
    let containerTop = 0;
    let samples: Array<{ len: number; y: number }> = [];
    let ignited = false;
    let raf = 0;

    // Catmull-Rom → cubic beziers: smooth curve through every waypoint.
    function pathThrough(pts: Pt[]): string {
      let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[Math.max(0, i - 1)];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[Math.min(pts.length - 1, i + 2)];
        const c1x = p1.x + (p2.x - p0.x) / 6;
        const c1y = p1.y + (p2.y - p0.y) / 6;
        const c2x = p2.x - (p3.x - p1.x) / 6;
        const c2y = p2.y - (p3.y - p1.y) / 6;
        d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
      }
      return d;
    }

    function build(): boolean {
      const services = document.getElementById("services");
      const buildSec = document.getElementById("build");
      const about = document.getElementById("about");
      const endEl = document.querySelector("[data-thread-end]");
      if (!services || !buildSec || !about || !endEl || !container || !svg || !measure) return false;

      const cRect = container.getBoundingClientRect();
      containerTop = cRect.top + window.scrollY;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (!w || !h) return false;

      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      svg.setAttribute("width", String(w));
      svg.setAttribute("height", String(h));

      const rel = (el: Element) => {
        const r = el.getBoundingClientRect();
        return {
          top: r.top - cRect.top,
          bottom: r.bottom - cRect.top,
          height: r.height,
          cx: r.left - cRect.left + r.width / 2,
        };
      };

      const sv = rel(services);
      const bd = rel(buildSec);
      const ab = rel(about);
      const en = rel(endEl);
      const cx = w / 2;
      // Weave amplitude — wide enough to live in the margins on desktop,
      // restrained on mobile so it reads as a background detail.
      const A = Math.min(w * 0.33, 430);

      const pts: Pt[] = [
        { x: cx, y: Math.max(0, sv.top - 160) },
        { x: cx + A, y: sv.top + sv.height * 0.45 },
        { x: cx - A, y: bd.top + bd.height * 0.28 },
        { x: cx + A * 0.85, y: bd.bottom - bd.height * 0.12 },
        { x: cx - A * 0.6, y: ab.top + ab.height * 0.55 },
        { x: en.cx, y: en.top - 140 },
        { x: en.cx, y: en.top + 2 },
      ];

      const d = pathThrough(pts);
      for (const p of paths) p.setAttribute("d", d);
      totalLen = measure.getTotalLength();
      for (const p of paths) p.style.strokeDasharray = `${totalLen}`;

      // length ↔ y lookup so the drawn tip tracks a viewport-relative Y.
      const N = 240;
      samples = [];
      for (let i = 0; i <= N; i++) {
        const len = (totalLen * i) / N;
        const pt = measure.getPointAtLength(len);
        samples.push({ len, y: pt.y });
      }
      startY = pts[0].y;
      endY = pts[pts.length - 1].y;
      return true;
    }

    function lenForY(targetY: number): number {
      if (!samples.length || targetY <= samples[0].y) return 0;
      for (let i = 1; i < samples.length; i++) {
        if (samples[i].y >= targetY) {
          const a = samples[i - 1];
          const b = samples[i];
          const t = b.y === a.y ? 0 : (targetY - a.y) / (b.y - a.y);
          return a.len + (b.len - a.len) * t;
        }
      }
      return totalLen;
    }

    function toggleIgnite(on: boolean) {
      document
        .querySelectorAll("[data-thread-end], [data-thread-ignite]")
        .forEach((el) => el.classList.toggle("thread-ignited", on));
    }

    function update() {
      raf = 0;
      if (!totalLen || !measure || !tip) return;
      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 4;
      const targetY = window.scrollY + window.innerHeight * 0.72 - containerTop;
      const drawn = atBottom
        ? totalLen
        : lenForY(Math.min(Math.max(targetY, startY), endY));

      for (const p of paths) p.style.strokeDashoffset = `${totalLen - drawn}`;

      if (drawn <= 1) {
        tip.style.opacity = "0";
      } else {
        const pt = measure.getPointAtLength(drawn);
        tip.style.opacity = "1";
        tip.setAttribute(
          "transform",
          `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`
        );
      }

      // Arrival — hysteresis so the glow doesn't flicker at the boundary.
      if (!ignited && drawn >= totalLen - 6) {
        ignited = true;
        toggleIgnite(true);
      } else if (ignited && drawn < totalLen * 0.96) {
        ignited = false;
        toggleIgnite(false);
      }
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    let resizeTimer = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (build()) {
          if (reduceMotion) {
            for (const p of paths) p.style.strokeDashoffset = "0";
          } else {
            update();
          }
        }
      }, 150);
    });

    if (reduceMotion) {
      // Static filament: full path, dimmed, no spark, no scroll work.
      if (build()) {
        svg.classList.add("thread-static");
        for (const p of paths) p.style.strokeDashoffset = "0";
        tip.style.opacity = "0";
      }
      ro.observe(document.body);
      return () => {
        ro.disconnect();
        window.clearTimeout(resizeTimer);
      };
    }

    if (build()) update();
    ro.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
      window.clearTimeout(resizeTimer);
      if (raf) cancelAnimationFrame(raf);
      toggleIgnite(false);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <svg ref={svgRef} className="neon-thread h-full w-full">
        {/* Layered neon — widest/faintest first, hot core last */}
        <path
          ref={(el) => {
            pathRefs.current[0] = el;
          }}
          className="thread-w1"
        />
        <path
          ref={(el) => {
            pathRefs.current[1] = el;
          }}
          className="thread-w2"
        />
        <path
          ref={(el) => {
            pathRefs.current[2] = el;
          }}
          className="thread-w3"
        />
        <path
          ref={(el) => {
            pathRefs.current[3] = el;
          }}
          className="thread-core"
        />
        {/* Travelling spark at the drawn tip */}
        <g ref={tipRef} className="thread-tip" style={{ opacity: 0 }}>
          <circle r="11" className="tip-halo" />
          <circle r="4" className="tip-glow" />
          <circle r="1.8" className="tip-core" />
        </g>
      </svg>
    </div>
  );
}
