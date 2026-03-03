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
  user_id: string;
  nombre_parts: number;
  date_achat?: string;
  statut: "en_attente" | "confirmé" | "annulé";
};
