-- ============================================================
-- GREENHOLD — Complete Database Setup (idempotent)
-- Run in: Supabase Dashboard → SQL Editor → New query
-- ============================================================


-- ══════════════════════════════════════════════════════════════
-- TABLE: presinscrits
-- Leads pré-lancement collectés sur /lancement
-- ══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.presinscrits (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  email       text        NOT NULL UNIQUE,
  source      text        DEFAULT 'lancement'
                            CHECK (source IN ('lancement', 'homepage', 'offrir', 'partenaire')),
  notified    boolean     NOT NULL DEFAULT false,       -- true après envoi email lancement
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.presinscrits ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "presinscrits_anon_insert"   ON public.presinscrits;
DROP POLICY IF EXISTS "presinscrits_auth_select"   ON public.presinscrits;
DROP POLICY IF EXISTS "presinscrits_service_all"   ON public.presinscrits;

-- Tout visiteur peut s'inscrire
CREATE POLICY "presinscrits_anon_insert"
  ON public.presinscrits FOR INSERT TO anon
  WITH CHECK (true);

-- Utilisateur authentifié peut voir sa ligne
CREATE POLICY "presinscrits_auth_select"
  ON public.presinscrits FOR SELECT TO authenticated
  USING (email = auth.email());

-- Service role : accès total (webhooks, admin)
CREATE POLICY "presinscrits_service_all"
  ON public.presinscrits FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_presinscrits_email    ON public.presinscrits(email);
CREATE INDEX IF NOT EXISTS idx_presinscrits_notified ON public.presinscrits(notified);


-- ══════════════════════════════════════════════════════════════
-- TABLE: utilisateurs
-- Profils étendus liés à auth.users (relation 1-1)
-- Créé automatiquement au signup via trigger
-- ══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.utilisateurs (
  id                  uuid        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email               text        NOT NULL,
  full_name           text,
  phone               text,
  -- Adresse postale (pour certificats physiques)
  adresse             text,
  code_postal         text,
  ville               text,
  pays                text        DEFAULT 'FR',
  -- Préférences financières
  reinvestment_option text        DEFAULT 'annuel'
                                    CHECK (reinvestment_option IN ('total', 'partiel', 'versement', 'annuel')),
  iban                text,                              -- à chiffrer côté application avant insertion
  -- Parrainage
  referral_code       text        UNIQUE DEFAULT substring(md5(random()::text), 1, 8),
  referral_by         text,                              -- code parrain
  -- Statut
  newsletter          boolean     NOT NULL DEFAULT true,
  kyc_done            boolean     NOT NULL DEFAULT false,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.utilisateurs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "utilisateurs_self_select"  ON public.utilisateurs;
DROP POLICY IF EXISTS "utilisateurs_self_update"  ON public.utilisateurs;
DROP POLICY IF EXISTS "utilisateurs_service_all"  ON public.utilisateurs;

-- Utilisateur lit uniquement son propre profil
CREATE POLICY "utilisateurs_self_select"
  ON public.utilisateurs FOR SELECT TO authenticated
  USING (id = auth.uid());

-- Utilisateur modifie uniquement son propre profil
CREATE POLICY "utilisateurs_self_update"
  ON public.utilisateurs FOR UPDATE TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Service role : accès total
CREATE POLICY "utilisateurs_service_all"
  ON public.utilisateurs FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_utilisateurs_email         ON public.utilisateurs(email);
CREATE INDEX IF NOT EXISTS idx_utilisateurs_referral_code ON public.utilisateurs(referral_code);

-- ── Fonction utilitaire : updated_at automatique ─────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS utilisateurs_updated_at ON public.utilisateurs;
CREATE TRIGGER utilisateurs_updated_at
  BEFORE UPDATE ON public.utilisateurs
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ── Trigger : profil créé automatiquement au signup ──────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.utilisateurs (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name',
      ''
    )
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ══════════════════════════════════════════════════════════════
-- TABLE: parts
-- Parts détenues — source de vérité du patrimoine actionnaire
-- Insérées par le webhook Stripe après paiement confirmé
-- ══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.parts (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Propriétaire : auth.uid() si connecté, 'guest:{email}' pour acheteur anonyme
  user_id       text        NOT NULL,
  -- Détails du pack
  pack_id       text        CHECK (pack_id IN ('decouverte', 'famille', 'investisseur', 'heritage')),
  nombre_parts  integer     NOT NULL CHECK (nombre_parts > 0),
  montant       integer,                                 -- centimes (1500 = 15 €)
  -- Statut
  statut        text        NOT NULL DEFAULT 'en_attente'
                              CHECK (statut IN ('en_attente', 'confirmé', 'annulé')),
  -- Traçabilité Stripe
  session_id    text        UNIQUE,                      -- Stripe checkout session ID
  -- Certificat
  cert_number   text,                                    -- ex: GH-2026-4321
  -- Acheteur (peut différer du user connecté : cas cadeau)
  buyer_email   text,
  buyer_name    text,
  -- Horodatage
  date_achat    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.parts ENABLE ROW LEVEL SECURITY;

-- Colonnes à ajouter si la table existait avec l'ancien schéma
ALTER TABLE public.parts ADD COLUMN IF NOT EXISTS pack_id     text;
ALTER TABLE public.parts ADD COLUMN IF NOT EXISTS montant     integer;
ALTER TABLE public.parts ADD COLUMN IF NOT EXISTS session_id  text;
ALTER TABLE public.parts ADD COLUMN IF NOT EXISTS cert_number text;
ALTER TABLE public.parts ADD COLUMN IF NOT EXISTS buyer_email text;
ALTER TABLE public.parts ADD COLUMN IF NOT EXISTS buyer_name  text;

DROP POLICY IF EXISTS "parts_anon_count"    ON public.parts;
DROP POLICY IF EXISTS "parts_auth_select"   ON public.parts;
DROP POLICY IF EXISTS "parts_service_all"   ON public.parts;

-- Visiteur anonyme : lit uniquement le total confirmé (compteur live /boutique)
CREATE POLICY "parts_anon_count"
  ON public.parts FOR SELECT TO anon
  USING (statut = 'confirmé');

-- Utilisateur authentifié : lit ses propres parts (par user_id ou email)
CREATE POLICY "parts_auth_select"
  ON public.parts FOR SELECT TO authenticated
  USING (
    user_id = auth.uid()::text
    OR buyer_email = auth.email()
  );

-- Service role : insert / update / delete (webhook Stripe)
CREATE POLICY "parts_service_all"
  ON public.parts FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_parts_statut      ON public.parts(statut);
CREATE INDEX IF NOT EXISTS idx_parts_user_id     ON public.parts(user_id);
CREATE INDEX IF NOT EXISTS idx_parts_buyer_email ON public.parts(buyer_email);
CREATE INDEX IF NOT EXISTS idx_parts_session_id  ON public.parts(session_id);
CREATE INDEX IF NOT EXISTS idx_parts_date_achat  ON public.parts(date_achat DESC);

-- Temps réel activé (compteur live sur /boutique)
ALTER PUBLICATION supabase_realtime ADD TABLE public.parts;


-- ══════════════════════════════════════════════════════════════
-- TABLE: achats
-- Log exhaustif de chaque transaction Stripe
-- Inclut le flux cadeau, métadonnées complètes, audit trail
-- ══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.achats (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Lien vers la part créée
  part_id          uuid        REFERENCES public.parts(id) ON DELETE SET NULL,
  -- Acheteur
  user_id          text,                                  -- auth.uid() si connecté
  buyer_email      text        NOT NULL,
  buyer_name       text,
  -- Pack
  pack_id          text        CHECK (pack_id IN ('decouverte', 'famille', 'investisseur', 'heritage')),
  nombre_parts     integer     NOT NULL CHECK (nombre_parts > 0),
  montant          integer     NOT NULL,                  -- centimes
  devise           text        NOT NULL DEFAULT 'eur',
  -- Stripe
  session_id       text        NOT NULL UNIQUE,           -- cs_live_ ou cs_test_
  payment_intent   text,                                  -- pi_...
  statut_paiement  text        NOT NULL DEFAULT 'en_attente'
                                 CHECK (statut_paiement IN ('en_attente', 'payé', 'remboursé', 'échoué')),
  -- Flux cadeau
  is_gift          boolean     NOT NULL DEFAULT false,
  recipient_name   text,
  recipient_email  text,
  sender_name      text,
  gift_message     text,
  send_date        date,                                  -- date d'envoi programmée du cadeau
  gift_sent        boolean     NOT NULL DEFAULT false,
  -- Certificat et notifications
  cert_number      text,
  pdf_generated    boolean     NOT NULL DEFAULT false,
  email_sent       boolean     NOT NULL DEFAULT false,
  -- Horodatage
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.achats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "achats_auth_select"   ON public.achats;
DROP POLICY IF EXISTS "achats_service_all"   ON public.achats;

-- Utilisateur lit ses propres achats (acheteur ou destinataire cadeau)
CREATE POLICY "achats_auth_select"
  ON public.achats FOR SELECT TO authenticated
  USING (
    user_id = auth.uid()::text
    OR buyer_email    = auth.email()
    OR recipient_email = auth.email()
  );

-- Service role : accès total (webhook Stripe insère après paiement)
CREATE POLICY "achats_service_all"
  ON public.achats FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_achats_session_id       ON public.achats(session_id);
CREATE INDEX IF NOT EXISTS idx_achats_buyer_email      ON public.achats(buyer_email);
CREATE INDEX IF NOT EXISTS idx_achats_recipient_email  ON public.achats(recipient_email);
CREATE INDEX IF NOT EXISTS idx_achats_statut           ON public.achats(statut_paiement);
CREATE INDEX IF NOT EXISTS idx_achats_is_gift          ON public.achats(is_gift) WHERE is_gift = true;
CREATE INDEX IF NOT EXISTS idx_achats_send_date        ON public.achats(send_date) WHERE gift_sent = false;
CREATE INDEX IF NOT EXISTS idx_achats_created_at       ON public.achats(created_at DESC);

DROP TRIGGER IF EXISTS achats_updated_at ON public.achats;
CREATE TRIGGER achats_updated_at
  BEFORE UPDATE ON public.achats
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- ══════════════════════════════════════════════════════════════
-- VUE: parts_summary
-- Résumé par utilisateur — utilisé dans /mon-espace
-- ══════════════════════════════════════════════════════════════

CREATE OR REPLACE VIEW public.parts_summary AS
SELECT
  COALESCE(u.id::text, p.user_id)    AS user_id,
  COALESCE(u.email, p.buyer_email)   AS email,
  u.full_name                         AS full_name,
  COUNT(p.id)                         AS nb_achats,
  COALESCE(SUM(p.nombre_parts) FILTER (WHERE p.statut = 'confirmé'), 0) AS total_parts,
  COALESCE(SUM(p.montant)      FILTER (WHERE p.statut = 'confirmé'), 0) AS total_investi_cts,
  MIN(p.date_achat)                   AS premier_achat,
  MAX(p.date_achat)                   AS dernier_achat
FROM public.parts p
LEFT JOIN public.utilisateurs u
  ON  u.id::text   = p.user_id
  OR  u.email      = p.buyer_email
GROUP BY
  COALESCE(u.id::text, p.user_id),
  COALESCE(u.email, p.buyer_email),
  u.full_name;

COMMENT ON VIEW public.parts_summary IS
  'Agrégat des parts confirmées par utilisateur — dashboard /mon-espace';


-- ══════════════════════════════════════════════════════════════
-- SEED (optionnel — décommenter pour tests locaux uniquement)
-- ══════════════════════════════════════════════════════════════

-- INSERT INTO public.parts
--   (user_id, pack_id, nombre_parts, montant, statut, cert_number, buyer_email, buyer_name, session_id)
-- VALUES
--   ('demo', 'famille',      2,  3500, 'confirmé', 'GH-2026-1001', 'demo@greenhold.fr', 'Alice Martin', 'cs_test_demo_001'),
--   ('demo', 'investisseur', 5,  9900, 'confirmé', 'GH-2026-1002', 'demo@greenhold.fr', 'Alice Martin', 'cs_test_demo_002'),
--   ('demo', 'decouverte',   1,  1500, 'confirmé', 'GH-2026-1003', 'bob@greenhold.fr',  'Bob Dupont',   'cs_test_demo_003');
