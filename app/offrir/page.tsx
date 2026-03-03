"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const PACKS_GIFT = [
  { id: "decouverte", emoji: "🌱", name: "Découverte", price: 15, parts: 1, desc: "1 Goyavier + 1 papayer offert" },
  { id: "famille", emoji: "🌳", name: "Famille", price: 35, parts: 2, desc: "1 Goyavier + 1 Manguier + 2 papayers", badge: "POPULAIRE" },
  { id: "investisseur", emoji: "🌍", name: "Investisseur", price: 99, parts: 5, desc: "5 Manguiers + 5 papayers offerts" },
  { id: "heritage", emoji: "👴", name: "Héritage Senior", price: 750, parts: 25, desc: "13 Manguiers + 12 Goyaviers + 25 papayers" },
];

const OCCASIONS = [
  { icon: "🎄", label: "Noël", message: "Je t'offre un arbre fruitier au Sénégal pour Noël 🎄 Ton arbre va grandir, produire des fruits, et te rapporter des revenus à vie. C'est mon cadeau le plus original — un arbre qui grandit à vie." },
  { icon: "🌙", label: "Ramadan", message: "Pour ce Ramadan béni, je t'offre un arbre fruitier 🌿 Un cadeau qui nourrit et qui dure — planté à ton nom au Sénégal. Que cet arbre soit une source de baraka pour toi et ta famille." },
  { icon: "💐", label: "Fête des Mères", message: "Maman, je t'offre un arbre fruitier qui produira pendant 40 ans 💐 Ton arbre est planté à ton nom au Sénégal. Chaque année, il produira des fruits et te rapportera des revenus. Parce que tu mérites un cadeau qui dure." },
  { icon: "👨", label: "Fête des Pères", message: "Papa, je t'offre le cadeau que tu n'as jamais reçu 🌳 Un arbre fruitier planté à ton nom au Sénégal. Tes revenus arrivent dès le mois 9. Un investissement qui grandira avec toi." },
  { icon: "👶", label: "Naissance", message: "Bienvenue dans le monde 👶 J'ai planté un arbre fruitier à ton nom au Sénégal le jour de ta naissance. Il grandira avec toi, et produira des fruits pendant toute ta vie." },
  { icon: "🎓", label: "Diplôme", message: "Félicitations pour ton diplôme ! 🎓 Je t'offre un arbre fruitier au Sénégal — un cadeau qui grandira avec toi et tes ambitions. Tes premiers revenus arrivent dans 9 mois." },
];

export default function OffirPage() {
  const [selectedPack, setSelectedPack] = useState("famille");
  const [selectedOccasion, setSelectedOccasion] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [sendDate, setSendDate] = useState("");
  const [sendNow, setSendNow] = useState(true);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const pack = PACKS_GIFT.find((p) => p.id === selectedPack)!;

  const handleOccasion = (occasion: typeof OCCASIONS[0]) => {
    setSelectedOccasion(occasion.label);
    setMessage(occasion.message);
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packId: selectedPack,
          price: pack.price,
          name: `Cadeau — Pack ${pack.name}`,
          gift: true,
          recipientName,
          recipientEmail,
          senderName,
          message,
          sendDate: sendNow ? null : sendDate,
        }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      alert("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-16 px-4 text-center" style={{ backgroundColor: "#0C2518" }}>
        <div className="mx-auto" style={{ maxWidth: "700px" }}>
          <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "#C8972A", fontFamily: "var(--font-sans)" }}>
            Cadeau original • À partir de 15€ • Envoi immédiat ou différé
          </p>
          <h1
            className="mb-4 text-white"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 600 }}
          >
            🎁 Offrir un arbre fruitier
          </h1>
          <p className="text-base" style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}>
            Un cadeau qui grandit, produit et rapporte à vie. Livré par e-mail avec un certificat cadeau personnalisé.
          </p>
        </div>
      </section>

      {/* Step Indicator */}
      <div className="py-6 px-4" style={{ backgroundColor: "#F8F4EE", borderBottom: "1px solid #DDE8E2" }}>
        <div className="mx-auto flex items-center justify-center gap-4" style={{ maxWidth: "600px" }}>
          {[
            { n: 1, label: "Le pack" },
            { n: 2, label: "Le message" },
            { n: 3, label: "L'envoi" },
          ].map(({ n, label }) => (
            <div key={n} className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                style={{
                  backgroundColor: step >= n ? "#C8972A" : "#DDE8E2",
                  color: step >= n ? "#0C2518" : "#6B7280",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {n}
              </div>
              <span className="text-sm hidden sm:block" style={{ color: step >= n ? "#0C2518" : "#6B7280", fontFamily: "var(--font-sans)" }}>
                {label}
              </span>
              {n < 3 && <span className="text-gray-300 ml-2">→</span>}
            </div>
          ))}
        </div>
      </div>

      <section className="py-16 px-4" style={{ backgroundColor: "#F8F4EE" }}>
        <div className="mx-auto" style={{ maxWidth: "900px" }}>

          {/* STEP 1: Pack Selection */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-semibold mb-8 text-center" style={{ color: "#0C2518", fontFamily: "var(--font-serif)" }}>
                Choisis le pack cadeau
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {PACKS_GIFT.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPack(p.id)}
                    className="rounded-2xl p-5 text-left transition-all duration-200"
                    style={{
                      backgroundColor: selectedPack === p.id ? "#0C2518" : "#FFFFFF",
                      border: selectedPack === p.id ? "2px solid #C8972A" : "1px solid #DDE8E2",
                      borderRadius: "8px",
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-3xl">{p.emoji}</span>
                      {p.badge && (
                        <span className="text-xs px-2 py-1 rounded-full font-bold" style={{ backgroundColor: "#C8972A", color: "#0C2518", fontFamily: "var(--font-sans)" }}>
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <p className="font-semibold text-lg mb-1" style={{ color: selectedPack === p.id ? "#FFFFFF" : "#0C2518", fontFamily: "var(--font-serif)" }}>
                      {p.name}
                    </p>
                    <p className="text-2xl font-bold mb-2" style={{ color: "#C8972A", fontFamily: "var(--font-serif)" }}>
                      {p.price}€
                    </p>
                    <p className="text-xs" style={{ color: selectedPack === p.id ? "#C8E6D4" : "#6B7280", fontFamily: "var(--font-sans)" }}>
                      {p.desc}
                    </p>
                  </button>
                ))}
              </div>

              {/* E-card preview */}
              <div
                className="rounded-2xl p-8 mb-8"
                style={{ backgroundColor: "#0C2518", border: "2px solid #C8972A", borderRadius: "8px" }}
              >
                <p className="text-xs uppercase tracking-widest mb-4 text-center" style={{ color: "#C8972A", fontFamily: "var(--font-sans)" }}>
                  Aperçu de l&apos;e-card cadeau
                </p>
                <div className="text-center">
                  <p className="text-6xl mb-4">{pack.emoji}</p>
                  <p className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                    🎁 Pack {pack.name}
                  </p>
                  <p className="text-lg mb-2" style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}>
                    {pack.desc}
                  </p>
                  <p className="text-sm" style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}>
                    Un arbre est planté à ton nom au Sénégal 🌿
                  </p>
                  <div className="mt-4 inline-block px-6 py-2 rounded-lg font-semibold" style={{ backgroundColor: "#C8972A", color: "#0C2518", fontFamily: "var(--font-sans)" }}>
                    Activer mon arbre
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setStep(2)}
                  className="px-10 py-4 rounded-xl font-semibold text-lg"
                  style={{ backgroundColor: "#C8972A", color: "#0C2518", fontFamily: "var(--font-sans)", minHeight: "56px" }}
                >
                  Suivant — Personnaliser le message →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Message */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-semibold mb-8 text-center" style={{ color: "#0C2518", fontFamily: "var(--font-serif)" }}>
                Personnalise ton message
              </h2>

              {/* Occasion shortcuts */}
              <div className="mb-6">
                <p className="text-sm font-medium mb-3" style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}>
                  Choisis une occasion pour pré-remplir le message :
                </p>
                <div className="flex flex-wrap gap-2">
                  {OCCASIONS.map((occ) => (
                    <button
                      key={occ.label}
                      onClick={() => handleOccasion(occ)}
                      className="flex items-center gap-1 px-3 py-2 rounded-full text-xs font-medium transition-all"
                      style={{
                        backgroundColor: selectedOccasion === occ.label ? "#C8972A" : "#C8E6D4",
                        color: "#0C2518",
                        fontFamily: "var(--font-sans)",
                      }}
                    >
                      {occ.icon} {occ.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}>
                    Ton prénom (expéditeur)
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Marie"
                    className="w-full px-4 py-3 rounded-xl outline-none"
                    style={{ border: "2px solid #DDE8E2", fontFamily: "var(--font-sans)", backgroundColor: "#FFFFFF", color: "#1C2B22" }}
                    onFocus={(e) => (e.target.style.borderColor = "#C8972A")}
                    onBlur={(e) => (e.target.style.borderColor = "#DDE8E2")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}>
                    Prénom du destinataire
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Jean"
                    className="w-full px-4 py-3 rounded-xl outline-none"
                    style={{ border: "2px solid #DDE8E2", fontFamily: "var(--font-sans)", backgroundColor: "#FFFFFF", color: "#1C2B22" }}
                    onFocus={(e) => (e.target.style.borderColor = "#C8972A")}
                    onBlur={(e) => (e.target.style.borderColor = "#DDE8E2")}
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium mb-2" style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}>
                  Message personnalisé
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  placeholder="Ton message personnel..."
                  className="w-full px-4 py-3 rounded-xl outline-none resize-none"
                  style={{ border: "2px solid #DDE8E2", fontFamily: "var(--font-sans)", backgroundColor: "#FFFFFF", color: "#1C2B22" }}
                  onFocus={(e) => (e.target.style.borderColor = "#C8972A")}
                  onBlur={(e) => (e.target.style.borderColor = "#DDE8E2")}
                />
              </div>

              {/* Live preview of card */}
              {(recipientName || message) && (
                <div
                  className="rounded-2xl p-6 mb-6"
                  style={{ backgroundColor: "#0C2518", border: "2px solid #C8972A", borderRadius: "8px" }}
                >
                  <p className="text-xs uppercase tracking-widest mb-3 text-center" style={{ color: "#C8972A", fontFamily: "var(--font-sans)" }}>
                    Aperçu de votre e-card
                  </p>
                  <p className="text-sm text-center mb-2" style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}>
                    {recipientName ? `Pour ${recipientName},` : "Pour toi,"}
                  </p>
                  {message && (
                    <p className="text-sm text-center italic mb-3" style={{ color: "#F8F4EE", fontFamily: "var(--font-serif)", fontSize: "1rem" }}>
                      &ldquo;{message.slice(0, 120)}{message.length > 120 ? "..." : ""}&rdquo;
                    </p>
                  )}
                  {senderName && (
                    <p className="text-xs text-center" style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}>
                      — {senderName} 🌿
                    </p>
                  )}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-xl font-medium border"
                  style={{ borderColor: "#DDE8E2", color: "#6B7280", fontFamily: "var(--font-sans)" }}
                >
                  ← Retour
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-3 rounded-xl font-semibold text-lg"
                  style={{ backgroundColor: "#C8972A", color: "#0C2518", fontFamily: "var(--font-sans)", minHeight: "48px" }}
                >
                  Suivant — L&apos;envoi →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Delivery */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-semibold mb-8 text-center" style={{ color: "#0C2518", fontFamily: "var(--font-serif)" }}>
                Quand envoyer le cadeau ?
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2" style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}>
                  E-mail du destinataire
                </label>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="jean@email.com"
                  required
                  className="w-full px-4 py-3 rounded-xl outline-none"
                  style={{ border: "2px solid #DDE8E2", fontFamily: "var(--font-sans)", backgroundColor: "#FFFFFF", color: "#1C2B22" }}
                  onFocus={(e) => (e.target.style.borderColor = "#C8972A")}
                  onBlur={(e) => (e.target.style.borderColor = "#DDE8E2")}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                  onClick={() => setSendNow(true)}
                  className="flex-1 rounded-xl p-4 text-left transition-all"
                  style={{
                    backgroundColor: sendNow ? "#0C2518" : "#FFFFFF",
                    border: sendNow ? "2px solid #C8972A" : "1px solid #DDE8E2",
                    borderRadius: "8px",
                  }}
                >
                  <p className="font-semibold" style={{ color: sendNow ? "#FFFFFF" : "#0C2518", fontFamily: "var(--font-sans)" }}>
                    ⚡ Envoyer maintenant
                  </p>
                  <p className="text-xs mt-1" style={{ color: sendNow ? "#C8E6D4" : "#6B7280", fontFamily: "var(--font-sans)" }}>
                    Le destinataire reçoit l&apos;e-card immédiatement après le paiement
                  </p>
                </button>
                <button
                  onClick={() => setSendNow(false)}
                  className="flex-1 rounded-xl p-4 text-left transition-all"
                  style={{
                    backgroundColor: !sendNow ? "#0C2518" : "#FFFFFF",
                    border: !sendNow ? "2px solid #C8972A" : "1px solid #DDE8E2",
                    borderRadius: "8px",
                  }}
                >
                  <p className="font-semibold" style={{ color: !sendNow ? "#FFFFFF" : "#0C2518", fontFamily: "var(--font-sans)" }}>
                    📅 Programmer la date
                  </p>
                  <p className="text-xs mt-1" style={{ color: !sendNow ? "#C8E6D4" : "#6B7280", fontFamily: "var(--font-sans)" }}>
                    Idéal pour un anniversaire ou Noël
                  </p>
                </button>
              </div>

              {!sendNow && (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2" style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}>
                    Date d&apos;envoi souhaitée
                  </label>
                  <input
                    type="date"
                    value={sendDate}
                    onChange={(e) => setSendDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 rounded-xl outline-none"
                    style={{ border: "2px solid #DDE8E2", fontFamily: "var(--font-sans)", backgroundColor: "#FFFFFF", color: "#1C2B22" }}
                    onFocus={(e) => (e.target.style.borderColor = "#C8972A")}
                    onBlur={(e) => (e.target.style.borderColor = "#DDE8E2")}
                  />
                </div>
              )}

              {/* Summary */}
              <div
                className="rounded-2xl p-6 mb-6"
                style={{ backgroundColor: "#F8F4EE", border: "1px solid #DDE8E2", borderRadius: "8px" }}
              >
                <p className="text-sm font-semibold mb-3" style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}>
                  Récapitulatif de ton cadeau
                </p>
                <div className="space-y-2">
                  {[
                    { label: "Pack", value: `${pack.emoji} ${pack.name} — ${pack.price}€` },
                    { label: "Pour", value: recipientName || "—" },
                    { label: "E-mail destinataire", value: recipientEmail || "—" },
                    { label: "Envoi", value: sendNow ? "Immédiat" : sendDate || "Date non définie" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between text-sm">
                      <span style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}>{label}</span>
                      <span style={{ color: "#0C2518", fontFamily: "var(--font-sans)", fontWeight: 500 }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl font-medium border"
                  style={{ borderColor: "#DDE8E2", color: "#6B7280", fontFamily: "var(--font-sans)" }}
                >
                  ← Retour
                </button>
                <button
                  onClick={handleCheckout}
                  disabled={loading || !recipientEmail}
                  className="flex-1 py-3 rounded-xl font-semibold text-lg"
                  style={{
                    backgroundColor: loading || !recipientEmail ? "#6B7280" : "#C8972A",
                    color: "#0C2518",
                    fontFamily: "var(--font-sans)",
                    minHeight: "48px",
                    cursor: loading || !recipientEmail ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? "Redirection..." : `Payer ${pack.price}€ et envoyer le cadeau`}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
