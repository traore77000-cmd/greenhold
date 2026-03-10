"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "Est-ce que je possède vraiment un arbre ?",
    answer:
      "Oui. Un arbre réel est planté à ton nom avec un numéro unique. Tu reçois des photos géolocalisées de ton arbre toutes les 8 semaines. Mais tes revenus viennent de toute la forêt mutualisée — pas d'un seul arbre. C'est ce qui te protège.",
  },
  {
    question: "Que se passe-t-il si mon arbre meurt ?",
    answer:
      "Si ton arbre meurt dans les 6 premiers mois, il est remplacé gratuitement. Après 6 mois, le modèle mutualisé protège tes revenus : 1 arbre sur 3 000 représente seulement 0,03% d'impact sur tes bénéfices. Si un arbre meurt, tout le monde supporte l'impact ensemble — personne ne perd tout.",
  },
  {
    question: "Quand je reçois mon premier virement ?",
    answer:
      "Les papayers commencent à produire dès le mois 9 — tes premiers revenus arrivent en fin de première année, grâce au papayer intercalaire offert gratuitement à chaque achat. Pendant que tes manguiers et goyaviers grandissent, le papayer génère tes premiers revenus.",
  },
  {
    question: "Comment fonctionne le réinvestissement ?",
    answer:
      "Après ton premier virement au mois 9, tu peux choisir de réinvestir tout ou partie de tes bénéfices en nouvelles parts. 4 options : 100% cash, 25% réinvesti, 50% réinvesti, ou 100% réinvesti. Les parts achetées via réinvestissement bénéficient d'une réduction de 10%.",
  },
  {
    question: "Puis-je transmettre mes parts à mes enfants ?",
    answer:
      "Oui. Tes parts GREENHOLD sont transmissibles à tes héritiers désignés. La transmission peut être faite gratuitement à un proche via notre plateforme. Le Pack Héritage Senior (750€ / 25 parts) inclut une clause de transmission automatique aux héritiers.",
  },
  {
    question: "Puis-je revendre mes parts ?",
    answer:
      "Oui. Via la marketplace GREENHOLD — une commission de 10% est prélevée sur la vente. Tu peux également transmettre tes parts à un proche gratuitement. La liquidité dépend de la demande sur la marketplace.",
  },
  {
    question: "Qui s'occupe des arbres sur place ?",
    answer:
      "Notre équipe de cousins au Sénégal. Ils sont formés, équipés et rémunérés dignement — 30% de chaque récolte leur revient directement. Ils sont sur le terrain, ils connaissent les arbres, les saisons, les marchés locaux. C'est leur forêt autant que la tienne.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto" style={{ maxWidth: "800px" }}>
      {FAQ_ITEMS.map((item, index) => (
        <div
          key={index}
          className="border-b"
          style={{ borderColor: "#DDE8E2" }}
        >
          <button
            className="w-full text-left py-5 flex items-center justify-between gap-4"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            aria-expanded={openIndex === index}
          >
            <span
              className="text-base font-medium"
              style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}
            >
              {item.question}
            </span>
            <span
              className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
              style={{
                backgroundColor: openIndex === index ? "#C8972A" : "#DDE8E2",
                color: openIndex === index ? "#0C2518" : "#6B7280",
                transform: openIndex === index ? "rotate(45deg)" : "none",
              }}
            >
              +
            </span>
          </button>

          <div
            className="overflow-hidden transition-all duration-300"
            style={{
              maxHeight: openIndex === index ? "400px" : "0px",
              opacity: openIndex === index ? 1 : 0,
            }}
          >
            <p
              className="pb-5 text-sm leading-relaxed"
              style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
            >
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
