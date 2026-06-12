interface LogoProps {
  /** Sizing/spacing utilities (e.g. text-xl, mb-4). Weight/tracking/color
   *  are applied by the component for a consistent wordmark. */
  className?: string;
}

/** Text wordmark — Orbitron display, consistent across navbar/hero/footer. */
export function Logo({ className = "" }: LogoProps) {
  return (
    <span
      className={`font-logo font-bold leading-none tracking-normal text-[oklch(0.93_0.006_250)] ${className}`}
    >
      Jetforge Labs
    </span>
  );
}
