import Link from "next/link";
import Stripe from "stripe";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { generateCertNumber } from "@/app/api/certificate/route";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

const PACK_INFO: Record<
  string,
  { name: string; parts: number; trees: string; revenueAn1: number }
> = {
  decouverte: {
    name: "Pack Découverte",
    parts: 1,
    trees: "1 Goyavier + 1 Papayer offert",
    revenueAn1: 9.82,
  },
  famille: {
    name: "Pack Famille",
    parts: 2,
    trees: "1 Goyavier + 1 Manguier + 2 Papayers offerts",
    revenueAn1: 19.64,
  },
  investisseur: {
    name: "Pack Investisseur",
    parts: 5,
    trees: "5 Manguiers + 5 Papayers offerts",
    revenueAn1: 49.1,
  },
  heritage: {
    name: "Pack Héritage Senior",
    parts: 25,
    trees: "13 Manguiers + 12 Goyaviers + 25 Papayers",
    revenueAn1: 245.5,
  },
};

async function fetchSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["customer_details"],
    });
    if (session.payment_status !== "paid") return null;
    return session;
  } catch {
    return null;
  }
}

export default async function MerciPage({
  searchParams,
}: {
  searchParams: Promise<{ pack?: string; session_id?: string }>;
}) {
  const params = await searchParams;
  const packId = params.pack ?? "decouverte";
  const sessionId = params.session_id ?? "";

  const session = sessionId ? await fetchSession(sessionId) : null;
  const packInfo = PACK_INFO[packId] ?? PACK_INFO.decouverte;

  const buyerName =
    session?.customer_details?.name ?? null;
  const buyerEmail =
    session?.customer_details?.email ?? null;
  const amountPaid = session?.amount_total
    ? (session.amount_total / 100).toFixed(2)
    : packInfo.parts === 1
    ? "15.00"
    : null;
  const certNumber = sessionId ? generateCertNumber(sessionId) : null;
  const purchaseDate = session
    ? new Date(session.created * 1000).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : new Date().toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  return (
    <main>
      <Navigation />

      {/* Hero */}
      <section
        className="pt-28 pb-16 px-4 text-center"
        style={{ backgroundColor: "#0C2518" }}
      >
        <div className="mx-auto" style={{ maxWidth: "700px" }}>
          <p className="text-6xl mb-4">🌿</p>
          <h1
            className="mb-4 text-white"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 600,
            }}
          >
            {buyerName
              ? `Bienvenue, ${buyerName} !`
              : "Bienvenue dans la forêt GREENHOLD !"}
          </h1>
          <p
            className="text-base"
            style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}
          >
            Ton paiement a été confirmé. Un arbre va être planté à ton nom au Sénégal.
          </p>
        </div>
      </section>

      {/* Order summary */}
      <section className="py-12 px-4" style={{ backgroundColor: "#F8F4EE" }}>
        <div className="mx-auto" style={{ maxWidth: "720px" }}>

          {/* Order card */}
          <div
            className="rounded-2xl overflow-hidden mb-8"
            style={{ border: "1px solid #DDE8E2", backgroundColor: "#FFFFFF" }}
          >
            {/* Header */}
            <div
              className="px-6 py-4 flex items-center justify-between"
              style={{ backgroundColor: "#0C2518" }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "#C8972A", fontFamily: "var(--font-sans)" }}
              >
                Résumé de commande
              </p>
              {certNumber && (
                <p
                  className="text-xs font-mono"
                  style={{ color: "#C8E6D4" }}
                >
                  N° {certNumber}
                </p>
              )}
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { label: "Pack souscrit", value: packInfo.name },
                  {
                    label: "Nombre de parts",
                    value: `${packInfo.parts} part${packInfo.parts > 1 ? "s" : ""}`,
                  },
                  { label: "Arbres associés", value: packInfo.trees },
                  { label: "Date d'acquisition", value: purchaseDate },
                  ...(amountPaid
                    ? [{ label: "Montant payé", value: `${amountPaid} €` }]
                    : []),
                  ...(buyerEmail
                    ? [{ label: "Email de confirmation", value: buyerEmail }]
                    : []),
                ].map(({ label, value }) => (
                  <div key={label} className="col-span-2 sm:col-span-1">
                    <p
                      className="text-xs mb-1"
                      style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
                    >
                      {label}
                    </p>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Revenue preview */}
              <div
                className="rounded-xl p-4 mb-4"
                style={{ backgroundColor: "#F8F4EE", border: "1px solid #DDE8E2" }}
              >
                <p
                  className="text-xs font-semibold mb-3 uppercase tracking-wider"
                  style={{ color: "#C8972A", fontFamily: "var(--font-sans)" }}
                >
                  Tes projections de revenus
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      label: "An 1",
                      value: `${(packInfo.parts * 9.82).toFixed(0)}€`,
                      sub: "papayer actif",
                    },
                    {
                      label: "An 2",
                      value: `${(packInfo.parts * 16.77).toFixed(0)}€`,
                      sub: "goyaviers actifs",
                    },
                    {
                      label: "An 5",
                      value: `${(packInfo.parts * 22.4).toFixed(0)}€`,
                      sub: "pleine production",
                    },
                  ].map(({ label, value, sub }) => (
                    <div key={label} className="text-center">
                      <p
                        className="text-xs mb-1"
                        style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
                      >
                        {label}
                      </p>
                      <p
                        className="text-xl font-bold"
                        style={{ color: "#0C2518", fontFamily: "var(--font-serif)" }}
                      >
                        {value}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
                      >
                        {sub}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certificate download */}
              {sessionId && (
                <a
                  href={`/api/certificate?session_id=${sessionId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200"
                  style={{
                    backgroundColor: "#C8972A",
                    color: "#0C2518",
                    fontFamily: "var(--font-sans)",
                    minHeight: "48px",
                    display: "flex",
                    textDecoration: "none",
                  }}
                >
                  📜 Télécharger mon certificat PDF
                </a>
              )}
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {[
              {
                icon: "📧",
                step: "Email de confirmation",
                desc: "Avec ton certificat PDF en pièce jointe",
                done: !!buyerEmail,
              },
              {
                icon: "🌱",
                step: "Plantation sous 30 jours",
                desc: "Photos géolocalisées dès la mise en terre",
                done: false,
              },
              {
                icon: "💰",
                step: "Premiers revenus en fin d'année 1",
                desc: "Les papayers commencent à produire dès le mois 9 — tes premiers revenus arrivent en fin de première année",
                done: false,
              },
            ].map(({ icon, step, desc, done }) => (
              <div
                key={step}
                className="rounded-xl p-5 text-center"
                style={{
                  backgroundColor: done ? "#C8E6D4" : "#FFFFFF",
                  border: `1px solid ${done ? "#2A7A4F" : "#DDE8E2"}`,
                }}
              >
                <p className="text-3xl mb-2">{icon}</p>
                <p
                  className="text-sm font-semibold mb-1"
                  style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}
                >
                  {step}
                </p>
                <p
                  className="text-xs"
                  style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
                >
                  {desc}
                </p>
                {done && (
                  <p
                    className="text-xs font-bold mt-2"
                    style={{ color: "#2A7A4F", fontFamily: "var(--font-sans)" }}
                  >
                    ✓ Envoyé
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mon-espace"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold"
              style={{
                backgroundColor: "#0C2518",
                color: "#F0C55A",
                fontFamily: "var(--font-sans)",
                minHeight: "52px",
                textDecoration: "none",
              }}
            >
              Mon espace actionnaire →
            </Link>
            <Link
              href="/boutique"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold"
              style={{
                border: "2px solid #0C2518",
                color: "#0C2518",
                fontFamily: "var(--font-sans)",
                minHeight: "52px",
                textDecoration: "none",
              }}
            >
              Planter d&apos;autres arbres
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
