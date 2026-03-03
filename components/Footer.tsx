import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0C2518" }}>
      <div className="mx-auto px-4 py-16" style={{ maxWidth: "1200px" }}>
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b" style={{ borderColor: "#1A4D35" }}>
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <span
                className="text-white text-3xl font-bold"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                GREENHOLD
              </span>
            </div>
            <p className="text-sm mb-6" style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)", lineHeight: "1.6" }}>
              Plant it. Own it. Earn it.
            </p>
            <p className="text-xs" style={{ color: "#6B7280", fontFamily: "var(--font-sans)", lineHeight: "1.7" }}>
              Forêt fruitière mutualisée au Sénégal.<br />
              Des parts dans une vraie forêt. Des revenus réels.<br />
              Un impact durable.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-sm font-semibold mb-4"
              style={{ color: "#C8972A", fontFamily: "var(--font-sans)", textTransform: "uppercase", letterSpacing: "0.1em" }}
            >
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Boutique", href: "/boutique" },
                { label: "Comment ça marche", href: "/#comment-ca-marche" },
                { label: "Offrir un arbre", href: "/offrir" },
                { label: "Entreprises RSE", href: "/#entreprises" },
                { label: "Lancement", href: "/lancement" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4
              className="text-sm font-semibold mb-4"
              style={{ color: "#C8972A", fontFamily: "var(--font-sans)", textTransform: "uppercase", letterSpacing: "0.1em" }}
            >
              Légal
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Mentions légales", href: "/mentions-legales" },
                { label: "CGV", href: "/cgv" },
                { label: "Politique de confidentialité", href: "/confidentialite" },
                { label: "Conditions d'utilisation", href: "/cgu" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4
              className="text-sm font-semibold mb-4"
              style={{ color: "#C8972A", fontFamily: "var(--font-sans)", textTransform: "uppercase", letterSpacing: "0.1em" }}
            >
              Contact
            </h4>
            <ul className="flex flex-col gap-3 mb-6">
              <li>
                <a
                  href="mailto:contact@greenhold.fr"
                  className="text-sm transition-colors duration-200"
                  style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
                >
                  contact@greenhold.fr
                </a>
              </li>
              <li className="text-sm" style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}>
                Sénégal &amp; France
              </li>
            </ul>
            <h4
              className="text-sm font-semibold mb-3"
              style={{ color: "#C8972A", fontFamily: "var(--font-sans)", textTransform: "uppercase", letterSpacing: "0.1em" }}
            >
              Réseaux
            </h4>
            <div className="flex gap-4">
              {[
                { label: "Instagram", href: "https://instagram.com/greenhold", icon: "📸" },
                { label: "TikTok", href: "https://tiktok.com/@greenhold", icon: "🎵" },
                { label: "LinkedIn", href: "https://linkedin.com/company/greenhold", icon: "💼" },
              ].map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg"
                  title={`@greenhold sur ${s.label}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-center md:text-left" style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}>
            © 2024 GREENHOLD — Forêt fruitière mutualisée au Sénégal. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs" style={{ color: "#2A7A4F", fontFamily: "var(--font-sans)" }}>
              🔒 SSL Sécurisé
            </span>
            <span className="text-xs" style={{ color: "#2A7A4F", fontFamily: "var(--font-sans)" }}>
              💳 Paiement Stripe
            </span>
            <span className="text-xs" style={{ color: "#2A7A4F", fontFamily: "var(--font-sans)" }}>
              🌿 100% Transparent
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
