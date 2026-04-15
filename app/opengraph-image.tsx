import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Walid Khalladi — Senior Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#E8E0D0",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: "#8A857A",
            marginBottom: 16,
            fontFamily: "monospace",
          }}
        >
          // 00 Home
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#1A1A1A",
            lineHeight: 1,
            letterSpacing: "-0.03em",
            marginBottom: 24,
          }}
        >
          Walid Khalladi
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#4A4540",
            fontWeight: 300,
            maxWidth: 700,
            lineHeight: 1.4,
          }}
        >
          Mobile systems, on-device AI, and the architecture in between.
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 80,
            fontSize: 18,
            color: "#8A857A",
            fontFamily: "monospace",
          }}
        >
          walidkhalladi.com — Munich, DE
        </div>
      </div>
    ),
    { ...size }
  );
}
