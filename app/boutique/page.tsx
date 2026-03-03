"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StartupCounter from "@/components/StartupCounter";
import RevenueCalculator from "@/components/RevenueCalculator";

const PACKS = [
  {
    id: "decouverte",
    emoji: "🌱",
    name: "Découverte",
    price: 15,
    parts: 1,
    trees: "1 Goyavier + 1 papayer offert",
    treesDetail: ["1 Goyavier (25 ans, 75–150 kg/an)", "1 Papayer offert (dès mois 9)"],
    badge: null,
    target: "Curieux, premier achat",
    highlight: false,
    description: "La porte d'entrée de la forêt GREENHOLD. Parfait pour découvrir le modèle et recevoir ton premier revenu dès le mois 9.",
  },
  {
    id: "famille",
    emoji: "🌳",
    name: "Famille",
    price: 35,
    parts: 2,
    trees: "1 Goyavier + 1 Manguier + 2 papayers offerts",
    treesDetail: ["1 Goyavier (25 ans)", "1 Manguier (40 ans, 150–200 kg/an)", "2 Papayers offerts"],
    badge: "LE PLUS POPULAIRE",
    target: "Familles et diversification",
    highlight: true,
    description: "Le pack préféré des familles. Deux espèces complémentaires — revenus rapides avec le goyavier, patrimoine long terme avec le manguier.",
  },
  {
    id: "investisseur",
    emoji: "🌍",
    name: "Investisseur",
    price: 99,
    parts: 5,
    trees: "5 Manguiers + 5 papayers offerts",
    treesDetail: ["5 Manguiers (40 ans, 150–200 kg/an chacun)", "5 Papayers offerts"],
    badge: null,
    target: "Investisseurs — patrimoine 40 ans",
    highlight: false,
    description: "Pour ceux qui pensent sur le long terme. 5 manguiers produisent pendant 40 ans. Revenus maximisés à maturité.",
  },
  {
    id: "heritage",
    emoji: "👴",
    name: "Héritage Senior",
    price: 750,
    parts: 25,
    trees: "13 Manguiers + 12 Goyaviers + 25 papayers",
    treesDetail: [
      "13 Manguiers (40 ans)",
      "12 Goyaviers (25 ans)",
      "25 Papayers offerts",
      "Certificats nominatifs inclus",
    ],
    badge: "SENIORS & PATRIMOINE",
    extras: [
      "Certificats nominatifs pour chaque arbre",
      "Clause de transmission héritiers automatique",
      "Garantie à vie (remplacement gratuit)",
      "Accès rapport annuel détaillé",
    ],
    target: "55 ans et plus, diaspora africaine senior",
    highlight: false,
    description: "Le pack héritage. Conçu pour transmettre un actif tangible à ses enfants. Clause de transmission automatique incluse.",
  },
];

const OCCASIONS = [
  { icon: "🎄", label: "Noël" },
  { icon: "🌙", label: "Ramadan" },
  { icon: "💐", label: "Fête des Mères" },
  { icon: "👨", label: "Fête des Pères" },
  { icon: "👶", label: "Naissance" },
  { icon: "🎓", label: "Diplôme" },
];

export default function BoutiquePage() {
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (packId: string, price: number, name: string) => {
    setLoading(packId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packId, price, name }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      alert("Une erreur est survenue. Réessaie dans quelques instants.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <main>
      <Navigation />

      {/* Hero */}
      <section
        className="pt-28 pb-16 px-4 text-center"
        style={{ backgroundColor: "#0C2518" }}
      >
        <div className="mx-auto" style={{ maxWidth: "800px" }}>
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#C8972A", fontFamily: "var(--font-sans)" }}
          >
            Sénégal • Forêt mutualisée
          </p>
          <h1
            className="mb-4 text-white"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 600,
            }}
          >
            Choisis tes parts dans la forêt
          </h1>
          <p
            className="text-base"
            style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}
          >
            Chaque part = 1 arbre planté à ton nom + 1 papayer offert + revenus de toute la forêt à vie
          </p>
        </div>
      </section>

      {/* Startup Counter */}
      <StartupCounter />

      {/* Seasonal Banner */}
      <section className="py-6 px-4" style={{ backgroundColor: "#1A4D35" }}>
        <div className="mx-auto" style={{ maxWidth: "1200px" }}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-sm text-white font-semibold" style={{ fontFamily: "var(--font-sans)" }}>
              🎁 Parfait pour :
            </span>
            {OCCASIONS.map(({ icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: "#C8E6D4", color: "#0C2518", fontFamily: "var(--font-sans)" }}
              >
                {icon} {label}
              </span>
            ))}
            <Link
              href="/offrir"
              className="px-4 py-2 rounded-full text-xs font-semibold"
              style={{ backgroundColor: "#C8972A", color: "#0C2518", fontFamily: "var(--font-sans)" }}
            >
              Offrir un arbre →
            </Link>
          </div>
        </div>
      </section>

      {/* Packs Grid */}
      <section className="py-20 px-4" style={{ backgroundColor: "#F8F4EE" }}>
        <div className="mx-auto" style={{ maxWidth: "1200px" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {PACKS.map((pack) => (
              <div
                key={pack.id}
                className="relative rounded-2xl overflow-hidden flex flex-col cursor-pointer transition-all duration-200"
                style={{
                  border:
                    selectedPack === pack.id
                      ? "3px solid #C8972A"
                      : pack.highlight
                      ? "2px solid #C8972A"
                      : "1px solid #DDE8E2",
                  backgroundColor: pack.highlight ? "#0C2518" : "#FFFFFF",
                  borderRadius: "8px",
                  transform: selectedPack === pack.id ? "scale(1.02)" : "scale(1)",
                }}
                onClick={() => setSelectedPack(pack.id)}
              >
                {pack.badge && (
                  <div
                    className="py-2 text-center text-xs font-bold uppercase tracking-wider"
                    style={{ backgroundColor: "#C8972A", color: "#0C2518", fontFamily: "var(--font-sans)" }}
                  >
                    {pack.badge}
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-4xl mb-3">{pack.emoji}</p>
                  <h2
                    className="text-2xl font-semibold mb-1"
                    style={{
                      color: pack.highlight ? "#FFFFFF" : "#0C2518",
                      fontFamily: "var(--font-serif)",
                    }}
                  >
                    {pack.name}
                  </h2>
                  <p
                    className="text-4xl font-bold mb-1"
                    style={{ color: "#C8972A", fontFamily: "var(--font-serif)" }}
                  >
                    {pack.price}€
                  </p>
                  <p
                    className="text-xs mb-4"
                    style={{ color: pack.highlight ? "#C8E6D4" : "#6B7280", fontFamily: "var(--font-sans)" }}
                  >
                    {pack.parts} part{pack.parts > 1 ? "s" : ""} • {pack.target}
                  </p>

                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: pack.highlight ? "#C8E6D4" : "#6B7280", fontFamily: "var(--font-sans)" }}
                  >
                    {pack.description}
                  </p>

                  <ul className="flex flex-col gap-2 mb-4">
                    {pack.treesDetail.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-2 text-xs"
                        style={{
                          color: pack.highlight ? "#C8E6D4" : "#1C2B22",
                          fontFamily: "var(--font-sans)",
                        }}
                      >
                        <span style={{ color: "#C8972A", flexShrink: 0 }}>🌿</span>
                        {detail}
                      </li>
                    ))}
                  </ul>

                  {pack.extras && (
                    <ul className="flex flex-col gap-2 mb-4 pt-4" style={{ borderTop: "1px solid #2A7A4F" }}>
                      {pack.extras.map((extra) => (
                        <li
                          key={extra}
                          className="flex items-start gap-2 text-xs"
                          style={{ color: "#C8972A", fontFamily: "var(--font-sans)" }}
                        >
                          <span>✓</span> {extra}
                        </li>
                      ))}
                    </ul>
                  )}

                  <p
                    className="text-xs italic mb-6"
                    style={{
                      color: pack.highlight ? "#C8E6D4" : "#6B7280",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    Tes revenus viennent de toute la forêt — pas seulement de tes arbres
                  </p>

                  <div className="mt-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCheckout(pack.id, pack.price, pack.name);
                      }}
                      disabled={loading === pack.id}
                      className="w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200"
                      style={{
                        backgroundColor: loading === pack.id ? "#6B7280" : pack.highlight ? "#C8972A" : "#0C2518",
                        color: pack.highlight ? "#0C2518" : "#F0C55A",
                        fontFamily: "var(--font-sans)",
                        minHeight: "48px",
                        cursor: loading === pack.id ? "not-allowed" : "pointer",
                      }}
                    >
                      {loading === pack.id ? "Redirection..." : `Acheter ce pack — ${pack.price}€`}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p
            className="text-center mt-8 text-sm"
            style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
          >
            🔒 Paiement 100% sécurisé Stripe • 🔄 Arbre mort dans les 6 premiers mois → remplacé gratuitement
          </p>
        </div>
      </section>

      {/* Revenue Calculator */}
      <section className="py-20 px-4" style={{ backgroundColor: "#1A4D35" }}>
        <div className="mx-auto" style={{ maxWidth: "1200px" }}>
          <h2
            className="text-center mb-4 text-white"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Simule tes revenus
          </h2>
          <p
            className="text-center mb-12 text-sm"
            style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}
          >
            Utilise le curseur pour voir combien tu pourrais toucher selon tes parts.
          </p>
          <RevenueCalculator />
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-16 px-4" style={{ backgroundColor: "#F8F4EE" }}>
        <div className="mx-auto" style={{ maxWidth: "900px" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: "🔄", text: "Arbre mort dans les 6 premiers mois → remplacé gratuitement" },
              { icon: "📸", text: "Photos géolocalisées de ton arbre toutes les 8 semaines" },
              { icon: "👨‍👩‍👧", text: "Tes parts sont transmissibles à tes héritiers" },
              { icon: "💳", text: "Paiement 100% sécurisé via Stripe — aucune donnée stockée" },
            ].map(({ icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-3 p-4 rounded-xl"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #DDE8E2" }}
              >
                <span className="text-2xl">{icon}</span>
                <p className="text-sm" style={{ color: "#1C2B22", fontFamily: "var(--font-sans)" }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gift CTA */}
      <section className="py-12 px-4 text-center" style={{ backgroundColor: "#C8972A" }}>
        <div className="mx-auto" style={{ maxWidth: "600px" }}>
          <p
            className="text-xl font-semibold mb-4"
            style={{ color: "#0C2518", fontFamily: "var(--font-serif)" }}
          >
            Tu veux l&apos;offrir à quelqu&apos;un ?
          </p>
          <Link
            href="/offrir"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            style={{
              backgroundColor: "#0C2518",
              color: "#F0C55A",
              fontFamily: "var(--font-sans)",
              minHeight: "56px",
            }}
          >
            🎁 Offrir un arbre
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
