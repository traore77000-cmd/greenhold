"use client";

import { useState, useEffect } from "react";

interface TimeLeft {
  jours: number;
  heures: number;
  minutes: number;
  secondes: number;
}

// Launch date: September 1, 2026
const LAUNCH_DATE = new Date("2026-09-01T00:00:00+00:00");

function getTimeLeft(): TimeLeft {
  const now = new Date();
  const diff = LAUNCH_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    return { jours: 0, heures: 0, minutes: 0, secondes: 0 };
  }

  const jours = Math.floor(diff / (1000 * 60 * 60 * 24));
  const heures = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secondes = Math.floor((diff % (1000 * 60)) / 1000);

  return { jours, heures, minutes, secondes };
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="flex items-center justify-center rounded-xl w-28 h-28 md:w-36 md:h-36"
        style={{ backgroundColor: "#F8F4EE", border: "2px solid #DDE8E2" }}
      >
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(3rem, 8vw, 5rem)",
            fontWeight: 600,
            color: "#0C2518",
            lineHeight: 1,
          }}
        >
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span
        className="mt-3 text-xs uppercase tracking-widest font-semibold"
        style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
      >
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const launched =
    timeLeft !== null &&
    timeLeft.jours === 0 &&
    timeLeft.heures === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.secondes === 0;

  if (timeLeft === null) {
    return (
      <div className="flex justify-center gap-6">
        {["JOURS", "HEURES", "MINUTES", "SECONDES"].map((label) => (
          <div key={label} className="flex flex-col items-center">
            <div
              className="flex items-center justify-center rounded-xl w-28 h-28 md:w-36 md:h-36"
              style={{ backgroundColor: "#F8F4EE", border: "2px solid #DDE8E2" }}
            >
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(3rem, 8vw, 5rem)",
                  fontWeight: 600,
                  color: "#0C2518",
                  lineHeight: 1,
                }}
              >
                00
              </span>
            </div>
            <span
              className="mt-3 text-xs uppercase tracking-widest font-semibold"
              style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (launched) {
    return (
      <div className="text-center py-8">
        <p
          className="text-4xl font-bold"
          style={{ color: "#0C2518", fontFamily: "var(--font-serif)" }}
        >
          🌿 Le lancement a eu lieu !
        </p>
        <p className="mt-2 text-lg" style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}>
          Rejoins la forêt GREENHOLD dès maintenant.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
      <Digit value={timeLeft.jours} label="Jours" />
      <div className="flex items-center pb-10">
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "4rem",
            color: "#C8972A",
            lineHeight: 1,
          }}
        >
          :
        </span>
      </div>
      <Digit value={timeLeft.heures} label="Heures" />
      <div className="flex items-center pb-10">
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "4rem",
            color: "#C8972A",
            lineHeight: 1,
          }}
        >
          :
        </span>
      </div>
      <Digit value={timeLeft.minutes} label="Minutes" />
      <div className="flex items-center pb-10">
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "4rem",
            color: "#C8972A",
            lineHeight: 1,
          }}
        >
          :
        </span>
      </div>
      <Digit value={timeLeft.secondes} label="Secondes" />
    </div>
  );
}
