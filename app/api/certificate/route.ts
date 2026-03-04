import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { generateCertificatePDF } from "@/lib/pdf";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

const PACK_META: Record<string, { parts: number; trees: string; name: string }> = {
  decouverte: {
    parts: 1,
    trees: "1 Goyavier + 1 Papayer offert",
    name: "Pack Decouverte",
  },
  famille: {
    parts: 2,
    trees: "1 Goyavier + 1 Manguier + 2 Papayers offerts",
    name: "Pack Famille",
  },
  investisseur: {
    parts: 5,
    trees: "5 Manguiers + 5 Papayers offerts",
    name: "Pack Investisseur",
  },
  heritage: {
    parts: 25,
    trees: "13 Manguiers + 12 Goyaviers + 25 Papayers",
    name: "Pack Heritage Senior",
  },
};

export function generateCertNumber(sessionId: string): string {
  const sum = sessionId
    .split("")
    .reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const num = (Math.abs(sum) % 9000) + 1000;
  return `GH-2026-${num}`;
}

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["customer_details"],
    });
  } catch {
    return NextResponse.json({ error: "Session introuvable" }, { status: 404 });
  }

  if (session.payment_status !== "paid") {
    return NextResponse.json({ error: "Paiement non complété" }, { status: 403 });
  }

  const packId = session.metadata?.pack_id ?? "decouverte";
  const meta = PACK_META[packId] ?? {
    parts: 1,
    trees: "Arbre GREENHOLD",
    name: "Pack GREENHOLD",
  };

  const buyerName =
    session.customer_details?.name ?? "Actionnaire GREENHOLD";
  const buyerEmail = session.customer_details?.email ?? "";
  const certNumber = generateCertNumber(sessionId);

  const date = new Date(session.created * 1000).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const pdfBuffer = await generateCertificatePDF({
    certNumber,
    buyerName,
    buyerEmail,
    parts: meta.parts,
    packName: meta.name,
    trees: meta.trees,
    date,
  });

  // Copy into a guaranteed ArrayBuffer (not SharedArrayBuffer) for Blob compat
  const ab = new ArrayBuffer(pdfBuffer.byteLength);
  new Uint8Array(ab).set(pdfBuffer);
  const blob = new Blob([ab], { type: "application/pdf" });

  return new NextResponse(blob, {
    headers: {
      "Content-Disposition": `attachment; filename="certificat-greenhold-${certNumber}.pdf"`,
      "Cache-Control": "private, max-age=3600",
    },
  });
}
