"use client";

import { useState } from "react";
import Link from "next/link";

const REVENUE_TABLE: Record<string, number> = {
  an1: 9.82,
  an2: 16.77,
  an5: 22.40,
  an10: 35.0,
};

function formatEuro(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
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
          { label: "Année 1", key: "an1", sub: "Papayer offert" },
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
          💡 Avec réinvestissement 50%
        </p>
        <p className="text-sm" style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}>
          Tes parts doublent en 10 ans automatiquement.{" "}
          <strong style={{ color: "#C8972A" }}>
            {parts} parts → {parts * 2} parts
          </strong>{" "}
          sans débourser un euro de plus.
        </p>
      </div>

      {/* CTA */}
      <div className="text-center">
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
    </div>
  );
}
