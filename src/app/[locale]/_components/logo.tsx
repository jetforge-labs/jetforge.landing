interface LogoProps {
  /** Sizing/spacing utilities (e.g. text-xl, mb-4). Weight/tracking/color
   *  are applied by the component for a consistent wordmark. */
  className?: string;
}

/** Text wordmark used across the site (navbar, hero, footer). */
export function Logo({ className = "" }: LogoProps) {
  return (
    <span
      className={`font-bold leading-none tracking-tight text-white ${className}`}
    >
      Jetforge Labs
    </span>
  );
}
