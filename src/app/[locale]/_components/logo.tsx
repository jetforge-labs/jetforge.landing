import Image from "next/image";

export function Logo({ className = "h-[50px]" }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="Jetforge Labs"
      width={1000}
      height={250}
      className={`object-contain ${className}`}
    />
  );
}
