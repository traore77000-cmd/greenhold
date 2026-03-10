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

const COOKIES = [
  { name: "Session utilisateur", purpose: "Authentification sur le site", duration: "Session" },
  { name: "Stripe", purpose: "Sécurité des paiements en ligne", duration: "Session / 1 an" },
  { name: "Préférences navigation", purpose: "Mémorisation de vos préférences", duration: "1 an" },
];

export default function PolitiqueCookiesPage() {
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
            Politique des cookies
          </h1>
          <p className="text-sm" style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}>
            Dernière mise à jour : mars 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4" style={{ backgroundColor: "#F8F4EE" }}>
        <div className="mx-auto" style={{ maxWidth: "900px" }}>

          <div className="rounded-xl p-6 mb-10" style={{ backgroundColor: "#C8E6D4", border: "1px solid #2A7A4F" }}>
            <p className="text-sm font-semibold" style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}>
              ✅ Notre site utilise uniquement des cookies strictement nécessaires à son fonctionnement.
              Aucun cookie publicitaire ou de tracking n'est utilisé.
            </p>
          </div>

          <Section title="Cookies essentiels (pas de consentement requis)">
            <P>Ces cookies sont indispensables au bon fonctionnement du site :</P>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #DDE8E2" }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "#0C2518" }}>
                    {["Cookie", "Finalité", "Durée"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COOKIES.map((c, i) => (
                    <tr key={c.name} style={{ backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#F8F4EE" }}>
                      <td className="px-4 py-3 font-medium" style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}>{c.name}</td>
                      <td className="px-4 py-3" style={{ color: "#1C2B22", fontFamily: "var(--font-sans)" }}>{c.purpose}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}>{c.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="Ce que nous n'utilisons pas">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: "🚫", label: "Cookies publicitaires", desc: "Aucun cookie de ciblage publicitaire" },
                { icon: "🚫", label: "Cookies de tracking", desc: "Aucun suivi comportemental (Google Analytics, etc.)" },
                { icon: "🚫", label: "Cookies tiers", desc: "Aucun partage de données avec des tiers à des fins marketing" },
                { icon: "🚫", label: "Cookies d'analyse", desc: "Aucune analyse comportementale de votre navigation" },
              ].map(({ icon, label, desc }) => (
                <div key={label} className="rounded-xl p-5" style={{ backgroundColor: "#FFFFFF", border: "1px solid #DDE8E2" }}>
                  <p className="text-xl mb-2">{icon}</p>
                  <p className="font-semibold text-sm mb-1" style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}>{label}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}>{desc}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Gérer les cookies">
            <P>
              Pour refuser les cookies essentiels, vous pouvez configurer votre navigateur en conséquence,
              mais certaines fonctionnalités du site (authentification, paiement) ne seront plus disponibles.
            </P>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { browser: "Chrome", link: "chrome://settings/cookies" },
                { browser: "Firefox", link: "about:preferences#privacy" },
                { browser: "Safari", link: "Préférences → Confidentialité" },
              ].map(({ browser, link }) => (
                <div key={browser} className="rounded-xl p-4 text-center" style={{ backgroundColor: "#FFFFFF", border: "1px solid #DDE8E2" }}>
                  <p className="font-semibold text-sm mb-1" style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}>{browser}</p>
                  <p className="text-xs" style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}>{link}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Contact">
            <div className="rounded-xl p-6" style={{ backgroundColor: "#C8E6D4", border: "1px solid #2A7A4F" }}>
              <P>Pour toute question relative aux cookies :</P>
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
