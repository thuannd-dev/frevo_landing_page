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
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle orange ambient glow in top-right */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(251,74,10,0.18) 0%, rgba(251,74,10,0) 70%)",
          }}
        />

        {/* Top brand header */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "#FB4A0A",
            }}
          />
          <div
            style={{
              color: "#FFFFFF",
              fontSize: 36,
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            FREVO
          </div>
          <div
            style={{
              color: "#71767F",
              fontSize: 24,
              fontWeight: 500,
              marginLeft: 8,
            }}
          >
            · Where Freelancers Evolve
          </div>
        </div>

        {/* Main hero typography */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#FFFFFF",
              fontSize: 84,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
            }}
          >
            <div>The right creative.</div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span>For the&nbsp;</span>
              <span style={{ color: "#FB4A0A" }}>right</span>
              <span>&nbsp;project.</span>
            </div>
          </div>

          <div
            style={{
              color: "#9CA3AF",
              fontSize: 26,
              marginTop: 28,
              lineHeight: 1.4,
              maxWidth: 900,
            }}
          >
            Curated freelancers & creative pods · Fixed milestones · Protected escrow
          </div>
        </div>

        {/* Bottom category pills */}
        <div style={{ display: "flex", gap: 14 }}>
          {["Branding & Design", "Video & Motion", "Packaging & 3D", "Web & UI/UX"].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  padding: "10px 22px",
                  borderRadius: 999,
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#D1D5DB",
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                {tag}
              </div>
            ),
          )}
        </div>
      </div>
    ),
    { ...size },
  );
}
