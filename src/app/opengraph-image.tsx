import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Jetforge Labs. Small apps for less friction in your day: Checkmate, Dilo and LimitBar.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const APPS = [
  { name: "Checkmate", bg: "#0B2E2D", accent: "#59C5BF" },
  { name: "Dilo", bg: "#0A1324", accent: "#7DB2FF" },
  { name: "LimitBar", bg: "#111722", accent: "#FF5E3A" },
];

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FFFFFF",
          color: "#111214",
          padding: "72px 80px",
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>Jetforge Labs</div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>Your day,</div>
          <div style={{ fontSize: 120, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>with less friction.</div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#4A4D55" }}>
            Small apps for the little things that eat your time.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {APPS.map((app) => (
            <div
              key={app.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                height: 56,
                padding: "0 26px 0 18px",
                borderRadius: 999,
                background: app.bg,
                color: "#F3F5F6",
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              <div style={{ width: 18, height: 18, borderRadius: 999, background: app.accent }} />
              {app.name}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
