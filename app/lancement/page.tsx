"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CountdownTimer from "@/components/CountdownTimer";
import PreRegistrationForm from "@/components/PreRegistrationForm";
import StartupCounter from "@/components/StartupCounter";

const PACKS_PRESALE = [
  {
    id: "decouverte",
    emoji: "🌱",
    name: "Découverte",
    price: 15,
    pricePromo: 12.75,
    parts: 1,
    desc: "1 Goyavier + 1 papayer offert",
  },
  {
    id: "famille",
    emoji: "🌳",
    name: "Famille",
    price: 35,
    pricePromo: 29.75,
    parts: 2,
    desc: "1 Goyavier + 1 Manguier + 2 papayers",
    badge: "POPULAIRE",
    highlight: true,
  },
  {
    id: "investisseur",
    emoji: "🌍",
    name: "Investisseur",
    price: 99,
    pricePromo: 84.15,
    parts: 5,
    desc: "5 Manguiers + 5 papayers offerts",
  },
  {
    id: "heritage",
    emoji: "👴",
    name: "Héritage Senior",
    price: 750,
    pricePromo: 637.5,
    parts: 25,
    desc: "13 Manguiers + 12 Goyaviers + 25 papayers",
  },
];

export default function LancementPage() {
  return (
    <main>
      <Navigation />

      {/* Hero */}
      <section
        className="relative pt-28 pb-20 px-4"
        style={{ backgroundColor: "#0C2518", minHeight: "60vh", display: "flex", alignItems: "center" }}
      >
        <div className="mx-auto w-full text-center" style={{ maxWidth: "900px" }}>
          <div
            className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6"
            style={{ backgroundColor: "#C8972A", color: "#0C2518", fontFamily: "var(--font-sans)" }}
          >
            🌿 Pré-lancement — Offre exclusive −15%
          </div>

          <h1
            className="mb-6 text-white"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 600,
              lineHeight: 1.1,
            }}
          >
            Le lancement officiel approche
          </h1>
          <p className="text-lg mb-10" style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}>
            Inscris-toi maintenant et reçois une offre exclusive −15% sur tous les packs,{" "}
            <strong style={{ color: "#F0C55A" }}>48h avant le lancement officiel</strong>.
          </p>

          <CountdownTimer />
        </div>
      </section>

      {/* Pre-registration */}
      <section className="py-16 px-4" style={{ backgroundColor: "#1A4D35" }}>
        <div className="mx-auto" style={{ maxWidth: "600px" }}>
          <h2
            className="text-center mb-4 text-white"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}
          >
            Sois le premier informé
          </h2>
          <p className="text-center mb-6 text-sm" style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}>
            Ton e-mail restera confidentiel. Désabonnement en 1 clic.
          </p>
          <PreRegistrationForm />
        </div>
      </section>

      {/* Startup Counter */}
      <StartupCounter />

      {/* Pre-sale packs with -15% */}
      <section className="py-20 px-4" style={{ backgroundColor: "#F8F4EE" }}>
        <div className="mx-auto" style={{ maxWidth: "1200px" }}>
          <div className="text-center mb-12">
            <div
              className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4"
              style={{ backgroundColor: "#C8972A", color: "#0C2518", fontFamily: "var(--font-sans)" }}
            >
              ⚡ Pré-vente — −15% sur tous les packs
            </div>
            <h2
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0C2518" }}
            >
              Packs à prix pré-lancement
            </h2>
            <p className="mt-3 text-sm" style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}>
              Ces prix ne seront plus disponibles après le lancement officiel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {PACKS_PRESALE.map((pack) => (
              <div
                key={pack.id}
                className="rounded-2xl overflow-hidden flex flex-col"
                style={{
                  border: pack.highlight ? "2px solid #C8972A" : "1px solid #DDE8E2",
                  backgroundColor: pack.highlight ? "#0C2518" : "#FFFFFF",
                  borderRadius: "8px",
                }}
              >
                {pack.badge && (
                  <div
                    className="py-2 text-center text-xs font-bold uppercase tracking-wider"
                    style={{ backgroundColor: "#C8972A", color: "#0C2518", fontFamily: "var(--font-sans)" }}
                  >
                    ⭐ {pack.badge}
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-4xl mb-3">{pack.emoji}</p>
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{
                      color: pack.highlight ? "#FFFFFF" : "#0C2518",
                      fontFamily: "var(--font-serif)",
                    }}
                  >
                    {pack.name}
                  </h3>
                  <div className="mb-1 flex items-baseline gap-3">
                    <span
                      className="text-3xl font-bold"
                      style={{ color: "#C8972A", fontFamily: "var(--font-serif)" }}
                    >
                      {pack.pricePromo}€
                    </span>
                    <span
                      className="text-sm line-through"
                      style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
                    >
                      {pack.price}€
                    </span>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "#C8972A", color: "#0C2518", fontFamily: "var(--font-sans)" }}
                    >
                      −15%
                    </span>
                  </div>
                  <p
                    className="text-xs mb-4"
                    style={{ color: pack.highlight ? "#C8E6D4" : "#6B7280", fontFamily: "var(--font-sans)" }}
                  >
                    {pack.parts} part{pack.parts > 1 ? "s" : ""}
                  </p>
                  <p
                    className="text-sm mb-6 flex-1"
                    style={{ color: pack.highlight ? "#C8E6D4" : "#1C2B22", fontFamily: "var(--font-sans)" }}
                  >
                    {pack.desc}
                  </p>
                  <Link
                    href={`/boutique?pack=${pack.id}`}
                    className="block text-center py-3 rounded-xl font-semibold transition-all duration-200"
                    style={{
                      backgroundColor: pack.highlight ? "#C8972A" : "#0C2518",
                      color: pack.highlight ? "#0C2518" : "#F0C55A",
                      fontFamily: "var(--font-sans)",
                      minHeight: "48px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Réserver au prix pré-lancement
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why join early */}
      <section className="py-16 px-4" style={{ backgroundColor: "#0C2518" }}>
        <div className="mx-auto" style={{ maxWidth: "900px" }}>
          <h2
            className="text-center mb-10 text-white"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}
          >
            Pourquoi rejoindre maintenant ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "💰",
                title: "−15% sur tous les packs",
                desc: "Le prix pré-lancement n'existera plus après le 1er septembre 2026.",
              },
              {
                icon: "🌱",
                title: "Participe au démarrage",
                desc: "Tes parts comptent dans l'objectif des 200 parts pour lancer les premières plantations.",
              },
              {
                icon: "🏆",
                title: "Badge fondateur",
                desc: "Les premiers actionnaires reçoivent un badge fondateur permanent sur leur profil.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl p-6"
                style={{ backgroundColor: "#1A4D35", border: "1px solid #2A7A4F", borderRadius: "8px" }}
              >
                <p className="text-4xl mb-3">{icon}</p>
                <h3 className="font-semibold mb-2 text-white" style={{ fontFamily: "var(--font-sans)" }}>
                  {title}
                </h3>
                <p className="text-sm" style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terrain photos placeholder */}
      <section className="py-16 px-4" style={{ backgroundColor: "#F8F4EE" }}>
        <div className="mx-auto text-center" style={{ maxWidth: "800px" }}>
          <h2
            className="mb-4"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#0C2518" }}
          >
            Le terrain GREENHOLD au Sénégal
          </h2>
          <p className="mb-8 text-sm" style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}>
            Photos à venir dès le démarrage des plantations.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl aspect-video flex items-center justify-center"
                style={{ backgroundColor: "#C8E6D4", border: "1px solid #DDE8E2", borderRadius: "8px" }}
              >
                <div className="text-center">
                  <p className="text-3xl mb-1">🌿</p>
                  <p className="text-xs" style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}>
                    Photo terrain
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
