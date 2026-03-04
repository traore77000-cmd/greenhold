"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Boutique", href: "/boutique" },
  { label: "Comment ça marche", href: "/#comment-ca-marche" },
  { label: "Offrir", href: "/offrir" },
  { label: "Entreprises", href: "/#entreprises" },
  { label: "FAQ", href: "/#faq" },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-shadow duration-300"
      style={{
        backgroundColor: "#0C2518",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.3)" : "none",
      }}
    >
      <div
        className="mx-auto flex items-center justify-between px-4 py-4"
        style={{ maxWidth: "1200px" }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span
            className="text-white text-2xl font-bold tracking-wider"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            GREENHOLD
          </span>
          <span className="text-xs hidden sm:block" style={{ color: "#C8E6D4", marginTop: "2px" }}>
            🌿
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors duration-200"
              style={{
                color: "#C8E6D4",
                fontFamily: "var(--font-sans)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F0C55A")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#C8E6D4")}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/mon-espace"
            className="px-4 py-2 text-sm font-medium rounded-lg border transition-colors duration-200"
            style={{
              color: "#C8E6D4",
              borderColor: "#2A7A4F",
              fontFamily: "var(--font-sans)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#1A4D35";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            Mon espace
          </Link>
          <Link
            href="/boutique"
            className="px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-200"
            style={{
              backgroundColor: "#C8972A",
              color: "#0C2518",
              fontFamily: "var(--font-sans)",
              minHeight: "40px",
              display: "flex",
              alignItems: "center",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#F0C55A";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#C8972A";
            }}
          >
            Planter mon arbre
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              backgroundColor: "#C8E6D4",
              transform: mobileOpen ? "rotate(45deg) translateY(8px)" : "none",
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              backgroundColor: "#C8E6D4",
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              backgroundColor: "#C8E6D4",
              transform: mobileOpen ? "rotate(-45deg) translateY(-8px)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="lg:hidden border-t"
          style={{ borderColor: "#1A4D35", backgroundColor: "#0C2518" }}
        >
          <div className="px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium py-2"
                style={{ color: "#C8E6D4", fontFamily: "var(--font-sans)" }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-2 border-t" style={{ borderColor: "#1A4D35" }}>
              <Link
                href="/mon-espace"
                className="text-center px-4 py-3 text-sm font-medium rounded-lg border"
                style={{
                  color: "#C8E6D4",
                  borderColor: "#2A7A4F",
                  fontFamily: "var(--font-sans)",
                }}
                onClick={() => setMobileOpen(false)}
              >
                Mon espace
              </Link>
              <Link
                href="/boutique"
                className="text-center px-4 py-3 text-sm font-semibold rounded-lg"
                style={{
                  backgroundColor: "#C8972A",
                  color: "#0C2518",
                  fontFamily: "var(--font-sans)",
                }}
                onClick={() => setMobileOpen(false)}
              >
                Planter mon arbre
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
