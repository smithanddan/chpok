-- Patrol reports reuse the existing reports, report_media, auth, and private storage flow.
ALTER TABLE public.reports DROP CONSTRAINT IF EXISTS reports_violation_type_check;
ALTER TABLE public.reports ADD CONSTRAINT reports_violation_type_check CHECK (violation_type IN (
  'dangerous_driving', 'sidewalk_riding', 'bad_parking', 'blocked_passage',
  'accident_or_near_miss', 'other', 'scooter_double_riding'
));
ALTER TABLE public.reports
  ADD COLUMN patrol_event_id uuid,
  ADD COLUMN patrol_video_source text CHECK (patrol_video_source IN ('iphone', 'import', 'meta')),
  ADD COLUMN observer_accuracy_m numeric CHECK (observer_accuracy_m >= 0),
  ADD COLUMN patrol_analysis text CHECK (patrol_analysis IN ('heuristic_suspicion')),
  ADD COLUMN evidence_expires_at timestamptz;
CREATE UNIQUE INDEX reports_patrol_event_id_key ON public.reports(patrol_event_id) WHERE patrol_event_id IS NOT NULL;
CREATE UNIQUE INDEX report_media_storage_path_key ON public.report_media(storage_path);
DROP POLICY IF EXISTS report_media_insert_own ON public.report_media;
CREATE POLICY report_media_insert_own ON public.report_media
  FOR INSERT TO authenticated
  WITH CHECK (
    user_id = (select auth.uid())
    AND storage_path LIKE (select auth.uid())::text || '/' || report_id::text || '/%'
    AND EXISTS (SELECT 1 FROM public.reports r WHERE r.id = report_id AND r.user_id = (select auth.uid()))
  );
CREATE POLICY reports_delete_own_patrol_draft ON public.reports
  FOR DELETE TO authenticated
  USING (user_id = (select auth.uid()) AND source = 'patrol' AND status = 'draft');
-- Match the frames-only policy of smithanddan/chp_new PR #16. Legacy video objects
-- remain readable, while all new report uploads are restricted to still images.
UPDATE storage.buckets
SET allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/heic']
WHERE id = 'report-media';
CREATE OR REPLACE FUNCTION public.reject_new_report_video()
RETURNS trigger LANGUAGE plpgsql SET search_path = '' AS $$
BEGIN
  IF lower(NEW.media_type) = 'video' OR lower(NEW.media_type) LIKE 'video/%' THEN
    RAISE EXCEPTION 'New report videos are disabled';
  END IF;
  RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.reject_new_report_video() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER reject_new_report_video_insert
  BEFORE INSERT OR UPDATE OF media_type ON public.report_media
  FOR EACH ROW EXECUTE FUNCTION public.reject_new_report_video();
COMMENT ON COLUMN public.reports.lat IS 'For patrol reports: observer latitude, not offender location.';
COMMENT ON COLUMN public.reports.lng IS 'For patrol reports: observer longitude, not offender location.';
COMMENT ON COLUMN public.reports.evidence_expires_at IS 'Deletion deadline for patrol originals; run the evidence cleanup worker daily.';
