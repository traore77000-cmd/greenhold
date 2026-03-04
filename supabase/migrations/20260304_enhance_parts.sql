-- Migration: enhance parts table for full purchase tracking
-- Run this in your Supabase SQL editor

ALTER TABLE parts
  ADD COLUMN IF NOT EXISTS pack_id         text,
  ADD COLUMN IF NOT EXISTS montant         integer,          -- amount in euro cents
  ADD COLUMN IF NOT EXISTS session_id      text UNIQUE,      -- Stripe checkout session ID
  ADD COLUMN IF NOT EXISTS cert_number     text,
  ADD COLUMN IF NOT EXISTS buyer_email     text,
  ADD COLUMN IF NOT EXISTS buyer_name      text;

-- Index for dashboard queries by buyer_email (for non-authenticated purchases)
CREATE INDEX IF NOT EXISTS parts_buyer_email_idx ON parts(buyer_email);

-- Index for session lookup
CREATE INDEX IF NOT EXISTS parts_session_id_idx ON parts(session_id);

-- RLS: allow users to read their own parts (by user_id OR email)
-- Make sure RLS is enabled and has appropriate policies.
-- Example policy (adjust to your existing RLS setup):

-- DROP POLICY IF EXISTS "Users can read own parts" ON parts;
-- CREATE POLICY "Users can read own parts" ON parts
--   FOR SELECT USING (
--     user_id = auth.uid()
--     OR buyer_email = auth.email()
--   );

-- Service role (webhook) inserts bypass RLS automatically.
