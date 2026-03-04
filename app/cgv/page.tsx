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

function P({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-sm leading-relaxed${className ? ` ${className}` : ""}`} style={{ color: "#1C2B22", fontFamily: "var(--font-sans)" }}>{children}</p>;
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-5" style={{ backgroundColor: "#C8E6D4", border: "1px solid #2A7A4F" }}>
      <p className="text-sm leading-relaxed" style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}>{children}</p>
    </div>
  );
}

function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-5" style={{ backgroundColor: "#FEF3C7", border: "1px solid #C8972A" }}>
      <p className="text-sm leading-relaxed" style={{ color: "#1C2B22", fontFamily: "var(--font-sans)" }}>{children}</p>
    </div>
  );
}

const PACKS = [
  { name: "Pack Découverte", price: "15,00 €", parts: 1, desc: "1 Goyavier + 1 Papayer intercalaire offert" },
  { name: "Pack Famille", price: "35,00 €", parts: 2, desc: "1 Goyavier + 1 Manguier + 2 Papayers intercalaires offerts" },
  { name: "Pack Investisseur", price: "99,00 €", parts: 5, desc: "5 Manguiers + 5 Papayers intercalaires offerts" },
  { name: "Pack Héritage Senior", price: "750,00 €", parts: 25, desc: "13 Manguiers + 12 Goyaviers + 25 Papayers + certificats nominatifs + clause de transmission héritiers" },
];

export default function CGVPage() {
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
            Conditions Générales de Vente
          </h1>
          <p className="text-sm" style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}>
            Dernière mise à jour : mars 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4" style={{ backgroundColor: "#F8F4EE" }}>
        <div className="mx-auto" style={{ maxWidth: "900px" }}>

          <Section title="1. Objet">
            <P>
              Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre la société GREENHOLD
              (ci-après « GREENHOLD » ou « le Vendeur ») et toute personne physique ou morale (ci-après « l'Acheteur »)
              procédant à l'achat de parts dans la forêt fruitière mutualisée GREENHOLD via le site internet greenhold.fr.
            </P>
            <P>
              Toute commande implique l'acceptation sans réserve des présentes CGV. GREENHOLD se réserve le droit de modifier
              ces conditions à tout moment. Les CGV applicables sont celles en vigueur au moment de la commande.
            </P>
          </Section>

          <Section title="2. Description des produits — Le modèle mutualisé GREENHOLD">
            <Highlight>
              GREENHOLD fonctionne comme un fonds forestier collectif. L'Acheteur n'acquiert pas la propriété d'un arbre
              individuel mais des parts dans la forêt GREENHOLD Sénégal. Chaque part correspond à un arbre planté au nom
              de l'Acheteur, mais les revenus sont calculés sur la production TOTALE de la forêt, proportionnellement aux
              parts détenues. Ce modèle mutualisé protège chaque actionnaire contre la perte d'un arbre individuel.
            </Highlight>

            <P>Répartition des revenus de la forêt :</P>
            <ul className="list-none space-y-2 pl-4">
              {[
                { pct: "45%", dest: "Partagés entre tous les actionnaires selon leurs parts" },
                { pct: "30%", dest: "Équipe terrain au Sénégal" },
                { pct: "25%", dest: "GREENHOLD (frais de gestion et développement)" },
              ].map(({ pct, dest }) => (
                <li key={pct} className="flex items-start gap-3 text-sm" style={{ color: "#1C2B22", fontFamily: "var(--font-sans)" }}>
                  <span className="font-bold flex-shrink-0" style={{ color: "#C8972A" }}>{pct}</span>
                  <span>{dest}</span>
                </li>
              ))}
            </ul>

            <P className="mt-4">Les packs disponibles à la vente sont les suivants :</P>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #DDE8E2" }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "#0C2518" }}>
                    {["Pack", "Prix TTC", "Parts", "Contenu"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PACKS.map((pack, i) => (
                    <tr key={pack.name} style={{ backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#F8F4EE" }}>
                      <td className="px-4 py-3 font-medium" style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}>{pack.name}</td>
                      <td className="px-4 py-3 font-bold" style={{ color: "#C8972A", fontFamily: "var(--font-serif)" }}>{pack.price}</td>
                      <td className="px-4 py-3" style={{ color: "#1C2B22", fontFamily: "var(--font-sans)" }}>{pack.parts}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}>{pack.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <P>
              Un papayer intercalaire est offert gratuitement avec chaque pack. Cet arbre intercalaire produit dès le mois 9
              et est naturellement retiré à l'an 3 pour laisser place aux arbres principaux. Il ne constitue pas une part
              supplémentaire mais un avantage commercial offert par GREENHOLD.
            </P>
          </Section>

          <Section title="3. Prix">
            <P>
              Les prix sont indiqués en euros (€) toutes taxes comprises (TTC). GREENHOLD se réserve le droit de modifier
              ses prix à tout moment. Les prix affichés au moment de la validation de la commande sont les seuls applicables.
            </P>
            <P>
              Des réductions peuvent être accordées dans le cadre du programme ambassadeur ou lors d'opérations commerciales
              spéciales (pré-lancement, offres saisonnières). Ces réductions ne sont pas cumulables sauf mention expresse contraire.
            </P>
          </Section>

          <Section title="4. Commande et paiement">
            <P>
              La commande est effectuée en ligne sur le site greenhold.fr. L'Acheteur sélectionne le pack souhaité et est
              redirigé vers la plateforme de paiement sécurisé Stripe. La commande est définitivement enregistrée après
              confirmation du paiement par Stripe.
            </P>
            <P>
              Le paiement est sécurisé par Stripe, Inc. (services de paiement conformes à la norme PCI DSS niveau 1).
              GREENHOLD ne conserve aucune information bancaire de l'Acheteur.
            </P>
            <P>
              Les moyens de paiement acceptés sont ceux proposés par Stripe au moment de la commande : carte bancaire
              (Visa, Mastercard, American Express), et autres moyens de paiement disponibles selon la localisation.
            </P>
            <P>
              En cas d'échec du paiement, la commande est automatiquement annulée et aucune part n'est attribuée.
            </P>
          </Section>

          <Section title="5. Livraison — Certificat de propriété PDF">
            <P>
              La nature du service GREENHOLD étant immatérielle (parts dans une forêt), la « livraison » consiste en :
            </P>
            <ul className="space-y-2 pl-4">
              {[
                "L'envoi d'un e-mail de confirmation de commande dans les 24 heures suivant le paiement",
                "L'envoi d'un certificat de propriété nominatif au format PDF dans les 48 heures",
                "L'ouverture d'un espace client personnel sur greenhold.fr",
                "La réception de photos géolocalisées de l'arbre planté dès sa mise en terre",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#1C2B22", fontFamily: "var(--font-sans)" }}>
                  <span style={{ color: "#C8972A" }}>🌿</span> {item}
                </li>
              ))}
            </ul>
            <P>
              La plantation effective de l'arbre est conditionnée à l'atteinte de l'objectif de démarrage de 200 parts vendues.
              En cas de non-atteinte de cet objectif dans un délai de 12 mois suivant la commande, GREENHOLD s'engage à rembourser
              intégralement l'Acheteur.
            </P>
          </Section>

          <Section title="6. Droit de rétractation">
            <P>
              Conformément à l'article L221-18 du Code de la consommation, l'Acheteur dispose d'un délai de 14 jours calendaires
              à compter de la date de la commande pour exercer son droit de rétractation, sans avoir à motiver sa décision.
            </P>
            <P>
              Pour exercer ce droit, l'Acheteur doit notifier sa décision de rétractation par e-mail à : contact@greenhold.fr,
              en indiquant clairement son nom, son adresse e-mail et la référence de sa commande.
            </P>
            <P>
              En cas de rétractation valide, GREENHOLD remboursera l'Acheteur dans un délai de 14 jours à compter de la
              réception de la demande, par le même moyen de paiement que celui utilisé lors de la commande.
            </P>
            <Warning>
              ⚠️ Exception : si la plantation de l'arbre a déjà été effectuée et que l'Acheteur a expressément demandé
              l'exécution du service avant l'expiration du délai de rétractation, le remboursement sera partiel et calculé
              au prorata des frais engagés par GREENHOLD.
            </Warning>
          </Section>

          <Section title="7. Fiscalité">
            <Warning>
              ⚠️ Mention fiscale importante : Les revenus perçus via GREENHOLD peuvent être soumis à imposition selon
              la législation fiscale de votre pays de résidence. Nous recommandons de consulter un conseiller fiscal.
            </Warning>
            <P>
              GREENHOLD n'effectue aucune retenue à la source sur les revenus versés aux actionnaires résidant en France
              ou à l'étranger. Il appartient à chaque actionnaire de déclarer les revenus perçus conformément à la
              réglementation fiscale de son pays de résidence.
            </P>
            <P>
              GREENHOLD pourra fournir, sur demande, un relevé annuel des versements effectués à titre de justificatif
              pour les déclarations fiscales.
            </P>
          </Section>

          <Section title="8. Garanties">
            <P>
              GREENHOLD offre les garanties suivantes à chaque actionnaire :
            </P>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: "🔄", title: "Garantie de remplacement 6 mois", desc: "Tout arbre mort dans les 6 premiers mois suivant la plantation est remplacé gratuitement, sans condition." },
                { icon: "📸", title: "Preuve terrain", desc: "Photos géolocalisées de l'arbre planté à votre nom, toutes les 8 semaines, pendant toute la durée de vie de l'arbre." },
                { icon: "🏦", title: "Protection mutualisée", desc: "Le modèle mutualisé protège vos revenus : 1 arbre mort sur 3 000 représente un impact maximal de 0,03% sur vos bénéfices." },
                { icon: "👨‍👩‍👧", title: "Transmission héritiers", desc: "Vos parts GREENHOLD sont transmissibles à vos héritiers désignés, sans frais de transfert." },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="rounded-xl p-5" style={{ backgroundColor: "#FFFFFF", border: "1px solid #DDE8E2" }}>
                  <p className="text-xl mb-2">{icon}</p>
                  <p className="font-semibold text-sm mb-1" style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}>{title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}>{desc}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="9. Responsabilité">
            <P>
              GREENHOLD s'engage à mettre en œuvre tous les moyens raisonnables pour assurer la bonne plantation et l'entretien
              des arbres au Sénégal. Toutefois, les revenus présentés sur le site sont des estimations basées sur les rendements
              agricoles constatés et ne constituent pas une garantie de résultats.
            </P>
            <P>
              Les rendements effectifs peuvent varier en fonction des conditions météorologiques, agricoles, sanitaires ou de
              marché au Sénégal. GREENHOLD ne saurait être tenu responsable des variations de revenus liées à ces facteurs.
            </P>
          </Section>

          <Section title="10. Loi applicable et juridiction">
            <P>
              Les présentes CGV sont soumises au droit français. En cas de litige, et après tentative de résolution amiable,
              les tribunaux compétents de Paris seront seuls compétents.
            </P>
            <P>
              Conformément aux dispositions du Code de la consommation concernant le règlement amiable des litiges,
              GREENHOLD adhère au service de médiation proposé par : à compléter (médiateur certifié CNPM ou équivalent).
            </P>
          </Section>

          <Section title="11. Contact">
            <div className="rounded-xl p-6" style={{ backgroundColor: "#C8E6D4", border: "1px solid #2A7A4F" }}>
              <P>Pour toute question relative à ces CGV ou à une commande :</P>
              <p className="mt-3 font-semibold" style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}>📧 contact@greenhold.fr</p>
            </div>
          </Section>

        </div>
      </section>

      <Footer />
    </main>
  );
}
