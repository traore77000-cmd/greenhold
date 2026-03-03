import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const PACK_NAMES: Record<string, string> = {
  decouverte: "Pack Découverte",
  famille: "Pack Famille",
  investisseur: "Pack Investisseur",
  heritage: "Pack Héritage Senior",
};

export default async function MerciPage({
  searchParams,
}: {
  searchParams: Promise<{ pack?: string; session_id?: string }>;
}) {
  const params = await searchParams;
  const packName = PACK_NAMES[params.pack ?? ""] ?? "ton pack GREENHOLD";

  return (
    <main>
      <Navigation />

      <section
        className="pt-28 pb-20 px-4"
        style={{ backgroundColor: "#F8F4EE", minHeight: "80vh", display: "flex", alignItems: "center" }}
      >
        <div className="mx-auto text-center" style={{ maxWidth: "700px" }}>
          <p className="text-7xl mb-6">🌿</p>
          <h1
            className="mb-4"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "#0C2518",
            }}
          >
            Bienvenue dans la forêt GREENHOLD !
          </h1>
          <p
            className="text-lg mb-6"
            style={{ color: "#1C2B22", fontFamily: "var(--font-sans)" }}
          >
            Ton paiement pour <strong>{packName}</strong> a été confirmé. Un arbre va
            être planté à ton nom au Sénégal. 🌱
          </p>
          <p
            className="text-sm mb-10"
            style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
          >
            Tu recevras un e-mail de confirmation avec ton certificat de propriété et les
            prochaines étapes. Ton premier revenu arrive dès le mois 9 grâce au papayer
            offert.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {[
              { icon: "📧", step: "Email de confirmation", desc: "Dans les prochaines minutes" },
              { icon: "📜", step: "Certificat nominatif", desc: "Sous 48h par e-mail" },
              { icon: "📸", step: "1ères photos terrain", desc: "Dès la plantation" },
            ].map(({ icon, step, desc }) => (
              <div
                key={step}
                className="rounded-xl p-4"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #DDE8E2", borderRadius: "8px" }}
              >
                <p className="text-3xl mb-2">{icon}</p>
                <p className="text-sm font-semibold mb-1" style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}>
                  {step}
                </p>
                <p className="text-xs" style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold"
              style={{
                backgroundColor: "#0C2518",
                color: "#F0C55A",
                fontFamily: "var(--font-sans)",
                minHeight: "48px",
              }}
            >
              Retour à l&apos;accueil
            </Link>
            <Link
              href="/boutique"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold border"
              style={{
                borderColor: "#0C2518",
                color: "#0C2518",
                fontFamily: "var(--font-sans)",
                minHeight: "48px",
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
