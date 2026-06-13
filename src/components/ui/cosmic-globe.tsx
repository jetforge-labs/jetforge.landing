"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface CosmicGlobeProps {
  className?: string;
}

export function CosmicGlobe({ className }: CosmicGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const size = canvas.offsetWidth;

    let phi = 0;
    let rafId: number;

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: size * dpr,
      height: size * dpr,
      phi: 0,
      theta: 0.25,
      dark: 1,
      diffuse: 1.4,
      mapSamples: 12000,
      mapBrightness: 4.5,
      mapBaseBrightness: 0.05,
      // Ion palette: dark navy base, electric-blue markers, ember-blue glow
      baseColor: [0.10, 0.13, 0.26],
      markerColor: [0.25, 0.50, 1.0],
      glowColor: [0.22, 0.42, 0.95],
      markers: [
        { location: [37.7749, -122.4194], size: 0.05 }, // San Francisco
        { location: [51.5074,   -0.1278], size: 0.05 }, // London
        { location: [35.6762,  139.6503], size: 0.04 }, // Tokyo
        { location: [59.4370,   24.7536], size: 0.04 }, // Tallinn (Jetforge home)
        { location: [-33.8688, 151.2093], size: 0.04 }, // Sydney
        { location: [40.7128,  -74.0060], size: 0.04 }, // New York
      ],
    });

    function animate() {
      if (!prefersReducedMotion) {
        phi += 0.003;
        globe.update({ phi });
      }
      rafId = requestAnimationFrame(animate);
    }

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("aspect-square", className)}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
