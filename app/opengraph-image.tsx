import { ImageResponse } from "next/og";

export const alt = "GREENHOLD — Forêt fruitière mutualisée au Sénégal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        backgroundColor: "#0C2518",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 80px",
        position: "relative",
        fontFamily: "sans-serif",
      }}
    >
      {/* Cercle décoratif en fond */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(42, 122, 79, 0.15)",
          top: -100,
          right: -100,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(200, 151, 42, 0.08)",
          bottom: -80,
          left: -80,
        }}
      />

      {/* Icône */}
      <div style={{ fontSize: 72, marginBottom: 24 }}>🌿</div>

      {/* Titre GREENHOLD */}
      <div
        style={{
          fontSize: 88,
          fontWeight: 900,
          color: "#FFFFFF",
          letterSpacing: "-3px",
          marginBottom: 16,
          lineHeight: 1,
        }}
      >
        GREENHOLD
      </div>

      {/* Sous-titre */}
      <div
        style={{
          fontSize: 30,
          color: "#C8E6D4",
          textAlign: "center",
          maxWidth: 860,
          lineHeight: 1.4,
          marginBottom: 48,
        }}
      >
        Forêt fruitière mutualisée au Sénégal
      </div>

      {/* Tagline */}
      <div
        style={{
          fontSize: 24,
          color: "#C8972A",
          fontWeight: 700,
          letterSpacing: "2px",
          textTransform: "uppercase",
          marginBottom: 52,
        }}
      >
        Plant it. Own it. Earn it.
      </div>

      {/* Badges de confiance */}
      <div
        style={{
          display: "flex",
          gap: 32,
          position: "absolute",
          bottom: 44,
        }}
      >
        {[
          "✅  SIREN 102152402",
          "🔒  Paiement Stripe",
          "🇫🇷  Entreprise française",
        ].map((badge) => (
          <div
            key={badge}
            style={{
              fontSize: 18,
              color: "#6B9E80",
              backgroundColor: "rgba(42, 122, 79, 0.2)",
              borderRadius: 8,
              padding: "8px 18px",
              border: "1px solid rgba(42, 122, 79, 0.4)",
            }}
          >
            {badge}
          </div>
        ))}
      </div>
    </div>,
    { ...size }
  );
}
