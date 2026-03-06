import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET /api/plantation — liste des demandes en attente
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("demandes_plantation")
    .select("id, created_at, email, type_arbre, actionnaire_id")
    .eq("statut", "en_attente")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data ?? []);
}

// PATCH /api/plantation — marquer comme plantée + insérer dans updates_terrain
export async function PATCH(request: NextRequest) {
  const { id, photo_url, actionnaire_id, message } = await request.json();

  if (!id || !photo_url) {
    return NextResponse.json({ error: "Missing id or photo_url" }, { status: 400 });
  }

  // Mettre à jour la demande
  const { error: updateError } = await supabaseAdmin
    .from("demandes_plantation")
    .update({
      statut: "plantee",
      photo_url,
      plantee_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  // Insérer dans updates_terrain pour que l'actionnaire voie la photo dans /mon-espace
  const { error: insertError } = await supabaseAdmin
    .from("updates_terrain")
    .insert({
      photo_url,
      actionnaire_id: actionnaire_id ?? null,
      message: message ?? null,
    });

  if (insertError) {
    // Non-critique : la demande est déjà marquée plantée
    console.error("[plantation] updates_terrain insert error:", insertError.message);
  }

  return NextResponse.json({ success: true });
}
