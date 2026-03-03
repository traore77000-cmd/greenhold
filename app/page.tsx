import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StartupCounter from "@/components/StartupCounter";
import CountdownTimer from "@/components/CountdownTimer";
import RevenueCalculator from "@/components/RevenueCalculator";
import FaqSection from "@/components/FaqSection";
import PreRegistrationForm from "@/components/PreRegistrationForm";

// ─── Pack data (shared reference) ─────────────────────────────────
const PACKS = [
  {
    id: "decouverte",
    emoji: "🌱",
    name: "Découverte",
    price: 15,
    parts: 1,
    trees: "1 Goyavier + 1 papayer offert",
    badge: null,
    target: "Curieux, premier achat",
    highlight: false,
    priceId: "price_decouverte",
  },
  {
    id: "famille",
    emoji: "🌳",
    name: "Famille",
    price: 35,
    parts: 2,
    trees: "1 Goyavier + 1 Manguier + 2 papayers offerts",
    badge: "LE PLUS POPULAIRE",
    target: "Familles et diversification",
    highlight: true,
    priceId: "price_famille",
  },
  {
    id: "investisseur",
    emoji: "🌍",
    name: "Investisseur",
    price: 99,
    parts: 5,
    trees: "5 Manguiers + 5 papayers offerts",
    badge: null,
    target: "Investisseurs — patrimoine 40 ans",
    highlight: false,
    priceId: "price_investisseur",
  },
  {
    id: "heritage",
    emoji: "👴",
    name: "Héritage Senior",
    price: 750,
    parts: 25,
    trees: "13 Manguiers + 12 Goyaviers + 25 papayers",
    badge: "SENIORS & PATRIMOINE",
    target: "55 ans et plus, diaspora africaine",
    highlight: false,
    extras: [
      "Certificats nominatifs",
      "Clause transmission héritiers automatique",
      "Garantie à vie",
    ],
    priceId: "price_heritage",
  },
];

export default function HomePage() {
  return (
    <main>
      <Navigation />

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative pt-28 pb-20 px-4"
        style={{ backgroundColor: "#0C2518", minHeight: "90vh", display: "flex", alignItems: "center" }}
      >
        <div className="mx-auto w-full" style={{ maxWidth: "1200px" }}>
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-6"
              style={{ color: "#C8972A", fontFamily: "var(--font-sans)" }}
            >
              Sénégal • À partir de 15€ • À vie
            </p>

            {/* H1 */}
            <h1
              className="mb-6 leading-tight"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 600,
                color: "#FFFFFF",
                lineHeight: 1.1,
              }}
            >
              Possède des parts d&apos;une forêt fruitière au Sénégal.{" "}
              <em style={{ color: "#F0C55A" }}>Touche tes récoltes à vie.</em>
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg mb-10 leading-relaxed"
              style={{
                color: "#C8E6D4",
                fontFamily: "var(--font-sans)",
                maxWidth: "600px",
              }}
            >
              Achète des parts dans la forêt GREENHOLD. Un arbre est planté à
              ton nom. Tes revenus viennent de toute la forêt — pas d&apos;un seul
              arbre. Protégé, transparent, à vie.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <Link
                href="/boutique"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200"
                style={{
                  backgroundColor: "#C8972A",
                  color: "#0C2518",
                  fontFamily: "var(--font-sans)",
                  minHeight: "56px",
                }}
              >
                Planter mon arbre — dès 15€
              </Link>
              <Link
                href="/#comment-ca-marche"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-lg border-2 transition-all duration-200"
                style={{
                  borderColor: "#FFFFFF",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-sans)",
                  minHeight: "56px",
                }}
              >
                Comment ça marche
              </Link>
            </div>

            {/* 3 Key numbers */}
            <div className="flex flex-wrap gap-8">
              {[
                { number: "15€", label: "pour commencer" },
                { number: "40 ans", label: "de production" },
                { number: "100%", label: "transparent" },
              ].map(({ number, label }) => (
                <div key={label}>
                  <p
                    className="text-3xl font-bold"
                    style={{ color: "#C8972A", fontFamily: "var(--font-serif)" }}
                  >
                    {number}
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Decorative leaf */}
        <div
          className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block select-none"
          style={{ fontSize: "12rem", opacity: 0.07 }}
          aria-hidden="true"
        >
          🌳
        </div>
      </section>

      {/* ─── STARTUP COUNTER ──────────────────────────────────── */}
      <StartupCounter />

      {/* ─── TRUST BAND ───────────────────────────────────────── */}
      <section className="py-8 px-4" style={{ backgroundColor: "#F8F4EE" }}>
        <div
          className="mx-auto flex flex-wrap items-center justify-center gap-6"
          style={{ maxWidth: "1200px" }}
        >
          {[
            { icon: "🔒", label: "SSL Sécurisé" },
            { icon: "💳", label: "Paiement Stripe" },
            { icon: "🔄", label: "Garantie 6 mois remplacement" },
            { icon: "📸", label: "Photos géolocalisées" },
            { icon: "🌳", label: "Modèle mutualisé" },
            { icon: "👨‍👩‍👧", label: "Transmission héritiers" },
          ].map(({ icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ backgroundColor: "#C8E6D4", border: "1px solid #DDE8E2" }}
            >
              <span>{icon}</span>
              <span
                className="text-xs font-medium"
                style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────────── */}
      <section id="comment-ca-marche" className="py-20 px-4" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="mx-auto" style={{ maxWidth: "1200px" }}>
          <h2
            className="text-center mb-4"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#C8972A",
            }}
          >
            Comment ça marche
          </h2>
          <p
            className="text-center mb-14 text-base"
            style={{ color: "#6B7280", fontFamily: "var(--font-sans)", maxWidth: "500px", margin: "0 auto 3.5rem" }}
          >
            Cinq étapes pour devenir actionnaire de la forêt GREENHOLD.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              {
                step: "01",
                title: "Tu achètes des parts",
                desc: "Choisis ton pack à partir de 15€. Chaque part = un arbre planté à ton nom dans la forêt GREENHOLD Sénégal.",
              },
              {
                step: "02",
                title: "Un arbre + 1 papayer offert",
                desc: "Ton arbre est planté. Un papayer intercalaire est offert gratuitement. Il produira dès le mois 9.",
              },
              {
                step: "03",
                title: "Photos géolocalisées",
                desc: "Toutes les 8 semaines, tu reçois des photos de ton arbre avec ses coordonnées GPS. Preuve réelle.",
              },
              {
                step: "04",
                title: "Récolte & vente locale",
                desc: "Les fruits sont récoltés et vendus sur les marchés locaux sénégalais par notre équipe sur place.",
              },
              {
                step: "05",
                title: "Tes revenus à vie",
                desc: "Tu reçois ta part des bénéfices de TOUTE la forêt chaque année. Pas d'un seul arbre — de tous.",
              },
            ].map(({ step, title, desc }, i) => (
              <div key={step} className="relative">
                {i < 4 && (
                  <div
                    className="hidden md:block absolute top-8 left-full w-full h-0.5 z-0"
                    style={{ backgroundColor: "#DDE8E2", width: "100%" }}
                  />
                )}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: "#C8972A" }}
                  >
                    <span
                      className="text-xl font-bold"
                      style={{ color: "#0C2518", fontFamily: "var(--font-serif)" }}
                    >
                      {step}
                    </span>
                  </div>
                  <h3
                    className="text-base font-semibold mb-2"
                    style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MUTUALIZED MODEL ─────────────────────────────────── */}
      <section className="py-20 px-4" style={{ backgroundColor: "#0C2518" }}>
        <div className="mx-auto" style={{ maxWidth: "1200px" }}>
          <h2
            className="text-center mb-4 text-white"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            Ton investissement protégé par toute la forêt
          </h2>

          {/* Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12 max-w-3xl mx-auto">
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: "#1A4D35", border: "1px solid #2A7A4F" }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">❌</span>
                <div>
                  <p
                    className="font-semibold mb-2"
                    style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}
                  >
                    Ancien modèle
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
                  >
                    Tu possèdes 1 arbre. S&apos;il meurt → tu perds tout.
                    Zéro protection, zéro diversification.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: "#C8972A" }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p
                    className="font-semibold mb-2"
                    style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}
                  >
                    GREENHOLD
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}
                  >
                    Tu possèdes des parts de 3 000 arbres. Si 1 meurt →
                    impact 0,03% sur toi. La forêt te protège.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3 advantage cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🌳",
                title: "2 espèces complémentaires",
                desc: "Goyavier + Manguier se complètent et compensent. Si l'une a une mauvaise saison, l'autre maintient les revenus.",
              },
              {
                icon: "📅",
                title: "Récoltes échelonnées",
                desc: "Goyaviers en premier (12-18 mois), manguiers sur le long terme (3-4 ans). Revenus dès la première année.",
              },
              {
                icon: "📈",
                title: "Protection croissante",
                desc: "Plus la forêt grandit, plus chaque actionnaire est protégé. L'impact d'un arbre mort diminue avec le temps.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl p-6"
                style={{ backgroundColor: "#FFFFFF", borderRadius: "8px" }}
              >
                <p className="text-3xl mb-3">{icon}</p>
                <h3
                  className="font-semibold mb-2"
                  style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}
                >
                  {title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FREE PAPAYER ─────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ backgroundColor: "#C8972A" }}>
        <div className="mx-auto" style={{ maxWidth: "1000px" }}>
          <h2
            className="text-center mb-6"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              color: "#0C2518",
            }}
          >
            🎁 Le papayer offert — ton premier revenu dès le mois 9
          </h2>
          <p
            className="text-center text-base leading-relaxed mb-12"
            style={{
              color: "#1C2B22",
              fontFamily: "var(--font-sans)",
              maxWidth: "650px",
              margin: "0 auto 3rem",
            }}
          >
            À chaque achat GREENHOLD, un papayer est planté gratuitement entre tes
            arbres principaux. Il produit dès le mois 9. Il génère tes premiers
            revenus pendant que tes manguiers et goyaviers grandissent. À l&apos;an 3,
            il s&apos;efface naturellement pour laisser la place aux grands arbres.
          </p>

          {/* Timeline */}
          <div className="relative">
            <div
              className="absolute left-0 right-0 top-5 h-0.5 hidden md:block"
              style={{ backgroundColor: "#1A4D35" }}
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative">
              {[
                { time: "Mois 9", event: "🍈 Premier virement papayer", highlight: true },
                { time: "An 1", event: "🍃 Goyaviers démarrent", highlight: false },
                { time: "An 3", event: "🍈 Papayers retirés naturellement", highlight: false },
                { time: "An 5", event: "🥭 Pleine production manguiers", highlight: false },
              ].map(({ time, event, highlight }) => (
                <div key={time} className="flex flex-col items-center text-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-3 relative z-10"
                    style={{
                      backgroundColor: highlight ? "#0C2518" : "#F8F4EE",
                      border: "3px solid #0C2518",
                    }}
                  >
                    <span className="text-xs font-bold" style={{ color: highlight ? "#F0C55A" : "#0C2518" }}>
                      {time.split(" ")[0]}
                    </span>
                  </div>
                  <p
                    className="text-xs font-semibold mb-1"
                    style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}
                  >
                    {time}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "#1C2B22", fontFamily: "var(--font-sans)" }}
                  >
                    {event}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TREES ────────────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ backgroundColor: "#F8F4EE" }}>
        <div className="mx-auto" style={{ maxWidth: "1200px" }}>
          <h2
            className="text-center mb-4"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#0C2518",
            }}
          >
            Nos arbres fruitiers au Sénégal
          </h2>
          <p
            className="text-center mb-14"
            style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
          >
            🎁 1 papayer intercalaire offert gratuitement à chaque achat
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                emoji: "🍈",
                name: "Papayer",
                sub: "Offert gratuitement",
                specs: [
                  { label: "Première récolte", value: "Mois 9" },
                  { label: "Production", value: "80–120 kg/an" },
                  { label: "Prix marché", value: "0,30€/kg" },
                  { label: "Durée de vie", value: "3 ans (intercalaire)" },
                ],
                note: "Il génère ton premier revenu pendant que les autres grandissent. Offert avec chaque pack.",
                highlight: true,
              },
              {
                emoji: "🍃",
                name: "Goyavier",
                sub: "Revenus réguliers",
                specs: [
                  { label: "Première récolte", value: "12–18 mois" },
                  { label: "Production", value: "75–150 kg/an" },
                  { label: "Prix marché", value: "0,25€/kg" },
                  { label: "Durée de vie", value: "25 ans" },
                ],
                note: "Le goyavier sénégalais est une culture phare, très demandée sur les marchés locaux.",
                highlight: false,
              },
              {
                emoji: "🥭",
                name: "Manguier",
                sub: "Patrimoine long terme",
                specs: [
                  { label: "Première récolte", value: "3–4 ans" },
                  { label: "Production", value: "150–200 kg/an" },
                  { label: "Prix marché", value: "0,40€/kg" },
                  { label: "Durée de vie", value: "40 ans" },
                ],
                note: "La mangue sénégalaise est exportée en Europe. Rentabilité maximale sur 40 ans.",
                highlight: false,
              },
            ].map(({ emoji, name, sub, specs, note, highlight }) => (
              <div
                key={name}
                className="rounded-2xl overflow-hidden"
                style={{
                  border: highlight ? "2px solid #C8972A" : "1px solid #DDE8E2",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "8px",
                }}
              >
                {highlight && (
                  <div
                    className="py-2 text-center text-sm font-semibold"
                    style={{ backgroundColor: "#C8972A", color: "#0C2518", fontFamily: "var(--font-sans)" }}
                  >
                    🎁 OFFERT À CHAQUE ACHAT
                  </div>
                )}
                <div className="p-6">
                  <p className="text-5xl mb-3">{emoji}</p>
                  <h3
                    className="text-2xl font-semibold mb-1"
                    style={{ color: "#0C2518", fontFamily: "var(--font-serif)" }}
                  >
                    {name}
                  </h3>
                  <p
                    className="text-xs font-semibold uppercase tracking-wide mb-5"
                    style={{ color: "#C8972A", fontFamily: "var(--font-sans)" }}
                  >
                    {sub}
                  </p>
                  <div className="space-y-3 mb-5">
                    {specs.map(({ label, value }) => (
                      <div key={label} className="flex items-center justify-between">
                        <span
                          className="text-sm"
                          style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
                        >
                          {label}
                        </span>
                        <span
                          className="text-sm font-semibold"
                          style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}
                        >
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p
                    className="text-xs leading-relaxed"
                    style={{
                      color: "#6B7280",
                      fontFamily: "var(--font-sans)",
                      borderTop: "1px solid #DDE8E2",
                      paddingTop: "12px",
                    }}
                  >
                    {note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PACKS ────────────────────────────────────────────── */}
      <section id="packs" className="py-20 px-4" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="mx-auto" style={{ maxWidth: "1200px" }}>
          <h2
            className="text-center mb-3"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#C8972A",
            }}
          >
            Choisis tes parts
          </h2>
          <p
            className="text-center mb-14 text-base"
            style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
          >
            Chaque part = 1 arbre planté à ton nom + 1 papayer offert + revenus de toute la forêt
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {PACKS.map((pack) => (
              <div
                key={pack.id}
                className="relative rounded-2xl overflow-hidden flex flex-col"
                style={{
                  border: pack.highlight ? "2px solid #C8972A" : "1px solid #DDE8E2",
                  backgroundColor: pack.highlight ? "#0C2518" : "#F8F4EE",
                  borderRadius: "8px",
                }}
              >
                {pack.badge && (
                  <div
                    className="py-2 text-center text-xs font-bold uppercase tracking-wider"
                    style={{
                      backgroundColor: "#C8972A",
                      color: "#0C2518",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {pack.badge}
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-4xl mb-3">{pack.emoji}</p>
                  <h3
                    className="text-2xl font-semibold mb-1"
                    style={{
                      color: pack.highlight ? "#FFFFFF" : "#0C2518",
                      fontFamily: "var(--font-serif)",
                    }}
                  >
                    {pack.name}
                  </h3>
                  <p
                    className="text-4xl font-bold mb-1"
                    style={{
                      color: "#C8972A",
                      fontFamily: "var(--font-serif)",
                    }}
                  >
                    {pack.price}€
                  </p>
                  <p
                    className="text-xs mb-5"
                    style={{
                      color: pack.highlight ? "#C8E6D4" : "#6B7280",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {pack.parts} part{pack.parts > 1 ? "s" : ""}
                  </p>

                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{
                      color: pack.highlight ? "#C8E6D4" : "#1C2B22",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {pack.trees}
                  </p>

                  {pack.extras && (
                    <ul className="mb-5 space-y-1">
                      {pack.extras.map((extra) => (
                        <li
                          key={extra}
                          className="flex items-center gap-2 text-xs"
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
                    <Link
                      href={`/boutique?pack=${pack.id}`}
                      className="block text-center py-3 px-6 rounded-xl font-semibold transition-all duration-200"
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
                      Choisir ce pack
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p
            className="text-center mt-8 text-sm"
            style={{ color: "#C8972A", fontFamily: "var(--font-sans)" }}
          >
            🔄 Arbre mort dans les 6 premiers mois → remplacé gratuitement
          </p>
        </div>
      </section>

      {/* ─── REVENUE CALCULATOR ───────────────────────────────── */}
      <section
        className="py-20 px-4"
        style={{ backgroundColor: "#1A4D35" }}
      >
        <div className="mx-auto" style={{ maxWidth: "1200px" }}>
          <h2
            className="text-center mb-4"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#FFFFFF",
            }}
          >
            Calcule tes revenus futurs
          </h2>
          <p
            className="text-center mb-12 text-base"
            style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}
          >
            Simule tes revenus selon le nombre de parts que tu possèdes.
          </p>
          <RevenueCalculator />
        </div>
      </section>

      {/* ─── REINVESTMENT ─────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ backgroundColor: "#F8F4EE" }}>
        <div className="mx-auto" style={{ maxWidth: "1200px" }}>
          <h2
            className="text-center mb-4"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#0C2518",
            }}
          >
            Tes bénéfices plantent de nouveaux arbres
          </h2>
          <p
            className="text-center mb-12 text-sm"
            style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
          >
            Après ton premier virement (mois 9), choisis comment utiliser tes bénéfices.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { icon: "💵", label: "100% Cash", desc: "Tous tes bénéfices par virement bancaire", share: "100% cash" },
              { icon: "🌱", label: "25% Réinvesti", desc: "75% cash + 25% en nouvelles parts", share: "75% cash + parts" },
              { icon: "🌿", label: "50% Réinvesti", desc: "50% cash + 50% en nouvelles parts", share: "50% / 50%" },
              { icon: "🌳", label: "100% Réinvesti", desc: "Tout converti en nouvelles parts", share: "100% parts" },
            ].map(({ icon, label, desc, share }) => (
              <div
                key={label}
                className="rounded-2xl p-6 text-center"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #DDE8E2", borderRadius: "8px" }}
              >
                <p className="text-4xl mb-3">{icon}</p>
                <h3
                  className="font-semibold mb-2"
                  style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}
                >
                  {label}
                </h3>
                <p
                  className="text-sm mb-3"
                  style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
                >
                  {desc}
                </p>
                <span
                  className="inline-block text-xs px-3 py-1 rounded-full font-medium"
                  style={{ backgroundColor: "#C8E6D4", color: "#0C2518", fontFamily: "var(--font-sans)" }}
                >
                  {share}
                </span>
              </div>
            ))}
          </div>

          {/* Simulation */}
          <div
            className="rounded-2xl p-8 max-w-2xl mx-auto text-center"
            style={{ backgroundColor: "#0C2518", border: "2px solid #C8972A", borderRadius: "8px" }}
          >
            <p
              className="text-sm mb-3"
              style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}
            >
              Simulation : 5 parts, réinvestissement 100% pendant 10 ans
            </p>
            <p
              className="text-4xl font-bold mb-2"
              style={{ color: "#C8972A", fontFamily: "var(--font-serif)" }}
            >
              5 parts → 20 parts
            </p>
            <p
              className="text-sm"
              style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}
            >
              Sans débourser un euro de plus. Tes bénéfices achètent tes parts.
            </p>
            <div
              className="mt-4 inline-block px-4 py-2 rounded-full text-sm font-semibold"
              style={{ backgroundColor: "#C8972A", color: "#0C2518", fontFamily: "var(--font-sans)" }}
            >
              🎯 10% de réduction sur chaque part achetée avec tes bénéfices
            </div>
          </div>
        </div>
      </section>

      {/* ─── AMBASSADOR PROGRAM ───────────────────────────────── */}
      <section id="ambassadeur" className="py-20 px-4" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="mx-auto" style={{ maxWidth: "1200px" }}>
          <h2
            className="text-center mb-4"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#C8972A",
            }}
          >
            Plus tu plantes, plus tu gagnes
          </h2>
          <p
            className="text-center mb-12 text-sm"
            style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
          >
            Programme ambassadeur — 4 niveaux de récompenses
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                emoji: "🌱",
                level: "Planteur",
                range: "1 à 4 parts",
                perks: ["Tableau de bord standard", "Accès espace client"],
                reduction: null,
                commission: null,
                bg: "#F8F4EE",
              },
              {
                emoji: "🌿",
                level: "Cultivateur",
                range: "5 à 14 parts",
                perks: ["Badge Cultivateur", "5% de réduction"],
                reduction: "5%",
                commission: null,
                bg: "#C8E6D4",
              },
              {
                emoji: "🌳",
                level: "Forestier",
                range: "15 à 49 parts",
                perks: ["Badge Gold", "Mention sur le site", "10% de réduction", "Rapport détaillé"],
                reduction: "10%",
                commission: null,
                bg: "#1A4D35",
                light: true,
              },
              {
                emoji: "🌴",
                level: "Ambassadeur",
                range: "50 parts et plus",
                perks: ["Badge Premium", "Page profil dédiée", "15% de réduction", "5% commission filleuls à vie"],
                reduction: "15%",
                commission: "5% à vie",
                bg: "#C8972A",
              },
            ].map(({ emoji, level, range, perks, reduction, commission, bg, light }) => (
              <div
                key={level}
                className="rounded-2xl p-6 flex flex-col"
                style={{ backgroundColor: bg, borderRadius: "8px" }}
              >
                <p className="text-4xl mb-3">{emoji}</p>
                <h3
                  className="text-xl font-bold mb-1"
                  style={{
                    color: light ? "#FFFFFF" : "#0C2518",
                    fontFamily: "var(--font-serif)",
                  }}
                >
                  {level}
                </h3>
                <p
                  className="text-sm mb-4"
                  style={{
                    color: light ? "#C8E6D4" : "#6B7280",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {range}
                </p>
                <ul className="flex flex-col gap-2 mb-5 flex-1">
                  {perks.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-center gap-2 text-sm"
                      style={{
                        color: light ? "#C8E6D4" : "#1C2B22",
                        fontFamily: "var(--font-sans)",
                      }}
                    >
                      <span style={{ color: light ? "#F0C55A" : "#C8972A" }}>✓</span>
                      {perk}
                    </li>
                  ))}
                </ul>
                {reduction && (
                  <div
                    className="rounded-lg py-2 text-center text-sm font-bold"
                    style={{
                      backgroundColor: light ? "#0C2518" : "#0C2518",
                      color: "#F0C55A",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {reduction} réduction
                    {commission && <span className="block text-xs">+ {commission} sur filleuls</span>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SEASONAL OCCASIONS ───────────────────────────────── */}
      <section className="py-20 px-4" style={{ backgroundColor: "#C8972A" }}>
        <div className="mx-auto" style={{ maxWidth: "1200px" }}>
          <h2
            className="text-center mb-4"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#0C2518",
            }}
          >
            🎁 GREENHOLD, le cadeau qui pousse
          </h2>
          <p
            className="text-center mb-12 text-base"
            style={{ color: "#1C2B22", fontFamily: "var(--font-sans)" }}
          >
            Un cadeau unique qui grandit, produit, et rapporte à vie.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            {[
              { icon: "🎄", occasion: "Noël", slogan: "Le cadeau le plus original" },
              { icon: "🌙", occasion: "Ramadan", slogan: "Un cadeau qui nourrit et dure" },
              { icon: "💐", occasion: "Fête des Mères", slogan: "40 ans de production" },
              { icon: "👨", occasion: "Fête des Pères", slogan: "Un cadeau inédit" },
              { icon: "👶", occasion: "Naissance", slogan: "Il grandira avec lui" },
              { icon: "🎓", occasion: "Diplôme", slogan: "Grandir ensemble" },
            ].map(({ icon, occasion, slogan }) => (
              <div
                key={occasion}
                className="rounded-2xl p-4 text-center"
                style={{ backgroundColor: "#0C2518", borderRadius: "8px" }}
              >
                <p className="text-3xl mb-2">{icon}</p>
                <p
                  className="font-semibold text-sm mb-1"
                  style={{ color: "#F0C55A", fontFamily: "var(--font-sans)" }}
                >
                  {occasion}
                </p>
                <p
                  className="text-xs"
                  style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}
                >
                  {slogan}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/offrir"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200"
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
        </div>
      </section>

      {/* ─── COUNTDOWN ────────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ backgroundColor: "#F8F4EE" }}>
        <div className="mx-auto text-center" style={{ maxWidth: "1000px" }}>
          <h2
            className="mb-4"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#0C2518",
            }}
          >
            Lancement officiel dans...
          </h2>
          <p
            className="mb-12 text-sm"
            style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
          >
            1er septembre 2026 — Rejoins la liste des premiers actionnaires
          </p>

          <div className="mb-14">
            <CountdownTimer />
          </div>

          <div
            className="rounded-2xl p-8 max-w-xl mx-auto"
            style={{ backgroundColor: "#0C2518", borderRadius: "8px" }}
          >
            <p
              className="text-white text-lg font-semibold mb-2"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Alerte lancement — offre exclusive -15%
            </p>
            <p
              className="text-sm mb-6"
              style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}
            >
              Inscris-toi maintenant et reçois une offre exclusive 48h avant le lancement officiel.
            </p>
            <PreRegistrationForm />
          </div>
        </div>
      </section>

      {/* ─── COMPANIES / B2B ──────────────────────────────────── */}
      <section id="entreprises" className="py-20 px-4" style={{ backgroundColor: "#0C2518" }}>
        <div className="mx-auto" style={{ maxWidth: "1200px" }}>
          <h2
            className="text-center mb-4 text-white"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            Votre forêt RSE au Sénégal
          </h2>
          <p
            className="text-center mb-12 text-sm"
            style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}
          >
            Combinez impact environnemental, reporting ESG et engagement terrain.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Pack PME",
                price: "750€",
                trees: "50 arbres",
                perks: [
                  "Certificat RSE",
                  "Photos trimestrielles",
                  "Logo sur le site GREENHOLD",
                  "Rapport annuel PDF",
                ],
                cta: "Démarrer",
              },
              {
                name: "Pack Entreprise",
                price: "6 000€",
                trees: "500 arbres",
                perks: [
                  "Tout le Pack PME",
                  "Page web dédiée",
                  "Vidéo annuelle terrain",
                  "Rapport carbone certifié",
                ],
                cta: "Demander un devis",
                highlight: true,
              },
              {
                name: "Pack Corporate",
                price: "20 000€",
                trees: "2 000 arbres",
                perks: [
                  "Tout le Pack Entreprise",
                  "Plaque physique en forêt",
                  "Rapport ESG complet",
                  "Visite terrain possible",
                ],
                cta: "Nous contacter",
              },
            ].map(({ name, price, trees, perks, cta, highlight }) => (
              <div
                key={name}
                className="rounded-2xl p-8 flex flex-col"
                style={{
                  backgroundColor: highlight ? "#C8972A" : "#1A4D35",
                  border: highlight ? "none" : "1px solid #2A7A4F",
                  borderRadius: "8px",
                }}
              >
                <h3
                  className="text-2xl font-semibold mb-2"
                  style={{
                    color: highlight ? "#0C2518" : "#FFFFFF",
                    fontFamily: "var(--font-serif)",
                  }}
                >
                  {name}
                </h3>
                <p
                  className="text-4xl font-bold mb-1"
                  style={{
                    color: highlight ? "#0C2518" : "#C8972A",
                    fontFamily: "var(--font-serif)",
                  }}
                >
                  {price}
                </p>
                <p
                  className="text-sm mb-6"
                  style={{
                    color: highlight ? "#1C2B22" : "#C8E6D4",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {trees}
                </p>
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {perks.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-center gap-2 text-sm"
                      style={{
                        color: highlight ? "#0C2518" : "#C8E6D4",
                        fontFamily: "var(--font-sans)",
                      }}
                    >
                      <span>✓</span> {perk}
                    </li>
                  ))}
                </ul>
                <a
                  href="mailto:rse@greenhold.fr"
                  className="block text-center py-3 rounded-xl font-semibold transition-all duration-200"
                  style={{
                    backgroundColor: highlight ? "#0C2518" : "#C8972A",
                    color: highlight ? "#F0C55A" : "#0C2518",
                    fontFamily: "var(--font-sans)",
                    minHeight: "48px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GUARANTEES ───────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ backgroundColor: "#F8F4EE" }}>
        <div className="mx-auto" style={{ maxWidth: "1200px" }}>
          <h2
            className="text-center mb-12"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#0C2518",
            }}
          >
            Tes protections GREENHOLD
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🔄", title: "Remplacement garanti", desc: "Arbre mort dans les 6 premiers mois → remplacé gratuitement, sans condition." },
              { icon: "📸", title: "Preuve terrain", desc: "Photos géolocalisées toutes les 8 semaines. Tu vois ton arbre, ses coordonnées GPS, sa croissance." },
              { icon: "👨‍👩‍👧", title: "Transmission héritiers", desc: "Tes parts GREENHOLD se transmettent automatiquement à tes héritiers désignés." },
              { icon: "🏦", title: "Modèle mutualisé", desc: "1 arbre mort sur 3 000 = impact 0,03%. La forêt entière protège chaque actionnaire." },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl p-6"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #DDE8E2", borderRadius: "8px" }}
              >
                <p className="text-3xl mb-3">{icon}</p>
                <h3
                  className="font-semibold mb-2"
                  style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}
                >
                  {title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="mx-auto" style={{ maxWidth: "1200px" }}>
          <h2
            className="text-center mb-12"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#0C2518",
            }}
          >
            Ce qu&apos;ils en pensent
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                avatar: "👩🏾",
                name: "Aminata D.",
                city: "Paris, France",
                stars: 5,
                text: "J'ai offert un pack Famille à mes parents pour Noël. Mon père a pleuré en recevant le certificat. Un vrai cadeau d'avenir, pas un gadget.",
              },
              {
                avatar: "👨🏽",
                name: "Karim B.",
                city: "Lyon, France",
                stars: 5,
                text: "Le modèle mutualisé m'a convaincu. Je ne voulais pas risquer de perdre tout si mon arbre mourait. Ici, c'est toute la forêt qui me protège. Logique.",
              },
              {
                avatar: "👩🏻",
                name: "Sophie M.",
                city: "Bruxelles, Belgique",
                stars: 5,
                text: "Au mois 9, j'ai reçu mon premier virement — 23€ pour 2 parts. Petit mais réel. Et surtout je sais que ça va grandir. Le papayer offert c'est malin.",
              },
            ].map(({ avatar, name, city, stars, text }) => (
              <div
                key={name}
                className="rounded-2xl p-6"
                style={{ backgroundColor: "#F8F4EE", border: "1px solid #DDE8E2", borderRadius: "8px" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{avatar}</span>
                  <div>
                    <p className="font-semibold" style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}>
                      {name}
                    </p>
                    <p className="text-xs" style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}>
                      {city}
                    </p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: stars }).map((_, i) => (
                      <span key={i} style={{ color: "#C8972A" }}>★</span>
                    ))}
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#1C2B22", fontFamily: "var(--font-sans)" }}>
                  &ldquo;{text}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────── */}
      <section id="faq" className="py-20 px-4" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="mx-auto" style={{ maxWidth: "1200px" }}>
          <h2
            className="text-center mb-12"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#0C2518",
            }}
          >
            Questions fréquentes
          </h2>
          <FaqSection />
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ backgroundColor: "#C8972A" }}>
        <div className="mx-auto text-center" style={{ maxWidth: "700px" }}>
          <h2
            className="mb-4"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#0C2518",
            }}
          >
            Un arbre planté aujourd&apos;hui est un revenu pour toujours
          </h2>
          <p
            className="mb-8 text-base"
            style={{ color: "#1C2B22", fontFamily: "var(--font-sans)" }}
          >
            Rejoins les premiers actionnaires et participe au démarrage des
            plantations au Sénégal.
          </p>
          <Link
            href="/boutique"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-xl font-semibold text-xl transition-all duration-200"
            style={{
              backgroundColor: "#0C2518",
              color: "#F0C55A",
              fontFamily: "var(--font-sans)",
              minHeight: "64px",
            }}
          >
            Planter mes premières parts — dès 15€
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
