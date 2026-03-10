import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GREENHOLD — Forêt fruitière mutualisée au Sénégal",
  description:
    "Achète des parts dans la forêt GREENHOLD. Un arbre est planté à ton nom. Tes revenus viennent de toute la forêt — pas d'un seul arbre. Protégé, transparent, à vie.",
  keywords: [
    "investissement arbre fruitier",
    "forêt mutualisée",
    "Sénégal",
    "goyavier",
    "manguier",
    "revenus passifs",
  ],
  openGraph: {
    title: "GREENHOLD — Possède des parts d'une forêt fruitière au Sénégal",
    description:
      "Achète des parts dans la forêt GREENHOLD. Dès 15€. Revenus à vie.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${cormorant.variable} ${outfit.variable} antialiased`}>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
