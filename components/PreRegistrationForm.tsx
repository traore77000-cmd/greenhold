"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PreRegistrationForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");

    const { error } = await supabase
      .from("presinscrits")
      .insert({ email: email.trim().toLowerCase() });

    if (error) {
      if (error.code === "23505") {
        // unique constraint — already registered
        setMessage("Tu es déjà inscrit(e) ! On te contacte 48h avant le lancement.");
        setStatus("success");
      } else {
        setMessage("Une erreur est survenue. Réessaie dans quelques instants.");
        setStatus("error");
      }
    } else {
      setMessage(
        "C'est noté ! Tu recevras une offre exclusive 48h avant le lancement."
      );
      setStatus("success");
      setEmail("");
    }
  };

  if (status === "success") {
    return (
      <div
        className="rounded-xl p-6 text-center"
        style={{ backgroundColor: "#1A4D35", border: "1px solid #2A7A4F" }}
      >
        <p className="text-2xl mb-2">🌿</p>
        <p
          className="text-base font-medium"
          style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}
        >
          {message}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="ton@email.com"
        className="flex-1 px-5 py-4 rounded-xl outline-none text-base"
        style={{
          backgroundColor: "#0C2518",
          border: "2px solid #2A7A4F",
          color: "#F8F4EE",
          fontFamily: "var(--font-sans)",
          minHeight: "56px",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#C8972A")}
        onBlur={(e) => (e.target.style.borderColor = "#2A7A4F")}
        disabled={status === "loading"}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-8 py-4 rounded-xl font-semibold transition-all duration-200"
        style={{
          backgroundColor: status === "loading" ? "#6B7280" : "#C8972A",
          color: "#0C2518",
          fontFamily: "var(--font-sans)",
          minHeight: "56px",
          cursor: status === "loading" ? "not-allowed" : "pointer",
          whiteSpace: "nowrap",
        }}
      >
        {status === "loading" ? "..." : "M'alerter au lancement"}
      </button>
      {status === "error" && (
        <p
          className="text-sm text-center sm:text-left"
          style={{ color: "#F87171", fontFamily: "var(--font-sans)" }}
        >
          {message}
        </p>
      )}
    </form>
  );
}
