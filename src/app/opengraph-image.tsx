import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Jetforge Labs - Custom Software Development & Tech Solutions";
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
          background: "linear-gradient(135deg, #010104 0%, #0d0d2a 50%, #010104 100%)",
          position: "relative",
        }}
      >
        {/* Decorative gradient circle */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
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
            background: "radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 70%)",
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
              background: "linear-gradient(90deg, #2563eb, #3b82f6, #60a5fa)",
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
            Custom Software Development & Tech Solutions
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
              "AI & Automation",
              "MVP Development",
            ].map((service) => (
              <div
                key={service}
                style={{
                  padding: "8px 20px",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  borderRadius: "9999px",
                  fontSize: "16px",
                  color: "#60a5fa",
                  background: "rgba(59, 130, 246, 0.05)",
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
