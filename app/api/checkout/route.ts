import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

const PACK_META: Record<string, { name: string; description: string; nombre_parts: number }> = {
  decouverte: {
    name: "Pack Découverte GREENHOLD",
    description: "1 Goyavier + 1 Papayer offert — 1 part dans la forêt GREENHOLD Sénégal",
    nombre_parts: 1,
  },
  famille: {
    name: "Pack Famille GREENHOLD",
    description: "1 Goyavier + 1 Manguier + 2 Papayers offerts — 2 parts dans la forêt GREENHOLD Sénégal",
    nombre_parts: 2,
  },
  investisseur: {
    name: "Pack Investisseur GREENHOLD",
    description: "5 Manguiers + 5 Papayers offerts — 5 parts dans la forêt GREENHOLD Sénégal",
    nombre_parts: 5,
  },
  heritage: {
    name: "Pack Héritage Senior GREENHOLD",
    description: "13 Manguiers + 12 Goyaviers + 25 Papayers — 25 parts + clause transmission héritiers",
    nombre_parts: 25,
  },
};

// ─── PRIX FIXES CÔTÉ SERVEUR ───────────────────────────────────────────────
// Le client n'envoie JAMAIS le prix — c'est toujours le serveur qui décide.
// Cela empêche toute manipulation du montant (ex: payer 0.01€).
const PRIX_FIXES: Record<string, number> = {
  decouverte:   15,
  famille:      35,
  investisseur: 99,
  heritage:     750,
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      packId,
      gift = false,
      recipientName,
      recipientEmail,
      senderName,
      message: giftMessage,
      sendDate,
    } = body;

    // Validation du pack — rejet immédiat si le packId est inconnu
    const prixServeur = PRIX_FIXES[packId];
    if (!prixServeur) {
      return NextResponse.json({ error: "Pack invalide" }, { status: 400 });
    }

    const meta = PACK_META[packId];
    const productName = body.name ?? meta.name;

    const baseUrl =
      process.env.NEXT_PUBLIC_URL ??
      (request.headers.get("origin") || "http://localhost:3000");

    const nombreParts = meta.nombre_parts ?? 1;

    const metadata: Record<string, string> = {
      pack_id: packId,
      nombre_parts: String(nombreParts),
      is_gift: gift ? "true" : "false",
    };
    if (gift && recipientName) metadata.recipient_name = recipientName;
    if (gift && recipientEmail) metadata.recipient_email = recipientEmail;
    if (gift && senderName) metadata.sender_name = senderName;
    if (gift && giftMessage) metadata.gift_message = String(giftMessage).slice(0, 500);
    if (gift && sendDate) metadata.send_date = sendDate;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: productName,
              description: meta.description,
            },
            unit_amount: Math.round(prixServeur * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/merci?session_id={CHECKOUT_SESSION_ID}&pack=${packId}`,
      cancel_url: `${baseUrl}/boutique`,
      metadata,
      customer_creation: "always",
      billing_address_collection: "required",
      locale: "fr",
      payment_intent_data: {
        metadata,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[Stripe checkout error]", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
