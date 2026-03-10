import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2
        className="text-xl font-semibold mb-4 pb-3"
        style={{
          color: "#0C2518",
          fontFamily: "var(--font-serif)",
          fontSize: "1.4rem",
          borderBottom: "2px solid #DDE8E2",
        }}
      >
        {title}
      </h2>
      <div className="space-y-4 text-sm leading-relaxed" style={{ color: "#1C2B22", fontFamily: "var(--font-sans)" }}>
        {children}
      </div>
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-relaxed" style={{ color: "#1C2B22", fontFamily: "var(--font-sans)" }}>{children}</p>;
}

export default function CGUPage() {
  return (
    <main>
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-12 px-4" style={{ backgroundColor: "#0C2518" }}>
        <div className="mx-auto" style={{ maxWidth: "900px" }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#C8972A", fontFamily: "var(--font-sans)" }}>
            Légal
          </p>
          <h1 className="text-white mb-3" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600 }}>
            Conditions Générales d'Utilisation
          </h1>
          <p className="text-sm" style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}>
            Dernière mise à jour : mars 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4" style={{ backgroundColor: "#F8F4EE" }}>
        <div className="mx-auto" style={{ maxWidth: "900px" }}>

          <Section title="Article 1 — Accès au site">
            <P>
              Le site greenhold.fr est accessible à tout utilisateur disposant d'un accès internet.
              GREENHOLD se réserve le droit de refuser l'accès au site, unilatéralement et sans notification préalable,
              à tout utilisateur ne respectant pas les présentes conditions.
            </P>
          </Section>

          <Section title="Article 2 — Propriété intellectuelle">
            <P>
              Tous les contenus du site (textes, images, logo, code) sont la propriété exclusive de GREENHOLD.
              Toute reproduction est interdite sans autorisation écrite préalable.
            </P>
            <div className="rounded-xl p-5" style={{ backgroundColor: "#FEF3C7", border: "1px solid #C8972A" }}>
              <P>
                ⚠️ Toute reproduction, représentation, modification, publication ou adaptation totale ou partielle
                des éléments du site, quel que soit le moyen utilisé, est interdite sans autorisation de GREENHOLD.
              </P>
            </div>
          </Section>

          <Section title="Article 3 — Responsabilité">
            <P>
              GREENHOLD s'engage à maintenir le site disponible mais ne peut garantir une disponibilité 24h/24.
              Des interruptions peuvent survenir pour des raisons de maintenance ou de force majeure.
            </P>
            <P>
              Les projections financières présentées sur le site sont des estimations basées sur les rendements
              agricoles constatés et ne constituent pas une garantie de rendement.
            </P>
          </Section>

          <Section title="Article 4 — Données personnelles">
            <P>
              La collecte et le traitement de vos données personnelles sont détaillés dans notre{" "}
              <a href="/politique-confidentialite" className="underline font-medium" style={{ color: "#C8972A" }}>
                Politique de confidentialité
              </a>.
            </P>
          </Section>

          <Section title="Article 5 — Modification des CGU">
            <P>
              GREENHOLD se réserve le droit de modifier les présentes CGU à tout moment.
              Les utilisateurs seront informés des modifications par email ou par notification sur le site.
              L'utilisation continue du site après modification vaut acceptation des nouvelles CGU.
            </P>
          </Section>

          <Section title="Article 6 — Contact">
            <div className="rounded-xl p-6" style={{ backgroundColor: "#C8E6D4", border: "1px solid #2A7A4F" }}>
              <P>Pour toute question relative aux présentes CGU :</P>
              <p className="mt-3 font-semibold" style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}>
                📧 contact@greenhold.fr — www.greenhold.fr
              </p>
            </div>
          </Section>

        </div>
      </section>

      <Footer />
    </main>
  );
}
