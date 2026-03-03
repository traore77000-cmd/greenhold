import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2
        className="text-xl font-semibold mb-4 pb-3"
        style={{ color: "#0C2518", fontFamily: "var(--font-serif)", fontSize: "1.4rem", borderBottom: "2px solid #DDE8E2" }}
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

function RightCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl p-5" style={{ backgroundColor: "#FFFFFF", border: "1px solid #DDE8E2" }}>
      <p className="font-semibold text-sm mb-1" style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}>{title}</p>
      <p className="text-xs leading-relaxed" style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}>{desc}</p>
    </div>
  );
}

export default function ConfidentialitePage() {
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
            Politique de Confidentialité
          </h1>
          <p className="text-sm" style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}>
            Conforme au Règlement Général sur la Protection des Données (RGPD) — Dernière mise à jour : mars 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4" style={{ backgroundColor: "#F8F4EE" }}>
        <div className="mx-auto" style={{ maxWidth: "900px" }}>

          {/* Intro */}
          <div className="rounded-2xl p-6 mb-10" style={{ backgroundColor: "#C8E6D4", border: "1px solid #2A7A4F" }}>
            <p className="text-sm leading-relaxed" style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}>
              GREENHOLD s'engage à protéger votre vie privée et vos données personnelles. Cette politique explique
              quelles données nous collectons, pourquoi, comment nous les utilisons et quels sont vos droits.
              Nous respectons le RGPD (Règlement UE 2016/679) et la loi Informatique et Libertés.
            </p>
          </div>

          <Section title="1. Responsable du traitement">
            <div className="rounded-xl p-6" style={{ backgroundColor: "#FFFFFF", border: "1px solid #DDE8E2" }}>
              {[
                { label: "Responsable", value: "GREENHOLD" },
                { label: "Contact général", value: "contact@greenhold.fr" },
                { label: "Délégué à la Protection des Données (DPO)", value: "dpo@greenhold.fr" },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-3" style={{ borderBottom: "1px solid #DDE8E2" }}>
                  <span className="text-xs font-semibold uppercase tracking-wide w-48 flex-shrink-0" style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}>{label}</span>
                  <span className="text-sm font-medium" style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}>{value}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section title="2. Données collectées">
            <P>GREENHOLD collecte les données suivantes :</P>

            <div className="space-y-4">
              {[
                {
                  cat: "Données d'identification",
                  items: ["Adresse e-mail", "Prénom et nom (lors de la création du compte)", "Adresse postale (lors du paiement, via Stripe)"],
                  source: "Saisie directe par l'utilisateur",
                },
                {
                  cat: "Données de paiement",
                  items: ["Référence de transaction Stripe (token)", "Derniers chiffres de la carte bancaire (affichés par Stripe)", "Montant et date des transactions"],
                  source: "Stripe Inc. (aucune donnée bancaire brute stockée par GREENHOLD)",
                },
                {
                  cat: "Données d'usage",
                  items: ["Adresse IP", "Type de navigateur et système d'exploitation", "Pages visitées et durée de visite", "Horodatage des actions"],
                  source: "Collecte automatique via Vercel Analytics",
                },
                {
                  cat: "Données de pré-inscription",
                  items: ["Adresse e-mail uniquement"],
                  source: "Formulaire de pré-inscription sur le site",
                },
                {
                  cat: "Données liées aux parts",
                  items: ["Nombre de parts détenues", "Date d'achat", "Statut des parts"],
                  source: "Générées lors de la commande et stockées dans Supabase",
                },
              ].map(({ cat, items, source }) => (
                <div key={cat} className="rounded-xl p-5" style={{ backgroundColor: "#FFFFFF", border: "1px solid #DDE8E2" }}>
                  <p className="font-semibold text-sm mb-2" style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}>{cat}</p>
                  <ul className="space-y-1 mb-3">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs" style={{ color: "#1C2B22", fontFamily: "var(--font-sans)" }}>
                        <span style={{ color: "#C8972A" }}>•</span> {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs" style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}>
                    <strong>Source :</strong> {source}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="3. Finalités du traitement">
            <div className="space-y-3">
              {[
                { base: "Exécution du contrat", finalite: "Gestion des commandes, attribution des parts, envoi des certificats et photos terrain" },
                { base: "Exécution du contrat", finalite: "Calcul et versement des revenus aux actionnaires" },
                { base: "Obligation légale", finalite: "Conservation des données comptables et fiscales" },
                { base: "Intérêt légitime", finalite: "Amélioration du site et prévention de la fraude" },
                { base: "Consentement", finalite: "Envoi de newsletters et communications marketing (désabonnement possible à tout moment)" },
                { base: "Consentement", finalite: "Utilisation de cookies analytiques non essentiels" },
              ].map(({ base, finalite }) => (
                <div key={finalite} className="flex items-start gap-3 p-4 rounded-xl" style={{ backgroundColor: "#FFFFFF", border: "1px solid #DDE8E2" }}>
                  <span className="text-xs px-2 py-1 rounded-full font-medium flex-shrink-0" style={{ backgroundColor: "#C8E6D4", color: "#0C2518", fontFamily: "var(--font-sans)" }}>
                    {base}
                  </span>
                  <p className="text-sm" style={{ color: "#1C2B22", fontFamily: "var(--font-sans)" }}>{finalite}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="4. Durée de conservation">
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #DDE8E2" }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "#0C2518" }}>
                    {["Catégorie de données", "Durée de conservation"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Compte utilisateur actif", "Durée de la relation contractuelle + 3 ans"],
                    ["Données de commande et parts", "10 ans (obligation comptable légale)"],
                    ["Données de paiement (Stripe)", "Conformément à la politique Stripe (13 mois pour les preuves)"],
                    ["Données de pré-inscription (email)", "3 ans à compter de la collecte ou jusqu'au désabonnement"],
                    ["Données de navigation (logs)", "13 mois maximum"],
                    ["Cookies analytiques", "13 mois maximum"],
                  ].map(([cat, duree], i) => (
                    <tr key={cat} style={{ backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#F8F4EE" }}>
                      <td className="px-4 py-3 text-sm" style={{ color: "#1C2B22", fontFamily: "var(--font-sans)" }}>{cat}</td>
                      <td className="px-4 py-3 text-sm" style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}>{duree}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="5. Vos droits (RGPD)">
            <P>Conformément au RGPD, vous disposez des droits suivants :</P>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <RightCard title="📋 Droit d'accès" desc="Obtenir la confirmation que vos données sont traitées et en recevoir une copie." />
              <RightCard title="✏️ Droit de rectification" desc="Corriger des données inexactes ou incomplètes vous concernant." />
              <RightCard title="🗑️ Droit à l'effacement" desc="Demander la suppression de vos données dans les cas prévus par le RGPD (ex : retrait du consentement, données plus nécessaires)." />
              <RightCard title="📦 Droit à la portabilité" desc="Recevoir vos données dans un format structuré, lisible par machine, ou les transmettre à un autre responsable." />
              <RightCard title="🚫 Droit d'opposition" desc="Vous opposer au traitement de vos données à des fins de prospection commerciale, à tout moment et sans justification." />
              <RightCard title="⏸️ Droit à la limitation" desc="Demander la suspension temporaire du traitement de vos données dans certains cas (contestation de l'exactitude, traitement illicite, etc.)." />
            </div>
            <div className="rounded-xl p-5" style={{ backgroundColor: "#C8E6D4", border: "1px solid #2A7A4F" }}>
              <P>
                Pour exercer l'un de ces droits, contactez notre DPO à : <strong>dpo@greenhold.fr</strong>
              </P>
              <P>
                Nous répondons dans un délai d'un mois. En cas de réponse insatisfaisante, vous pouvez saisir la CNIL
                (Commission Nationale de l'Informatique et des Libertés) : www.cnil.fr
              </P>
            </div>
          </Section>

          <Section title="6. Transferts hors Union Européenne">
            <P>
              GREENHOLD utilise des prestataires tiers dont les serveurs peuvent être situés hors de l'Union Européenne :
            </P>
            <div className="space-y-3">
              {[
                { provider: "Supabase Inc.", country: "États-Unis", guarantee: "Conformité DPA (Data Processing Agreement) avec clauses contractuelles types de l'UE" },
                { provider: "Stripe Inc.", country: "États-Unis", guarantee: "Certifié PCI DSS Level 1 — Clauses contractuelles types UE — Privacy Shield successor framework" },
                { provider: "Vercel Inc.", country: "États-Unis", guarantee: "DPA conforme RGPD — Possibilité de déploiement sur serveurs UE" },
                { provider: "Resend Inc.", country: "États-Unis", guarantee: "Conformité DPA avec clauses contractuelles types de l'UE pour l'envoi d'emails" },
              ].map(({ provider, country, guarantee }) => (
                <div key={provider} className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #DDE8E2" }}>
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <p className="font-semibold text-sm" style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}>{provider}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "#FEF3C7", color: "#92400E", fontFamily: "var(--font-sans)", whiteSpace: "nowrap" }}>{country}</span>
                  </div>
                  <p className="text-xs" style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}>{guarantee}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="7. Cookies">
            <P>GREENHOLD utilise les cookies suivants :</P>
            <div className="space-y-3">
              {[
                { type: "Cookies essentiels", desc: "Nécessaires au fonctionnement du site (session utilisateur, panier, authentification). Ne nécessitent pas de consentement.", required: true },
                { type: "Cookies analytiques", desc: "Mesure d'audience anonymisée via Vercel Analytics. Permettent d'améliorer le site. Soumis à consentement.", required: false },
                { type: "Cookies tiers — Stripe", desc: "Déposés par Stripe lors du paiement pour la sécurité des transactions. Soumis à leur propre politique de confidentialité.", required: true },
              ].map(({ type, desc, required }) => (
                <div key={type} className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #DDE8E2" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-semibold text-sm" style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}>{type}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{
                      backgroundColor: required ? "#C8E6D4" : "#FEF3C7",
                      color: required ? "#0C2518" : "#92400E",
                      fontFamily: "var(--font-sans)",
                    }}>
                      {required ? "Obligatoire" : "Consentement requis"}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}>{desc}</p>
                </div>
              ))}
            </div>
            <P>
              Vous pouvez paramétrer votre navigateur pour refuser les cookies ou être alerté avant leur dépôt.
              Cela peut affecter certaines fonctionnalités du site.
            </P>
          </Section>

          <Section title="8. Sécurité">
            <P>
              GREENHOLD met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données
              contre tout accès non autorisé, modification, divulgation ou destruction :
            </P>
            <ul className="space-y-1 pl-4">
              {[
                "Chiffrement HTTPS/TLS sur l'ensemble du site",
                "Authentification sécurisée via Supabase Auth (hachage des mots de passe)",
                "Accès aux données de production limité aux employés habilités",
                "Paiements traités exclusivement par Stripe (données bancaires jamais transmises à GREENHOLD)",
                "Sauvegardes régulières des bases de données",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#1C2B22", fontFamily: "var(--font-sans)" }}>
                  <span style={{ color: "#C8972A" }}>🔒</span> {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="9. Contact DPO">
            <div className="rounded-2xl p-6" style={{ backgroundColor: "#0C2518" }}>
              <p className="text-lg font-semibold text-white mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                Délégué à la Protection des Données
              </p>
              <p className="text-sm mb-4" style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}>
                Pour toute question ou demande relative à vos données personnelles, contactez notre DPO :
              </p>
              <p className="font-semibold" style={{ color: "#F0C55A", fontFamily: "var(--font-sans)" }}>
                📧 dpo@greenhold.fr
              </p>
              <p className="text-xs mt-3" style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}>
                Délai de réponse : 30 jours maximum (RGPD Art. 12)
              </p>
            </div>
          </Section>

        </div>
      </section>

      <Footer />
    </main>
  );
}
