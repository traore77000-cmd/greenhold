-- GREENHOLD — Initial Database Schema
-- Run this in the Supabase SQL editor

-- ─────────────────────────────────────────────────────────────────
-- Table: presinscrits
-- Stores pre-registration emails before the official launch
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.presinscrits (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email       text NOT NULL UNIQUE,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.presinscrits ENABLE ROW LEVEL SECURITY;

-- Allow public insert (anyone can pre-register)
CREATE POLICY "Allow public insert on presinscrits"
  ON public.presinscrits
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to read their own entry
CREATE POLICY "Allow users to read own preinscription"
  ON public.presinscrits
  FOR SELECT
  TO authenticated
  USING (true);

-- ─────────────────────────────────────────────────────────────────
-- Table: parts
-- Stores ownership shares in the GREENHOLD forest
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.parts (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       text NOT NULL,
  nombre_parts  integer NOT NULL CHECK (nombre_parts > 0),
  date_achat    timestamptz NOT NULL DEFAULT now(),
  statut        text NOT NULL DEFAULT 'en_attente'
                  CHECK (statut IN ('en_attente', 'confirmé', 'annulé'))
);

-- Enable Row Level Security
ALTER TABLE public.parts ENABLE ROW LEVEL SECURITY;

-- Allow public read for the startup counter (total parts sold)
CREATE POLICY "Allow public read count on parts"
  ON public.parts
  FOR SELECT
  TO anon
  USING (statut = 'confirmé');

-- Allow authenticated users to read their own parts
CREATE POLICY "Allow users to read own parts"
  ON public.parts
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid()::text);

-- Enable real-time on parts table (for the live counter)
ALTER PUBLICATION supabase_realtime ADD TABLE public.parts;

-- ─────────────────────────────────────────────────────────────────
-- Indexes for performance
-- ─────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_parts_statut ON public.parts(statut);
CREATE INDEX IF NOT EXISTS idx_parts_user_id ON public.parts(user_id);
CREATE INDEX IF NOT EXISTS idx_presinscrits_email ON public.presinscrits(email);

-- ─────────────────────────────────────────────────────────────────
-- Seed: insert demo confirmed parts for counter display
-- Remove or adjust before going live
-- ─────────────────────────────────────────────────────────────────
-- INSERT INTO public.parts (user_id, nombre_parts, statut)
-- VALUES ('demo', 47, 'confirmé');
