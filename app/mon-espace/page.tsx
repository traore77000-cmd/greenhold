"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

// ─── Correspondances pack → arbre & revenu ────────────────────
const TYPE_ARBRE: Record<string, string> = {
  decouverte: "Papayer",
  famille: "Goyavier",
  investisseur: "Manguier",
  heritage: "Palmier",
};
const REVENU_PAR_PACK: Record<string, number> = {
  decouverte: 30,
  famille: 60,
  investisseur: 150,
  heritage: 300,
};

// ─── Types ────────────────────────────────────────────────────
interface Part {
  id: string;
  pack_id: string;
  nombre_parts: number;
  cert_number: string;
  date_achat: string;
}
interface Utilisateur {
  id: string;
  full_name: string;
  email: string;
  referral_code: string;
  created_at: string;
}

export default function MonEspace() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [utilisateur, setUtilisateur] = useState<Utilisateur | null>(null);
  const [parts, setParts] = useState<Part[]>([]);
  const [totalActionnaires, setTotalActionnaires] = useState(0);
  const [lienParrainage, setLienParrainage] = useState("");
  const [copieLien, setCopieLien] = useState(false);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    const chargerDonnees = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.push("/connexion"); return; }

      const { data: user } = await supabase
        .from("utilisateurs")
        .select("id, full_name, email, referral_code, created_at")
        .eq("id", session.user.id)
        .single();

      if (user) {
        setUtilisateur(user);
        const code = user.referral_code ?? session.user.id;
        setLienParrainage(`${window.location.origin}?parrain=${code}`);
      }

      const { data: partsData } = await supabase
        .from("parts")
        .select("id, pack_id, nombre_parts, cert_number, date_achat")
        .or(`user_id.eq.${session.user.id},buyer_email.eq.${session.user.email}`)
        .eq("statut", "confirmé")
        .order("date_achat", { ascending: true });

      if (partsData) setParts(partsData);

      const { count } = await supabase
        .from("utilisateurs")
        .select("*", { count: "exact", head: true });
      if (count) setTotalActionnaires(count);

      setChargement(false);
    };
    chargerDonnees();
  }, []);

  // Revenus estimés : somme par pack × nombre_parts
  const totalRevenus = parts.reduce(
    (sum, p) => sum + (REVENU_PAR_PACK[p.pack_id] ?? 30) * (p.nombre_parts ?? 1),
    0
  );

  const copierLien = () => {
    navigator.clipboard.writeText(lienParrainage);
    setCopieLien(true);
    setTimeout(() => setCopieLien(false), 2500);
  };

  const telechargerCertificat = (part: Part) => {
    window.open(`/api/certificat?numero=${part.cert_number}`, "_blank");
  };

  const progressionPct = Math.min(Math.round((totalActionnaires / 200) * 100), 100);

  // Prénom affiché : premier mot du full_name
  const prenom = utilisateur?.full_name?.split(" ")[0] ?? "";

  if (chargement) {
    return (
      <div style={styles.loading}>
        <div style={styles.loadingSpinner} />
        <p style={styles.loadingText}>Chargement de votre espace…</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <span style={styles.logo}>🌿 GREENHOLD</span>
        <span style={styles.badge}>Mon espace</span>
      </header>

      <main style={styles.main}>
        {/* Bienvenue */}
        <section style={styles.bienvenue}>
          <h1 style={styles.bienvenueTitle}>Bonjour {prenom} 👋</h1>
          <p style={styles.bienvenueSub}>
            Actionnaire GREENHOLD depuis le{" "}
            <strong>
              {utilisateur
                ? new Date(utilisateur.created_at).toLocaleDateString("fr-FR", {
                    day: "numeric", month: "long", year: "numeric",
                  })
                : "—"}
            </strong>
          </p>
        </section>

        {/* Mes arbres */}
        <section style={styles.card}>
          <h2 style={styles.cardTitle}>🌳 Mes arbres</h2>
          <div style={styles.treeSummary}>
            <span style={styles.treeCount}>
              {parts.reduce((s, p) => s + (p.nombre_parts ?? 1), 0)}
            </span>
            <span style={styles.treeLabel}>
              {parts.reduce((s, p) => s + (p.nombre_parts ?? 1), 0) <= 1
                ? "arbre vous appartient"
                : "arbres vous appartiennent"}
            </span>
          </div>

          {parts.length === 0 ? (
            <p style={styles.emptyText}>
              Vous n'avez pas encore d'arbres.{" "}
              <a href="/boutique" style={styles.link}>Découvrir les packs →</a>
            </p>
          ) : (
            <div style={styles.treeList}>
              {parts.map((part) => {
                const typeArbre = TYPE_ARBRE[part.pack_id] ?? part.pack_id;
                return (
                  <div key={part.id} style={styles.treeItem}>
                    <div style={styles.treeInfo}>
                      <span style={styles.treeEmoji}>
                        {part.pack_id === "decouverte" ? "🍈" : "🍏"}
                      </span>
                      <div>
                        <p style={styles.treeName}>
                          {typeArbre}
                          {part.nombre_parts > 1 && (
                            <span style={styles.treeBadge}> ×{part.nombre_parts}</span>
                          )}
                        </p>
                        <p style={styles.treeCert}>Certificat n° {part.cert_number}</p>
                      </div>
                    </div>
                    <button style={styles.btnCert} onClick={() => telechargerCertificat(part)}>
                      📄 Mon certificat
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Revenus */}
        <section style={styles.card}>
          <h2 style={styles.cardTitle}>💰 Mes revenus estimés</h2>
          <div style={styles.revenusBloc}>
            <span style={styles.revenusAmount}>~{totalRevenus}€</span>
            <span style={styles.revenusLabel}>par an</span>
          </div>
          <p style={styles.revenusExplication}>
            Les fruits de vos arbres sont vendus localement au Sénégal.
            Vous recevrez vos revenus chaque année pendant 40 ans. 🌍
          </p>
        </section>

        {/* Progression forêt */}
        <section style={styles.card}>
          <h2 style={styles.cardTitle}>🌿 La forêt grandit</h2>
          <div style={styles.progressContainer}>
            <div style={styles.progressHeader}>
              <span style={styles.progressText}><strong>{totalActionnaires}</strong> actionnaires</span>
              <span style={styles.progressGoal}>Objectif : 200</span>
            </div>
            <div style={styles.progressBar}>
              <div style={{ ...styles.progressFill, width: `${progressionPct}%` }} />
            </div>
            <p style={styles.progressPct}>{progressionPct}% atteint</p>
          </div>
          <p style={styles.progressMessage}>
            Plus on est nombreux, plus la forêt grandit ! Partagez et faites grossir la communauté. 💪
          </p>
        </section>

        {/* Parrainage */}
        <section style={{ ...styles.card, ...styles.cardParrainage }}>
          <h2 style={{ ...styles.cardTitle, color: "#fff" }}>🎁 Invitez un ami</h2>
          <p style={styles.parrainageText}>
            Parrainez un ami et recevez <strong>1 arbre offert</strong> dès son premier achat !
          </p>
          <button style={copieLien ? styles.btnCopied : styles.btnCopier} onClick={copierLien}>
            {copieLien ? "✅ Lien copié !" : "📋 Copier mon lien de parrainage"}
          </button>
        </section>
      </main>

      <footer style={styles.footer}>
        <p>Une question ? <a href="mailto:contact@greenhold.fr" style={styles.link}>contact@greenhold.fr</a></p>
      </footer>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────
const VERT = "#2C5F2D";
const OR = "#C9A84C";
const VERT_CLAIR = "#f0f7f0";
const GRIS = "#555";

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", backgroundColor: VERT_CLAIR, fontFamily: "'Georgia', serif", color: "#222" },
  header: { backgroundColor: VERT, padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  logo: { color: "#fff", fontSize: "22px", fontWeight: "bold", letterSpacing: "1px" },
  badge: { backgroundColor: OR, color: "#fff", padding: "4px 14px", borderRadius: "20px", fontSize: "14px", fontWeight: "bold" },
  main: { maxWidth: "640px", margin: "0 auto", padding: "24px 16px 40px", display: "flex", flexDirection: "column", gap: "20px" },
  bienvenue: { backgroundColor: "#fff", borderRadius: "16px", padding: "28px 24px", borderLeft: `6px solid ${VERT}`, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
  bienvenueTitle: { fontSize: "28px", fontWeight: "bold", margin: "0 0 8px", color: VERT },
  bienvenueSub: { fontSize: "16px", color: GRIS, margin: 0 },
  card: { backgroundColor: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
  cardTitle: { fontSize: "20px", fontWeight: "bold", margin: "0 0 16px", color: VERT },
  treeSummary: { display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "20px" },
  treeCount: { fontSize: "56px", fontWeight: "bold", color: VERT, lineHeight: 1 },
  treeLabel: { fontSize: "18px", color: GRIS },
  treeList: { display: "flex", flexDirection: "column", gap: "12px" },
  treeItem: { display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: VERT_CLAIR, borderRadius: "12px", padding: "14px 16px", flexWrap: "wrap", gap: "10px" },
  treeInfo: { display: "flex", alignItems: "center", gap: "14px" },
  treeEmoji: { fontSize: "32px" },
  treeName: { fontSize: "17px", fontWeight: "bold", margin: 0 },
  treeBadge: { fontSize: "14px", color: GRIS, fontWeight: "normal" },
  treeCert: { fontSize: "13px", color: GRIS, margin: "2px 0 0" },
  btnCert: { backgroundColor: VERT, color: "#fff", border: "none", borderRadius: "8px", padding: "10px 16px", fontSize: "14px", fontWeight: "bold", cursor: "pointer" },
  emptyText: { color: GRIS, fontSize: "16px", margin: 0 },
  revenusBloc: { display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "12px" },
  revenusAmount: { fontSize: "52px", fontWeight: "bold", color: OR, lineHeight: 1 },
  revenusLabel: { fontSize: "18px", color: GRIS },
  revenusExplication: { fontSize: "15px", color: GRIS, lineHeight: "1.6", margin: 0, backgroundColor: VERT_CLAIR, padding: "14px", borderRadius: "10px" },
  progressContainer: { marginBottom: "14px" },
  progressHeader: { display: "flex", justifyContent: "space-between", marginBottom: "8px" },
  progressText: { fontSize: "16px", color: "#222" },
  progressGoal: { fontSize: "14px", color: GRIS },
  progressBar: { height: "18px", backgroundColor: "#dce9dc", borderRadius: "10px", overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: VERT, borderRadius: "10px", transition: "width 1s ease" },
  progressPct: { fontSize: "13px", color: GRIS, textAlign: "right", margin: "6px 0 0" },
  progressMessage: { fontSize: "15px", color: GRIS, margin: 0, lineHeight: "1.6" },
  cardParrainage: { backgroundColor: VERT },
  parrainageText: { color: "#d4edd4", fontSize: "16px", lineHeight: "1.6", margin: "0 0 18px" },
  btnCopier: { width: "100%", backgroundColor: OR, color: "#fff", border: "none", borderRadius: "12px", padding: "16px", fontSize: "17px", fontWeight: "bold", cursor: "pointer" },
  btnCopied: { width: "100%", backgroundColor: "#4caf50", color: "#fff", border: "none", borderRadius: "12px", padding: "16px", fontSize: "17px", fontWeight: "bold", cursor: "default" },
  loading: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: VERT_CLAIR, gap: "16px" },
  loadingSpinner: { width: "48px", height: "48px", border: "5px solid #d0e6d0", borderTop: `5px solid ${VERT}`, borderRadius: "50%", animation: "spin 0.8s linear infinite" },
  loadingText: { color: GRIS, fontSize: "16px" },
  link: { color: VERT, textDecoration: "underline" },
  footer: { textAlign: "center", padding: "20px", color: GRIS, fontSize: "14px" },
};
