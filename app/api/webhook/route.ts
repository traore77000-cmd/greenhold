import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { generateCertificatePDF } from "@/lib/pdf";
import { sendConfirmationEmail } from "@/lib/emails";
import { generateCertNumber } from "@/app/api/certificate/route";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const sig = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json(
      { error: "Missing signature or secret" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Webhook verification failed";
    console.error("[Webhook] Signature error:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (session.payment_status !== "paid") {
    return NextResponse.json({ received: true });
  }

  try {
    const packId = session.metadata?.pack_id ?? "decouverte";
    const meta = PACK_META[packId] ?? {
      parts: 1,
      trees: "Arbre GREENHOLD",
      name: "Pack GREENHOLD",
    };

    const buyerEmail = session.customer_details?.email ?? "";
    const buyerName =
      session.customer_details?.name ?? "Actionnaire GREENHOLD";
    const certNumber = generateCertNumber(session.id);
    const amountPaid = session.amount_total ?? 0;

    // Try to find existing Supabase user by email
    let userId: string | null = null;
    if (buyerEmail) {
      try {
        const { data: listData } = await supabaseAdmin.auth.admin.listUsers({
          perPage: 1000,
        });
        const matched = listData?.users?.find((u) => u.email === buyerEmail);
        if (matched) userId = matched.id;
      } catch {
        // Non-critical: user might not have an account yet
      }
    }

    // Insert purchase into parts table
    // user_id falls back to "guest:{email}" for non-authenticated buyers (column is NOT NULL)
    const { error: insertError } = await supabaseAdmin.from("parts").insert({
      user_id: userId ?? `guest:${buyerEmail || session.id}`,
      pack_id: packId,
      nombre_parts: meta.parts,
      montant: amountPaid,
      statut: "confirmé",
      session_id: session.id,
      cert_number: certNumber,
      buyer_email: buyerEmail,
      buyer_name: buyerName,
      date_achat: new Date(session.created * 1000).toISOString(),
    });

    if (insertError) {
      console.error("[Webhook] Insert error:", insertError.message);
    }

    // Generate PDF certificate
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

    // Send confirmation email with PDF attachment
    if (buyerEmail) {
      try {
        await sendConfirmationEmail({
          to: buyerEmail,
          buyerName,
          packName: meta.name,
          parts: meta.parts,
          certNumber,
          pdfBuffer,
        });
      } catch (emailErr) {
        console.error("[Webhook] Email error:", emailErr);
      }
    }
  } catch (err) {
    // Return 200 to avoid Stripe retries for non-recoverable errors
    console.error("[Webhook] Processing error:", err);
  }

  return NextResponse.json({ received: true });
}
