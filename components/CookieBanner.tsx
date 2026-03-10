"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("greenhold_cookies_accepted");
    if (!accepted) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("greenhold_cookies_accepted", "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        backgroundColor: "#0C2518",
        borderTop: "2px solid #2A7A4F",
        padding: "16px 24px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
      }}
    >
      <p
        style={{
          color: "#C8E6D4",
          fontFamily: "var(--font-sans)",
          fontSize: "0.875rem",
          margin: 0,
          flex: 1,
          minWidth: "260px",
        }}
      >
        🍪 Ce site utilise uniquement des cookies essentiels à son fonctionnement.
      </p>
      <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
        <button
          onClick={accept}
          style={{
            backgroundColor: "#C8972A",
            color: "#0C2518",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            fontFamily: "var(--font-sans)",
            fontSize: "0.875rem",
            fontWeight: 600,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Accepter
        </button>
        <Link
          href="/politique-cookies"
          style={{
            backgroundColor: "transparent",
            color: "#C8E6D4",
            border: "1px solid #2A7A4F",
            borderRadius: "8px",
            padding: "10px 20px",
            fontFamily: "var(--font-sans)",
            fontSize: "0.875rem",
            fontWeight: 500,
            cursor: "pointer",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          En savoir plus
        </Link>
      </div>
    </div>
  );
}
