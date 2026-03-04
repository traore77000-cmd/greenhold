"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const TARGET = 200;

export default function StartupCounter() {
  const [partsSold, setPartsSold] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const fetchTotal = async () => {
    const { data, error } = await supabase
      .from("parts")
      .select("nombre_parts")
      .eq("statut", "confirmé");

    if (!error && data) {
      const total = data.reduce(
        (sum: number, row: { nombre_parts: number }) => sum + row.nombre_parts,
        0
      );
      setPartsSold(total);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTotal();

    // Real-time subscription
    const channel = supabase
      .channel("parts-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "parts" },
        () => {
          fetchTotal();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const percentage = Math.min(Math.round((partsSold / TARGET) * 100), 100);
  const remaining = Math.max(TARGET - partsSold, 0);
  const launched = partsSold >= TARGET;

  return (
    <section
      className="py-12 px-4"
      style={{ backgroundColor: "#F8F4EE", borderTop: "2px solid #C8972A", borderBottom: "2px solid #C8972A" }}
    >
      <div className="mx-auto" style={{ maxWidth: "800px" }}>
        {launched ? (
          <div className="text-center">
            <div
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-lg mb-4"
              style={{ backgroundColor: "#1A4D35", fontFamily: "var(--font-sans)" }}
            >
              🌿 Les plantations ont démarré !
            </div>
            <p className="text-sm" style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}>
              {partsSold} parts vendues — Merci à tous les premiers actionnaires !
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h2
                className="text-xl font-semibold mb-1"
                style={{ color: "#0C2518", fontFamily: "var(--font-serif)" }}
              >
                🌱 Objectif de démarrage des plantations
              </h2>
              <p className="text-sm" style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}>
                Plus que{" "}
                <strong style={{ color: "#C8972A" }}>{remaining} parts</strong>{" "}
                pour que les premières plantations commencent !
              </p>
            </div>

            {/* Progress Bar */}
            <div className="relative mb-4">
              <div
                className="w-full h-5 rounded-full overflow-hidden"
                style={{ backgroundColor: "#DDE8E2" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: loading ? "0%" : `${percentage}%`,
                    background: "linear-gradient(90deg, #1A4D35, #C8972A)",
                  }}
                />
              </div>
              {/* Tooltip */}
              {!loading && percentage > 0 && (
                <div
                  className="absolute -top-8 text-xs font-bold px-2 py-1 rounded"
                  style={{
                    left: `${Math.max(percentage - 3, 0)}%`,
                    backgroundColor: "#C8972A",
                    color: "#0C2518",
                    fontFamily: "var(--font-sans)",
                    transform: "translateX(-50%)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {percentage}%
                </div>
              )}
            </div>

            {/* Numbers */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm" style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}>
                {loading ? "..." : <><strong style={{ color: "#0C2518" }}>{partsSold}</strong> parts vendues</>}
              </span>
              <span
                className="text-3xl font-bold"
                style={{ color: "#C8972A", fontFamily: "var(--font-serif)" }}
              >
                {loading ? "..." : `${percentage}%`}
              </span>
              <span className="text-sm" style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}>
                Objectif : <strong style={{ color: "#0C2518" }}>{TARGET} parts</strong>
              </span>
            </div>

            <div className="text-center">
              <Link
                href="/boutique"
                className="inline-block px-8 py-3 rounded-lg font-semibold transition-all duration-200"
                style={{
                  backgroundColor: "#0C2518",
                  color: "#F0C55A",
                  fontFamily: "var(--font-sans)",
                  minHeight: "48px",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                Je participe au démarrage
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
