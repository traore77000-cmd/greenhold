import type { NextConfig } from "next";

const securityHeaders = [
  // Empêche le site d'être affiché dans un iframe (anti-clickjacking)
  { key: "X-Frame-Options", value: "DENY" },
  // Empêche les navigateurs de deviner le type MIME
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Contrôle les infos envoyées dans le referrer
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Désactive accès caméra, micro, géolocalisation
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Protection XSS anciens navigateurs
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // Force HTTPS pendant 1 an (inclure les sous-domaines)
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
