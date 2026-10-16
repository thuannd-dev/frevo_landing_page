import { ImageResponse } from "next/og";

export const alt = "FREVO — Where Freelancers Evolve";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#121316",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 32, height: 32, background: "#FB4A0A" }} />
          <div style={{ color: "#FFFFFF", fontSize: 36, fontWeight: 800 }}>
            FREVO
          </div>
          <div style={{ color: "#71767F", fontSize: 24, fontWeight: 500 }}>
            · Where Freelancers Evolve
          </div>
        </div>

        {/* Main Body */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#FFFFFF",
              fontSize: 96,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            The right creative.
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "#FFFFFF",
              fontSize: 96,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            <span>For the </span>
            <span style={{ color: "#FB4A0A", marginLeft: 20, marginRight: 20 }}>
              right
            </span>
            <span>project.</span>
            <div
              style={{
                width: 40,
                height: 40,
                background: "#FB4A0A",
                marginLeft: 20,
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              color: "#9CA3AF",
              fontSize: 28,
              marginTop: 24,
              fontWeight: 500,
            }}
          >
            Curated creators & pods · Milestone escrow · 100% IP ownership
          </div>
        </div>

        {/* Bottom Tagline */}
        <div style={{ display: "flex", gap: 16 }}>
          <div
            style={{
              display: "flex",
              padding: "8px 20px",
              background: "rgba(255, 255, 255, 0.08)",
              color: "#E5E7EB",
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            Branding & Design
          </div>
          <div
            style={{
              display: "flex",
              padding: "8px 20px",
              background: "rgba(255, 255, 255, 0.08)",
              color: "#E5E7EB",
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            Video & Motion
          </div>
          <div
            style={{
              display: "flex",
              padding: "8px 20px",
              background: "rgba(255, 255, 255, 0.08)",
              color: "#E5E7EB",
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            Packaging & 3D
          </div>
          <div
            style={{
              display: "flex",
              padding: "8px 20px",
              background: "rgba(255, 255, 255, 0.08)",
              color: "#E5E7EB",
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            Web & UI/UX
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
