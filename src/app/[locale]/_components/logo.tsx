interface LogoProps {
  /** Sizing/spacing utilities (e.g. text-xl, mb-4). Weight/tracking/color
   *  are applied by the component for a consistent wordmark. */
  className?: string;
}

/** Text wordmark — Geist display, consistent across navbar/hero/footer. */
export function Logo({ className = "" }: LogoProps) {
  return (
    <span
      className={`font-display font-bold leading-none tracking-[-0.02em] text-[oklch(0.92_0.005_60)] ${className}`}
    >
      Jetforge Labs
    </span>
  );
}
