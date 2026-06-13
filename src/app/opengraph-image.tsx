import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Jetforge Labs. Software Studio. Ship products, not prototypes.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #030308 0%, #0d0d2a 50%, #030308 100%)",
          position: "relative",
        }}
      >
        {/* Decorative gradient circle — ember/ion palette */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(100, 120, 220, 0.18) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(80, 100, 200, 0.12) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
            zIndex: 1,
          }}
        >
          {/* Company name */}
          <div
            style={{
              fontSize: "72px",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-2px",
              lineHeight: 1,
            }}
          >
            Jetforge Labs
          </div>

          {/* Divider line */}
          <div
            style={{
              width: "120px",
              height: "3px",
              background: "linear-gradient(90deg, #4a6fdc, #6080e8, #7090f4)",
              borderRadius: "2px",
            }}
          />

          {/* Tagline */}
          <div
            style={{
              fontSize: "28px",
              fontWeight: 400,
              color: "#94a3b8",
              letterSpacing: "0.5px",
            }}
          >
            Ship products. Not prototypes.
          </div>

          {/* Services row */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "16px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {[
              "Custom Software",
              "Mobile Apps",
              "Cloud & DevOps",
              "AI Agents",
              "MVP Development",
            ].map((service) => (
              <div
                key={service}
                style={{
                  padding: "8px 20px",
                  border: "1px solid rgba(90, 120, 220, 0.3)",
                  borderRadius: "9999px",
                  fontSize: "16px",
                  color: "#7090f4",
                  background: "rgba(70, 100, 200, 0.05)",
                }}
              >
                {service}
              </div>
            ))}
          </div>
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            fontSize: "18px",
            color: "#475569",
            letterSpacing: "1px",
          }}
        >
          jetforgelabs.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
