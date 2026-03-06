"use client";

import { useEffect, useRef, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const MOT_DE_PASSE = "foret2026";
const STORAGE_KEY = "terrain_auth";

type Etape = "auth" | "formulaire" | "succes";

export default function TerrainUpload() {
  const supabase = createClientComponentClient();
  const [etape, setEtape] = useState<Etape>("auth");
  const [mdp, setMdp] = useState("");
  const [erreurMdp, setErreurMdp] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const [erreurEnvoi, setErreurEnvoi] = useState("");
  const inputCameraRef = useRef<HTMLInputElement>(null);
  const inputGalerieRef = useRef<HTMLInputElement>(null);

  // Vérifier si déjà authentifié
  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "ok") {
      setEtape("formulaire");
    }
  }, []);

  const connexion = () => {
    if (mdp === MOT_DE_PASSE) {
      localStorage.setItem(STORAGE_KEY, "ok");
      setEtape("formulaire");
    } else {
      setErreurMdp(true);
      setTimeout(() => setErreurMdp(false), 2000);
    }
  };

  const choisirPhoto = (fichier: File) => {
    setPhoto(fichier);
    const url = URL.createObjectURL(fichier);
    setPreview(url);
    setErreurEnvoi("");
  };

  const envoyerPhoto = async () => {
    if (!photo) return;
    setEnvoi(true);
    setErreurEnvoi("");

    try {
      // Nom de fichier unique
      const ext = photo.name.split(".").pop() ?? "jpg";
      const nomFichier = `photo_${Date.now()}.${ext}`;

      // Upload dans Storage
      const { error: uploadError } = await supabase.storage
        .from("terrain-photos")
        .upload(nomFichier, photo, { contentType: photo.type, upsert: false });

      if (uploadError) throw new Error(uploadError.message);

      // URL publique
      const { data: urlData } = supabase.storage
        .from("terrain-photos")
        .getPublicUrl(nomFichier);

      const photoUrl = urlData.publicUrl;

      // Insertion dans la table
      const { error: insertError } = await supabase
        .from("updates_terrain")
        .insert({ photo_url: photoUrl, message: message.trim() || null });

      if (insertError) throw new Error(insertError.message);

      // Succès
      setEtape("succes");
    } catch (err: unknown) {
      setErreurEnvoi(
        err instanceof Error ? err.message : "Erreur lors de l'envoi."
      );
    } finally {
      setEnvoi(false);
    }
  };

  const recommencer = () => {
    setPhoto(null);
    setPreview(null);
    setMessage("");
    setErreurEnvoi("");
    setEtape("formulaire");
  };

  // ── Écran mot de passe ─────────────────────────────────────
  if (etape === "auth") {
    return (
      <div style={s.page}>
        <p style={s.logo}>🌿 GREENHOLD</p>
        <div style={s.authCard}>
          <p style={s.titre}>Espace terrain</p>
          <p style={s.sousTitre}>Entre le mot de passe pour accéder</p>
          <input
            type="password"
            value={mdp}
            onChange={(e) => setMdp(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && connexion()}
            placeholder="Mot de passe"
            style={{
              ...s.input,
              borderColor: erreurMdp ? "#ef4444" : "#2A7A4F",
            }}
            autoComplete="current-password"
          />
          {erreurMdp && (
            <p style={{ color: "#ef4444", fontSize: 16, marginTop: 8 }}>
              Mot de passe incorrect
            </p>
          )}
          <button style={s.btnPrincipal} onClick={connexion}>
            Entrer
          </button>
        </div>
      </div>
    );
  }

  // ── Écran succès ───────────────────────────────────────────
  if (etape === "succes") {
    return (
      <div style={s.page}>
        <p style={s.logo}>🌿 GREENHOLD</p>
        <div style={s.authCard}>
          <p style={{ fontSize: 64, margin: "0 0 16px" }}>📸</p>
          <p style={{ ...s.titre, color: "#4ade80" }}>Photo envoyée !</p>
          <p style={s.sousTitre}>
            Merci ! Les actionnaires vont adorer voir la forêt.
          </p>
          <button style={s.btnPrincipal} onClick={recommencer}>
            Envoyer une autre photo
          </button>
        </div>
      </div>
    );
  }

  // ── Formulaire principal ───────────────────────────────────
  return (
    <div style={s.page}>
      <p style={s.logo}>🌿 GREENHOLD</p>
      <p style={s.titre}>Photo de la forêt</p>
      <p style={s.sousTitre}>
        Prends une photo et envoie-la aux actionnaires 🌍
      </p>

      {/* Inputs fichier cachés */}
      <input
        ref={inputCameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: "none" }}
        onChange={(e) => e.target.files?.[0] && choisirPhoto(e.target.files[0])}
      />
      <input
        ref={inputGalerieRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => e.target.files?.[0] && choisirPhoto(e.target.files[0])}
      />

      {/* Boutons choix photo */}
      {!preview && (
        <div style={s.choixBtns}>
          <button
            style={s.btnChoix}
            onClick={() => inputCameraRef.current?.click()}
          >
            📸 Prendre une photo
          </button>
          <button
            style={{ ...s.btnChoix, backgroundColor: "#1A4D35" }}
            onClick={() => inputGalerieRef.current?.click()}
          >
            🖼️ Choisir dans la galerie
          </button>
        </div>
      )}

      {/* Prévisualisation */}
      {preview && (
        <div style={s.previewContainer}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Prévisualisation" style={s.previewImg} />
          <button
            style={s.btnChanger}
            onClick={() => inputGalerieRef.current?.click()}
          >
            Changer la photo
          </button>
        </div>
      )}

      {/* Message optionnel */}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Un message ? ex: Les goyaviers poussent bien !"
        style={s.textarea}
        rows={3}
        maxLength={300}
      />

      {/* Erreur */}
      {erreurEnvoi && (
        <p style={{ color: "#ef4444", fontSize: 16, margin: "8px 0" }}>
          ❌ {erreurEnvoi}
        </p>
      )}

      {/* Bouton envoi */}
      <button
        style={{
          ...s.btnPrincipal,
          backgroundColor: !photo || envoi ? "#6B7280" : "#16a34a",
          cursor: !photo || envoi ? "not-allowed" : "pointer",
        }}
        onClick={envoyerPhoto}
        disabled={!photo || envoi}
      >
        {envoi ? "Envoi en cours…" : "✅ Envoyer la photo"}
      </button>

      <p style={s.footer}>
        Connexion lente ? La photo peut prendre quelques secondes.
      </p>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────
const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#2C5F2D",
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "32px 20px 60px",
    fontFamily: "system-ui, sans-serif",
    boxSizing: "border-box",
  },
  logo: {
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 2,
    margin: "0 0 32px",
  },
  authCard: {
    width: "100%",
    maxWidth: 440,
    backgroundColor: "#1A4D35",
    borderRadius: 20,
    padding: "32px 24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
  },
  titre: {
    fontSize: 28,
    fontWeight: "bold",
    margin: 0,
    textAlign: "center",
  },
  sousTitre: {
    fontSize: 18,
    color: "#C8E6D4",
    margin: 0,
    textAlign: "center",
    lineHeight: 1.5,
  },
  input: {
    width: "100%",
    padding: "16px 18px",
    borderRadius: 12,
    border: "2px solid #2A7A4F",
    backgroundColor: "#0C2518",
    color: "#fff",
    fontSize: 18,
    outline: "none",
    boxSizing: "border-box",
  },
  btnPrincipal: {
    width: "100%",
    minHeight: 64,
    backgroundColor: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: 14,
    fontSize: 20,
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: 8,
  },
  choixBtns: {
    width: "100%",
    maxWidth: 440,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    marginBottom: 24,
  },
  btnChoix: {
    width: "100%",
    minHeight: 70,
    backgroundColor: "#0C2518",
    color: "#fff",
    border: "2px solid #4ade80",
    borderRadius: 14,
    fontSize: 20,
    fontWeight: "bold",
    cursor: "pointer",
  },
  previewContainer: {
    width: "100%",
    maxWidth: 440,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginBottom: 20,
  },
  previewImg: {
    width: "100%",
    maxHeight: 400,
    objectFit: "cover",
    borderRadius: 14,
    border: "3px solid #4ade80",
  },
  btnChanger: {
    backgroundColor: "transparent",
    color: "#C8E6D4",
    border: "1px solid #4ade80",
    borderRadius: 10,
    padding: "10px 20px",
    fontSize: 16,
    cursor: "pointer",
    alignSelf: "center",
  },
  textarea: {
    width: "100%",
    maxWidth: 440,
    padding: "14px 16px",
    borderRadius: 12,
    border: "2px solid #2A7A4F",
    backgroundColor: "#1A4D35",
    color: "#fff",
    fontSize: 18,
    outline: "none",
    resize: "vertical",
    marginBottom: 16,
    boxSizing: "border-box",
    fontFamily: "system-ui, sans-serif",
  },
  footer: {
    marginTop: 24,
    fontSize: 14,
    color: "#C8E6D4",
    textAlign: "center",
  },
};
