import Image from "next/image";

// Crop of the LimitBar cover: menu bar plus the open popover.
export function LimitBarShot({ label }: { label: string }) {
  return (
    <div className="shot">
      <div className="lb">
        <Image
          src="/apps/limitbar-cover.png"
          width={1920}
          height={1080}
          sizes="(max-width: 899px) 120vw, 1400px"
          alt={label}
        />
      </div>
    </div>
  );
}
