"use client";

import { useState } from "react";
import Link from "next/link";

// Revenus par part (1 part = 15€) basés sur les prix réels du marché sénégalais
const REVENUE_TABLE: Record<string, number> = {
  an1: 0.31,
  an2: 2.07,
  an5: 4.35,
  an10: 11.70,
};

function formatEuro(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export default function RevenueCalculator() {
  const [parts, setParts] = useState(5);

  const revenues = {
    an1: parts * REVENUE_TABLE.an1,
    an2: parts * REVENUE_TABLE.an2,
    an5: parts * REVENUE_TABLE.an5,
    an10: parts * REVENUE_TABLE.an10,
  };

  return (
    <div className="mx-auto" style={{ maxWidth: "700px" }}>
      {/* Slider */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-sm font-medium"
            style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}
          >
            Nombre de parts
          </span>
          <span
            className="text-3xl font-bold"
            style={{ color: "#C8972A", fontFamily: "var(--font-serif)" }}
          >
            {parts} part{parts > 1 ? "s" : ""}
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={100}
          value={parts}
          onChange={(e) => setParts(Number(e.target.value))}
          className="w-full"
          aria-label="Nombre de parts"
        />
        <div className="flex justify-between mt-2">
          <span className="text-xs" style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}>
            1 part = 15€
          </span>
          <span className="text-xs" style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}>
            100 parts = 1 500€
          </span>
        </div>
      </div>

      {/* Revenue Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Année 1", key: "an1", sub: "Papayers actifs" },
          { label: "Année 2", key: "an2", sub: "Goyaviers actifs" },
          { label: "Année 5", key: "an5", sub: "Pleine production" },
          { label: "Année 10", key: "an10", sub: "Maturité complète" },
        ].map(({ label, key, sub }) => (
          <div
            key={key}
            className="rounded-xl p-4 text-center"
            style={{ backgroundColor: "#0C2518", border: "1px solid #2A7A4F" }}
          >
            <p
              className="text-xs mb-2"
              style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}
            >
              {label}
            </p>
            <p
              className="text-2xl font-bold"
              style={{ color: "#C8972A", fontFamily: "var(--font-serif)" }}
            >
              {formatEuro(revenues[key as keyof typeof revenues])}
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
            >
              {sub}
            </p>
          </div>
        ))}
      </div>

      {/* Reinvestment teaser */}
      <div
        className="rounded-xl p-5 mb-6 text-center"
        style={{ backgroundColor: "#0C2518", border: "1px solid #C8972A" }}
      >
        <p className="text-sm mb-1" style={{ color: "#F0C55A", fontFamily: "var(--font-sans)" }}>
          💡 Réinvestissement
        </p>
        <p className="text-sm" style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}>
          En réinvestissant tes revenus, tu peux acquérir de nouvelles parts au fil des années et faire croître ton patrimoine forestier progressivement.
        </p>
      </div>

      {/* CTA */}
      <div className="text-center mb-6">
        <Link
          href={`/boutique?parts=${parts}`}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200"
          style={{
            backgroundColor: "#C8972A",
            color: "#0C2518",
            fontFamily: "var(--font-sans)",
            minHeight: "56px",
          }}
        >
          Commencer avec {parts} part{parts > 1 ? "s" : ""}
          <span>→</span>
        </Link>
      </div>

      {/* Mention légale */}
      <p
        className="text-sm text-center italic"
        style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
      >
        Les projections affichées sont basées sur les prix moyens du marché local sénégalais (goyave et mangue : 300-400 FCFA/kg) et des rendements agricoles moyens constatés en zone des Niayes. Les revenus réels peuvent varier selon les conditions climatiques et agricoles. GREENHOLD s&apos;engage à publier un rapport annuel détaillé.
      </p>
    </div>
  );
}
