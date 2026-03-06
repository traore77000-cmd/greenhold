"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

// ─── Types ────────────────────────────────────────────────────────

type View = "login" | "signup" | "reset";
type Msg = { type: "success" | "error"; text: string };

interface PartRecord {
  id: string;
  pack_id: string | null;
  nombre_parts: number;
  montant: number | null;
  date_achat: string | null;
  statut: string;
  cert_number: string | null;
  session_id: string | null;
  buyer_email: string | null;
}

interface TerrainPhoto {
  id: string;
  created_at: string;
  photo_url: string;
  message: string | null;
}

const PACK_LABELS: Record<string, string> = {
  decouverte: "Pack Découverte",
  famille: "Pack Famille",
  investisseur: "Pack Investisseur",
  heritage: "Pack Héritage Senior",
};

const REINVESTMENT_OPTIONS = [
  {
    id: "total",
    label: "Réinvestissement total (100%)",
    desc: "Toutes tes distributions sont automatiquement réinvesties pour acquérir de nouvelles parts.",
    icon: "🔄",
  },
  {
    id: "partiel",
    label: "Réinvestissement partiel (50%)",
    desc: "La moitié est réinvestie automatiquement, l'autre moitié est virée sur ton compte.",
    icon: "⚖️",
  },
  {
    id: "versement",
    label: "Versement total (100%)",
    desc: "Toutes tes distributions te sont virées directement sur ton compte bancaire.",
    icon: "💳",
  },
  {
    id: "annuel",
    label: "Décision annuelle",
    desc: "Tu reçois ton rapport annuel et décides chaque année comment utiliser tes revenus.",
    icon: "📅",
  },
] as const;

// ─── Ambassador level helper ──────────────────────────────────────

function getLevel(parts: number) {
  if (parts >= 50)
    return {
      label: "Ambassadeur",
      emoji: "🌴",
      color: "#C8972A",
      reduction: "15%",
      nextLabel: null,
      nextAt: null,
    };
  if (parts >= 15)
    return {
      label: "Forestier",
      emoji: "🌳",
      color: "#C8972A",
      reduction: "10%",
      nextLabel: "Ambassadeur",
      nextAt: 50,
    };
  if (parts >= 5)
    return {
      label: "Cultivateur",
      emoji: "🌿",
      color: "#2A7A4F",
      reduction: "5%",
      nextLabel: "Forestier",
      nextAt: 15,
    };
  return {
    label: "Planteur",
    emoji: "🌱",
    color: "#6B7280",
    reduction: null,
    nextLabel: "Cultivateur",
    nextAt: 5,
  };
}

// ─── Shared input style ───────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "10px",
  border: "2px solid #DDE8E2",
  backgroundColor: "#FFFFFF",
  color: "#1C2B22",
  fontFamily: "var(--font-sans)",
  fontSize: "0.95rem",
  outline: "none",
};

// ─── Dashboard: authenticated view ───────────────────────────────

function Dashboard({ user, onSignOut }: { user: User; onSignOut: () => void }) {
  const [parts, setParts] = useState<PartRecord[]>([]);
  const [totalParts, setTotalParts] = useState<number | null>(null);
  const [loadingParts, setLoadingParts] = useState(true);
  const [copyDone, setCopyDone] = useState(false);
  const [reinvestOption, setReinvestOption] = useState<string>(
    (user.user_metadata?.reinvestment as string) ?? "annuel"
  );
  const [savingReinvest, setSavingReinvest] = useState(false);
  const [reinvestSaved, setReinvestSaved] = useState(false);
  const [terrainPhotos, setTerrainPhotos] = useState<TerrainPhoto[]>([]);
  const [loadingTerrain, setLoadingTerrain] = useState(true);
  const [photoPleinEcran, setPhotoPleinEcran] = useState<string | null>(null);

  useEffect(() => {
    async function fetchParts() {
      const { data } = await supabase
        .from("parts")
        .select("id, pack_id, nombre_parts, montant, date_achat, statut, cert_number, session_id, buyer_email")
        .or(`user_id.eq.${user.id},buyer_email.eq.${user.email}`)
        .order("date_achat", { ascending: false });

      if (data) {
        const rows = data as PartRecord[];
        setParts(rows);
        const confirmed = rows
          .filter((r) => r.statut === "confirmé")
          .reduce((sum, r) => sum + r.nombre_parts, 0);
        setTotalParts(confirmed);
      }
      setLoadingParts(false);
    }

    async function fetchTerrain() {
      const { data } = await supabase
        .from("updates_terrain")
        .select("id, created_at, photo_url, message")
        .eq("statut", "visible")
        .order("created_at", { ascending: false });
      if (data) setTerrainPhotos(data as TerrainPhoto[]);
      setLoadingTerrain(false);
    }

    fetchParts();
    fetchTerrain();
  }, [user.id, user.email]);

  const level = getLevel(totalParts ?? 0);
  const referralLink = `https://greenhold.fr/boutique?ref=${user.id.slice(0, 8)}`;

  const an1 = (totalParts ?? 0) * 9.82;
  const an2 = (totalParts ?? 0) * 16.77;
  const an5 = (totalParts ?? 0) * 22.4;

  const copyReferral = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopyDone(true);
      setTimeout(() => setCopyDone(false), 2500);
    });
  };

  const saveReinvestOption = async () => {
    setSavingReinvest(true);
    await supabase.auth.updateUser({
      data: { reinvestment: reinvestOption },
    });
    setSavingReinvest(false);
    setReinvestSaved(true);
    setTimeout(() => setReinvestSaved(false), 3000);
  };

  const initials = (user.email ?? "?")
    .split("@")[0]
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="mx-auto px-4 py-10" style={{ maxWidth: "900px" }}>

      {/* Welcome bar */}
      <div
        className="rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ backgroundColor: "#0C2518" }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0"
            style={{
              backgroundColor: "#C8972A",
              color: "#0C2518",
              fontFamily: "var(--font-serif)",
            }}
          >
            {initials}
          </div>
          <div>
            <p
              className="text-xs mb-1"
              style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}
            >
              Bienvenue dans ta forêt
            </p>
            <p
              className="font-semibold text-white"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {user.email}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm">{level.emoji}</span>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: level.color,
                  color: "#0C2518",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {level.label}
              </span>
              {level.reduction && (
                <span
                  className="text-xs"
                  style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}
                >
                  {level.reduction} de réduction
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={onSignOut}
          className="text-xs px-4 py-2 rounded-lg transition-colors"
          style={{
            color: "#C8E6D4",
            border: "1px solid #2A7A4F",
            fontFamily: "var(--font-sans)",
            backgroundColor: "transparent",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#1A4D35")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          Se déconnecter
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          {
            icon: "🌳",
            label: "Parts détenues",
            value: loadingParts ? "..." : (totalParts ?? 0).toString(),
            sub: "parts confirmées",
          },
          {
            icon: "💰",
            label: "Revenu estimé an 1",
            value: loadingParts ? "..." : `${an1.toFixed(0)}€`,
            sub: "papayer actif (mois 9)",
          },
          {
            icon: "📅",
            label: "Premier virement",
            value: "Mois 9",
            sub: "papayer intercalaire",
          },
          {
            icon: level.emoji,
            label: "Niveau ambassadeur",
            value: level.label,
            sub: level.nextAt
              ? `Prochain : ${level.nextLabel} (${level.nextAt} parts)`
              : "Niveau maximum atteint",
          },
        ].map(({ icon, label, value, sub }) => (
          <div
            key={label}
            className="rounded-2xl p-5"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #DDE8E2",
              borderRadius: "8px",
            }}
          >
            <p className="text-2xl mb-2">{icon}</p>
            <p
              className="text-xs mb-1"
              style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
            >
              {label}
            </p>
            <p
              className="text-2xl font-bold"
              style={{ color: "#0C2518", fontFamily: "var(--font-serif)" }}
            >
              {value}
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
            >
              {sub}
            </p>
          </div>
        ))}
      </div>

      {/* Revenue projections */}
      {!loadingParts && (totalParts ?? 0) > 0 && (
        <div
          className="rounded-2xl p-6 mb-6"
          style={{ backgroundColor: "#0C2518", borderRadius: "8px" }}
        >
          <p
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "#C8972A", fontFamily: "var(--font-sans)" }}
          >
            Projections de revenus — {totalParts} part{(totalParts ?? 0) > 1 ? "s" : ""}
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "An 1", value: an1, sub: "Papayer actif (mois 9)" },
              { label: "An 2", value: an2, sub: "Goyaviers en production" },
              { label: "An 5", value: an5, sub: "Pleine production" },
            ].map(({ label, value, sub }) => (
              <div key={label} className="text-center">
                <p
                  className="text-xs mb-1"
                  style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}
                >
                  {label}
                </p>
                <p
                  className="text-3xl font-bold"
                  style={{ color: "#C8972A", fontFamily: "var(--font-serif)" }}
                >
                  {value.toFixed(0)}€
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}
                >
                  {sub}
                </p>
              </div>
            ))}
          </div>
          <p
            className="text-xs text-center mt-4 italic"
            style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}
          >
            Projections basées sur 9,82€/part an 1 — 16,77€ an 2 — 22,40€ an 5. Tes revenus viennent de toute la forêt.
          </p>
        </div>
      )}

      {/* Level progress */}
      {level.nextAt !== null && totalParts !== null && (
        <div
          className="rounded-2xl p-5 mb-6"
          style={{
            backgroundColor: "#F8F4EE",
            border: "1px solid #DDE8E2",
            borderRadius: "8px",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <p
              className="text-sm font-medium"
              style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}
            >
              Progression vers {level.nextLabel}{" "}
              {level.nextAt && `(${level.nextAt} parts)`}
            </p>
            <span
              className="text-sm font-bold"
              style={{ color: "#C8972A", fontFamily: "var(--font-serif)" }}
            >
              {totalParts} / {level.nextAt}
            </span>
          </div>
          <div
            className="w-full h-3 rounded-full"
            style={{ backgroundColor: "#DDE8E2" }}
          >
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${Math.min((totalParts / level.nextAt) * 100, 100)}%`,
                background: "linear-gradient(90deg, #1A4D35, #C8972A)",
              }}
            />
          </div>
          <p
            className="text-xs mt-2"
            style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
          >
            {level.nextAt - totalParts} parts supplémentaires pour atteindre{" "}
            {level.nextLabel} et débloquer{" "}
            {level.nextLabel === "Cultivateur"
              ? "5%"
              : level.nextLabel === "Forestier"
              ? "10%"
              : "15%"}{" "}
            de réduction sur tes futurs achats.
          </p>
        </div>
      )}

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link
          href="/boutique"
          className="rounded-2xl p-5 flex items-center gap-4 transition-all duration-200"
          style={{ backgroundColor: "#0C2518", borderRadius: "8px" }}
        >
          <span className="text-3xl">🌱</span>
          <div>
            <p
              className="font-semibold text-white text-sm"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Planter plus d&apos;arbres
            </p>
            <p
              className="text-xs mt-0.5"
              style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}
            >
              Agrandir ma forêt
            </p>
          </div>
        </Link>
        <Link
          href="/offrir"
          className="rounded-2xl p-5 flex items-center gap-4"
          style={{ backgroundColor: "#1A4D35", borderRadius: "8px" }}
        >
          <span className="text-3xl">🎁</span>
          <div>
            <p
              className="font-semibold text-white text-sm"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Offrir un arbre
            </p>
            <p
              className="text-xs mt-0.5"
              style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}
            >
              Cadeau original et durable
            </p>
          </div>
        </Link>
        <a
          href="#photos-terrain"
          className="rounded-2xl p-5 flex items-center gap-4"
          style={{
            backgroundColor: "#F8F4EE",
            border: "1px solid #DDE8E2",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          <span className="text-3xl">📸</span>
          <div>
            <p
              className="font-semibold text-sm"
              style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}
            >
              Mes photos terrain
            </p>
            <p
              className="text-xs mt-0.5"
              style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
            >
              {loadingTerrain
                ? "Chargement…"
                : terrainPhotos.length > 0
                ? `${terrainPhotos.length} photo${terrainPhotos.length > 1 ? "s" : ""} disponible${terrainPhotos.length > 1 ? "s" : ""}`
                : "Disponibles après plantation"}
            </p>
          </div>
        </a>
      </div>

      {/* Photos terrain */}
      <div
        id="photos-terrain"
        className="rounded-2xl p-6 mb-8"
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #DDE8E2",
          borderRadius: "8px",
        }}
      >
        <p
          className="font-semibold mb-1"
          style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}
        >
          📸 Mes photos terrain
        </p>
        <p
          className="text-xs mb-5"
          style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
        >
          Photos envoyées depuis la forêt au Sénégal
        </p>

        {loadingTerrain ? (
          <p className="text-sm" style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}>
            Chargement…
          </p>
        ) : terrainPhotos.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-4xl mb-3">🌱</p>
            <p className="text-sm" style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}>
              Les photos seront disponibles après la plantation de vos arbres.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {terrainPhotos.map((p) => (
              <div
                key={p.id}
                style={{
                  backgroundColor: "#F8F4EE",
                  borderRadius: 12,
                  overflow: "hidden",
                  border: "1px solid #DDE8E2",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.photo_url}
                  alt="Photo terrain"
                  style={{
                    width: "100%",
                    maxHeight: 340,
                    objectFit: "cover",
                    cursor: "zoom-in",
                    display: "block",
                  }}
                  onClick={() => setPhotoPleinEcran(p.photo_url)}
                />
                <div style={{ padding: "12px 16px" }}>
                  <p
                    className="text-xs font-semibold"
                    style={{ color: "#6B7280", fontFamily: "var(--font-sans)", marginBottom: 4 }}
                  >
                    📅{" "}
                    {new Date(p.created_at).toLocaleDateString("fr-FR", {
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  {p.message && (
                    <p
                      className="text-sm"
                      style={{ color: "#1C2B22", fontFamily: "var(--font-sans)", lineHeight: 1.5 }}
                    >
                      💬 {p.message}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox plein écran */}
      {photoPleinEcran && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.92)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            cursor: "zoom-out",
          }}
          onClick={() => setPhotoPleinEcran(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoPleinEcran}
            alt="Photo terrain plein écran"
            style={{ maxWidth: "100%", maxHeight: "90vh", objectFit: "contain", borderRadius: 8 }}
          />
        </div>
      )}

      {/* Referral link */}
      <div
        className="rounded-2xl p-6 mb-8"
        style={{
          backgroundColor: "#F8F4EE",
          border: "2px solid #C8972A",
          borderRadius: "8px",
        }}
      >
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <p
              className="font-semibold text-sm"
              style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}
            >
              🔗 Ton lien ambassadeur
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
            >
              Partage ce lien — touche 5% de commission sur chaque vente filleul
            </p>
          </div>
          {level.label === "Ambassadeur" && (
            <span
              className="text-xs font-bold px-3 py-1 rounded-full flex-shrink-0"
              style={{
                backgroundColor: "#C8972A",
                color: "#0C2518",
                fontFamily: "var(--font-sans)",
              }}
            >
              🌴 Actif
            </span>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div
            className="flex-1 px-4 py-3 rounded-xl text-sm truncate"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #DDE8E2",
              color: "#6B7280",
              fontFamily: "var(--font-sans)",
            }}
          >
            {referralLink}
          </div>
          <button
            onClick={copyReferral}
            className="px-5 py-3 rounded-xl text-sm font-semibold transition-all"
            style={{
              backgroundColor: copyDone ? "#1A4D35" : "#C8972A",
              color: copyDone ? "#FFFFFF" : "#0C2518",
              fontFamily: "var(--font-sans)",
              whiteSpace: "nowrap",
            }}
          >
            {copyDone ? "✓ Copié !" : "Copier le lien"}
          </button>
        </div>
        {level.label !== "Ambassadeur" && (
          <p
            className="text-xs mt-3"
            style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
          >
            💡 La commission de 5% est active à partir du niveau Ambassadeur (50
            parts). Tu es actuellement{" "}
            <strong style={{ color: "#C8972A" }}>{level.label}</strong>.
          </p>
        )}
      </div>

      {/* Purchase history */}
      <div
        className="rounded-2xl p-6 mb-8"
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #DDE8E2",
          borderRadius: "8px",
        }}
      >
        <p
          className="font-semibold mb-5"
          style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}
        >
          🧾 Historique des achats
        </p>

        {loadingParts ? (
          <p
            className="text-sm"
            style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
          >
            Chargement…
          </p>
        ) : parts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-3xl mb-3">🌱</p>
            <p
              className="text-sm"
              style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
            >
              Aucun achat pour le moment.
            </p>
            <Link
              href="/boutique"
              className="inline-block mt-4 px-6 py-3 rounded-xl text-sm font-semibold"
              style={{
                backgroundColor: "#0C2518",
                color: "#F0C55A",
                fontFamily: "var(--font-sans)",
                textDecoration: "none",
              }}
            >
              Planter mon premier arbre →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Date", "Pack", "Parts", "Montant", "Statut", "Certificat"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left pb-3 text-xs font-semibold uppercase tracking-wide"
                        style={{
                          color: "#6B7280",
                          fontFamily: "var(--font-sans)",
                          borderBottom: "1px solid #DDE8E2",
                          paddingRight: "12px",
                        }}
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {parts.map((part) => (
                  <tr key={part.id}>
                    <td
                      className="py-3 text-sm"
                      style={{
                        color: "#1C2B22",
                        fontFamily: "var(--font-sans)",
                        borderBottom: "1px solid #F0F0F0",
                        paddingRight: "12px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {part.date_achat
                        ? new Date(part.date_achat).toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </td>
                    <td
                      className="py-3 text-sm"
                      style={{
                        color: "#1C2B22",
                        fontFamily: "var(--font-sans)",
                        borderBottom: "1px solid #F0F0F0",
                        paddingRight: "12px",
                      }}
                    >
                      {PACK_LABELS[part.pack_id ?? ""] ?? "Pack GREENHOLD"}
                    </td>
                    <td
                      className="py-3 text-sm font-semibold"
                      style={{
                        color: "#0C2518",
                        fontFamily: "var(--font-sans)",
                        borderBottom: "1px solid #F0F0F0",
                        paddingRight: "12px",
                      }}
                    >
                      {part.nombre_parts}
                    </td>
                    <td
                      className="py-3 text-sm"
                      style={{
                        color: "#1C2B22",
                        fontFamily: "var(--font-sans)",
                        borderBottom: "1px solid #F0F0F0",
                        paddingRight: "12px",
                      }}
                    >
                      {part.montant != null
                        ? `${(part.montant / 100).toFixed(2)} €`
                        : "—"}
                    </td>
                    <td
                      className="py-3"
                      style={{
                        borderBottom: "1px solid #F0F0F0",
                        paddingRight: "12px",
                      }}
                    >
                      <span
                        className="text-xs font-semibold px-2 py-1 rounded-full"
                        style={{
                          backgroundColor:
                            part.statut === "confirmé" ? "#C8E6D4" : "#FEE2E2",
                          color:
                            part.statut === "confirmé" ? "#0C2518" : "#991B1B",
                          fontFamily: "var(--font-sans)",
                        }}
                      >
                        {part.statut === "confirmé"
                          ? "✓ Confirmé"
                          : part.statut === "en_attente"
                          ? "En attente"
                          : "Annulé"}
                      </span>
                    </td>
                    <td
                      className="py-3"
                      style={{ borderBottom: "1px solid #F0F0F0" }}
                    >
                      {part.session_id ? (
                        <a
                          href={`/api/certificate?session_id=${part.session_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold underline"
                          style={{
                            color: "#C8972A",
                            fontFamily: "var(--font-sans)",
                          }}
                        >
                          📜 PDF
                        </a>
                      ) : (
                        <span
                          className="text-xs"
                          style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
                        >
                          —
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Reinvestment options */}
      <div
        className="rounded-2xl p-6 mb-8"
        style={{
          backgroundColor: "#F8F4EE",
          border: "1px solid #DDE8E2",
          borderRadius: "8px",
        }}
      >
        <p
          className="font-semibold mb-2"
          style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}
        >
          ♻️ Option de réinvestissement
        </p>
        <p
          className="text-sm mb-5"
          style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
        >
          Comment veux-tu que tes distributions annuelles soient gérées ?
        </p>

        <div className="flex flex-col gap-3 mb-5">
          {REINVESTMENT_OPTIONS.map((option) => (
            <label
              key={option.id}
              className="flex items-start gap-4 rounded-xl p-4 cursor-pointer transition-all duration-150"
              style={{
                backgroundColor:
                  reinvestOption === option.id ? "#FFFFFF" : "transparent",
                border: `2px solid ${
                  reinvestOption === option.id ? "#C8972A" : "#DDE8E2"
                }`,
              }}
            >
              <input
                type="radio"
                name="reinvest"
                value={option.id}
                checked={reinvestOption === option.id}
                onChange={() => setReinvestOption(option.id)}
                className="mt-0.5 flex-shrink-0"
                style={{ accentColor: "#C8972A" }}
              />
              <div>
                <p
                  className="text-sm font-semibold mb-1 flex items-center gap-2"
                  style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}
                >
                  <span>{option.icon}</span> {option.label}
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
                >
                  {option.desc}
                </p>
              </div>
            </label>
          ))}
        </div>

        <button
          onClick={saveReinvestOption}
          disabled={savingReinvest}
          className="px-6 py-3 rounded-xl text-sm font-semibold transition-all"
          style={{
            backgroundColor: reinvestSaved
              ? "#1A4D35"
              : savingReinvest
              ? "#6B7280"
              : "#0C2518",
            color: reinvestSaved ? "#FFFFFF" : "#F0C55A",
            fontFamily: "var(--font-sans)",
            cursor: savingReinvest ? "not-allowed" : "pointer",
          }}
        >
          {reinvestSaved
            ? "✓ Préférences sauvegardées"
            : savingReinvest
            ? "Sauvegarde…"
            : "Sauvegarder mes préférences"}
        </button>
      </div>

      {/* Account settings */}
      <div
        className="rounded-2xl p-6"
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #DDE8E2",
          borderRadius: "8px",
        }}
      >
        <p
          className="font-semibold mb-4"
          style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}
        >
          ⚙️ Mon compte
        </p>
        <div className="space-y-3">
          <div
            className="flex items-center justify-between py-3"
            style={{ borderBottom: "1px solid #DDE8E2" }}
          >
            <span
              className="text-sm"
              style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
            >
              Adresse e-mail
            </span>
            <span
              className="text-sm font-medium"
              style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}
            >
              {user.email}
            </span>
          </div>
          <div
            className="flex items-center justify-between py-3"
            style={{ borderBottom: "1px solid #DDE8E2" }}
          >
            <span
              className="text-sm"
              style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
            >
              Membre depuis
            </span>
            <span
              className="text-sm"
              style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}
            >
              {user.created_at
                ? new Date(user.created_at).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "—"}
            </span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span
              className="text-sm"
              style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
            >
              ID actionnaire
            </span>
            <span className="text-xs font-mono" style={{ color: "#6B7280" }}>
              {user.id.slice(0, 16)}…
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Auth form: login / signup / reset ────────────────────────────

function AuthForm() {
  const [view, setView] = useState<View>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<Msg | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const resetMsg = () => setMsg(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    resetMsg();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      const friendly =
        error.message === "Invalid login credentials"
          ? "Email ou mot de passe incorrect."
          : error.message;
      setMsg({ type: "error", text: friendly });
    }
    setSubmitting(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    resetMsg();
    if (password.length < 8) {
      setMsg({
        type: "error",
        text: "Le mot de passe doit contenir au moins 8 caractères.",
      });
      setSubmitting(false);
      return;
    }
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setMsg({ type: "error", text: error.message });
    } else {
      setMsg({
        type: "success",
        text: "Compte créé ! Vérifie tes e-mails pour confirmer ton adresse avant de te connecter.",
      });
    }
    setSubmitting(false);
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    resetMsg();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/mon-espace`,
    });
    if (error) {
      setMsg({ type: "error", text: error.message });
    } else {
      setMsg({
        type: "success",
        text: "E-mail de réinitialisation envoyé ! Vérifie ta boîte mail.",
      });
    }
    setSubmitting(false);
  };

  return (
    <div className="mx-auto px-4 py-16" style={{ maxWidth: "480px" }}>
      {view !== "reset" && (
        <div className="flex rounded-xl p-1 mb-8" style={{ backgroundColor: "#DDE8E2" }}>
          {(["login", "signup"] as const).map((v) => (
            <button
              key={v}
              onClick={() => {
                setView(v);
                resetMsg();
              }}
              className="flex-1 py-3 rounded-lg text-sm font-semibold transition-all duration-200"
              style={{
                backgroundColor: view === v ? "#0C2518" : "transparent",
                color: view === v ? "#FFFFFF" : "#6B7280",
                fontFamily: "var(--font-sans)",
              }}
            >
              {v === "login" ? "Se connecter" : "Créer mon compte"}
            </button>
          ))}
        </div>
      )}

      {view === "reset" && (
        <div className="mb-8">
          <button
            onClick={() => {
              setView("login");
              resetMsg();
            }}
            className="flex items-center gap-2 text-sm mb-4"
            style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
          >
            ← Retour à la connexion
          </button>
          <h2
            className="text-2xl font-semibold"
            style={{ color: "#0C2518", fontFamily: "var(--font-serif)" }}
          >
            Mot de passe oublié
          </h2>
          <p
            className="text-sm mt-2"
            style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
          >
            Saisis ton e-mail pour recevoir un lien de réinitialisation.
          </p>
        </div>
      )}

      {view === "login" && (
        <div
          className="rounded-xl p-5 mb-6 flex items-start gap-3"
          style={{ backgroundColor: "#C8E6D4", border: "1px solid #2A7A4F" }}
        >
          <span className="text-2xl">🌿</span>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}
          >
            Connecte-toi pour accéder à ta forêt, tes photos et tes revenus.
          </p>
        </div>
      )}

      <form
        onSubmit={
          view === "login"
            ? handleLogin
            : view === "signup"
            ? handleSignup
            : handleReset
        }
      >
        <div className="space-y-4 mb-6">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}
            >
              Adresse e-mail
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="toi@email.com"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#C8972A")}
              onBlur={(e) => (e.target.style.borderColor = "#DDE8E2")}
              disabled={submitting}
              autoComplete="email"
            />
          </div>

          {view !== "reset" && (
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#0C2518", fontFamily: "var(--font-sans)" }}
              >
                Mot de passe
                {view === "signup" && (
                  <span className="ml-1 font-normal" style={{ color: "#6B7280" }}>
                    (8 caractères minimum)
                  </span>
                )}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ ...inputStyle, paddingRight: "48px" }}
                  onFocus={(e) => (e.target.style.borderColor = "#C8972A")}
                  onBlur={(e) => (e.target.style.borderColor = "#DDE8E2")}
                  disabled={submitting}
                  autoComplete={
                    view === "login" ? "current-password" : "new-password"
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm"
                  style={{ color: "#6B7280" }}
                  tabIndex={-1}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
          )}
        </div>

        {msg && (
          <div
            className="rounded-xl p-4 mb-5 text-sm"
            style={{
              backgroundColor:
                msg.type === "success" ? "#C8E6D4" : "#FEE2E2",
              border: `1px solid ${
                msg.type === "success" ? "#2A7A4F" : "#FCA5A5"
              }`,
              color: msg.type === "success" ? "#0C2518" : "#991B1B",
              fontFamily: "var(--font-sans)",
            }}
          >
            {msg.text}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 rounded-xl font-semibold text-base transition-all duration-200"
          style={{
            backgroundColor: submitting ? "#6B7280" : "#0C2518",
            color: "#F0C55A",
            fontFamily: "var(--font-sans)",
            minHeight: "56px",
            cursor: submitting ? "not-allowed" : "pointer",
          }}
        >
          {submitting
            ? "Chargement..."
            : view === "login"
            ? "Se connecter"
            : view === "signup"
            ? "Créer mon compte"
            : "Envoyer le lien de réinitialisation"}
        </button>

        {view === "login" && (
          <button
            type="button"
            onClick={() => {
              setView("reset");
              resetMsg();
            }}
            className="w-full mt-4 text-sm text-center"
            style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
          >
            Mot de passe oublié ?
          </button>
        )}
      </form>

      {view === "signup" && (
        <p
          className="text-xs text-center mt-6"
          style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
        >
          En créant un compte, tu acceptes nos{" "}
          <Link href="/cgv" className="underline" style={{ color: "#C8972A" }}>
            CGV
          </Link>{" "}
          et notre{" "}
          <Link
            href="/confidentialite"
            className="underline"
            style={{ color: "#C8972A" }}
          >
            Politique de confidentialité
          </Link>
          .
        </p>
      )}
    </div>
  );
}

// ─── Loading spinner ───────────────────────────────────────────────

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-24">
      <div
        className="w-10 h-10 rounded-full border-4 animate-spin"
        style={{ borderColor: "#DDE8E2", borderTopColor: "#C8972A" }}
      />
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────

export default function MonEspacePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  return (
    <main style={{ backgroundColor: "#F8F4EE", minHeight: "100vh" }}>
      <Navigation />

      <section className="pt-28 pb-10 px-4" style={{ backgroundColor: "#0C2518" }}>
        <div className="mx-auto" style={{ maxWidth: "900px" }}>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#C8972A", fontFamily: "var(--font-sans)" }}
          >
            Espace actionnaire
          </p>
          <h1
            className="text-white"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 600,
            }}
          >
            {loading
              ? "Mon espace"
              : user
              ? "Ma forêt GREENHOLD"
              : "Connexion à mon espace"}
          </h1>
          {!user && !loading && (
            <p
              className="mt-2 text-sm"
              style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}
            >
              Connecte-toi pour accéder à ta forêt, tes photos et tes revenus.
            </p>
          )}
        </div>
      </section>

      <div style={{ backgroundColor: "#F8F4EE" }}>
        {loading ? (
          <LoadingSpinner />
        ) : user ? (
          <Dashboard user={user} onSignOut={handleSignOut} />
        ) : (
          <AuthForm />
        )}
      </div>

      <Footer />
    </main>
  );
}
