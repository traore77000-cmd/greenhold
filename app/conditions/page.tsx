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

export default function ConditionsPage() {
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
            Conditions Générales d&apos;Utilisation
          </h1>
          <p className="text-sm" style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}>
            Dernière mise à jour : mars 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4" style={{ backgroundColor: "#F8F4EE" }}>
        <div className="mx-auto" style={{ maxWidth: "900px" }}>

          <Section title="1. Objet et champ d'application">
            <P>
              Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités et conditions
              d'utilisation du site internet GREENHOLD accessible à l'adresse greenhold.fr (ci-après « le Site »),
              ainsi que les droits et obligations de ses utilisateurs.
            </P>
            <P>
              Tout accès et/ou utilisation du Site suppose l'acceptation et le respect de l'ensemble des termes des présentes
              CGU. L'utilisateur reconnaît avoir pris connaissance de ces conditions avant tout usage du Site.
            </P>
          </Section>

          <Section title="2. Acceptation des conditions">
            <P>
              En accédant au Site, l'utilisateur reconnaît avoir lu, compris et accepté sans réserve les présentes CGU.
              Cette acceptation est matérialisée par la navigation sur le Site ou par la création d'un compte utilisateur.
            </P>
            <P>
              GREENHOLD se réserve le droit de modifier les présentes CGU à tout moment. Les modifications entrent en vigueur
              dès leur publication sur le Site. L'utilisation continuée du Site après modification vaut acceptation des nouvelles CGU.
            </P>
          </Section>

          <Section title="3. Accès au service">
            <P>
              L'accès au Site est gratuit. Certaines fonctionnalités (espace client, tableau de bord, accès aux photos terrain)
              nécessitent la création d'un compte utilisateur.
            </P>
            <P>
              GREENHOLD s'efforce d'assurer la disponibilité du Site 24h/24 et 7j/7, mais ne peut garantir une disponibilité
              permanente. Des interruptions peuvent survenir pour des opérations de maintenance, mises à jour ou incidents techniques.
            </P>
            <P>
              L'accès au Site nécessite une connexion internet. Les coûts liés à cette connexion sont à la charge de l'utilisateur.
            </P>
          </Section>

          <Section title="4. Création et gestion du compte utilisateur">
            <P>
              Pour accéder à l'espace client GREENHOLD, l'utilisateur doit créer un compte en fournissant une adresse e-mail
              valide et un mot de passe sécurisé. L'authentification est gérée via Supabase Auth.
            </P>
            <P>
              L'utilisateur s'engage à fournir des informations exactes, à les maintenir à jour, et à ne pas usurper l'identité
              d'un tiers. Chaque utilisateur ne peut posséder qu'un seul compte.
            </P>
            <P>
              L'utilisateur est seul responsable de la confidentialité de ses identifiants. Toute utilisation frauduleuse de son
              compte signalée à GREENHOLD fera l'objet d'une investigation et pourra entraîner la suspension du compte concerné.
            </P>
            <P>
              GREENHOLD se réserve le droit de suspendre ou supprimer tout compte créé avec de fausses informations ou utilisé
              en violation des présentes CGU.
            </P>
          </Section>

          <Section title="5. Utilisation du service">
            <P>
              En utilisant le Site et les services GREENHOLD, l'utilisateur s'engage à :
            </P>
            <ul className="space-y-2 pl-4">
              {[
                "N'utiliser le Site qu'à des fins légales et conformément aux présentes CGU",
                "Ne pas tenter d'accéder sans autorisation aux systèmes informatiques de GREENHOLD",
                "Ne pas perturber ou interrompre le fonctionnement du Site",
                "Ne pas diffuser de contenus illicites, offensants, diffamatoires ou portant atteinte aux droits des tiers",
                "Ne pas utiliser le Site pour du spam, du phishing ou toute activité frauduleuse",
                "Respecter les droits de propriété intellectuelle de GREENHOLD",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#1C2B22", fontFamily: "var(--font-sans)" }}>
                  <span style={{ color: "#C8972A", flexShrink: 0 }}>✓</span> {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="6. Contenu interdit">
            <P>
              Il est strictement interdit de publier, transmettre ou partager via le Site tout contenu :
            </P>
            <ul className="space-y-2 pl-4">
              {[
                "Illégal, diffamatoire, obscène, pornographique ou portant atteinte à la dignité humaine",
                "Portant atteinte aux droits de propriété intellectuelle d'autrui",
                "Contenant des virus, malwares, ou tout code malveillant",
                "Constituant une activité de spam, de phishing ou de hameçonnage",
                "Faisant la promotion d'activités illicites ou de la violence",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#1C2B22", fontFamily: "var(--font-sans)" }}>
                  <span style={{ color: "#C87272", flexShrink: 0 }}>✗</span> {item}
                </li>
              ))}
            </ul>
            <P>
              GREENHOLD se réserve le droit de supprimer tout contenu non conforme et de suspendre le compte de l'utilisateur
              responsable, sans préavis et sans indemnisation.
            </P>
          </Section>

          <Section title="7. Programme ambassadeur et parrainage">
            <P>
              Le programme ambassadeur GREENHOLD permet aux actionnaires de bénéficier de réductions et commissions sur les
              ventes générées via leur lien de parrainage. Les règles spécifiques du programme (niveaux, taux de commission,
              conditions de versement) sont définies dans l'espace client et peuvent être modifiées par GREENHOLD avec un
              préavis de 30 jours.
            </P>
            <P>
              Les commissions de parrainage sont calculées sur les achats effectivement réalisés et payés. Tout abus du programme
              (faux comptes, auto-parrainage frauduleux) entraîne la révocation des commissions et la suspension du compte.
            </P>
          </Section>

          <Section title="8. Propriété intellectuelle">
            <P>
              L'ensemble des contenus du Site (textes, images, graphiques, logo, vidéos, code source) est la propriété exclusive
              de GREENHOLD et est protégé par le droit d'auteur.
            </P>
            <P>
              L'utilisateur bénéficie d'un droit d'usage personnel, non exclusif et non transférable. Toute reproduction,
              représentation, modification ou distribution sans autorisation écrite préalable de GREENHOLD est interdite.
            </P>
          </Section>

          <Section title="9. Limitation de responsabilité">
            <P>
              GREENHOLD ne saurait être tenu responsable de dommages directs ou indirects résultant de l'utilisation du Site,
              d'une impossibilité d'accès au Site, ou de la confiance accordée aux informations présentées.
            </P>
            <P>
              Les projections de revenus présentées sur le Site sont des estimations et ne constituent pas une garantie de
              résultats. Les revenus réels peuvent varier selon les conditions agricoles, météorologiques et de marché.
            </P>
          </Section>

          <Section title="10. Résiliation du compte">
            <P>
              L'utilisateur peut demander la suppression de son compte à tout moment en contactant support@greenhold.fr.
              La suppression du compte n'entraîne pas la perte des parts détenues, qui restent actives.
            </P>
            <P>
              GREENHOLD peut résilier un compte en cas de violation des présentes CGU, avec notification par e-mail.
              En cas de résiliation pour faute grave, GREENHOLD se réserve le droit d'annuler les commissions de parrainage
              non encore versées.
            </P>
          </Section>

          <Section title="11. Droit applicable et médiation">
            <P>
              Les présentes CGU sont régies par le droit français. En cas de litige, une solution amiable sera recherchée
              en priorité. À défaut, les tribunaux compétents de Paris seront saisis.
            </P>
            <P>
              Conformément aux dispositions du Code de la consommation (Art. L612-1 et suivants), tout consommateur a le droit
              de recourir gratuitement à un médiateur de la consommation pour tout litige non résolu avec GREENHOLD.
            </P>
          </Section>

          <Section title="12. Contact">
            <div className="rounded-xl p-6" style={{ backgroundColor: "#C8E6D4", border: "1px solid #2A7A4F" }}>
              <P>Pour toute question relative aux présentes CGU :</P>
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
