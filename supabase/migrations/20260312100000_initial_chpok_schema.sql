-- Chpok MVP: initial schema, indexes, triggers, RLS, storage
-- Roles: user, moderator, admin, partner
-- Report statuses: draft, submitted, under_review, routed, waiting_info, resolved, rejected, duplicate
-- Object types: scooter, courier, carsharing, taxi, car, other
-- Violation types: dangerous_driving, sidewalk_riding, bad_parking, blocked_passage, accident_or_near_miss, other

-- ---------------------------------------------------------------------------
-- Helper: current user's role (for RLS)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid() LIMIT 1;
$$;

-- Returns true if current user is moderator or admin (used in RLS).
CREATE OR REPLACE FUNCTION public.is_moderator_or_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT current_user_role() IN ('moderator', 'admin');
$$;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

-- Profiles: one per auth user, linked to auth.users
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'moderator', 'admin', 'partner')),
  display_name text,
  phone text,
  telegram_username text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.profiles IS 'User profiles linked to Supabase Auth; role drives RLS.';

-- Companies: e.g. delivery, micromobility, carsharing, taxi
CREATE TABLE public.companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  category text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_companies_slug ON public.companies(slug);
CREATE INDEX idx_companies_category ON public.companies(category);
CREATE INDEX idx_companies_is_active ON public.companies(is_active) WHERE is_active = true;

COMMENT ON TABLE public.companies IS 'Companies (brands) that can be linked to reports.';

-- Reports: incident reports from users
CREATE TABLE public.reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN (
    'draft', 'submitted', 'under_review', 'routed', 'waiting_info', 'resolved', 'rejected', 'duplicate'
  )),
  object_type text CHECK (object_type IN ('scooter', 'courier', 'carsharing', 'taxi', 'car', 'other')),
  violation_type text CHECK (violation_type IN (
    'dangerous_driving', 'sidewalk_riding', 'bad_parking', 'blocked_passage', 'accident_or_near_miss', 'other'
  )),
  company_id uuid REFERENCES public.companies(id) ON DELETE SET NULL,
  company_name_manual text,
  description text,
  voice_note_url text,
  address_text text,
  lat numeric,
  lng numeric,
  occurred_at timestamptz,
  submitted_at timestamptz,
  is_anonymous boolean NOT NULL DEFAULT false,
  source text NOT NULL DEFAULT 'mobile_app',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_reports_user_id ON public.reports(user_id);
CREATE INDEX idx_reports_status ON public.reports(status);
CREATE INDEX idx_reports_company_id ON public.reports(company_id);
CREATE INDEX idx_reports_created_at_desc ON public.reports(created_at DESC);

COMMENT ON TABLE public.reports IS 'User-submitted incident reports.';

-- Report media attachments
CREATE TABLE public.report_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id uuid NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  storage_path text NOT NULL,
  media_type text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_report_media_report_id ON public.report_media(report_id);

COMMENT ON TABLE public.report_media IS 'Photos/attachments for reports; storage_path must follow bucket path convention: user_id/report_id/file-name.';

-- Report status change history (audit trail)
CREATE TABLE public.report_status_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id uuid NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  old_status text,
  new_status text NOT NULL,
  changed_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  comment text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_report_status_history_report_id ON public.report_status_history(report_id);

COMMENT ON TABLE public.report_status_history IS 'Audit log of report status changes.';

-- Admin-only notes on reports
CREATE TABLE public.admin_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id uuid NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  author_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  note text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_admin_notes_report_id ON public.admin_notes(report_id);

COMMENT ON TABLE public.admin_notes IS 'Internal notes visible only to moderators/admins.';

-- ---------------------------------------------------------------------------
-- updated_at triggers
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_reports_updated_at
  BEFORE UPDATE ON public.reports
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Auto-create profile on auth signup
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, role)
  VALUES (NEW.id, 'user')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_notes ENABLE ROW LEVEL SECURITY;

-- profiles: users read/update only their own
CREATE POLICY profiles_select_own ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY profiles_update_own ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- profiles: insert is done by handle_new_user (SECURITY DEFINER); allow service role or handle in app
-- Allow insert for authenticated so app can create profile if trigger missed (e.g. existing users)
CREATE POLICY profiles_insert_own ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- companies: authenticated users can read active companies
CREATE POLICY companies_select_active ON public.companies
  FOR SELECT TO authenticated
  USING (is_active = true);

-- reports: users insert/select own; update only when draft; mods/admins all
CREATE POLICY reports_insert_own ON public.reports
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY reports_select_own ON public.reports
  FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR is_moderator_or_admin());

CREATE POLICY reports_update_own_draft ON public.reports
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid() AND status = 'draft')
  WITH CHECK (user_id = auth.uid());

CREATE POLICY reports_update_mod_admin ON public.reports
  FOR UPDATE TO authenticated
  USING (is_moderator_or_admin());

-- report_media: users read/insert their own; mods/admins read all
CREATE POLICY report_media_insert_own ON public.report_media
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY report_media_select_own ON public.report_media
  FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR is_moderator_or_admin());

-- report_status_history: users read for own reports; mods/admins read and create all
CREATE POLICY report_status_history_select ON public.report_status_history h
  FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.reports r WHERE r.id = h.report_id AND r.user_id = auth.uid())
    OR is_moderator_or_admin()
  );

CREATE POLICY report_status_history_insert_mod_admin ON public.report_status_history
  FOR INSERT TO authenticated
  WITH CHECK (is_moderator_or_admin());

-- admin_notes: only mods/admins read and create
CREATE POLICY admin_notes_mod_admin ON public.admin_notes
  FOR ALL TO authenticated
  USING (is_moderator_or_admin())
  WITH CHECK (is_moderator_or_admin());

-- ---------------------------------------------------------------------------
-- Storage: private bucket for report media
-- ---------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'report-media',
  'report-media',
  false,
  10485760,  -- 10 MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'video/mp4']
)
ON CONFLICT (id) DO NOTHING;

-- RLS for storage (refined in 20260312110000): path convention user_id/report_id/file-name.
-- Example: 11111111-1111-1111-1111-111111111111/22222222-2222-2222-2222-222222222222/photo-1.jpg
CREATE POLICY report_media_storage_insert ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'report-media');

CREATE POLICY report_media_storage_select ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'report-media');

CREATE POLICY report_media_storage_update ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'report-media');

CREATE POLICY report_media_storage_delete ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'report-media');
