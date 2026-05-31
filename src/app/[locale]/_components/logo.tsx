import Image from "next/image";

interface LogoProps {
  className?: string;
  priority?: boolean;
}

export function Logo({ className = "h-[50px]", priority = false }: LogoProps) {
  return (
    <Image
      src="/logo-mark.png"
      alt="Jetforge Labs logo"
      width={419}
      height={539}
      className={`object-contain ${className}`}
      priority={priority}
      {...(priority ? { fetchPriority: "high" } : { loading: "lazy" })}
    />
  );
}
