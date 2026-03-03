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
      <div
        className="space-y-3 text-sm leading-relaxed"
        style={{ color: "#1C2B22", fontFamily: "var(--font-sans)" }}
      >
        {children}
      </div>
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm leading-relaxed" style={{ color: "#1C2B22", fontFamily: "var(--font-sans)" }}>
      {children}
    </p>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-3" style={{ borderBottom: "1px solid #DDE8E2" }}>
      <span className="text-xs font-semibold uppercase tracking-wide w-40 flex-shrink-0" style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}>
        {label}
      </span>
      <span className="text-sm" style={{ color: "#1C2B22", fontFamily: "var(--font-sans)" }}>
        {value}
      </span>
    </div>
  );
}

export default function MentionsLegalesPage() {
  return (
    <main>
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-12 px-4" style={{ backgroundColor: "#0C2518" }}>
        <div className="mx-auto" style={{ maxWidth: "900px" }}>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#C8972A", fontFamily: "var(--font-sans)" }}
          >
            Légal
          </p>
          <h1
            className="text-white mb-3"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600 }}
          >
            Mentions Légales
          </h1>
          <p className="text-sm" style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}>
            Dernière mise à jour : mars 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4" style={{ backgroundColor: "#F8F4EE" }}>
        <div className="mx-auto" style={{ maxWidth: "900px" }}>

          <Section title="1. Éditeur du site">
            <div className="rounded-xl p-6" style={{ backgroundColor: "#FFFFFF", border: "1px solid #DDE8E2" }}>
              <InfoRow label="Dénomination" value="GREENHOLD" />
              <InfoRow label="Forme juridique" value="Société par actions simplifiée (SAS) — en cours d'immatriculation" />
              <InfoRow label="Siège social" value="France (adresse complète à compléter lors de l'immatriculation)" />
              <InfoRow label="SIREN / SIRET" value="En cours d'obtention" />
              <InfoRow label="Capital social" value="À préciser" />
              <InfoRow label="Directeur de la publication" value="Le représentant légal de GREENHOLD" />
              <InfoRow label="Contact" value="contact@greenhold.fr" />
            </div>
          </Section>

          <Section title="2. Hébergeur">
            <div className="rounded-xl p-6" style={{ backgroundColor: "#FFFFFF", border: "1px solid #DDE8E2" }}>
              <InfoRow label="Société" value="Vercel Inc." />
              <InfoRow label="Adresse" value="340 Pine Street, Suite 1201, San Francisco, CA 94104, États-Unis" />
              <InfoRow label="Site web" value="https://vercel.com" />
              <InfoRow label="Contact" value="https://vercel.com/support" />
            </div>
            <P>
              Les données sont hébergées sur l'infrastructure de Vercel, distribuée via un réseau mondial de CDN (Content Delivery Network).
              Les serveurs applicatifs peuvent être situés dans l'Union Européenne ou aux États-Unis selon la configuration déployée.
            </P>
          </Section>

          <Section title="3. Propriété intellectuelle">
            <P>
              L'ensemble des contenus présents sur le site GREENHOLD (textes, images, graphismes, logo, icônes, sons, vidéos, mise en page, etc.)
              est la propriété exclusive de GREENHOLD ou de ses partenaires, et est protégé par les lois françaises et internationales relatives
              au droit d'auteur et à la propriété intellectuelle.
            </P>
            <P>
              Toute reproduction, représentation, modification, publication, adaptation totale ou partielle des éléments du site,
              quel que soit le moyen ou le procédé utilisé, est interdite sans l'autorisation écrite préalable de GREENHOLD.
            </P>
            <P>
              Les marques, logos et signes distinctifs figurant sur ce site sont déposés ou en cours de dépôt par GREENHOLD.
              Toute reproduction, utilisation ou apposition, totale ou partielle, de ces signes ou éléments, sans l'autorisation
              expresse et préalable de GREENHOLD, est interdite.
            </P>
          </Section>

          <Section title="4. Limitation de responsabilité">
            <P>
              GREENHOLD s'efforce de fournir des informations aussi précises que possible sur ce site. Toutefois, GREENHOLD ne pourra
              être tenu responsable des omissions, inexactitudes et carences dans la mise à jour, qu'elles soient de son fait ou du fait
              des tiers partenaires qui lui fournissent ces informations.
            </P>
            <P>
              Toutes les informations présentes sur ce site sont données à titre indicatif et sont susceptibles d'évoluer.
              Par ailleurs, les renseignements figurant sur le site ne sont pas exhaustifs.
            </P>
            <P>
              GREENHOLD ne saurait être tenu responsable de dommages directs ou indirects causés au matériel de l'utilisateur
              lors de l'accès au site, résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications techniques
              requises, soit de l'apparition d'un bug ou d'une incompatibilité.
            </P>
            <P>
              Des espaces interactifs sont à la disposition des utilisateurs. GREENHOLD se réserve le droit de supprimer, sans mise
              en demeure préalable, tout contenu déposé dans cet espace qui contreviendrait à la législation applicable en France,
              en particulier aux dispositions relatives à la protection des données.
            </P>
          </Section>

          <Section title="5. Liens hypertextes">
            <P>
              Le site GREENHOLD peut contenir des liens hypertextes vers d'autres sites présents sur le réseau internet.
              Les liens vers d'autres sites ne sauraient engager la responsabilité de GREENHOLD, qui n'a pas la possibilité
              de vérifier l'intégralité des contenus des sites ainsi visités.
            </P>
            <P>
              Toute demande d'autorisation pour établir un lien hypertexte pointant vers le site GREENHOLD doit être adressée
              à : contact@greenhold.fr
            </P>
          </Section>

          <Section title="6. Cookies et données personnelles">
            <P>
              La gestion des cookies et des données personnelles collectées sur ce site est détaillée dans notre
              <a href="/confidentialite" className="font-medium underline ml-1" style={{ color: "#C8972A" }}>
                Politique de Confidentialité
              </a>.
            </P>
            <P>
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés,
              vous disposez d'un droit d'accès, de rectification, de portabilité et d'effacement de vos données ou encore de
              limitation du traitement. Vous pouvez exercer ce droit à l'adresse : dpo@greenhold.fr
            </P>
          </Section>

          <Section title="7. Droit applicable et attribution de juridiction">
            <P>
              Tout litige en relation avec l'utilisation du site GREENHOLD est soumis au droit français.
              Il est fait attribution exclusive de juridiction aux tribunaux compétents de Paris.
            </P>
            <P>
              La langue de référence, pour le règlement d'éventuels litiges, est le français.
            </P>
          </Section>

          <Section title="8. Contact">
            <div
              className="rounded-xl p-6"
              style={{ backgroundColor: "#C8E6D4", border: "1px solid #DDE8E2" }}
            >
              <P>
                Pour toute question relative aux présentes mentions légales, vous pouvez contacter GREENHOLD à l'adresse suivante :
              </P>
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
