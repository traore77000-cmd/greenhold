"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

// ─── Identifiants cousins ────────────────────────────────────────
const COMPTES: Record<string, string> = {
  cousin1: "greenhold2026",
  cousin2: "foret2026",
  cousin3: "niayes2026",
  cousin4: "senegal2026",
  cousin5: "arbres2026",
};
const STORAGE_KEY = "terrain_auth_v2";

type Etape = "auth" | "liste" | "detail" | "succes";

interface Demande {
  id: string;
  created_at: string;
  email: string;
  type_arbre: string;
  actionnaire_id: string | null;
}

// ─── Styles partagés ─────────────────────────────────────────────
const S = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#2C5F2D",
    color: "white",
    fontFamily: "system-ui, -apple-system, sans-serif",
    padding: "24px 16px",
    fontSize: 18,
  } as React.CSSProperties,

  card: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: "20px",
    marginBottom: 16,
  } as React.CSSProperties,

  input: {
    width: "100%",
    padding: "16px",
    borderRadius: 12,
    border: "2px solid rgba(255,255,255,0.3)",
    backgroundColor: "rgba(255,255,255,0.15)",
    color: "white",
    fontSize: 18,
    outline: "none",
    boxSizing: "border-box",
  } as React.CSSProperties,

  btnPrimary: {
    width: "100%",
    padding: "20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: 14,
    fontSize: 20,
    fontWeight: "bold",
    cursor: "pointer",
    minHeight: 60,
  } as React.CSSProperties,

  btnSecondary: {
    width: "100%",
    padding: "18px",
    backgroundColor: "rgba(255,255,255,0.15)",
    color: "white",
    border: "2px solid rgba(255,255,255,0.4)",
    borderRadius: 14,
    fontSize: 18,
    cursor: "pointer",
    minHeight: 60,
  } as React.CSSProperties,
};

// ─── Composant principal ─────────────────────────────────────────
export default function TerrainUpload() {
  const [etape, setEtape] = useState<Etape>("auth");
  const [identifiant, setIdentifiant] = useState("");
  const [mdp, setMdp] = useState("");
  const [erreurAuth, setErreurAuth] = useState(false);

  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [loadingDemandes, setLoadingDemandes] = useState(false);
  const [demandeSelectionnee, setDemandeSelectionnee] =
    useState<Demande | null>(null);

  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const [erreurEnvoi, setErreurEnvoi] = useState("");

  const inputCameraRef = useRef<HTMLInputElement>(null);
  const inputGalerieRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "ok") {
      setEtape("liste");
      chargerDemandes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connexion = () => {
    if (COMPTES[identifiant.trim()] === mdp) {
      localStorage.setItem(STORAGE_KEY, "ok");
      setEtape("liste");
      chargerDemandes();
    } else {
      setErreurAuth(true);
      setTimeout(() => setErreurAuth(false), 2500);
    }
  };

  const chargerDemandes = async () => {
    setLoadingDemandes(true);
    try {
      const res = await fetch("/api/plantation");
      const data = await res.json();
      setDemandes(Array.isArray(data) ? data : []);
    } catch {
      setDemandes([]);
    }
    setLoadingDemandes(false);
  };

  const choisirPhoto = (fichier: File) => {
    setPhoto(fichier);
    setPreview(URL.createObjectURL(fichier));
    setErreurEnvoi("");
  };

  const validerPlantation = async () => {
    if (!photo || !demandeSelectionnee) return;
    setEnvoi(true);
    setErreurEnvoi("");

    // 1. Upload photo dans Supabase Storage
    const ext = photo.name.split(".").pop() ?? "jpg";
    const fileName = `${demandeSelectionnee.id}-${Date.now()}.${ext}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("terrain-photos")
      .upload(fileName, photo, { contentType: photo.type, upsert: false });

    if (uploadError || !uploadData) {
      setErreurEnvoi(
        "Erreur upload : " + (uploadError?.message ?? "inconnue")
      );
      setEnvoi(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("terrain-photos")
      .getPublicUrl(uploadData.path);

    // 2. Mettre à jour la demande + insérer dans updates_terrain
    const res = await fetch("/api/plantation", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: demandeSelectionnee.id,
        photo_url: urlData.publicUrl,
        actionnaire_id: demandeSelectionnee.actionnaire_id,
        message: message.trim() || null,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      setErreurEnvoi("Erreur : " + (err.error ?? "inconnue"));
      setEnvoi(false);
      return;
    }

    setEtape("succes");
    setEnvoi(false);
  };

  const retourListe = () => {
    setDemandeSelectionnee(null);
    setPhoto(null);
    setPreview(null);
    setMessage("");
    setErreurEnvoi("");
    setEtape("liste");
    chargerDemandes();
  };

  // ─── ÉCRAN CONNEXION ───────────────────────────────────────────
  if (etape === "auth") {
    return (
      <div style={S.page}>
        <div style={{ maxWidth: 480, margin: "0 auto", paddingTop: 48 }}>
          <p style={{ textAlign: "center", fontSize: 48, margin: "0 0 8px" }}>
            🌿
          </p>
          <h1 style={{ textAlign: "center", fontSize: 26, margin: "0 0 6px" }}>
            GREENHOLD
          </h1>
          <p
            style={{
              textAlign: "center",
              color: "#A5D6A7",
              margin: "0 0 40px",
              fontSize: 16,
            }}
          >
            Espace terrain — équipe Sénégal
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: 8,
                  color: "#C8E6D4",
                  fontSize: 16,
                }}
              >
                Identifiant
              </label>
              <input
                style={S.input}
                placeholder="cousin1"
                value={identifiant}
                onChange={(e) => setIdentifiant(e.target.value)}
                autoCapitalize="none"
                autoCorrect="off"
                autoComplete="username"
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: 8,
                  color: "#C8E6D4",
                  fontSize: 16,
                }}
              >
                Mot de passe
              </label>
              <input
                style={S.input}
                type="password"
                placeholder="••••••••"
                value={mdp}
                onChange={(e) => setMdp(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && connexion()}
                autoComplete="current-password"
              />
            </div>

            {erreurAuth && (
              <p style={{ color: "#FF8A80", textAlign: "center", margin: 0 }}>
                ❌ Identifiants incorrects
              </p>
            )}

            <button style={S.btnPrimary} onClick={connexion}>
              Connexion →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── LISTE DES DEMANDES ────────────────────────────────────────
  if (etape === "liste") {
    return (
      <div style={S.page}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 24,
              gap: 12,
            }}
          >
            <div>
              <h1 style={{ fontSize: 22, margin: "0 0 4px" }}>
                🌱 Arbres à planter
                {!loadingDemandes && (
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: "normal",
                      color: "#A5D6A7",
                      marginLeft: 8,
                    }}
                  >
                    ({demandes.length} en attente)
                  </span>
                )}
              </h1>
              <p style={{ color: "#C8E6D4", margin: 0, fontSize: 15 }}>
                Clique sur une demande pour planter l&apos;arbre
              </p>
            </div>
            <button
              style={{
                background: "none",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#C8E6D4",
                fontSize: 14,
                cursor: "pointer",
                borderRadius: 8,
                padding: "8px 14px",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
              onClick={() => {
                localStorage.removeItem(STORAGE_KEY);
                setEtape("auth");
              }}
            >
              Déconnexion
            </button>
          </div>

          {loadingDemandes ? (
            <p
              style={{
                color: "#C8E6D4",
                textAlign: "center",
                padding: "40px 0",
              }}
            >
              Chargement…
            </p>
          ) : demandes.length === 0 ? (
            <div
              style={{ ...S.card, textAlign: "center", padding: "48px 24px" }}
            >
              <p style={{ fontSize: 56, margin: "0 0 16px" }}>✅</p>
              <p
                style={{ fontSize: 20, fontWeight: "bold", margin: "0 0 10px" }}
              >
                Bravo ! Tous les arbres sont plantés !
              </p>
              <p style={{ color: "#A5D6A7", margin: 0, fontSize: 16 }}>
                Aucune demande en attente pour le moment.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {demandes.map((d) => (
                <button
                  key={d.id}
                  onClick={() => {
                    setDemandeSelectionnee(d);
                    setEtape("detail");
                  }}
                  style={{
                    ...S.card,
                    marginBottom: 0,
                    textAlign: "left",
                    cursor: "pointer",
                    border: "2px solid rgba(255,255,255,0.2)",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        margin: "0 0 6px",
                        fontWeight: "bold",
                        fontSize: 16,
                        wordBreak: "break-all",
                      }}
                    >
                      📧 {d.email}
                    </p>
                    <p
                      style={{
                        margin: "0 0 4px",
                        color: "#C8E6D4",
                        fontSize: 15,
                      }}
                    >
                      🌳 {d.type_arbre}
                    </p>
                    <p style={{ margin: 0, color: "#A5D6A7", fontSize: 13 }}>
                      📅{" "}
                      {new Date(d.created_at).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>📸 →</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── DÉTAIL — PLANTER UN ARBRE ─────────────────────────────────
  if (etape === "detail" && demandeSelectionnee) {
    return (
      <div style={S.page}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <button
            onClick={retourListe}
            style={{
              background: "none",
              border: "none",
              color: "#A5D6A7",
              fontSize: 18,
              cursor: "pointer",
              padding: "0 0 20px",
            }}
          >
            ← Retour à la liste
          </button>

          <h1 style={{ fontSize: 22, margin: "0 0 20px" }}>
            📸 Planter cet arbre
          </h1>

          {/* Infos actionnaire */}
          <div style={S.card}>
            <p style={{ margin: "0 0 12px", fontSize: 16 }}>
              <span style={{ color: "#A5D6A7" }}>📧 Actionnaire</span>
              <br />
              <strong style={{ fontSize: 18, wordBreak: "break-all" }}>
                {demandeSelectionnee.email}
              </strong>
            </p>
            <p style={{ margin: 0, fontSize: 16 }}>
              <span style={{ color: "#A5D6A7" }}>🌳 Arbre à planter</span>
              <br />
              <strong style={{ fontSize: 17 }}>
                {demandeSelectionnee.type_arbre}
              </strong>
            </p>
          </div>

          {/* Inputs fichier cachés */}
          <input
            ref={inputCameraRef}
            type="file"
            accept="image/*"
            capture="environment"
            style={{ display: "none" }}
            onChange={(e) =>
              e.target.files?.[0] && choisirPhoto(e.target.files[0])
            }
          />
          <input
            ref={inputGalerieRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) =>
              e.target.files?.[0] && choisirPhoto(e.target.files[0])
            }
          />

          {/* Boutons photo */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginBottom: 16,
            }}
          >
            <button
              style={S.btnPrimary}
              onClick={() => inputCameraRef.current?.click()}
            >
              📸 Prendre une photo
            </button>
            <button
              style={S.btnSecondary}
              onClick={() => inputGalerieRef.current?.click()}
            >
              🖼️ Choisir dans la galerie
            </button>
          </div>

          {/* Prévisualisation */}
          {preview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="Aperçu photo"
              style={{
                width: "100%",
                borderRadius: 12,
                marginBottom: 16,
                maxHeight: 340,
                objectFit: "cover",
              }}
            />
          )}

          {/* Message optionnel */}
          <textarea
            style={{
              ...S.input,
              height: 100,
              resize: "vertical",
              marginBottom: 16,
            }}
            placeholder="💬 Message optionnel (ex : Les goyaviers poussent bien !)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {erreurEnvoi && (
            <p style={{ color: "#FF8A80", marginBottom: 12 }}>
              ❌ {erreurEnvoi}
            </p>
          )}

          {/* Bouton valider */}
          <button
            style={{
              ...S.btnPrimary,
              opacity: !photo || envoi ? 0.5 : 1,
              fontSize: 22,
              padding: "22px",
            }}
            onClick={validerPlantation}
            disabled={!photo || envoi}
          >
            {envoi ? "Envoi en cours…" : "✅ Valider la plantation"}
          </button>
        </div>
      </div>
    );
  }

  // ─── SUCCÈS ────────────────────────────────────────────────────
  if (etape === "succes") {
    return (
      <div
        style={{
          ...S.page,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 400 }}>
          <p style={{ fontSize: 80, margin: "0 0 16px" }}>🌳</p>
          <h1 style={{ fontSize: 28, margin: "0 0 12px" }}>Arbre planté !</h1>
          <p
            style={{
              color: "#C8E6D4",
              marginBottom: 40,
              fontSize: 18,
              lineHeight: 1.6,
            }}
          >
            Bravo ! La photo a bien été envoyée à l&apos;actionnaire.
          </p>
          <button
            style={{ ...S.btnPrimary, fontSize: 20 }}
            onClick={retourListe}
          >
            → Planter un autre arbre
          </button>
        </div>
      </div>
    );
  }

  return null;
}
