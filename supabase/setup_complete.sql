-- ============================================================
-- GREENHOLD — Complete Database Setup
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- ── Table: presinscrits ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.presinscrits (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email       text NOT NULL UNIQUE,
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.presinscrits ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert on presinscrits" ON public.presinscrits;
CREATE POLICY "Allow public insert on presinscrits"
  ON public.presinscrits FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "Allow users to read own preinscription" ON public.presinscrits;
CREATE POLICY "Allow users to read own preinscription"
  ON public.presinscrits FOR SELECT TO authenticated USING (true);

-- ── Table: parts (full schema with all columns) ──────────────
CREATE TABLE IF NOT EXISTS public.parts (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       text NOT NULL,
  pack_id       text,
  nombre_parts  integer NOT NULL CHECK (nombre_parts > 0),
  montant       integer,              -- amount in euro cents
  date_achat    timestamptz NOT NULL DEFAULT now(),
  statut        text NOT NULL DEFAULT 'en_attente'
                  CHECK (statut IN ('en_attente', 'confirmé', 'annulé')),
  session_id    text UNIQUE,          -- Stripe checkout session ID
  cert_number   text,
  buyer_email   text,
  buyer_name    text
);

-- Add missing columns if the table was created with the old schema
ALTER TABLE public.parts ADD COLUMN IF NOT EXISTS pack_id       text;
ALTER TABLE public.parts ADD COLUMN IF NOT EXISTS montant       integer;
ALTER TABLE public.parts ADD COLUMN IF NOT EXISTS session_id    text UNIQUE;
ALTER TABLE public.parts ADD COLUMN IF NOT EXISTS cert_number   text;
ALTER TABLE public.parts ADD COLUMN IF NOT EXISTS buyer_email   text;
ALTER TABLE public.parts ADD COLUMN IF NOT EXISTS buyer_name    text;

ALTER TABLE public.parts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read count on parts" ON public.parts;
CREATE POLICY "Allow public read count on parts"
  ON public.parts FOR SELECT TO anon
  USING (statut = 'confirmé');

DROP POLICY IF EXISTS "Allow users to read own parts" ON public.parts;
CREATE POLICY "Allow users to read own parts"
  ON public.parts FOR SELECT TO authenticated
  USING (user_id = auth.uid()::text OR buyer_email = auth.email());

DROP POLICY IF EXISTS "Service role can insert parts" ON public.parts;
CREATE POLICY "Service role can insert parts"
  ON public.parts FOR INSERT TO service_role WITH CHECK (true);

-- ── Enable realtime on parts ─────────────────────────────────
ALTER PUBLICATION supabase_realtime ADD TABLE public.parts;

-- ── Indexes ──────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_parts_statut       ON public.parts(statut);
CREATE INDEX IF NOT EXISTS idx_parts_user_id      ON public.parts(user_id);
CREATE INDEX IF NOT EXISTS parts_buyer_email_idx  ON public.parts(buyer_email);
CREATE INDEX IF NOT EXISTS parts_session_id_idx   ON public.parts(session_id);
CREATE INDEX IF NOT EXISTS idx_presinscrits_email ON public.presinscrits(email);
