import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main>
      <Navigation />

      <section
        className="min-h-[72vh] flex items-center justify-center px-4"
        style={{ backgroundColor: "#F8F4EE" }}
      >
        <div className="text-center max-w-lg">
          {/* Icône */}
          <p className="text-7xl mb-6">🌳</p>

          {/* Code */}
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#C8972A", fontFamily: "var(--font-sans)" }}
          >
            Erreur 404
          </p>

          {/* Titre */}
          <h1
            className="mb-4"
            style={{
              fontFamily: "var(--font-serif)",
              color: "#0C2518",
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            Cette page est introuvable
          </h1>

          {/* Sous-titre */}
          <p
            className="mb-10 text-sm leading-relaxed"
            style={{ color: "#6B7280", fontFamily: "var(--font-sans)", maxWidth: "400px", margin: "0 auto 2.5rem" }}
          >
            La page que vous cherchez n'existe pas ou a été déplacée.
            Retournez à la forêt GREENHOLD.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/"
              className="inline-block px-8 py-3 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "#2A7A4F",
                color: "white",
                fontFamily: "var(--font-sans)",
                textDecoration: "none",
              }}
            >
              ← Retour à l'accueil
            </Link>
            <Link
              href="/boutique"
              className="inline-block px-8 py-3 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "transparent",
                color: "#0C2518",
                border: "1.5px solid #0C2518",
                fontFamily: "var(--font-sans)",
                textDecoration: "none",
              }}
            >
              Voir la boutique
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
