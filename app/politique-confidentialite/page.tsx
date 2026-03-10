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

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 pl-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#1C2B22", fontFamily: "var(--font-sans)" }}>
          <span style={{ color: "#C8972A", flexShrink: 0 }}>—</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PolitiqueConfidentialitePage() {
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
            Politique de confidentialité — RGPD
          </h1>
          <p className="text-sm" style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}>
            Dernière mise à jour : mars 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4" style={{ backgroundColor: "#F8F4EE" }}>
        <div className="mx-auto" style={{ maxWidth: "900px" }}>

          <Section title="Responsable du traitement">
            <div className="rounded-xl p-6" style={{ backgroundColor: "#FFFFFF", border: "1px solid #DDE8E2" }}>
              <P>GREENHOLD — Gaoussou TRAORE</P>
              <P>contact@greenhold.fr</P>
            </div>
          </Section>

          <Section title="Données collectées">
            <P>Dans le cadre de l'utilisation de notre site, nous collectons les données suivantes :</P>
            <List items={[
              "Nom et prénom",
              "Adresse email",
              "Historique des achats",
              "Adresse IP (logs serveur)",
            ]} />
          </Section>

          <Section title="Finalité du traitement">
            <List items={[
              "Gestion des achats et paiements",
              "Envoi des certificats et contrats PDF",
              "Distribution des revenus annuels",
              "Communication sur l'avancement du projet",
            ]} />
          </Section>

          <Section title="Base légale">
            <div className="rounded-xl p-5" style={{ backgroundColor: "#C8E6D4", border: "1px solid #2A7A4F" }}>
              <P>Exécution d'un contrat (Art. 6.1.b RGPD)</P>
            </div>
          </Section>

          <Section title="Durée de conservation">
            <P>
              Vos données sont conservées pendant la durée du contrat (40 ans) puis archivées 5 ans
              conformément aux obligations légales.
            </P>
          </Section>

          <Section title="Vos droits">
            <P>
              Conformément au RGPD, vous disposez des droits suivants : accès, rectification,
              effacement, portabilité, opposition.
            </P>
            <div className="rounded-xl p-5" style={{ backgroundColor: "#FFFFFF", border: "1px solid #DDE8E2" }}>
              <P>Pour exercer vos droits : <strong>contact@greenhold.fr</strong></P>
            </div>
          </Section>

          <Section title="Cookies">
            <P>
              Notre site utilise uniquement des cookies essentiels au fonctionnement (session, Stripe).
              Aucun cookie publicitaire ou de tracking.
            </P>
            <P>
              Pour en savoir plus, consultez notre{" "}
              <a href="/politique-cookies" className="underline font-medium" style={{ color: "#C8972A" }}>
                Politique des cookies
              </a>.
            </P>
          </Section>

          <Section title="Hébergement des données">
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #DDE8E2" }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "#0C2518" }}>
                    {["Prestataire", "Localisation", "Conformité"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ backgroundColor: "#FFFFFF" }}>
                    <td className="px-4 py-3 font-medium" style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}>Vercel</td>
                    <td className="px-4 py-3" style={{ color: "#1C2B22", fontFamily: "var(--font-sans)" }}>USA</td>
                    <td className="px-4 py-3" style={{ color: "#1C2B22", fontFamily: "var(--font-sans)" }}>Conforme Privacy Shield</td>
                  </tr>
                  <tr style={{ backgroundColor: "#F8F4EE" }}>
                    <td className="px-4 py-3 font-medium" style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}>Supabase</td>
                    <td className="px-4 py-3" style={{ color: "#1C2B22", fontFamily: "var(--font-sans)" }}>Union Européenne</td>
                    <td className="px-4 py-3" style={{ color: "#1C2B22", fontFamily: "var(--font-sans)" }}>RGPD</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="Contact">
            <div className="rounded-xl p-6" style={{ backgroundColor: "#C8E6D4", border: "1px solid #2A7A4F" }}>
              <P>Pour toute question relative à la protection de vos données :</P>
              <p className="mt-3 font-semibold" style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}>
                📧 contact@greenhold.fr
              </p>
            </div>
          </Section>

        </div>
      </section>

      <Footer />
    </main>
  );
}
