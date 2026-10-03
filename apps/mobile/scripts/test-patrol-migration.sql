-- Run only against a disposable database after all repository migrations.
-- All example data is rolled back.
BEGIN;
INSERT INTO auth.users (id) VALUES ('11111111-1111-1111-1111-111111111111');
INSERT INTO public.reports (
  id, user_id, source, object_type, violation_type, patrol_event_id,
  patrol_video_source, patrol_analysis, evidence_expires_at
) VALUES (
  '22222222-2222-2222-2222-222222222222',
  '11111111-1111-1111-1111-111111111111', 'patrol', 'scooter',
  'scooter_double_riding', '33333333-3333-3333-3333-333333333333',
  'iphone', 'heuristic_suspicion', now() - interval '1 day'
);
INSERT INTO public.report_media (report_id, user_id, storage_path, media_type)
VALUES (
  '22222222-2222-2222-2222-222222222222',
  '11111111-1111-1111-1111-111111111111',
  '11111111-1111-1111-1111-111111111111/22222222-2222-2222-2222-222222222222/patrol-frame-0.jpg',
  'image/jpeg'
);
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'report-media' AND 'video/mp4' = ANY(allowed_mime_types)) THEN
    RAISE EXCEPTION 'Video upload remains allowed';
  END IF;
  BEGIN
    INSERT INTO public.report_media (report_id, user_id, storage_path, media_type)
    VALUES ('22222222-2222-2222-2222-222222222222',
      '11111111-1111-1111-1111-111111111111', 'blocked.mp4', 'video/mp4');
    RAISE EXCEPTION 'Video media insert unexpectedly succeeded';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'New report videos are disabled' THEN RAISE; END IF;
  END;
  BEGIN
    INSERT INTO public.reports (user_id, patrol_event_id)
    VALUES ('11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333');
    RAISE EXCEPTION 'Duplicate event unexpectedly succeeded';
  EXCEPTION WHEN unique_violation THEN NULL;
  END;
  IF (SELECT count(*) FROM public.report_media WHERE report_id = '22222222-2222-2222-2222-222222222222') <> 1 THEN
    RAISE EXCEPTION 'Still frame was not inserted';
  END IF;
END;
$$;
SELECT 'patrol migration checks passed' AS result;
ROLLBACK;
