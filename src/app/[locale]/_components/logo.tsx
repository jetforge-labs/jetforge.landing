import Image from "next/image";

interface LogoProps {
  className?: string;
  priority?: boolean;
}

export function Logo({ className = "h-[50px]", priority = false }: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="Jetforge Labs logo"
      width={1000}
      height={250}
      className={`object-contain ${className}`}
      priority={priority}
      {...(priority ? { fetchPriority: "high" } : { loading: "lazy" })}
    />
  );
}
