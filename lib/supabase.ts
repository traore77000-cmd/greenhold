import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Preinscrit = {
  id?: string;
  email: string;
  created_at?: string;
};

export type Part = {
  id?: string;
  user_id: string | null;
  pack_id?: string | null;
  nombre_parts: number;
  montant?: number | null;        // amount in euro cents (e.g. 1500 = 15€)
  date_achat?: string;
  statut: "en_attente" | "confirmé" | "annulé";
  session_id?: string | null;     // Stripe checkout session ID
  cert_number?: string | null;
  buyer_email?: string | null;
  buyer_name?: string | null;
};
