-- Chpok MVP: path-based RLS for report-media bucket
--
-- Path convention: user_id/report_id/file-name
-- Example: 11111111-1111-1111-1111-111111111111/22222222-2222-2222-2222-222222222222/photo-1.jpg
-- - First segment MUST equal the uploading/requesting user's auth.uid() (as text).
-- - App code must use this structure when uploading; report_media.storage_path should match.
--
-- Authenticated users: insert/select/update/delete only when (foldername)[1] = auth.uid().
-- Moderators/admins: broad read (SELECT) access; insert/update/delete use same path rule
-- to avoid role lookups in storage (see caveat below).

-- Drop existing broad policies
DROP POLICY IF EXISTS report_media_storage_insert ON storage.objects;
DROP POLICY IF EXISTS report_media_storage_select ON storage.objects;
DROP POLICY IF EXISTS report_media_storage_update ON storage.objects;
DROP POLICY IF EXISTS report_media_storage_delete ON storage.objects;

-- INSERT: object path must start with auth.uid() (user's own folder)
CREATE POLICY report_media_storage_insert ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'report-media'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- SELECT: own path OR moderator/admin (broad read for mods/admins)
CREATE POLICY report_media_storage_select ON storage.objects
  FOR SELECT TO authenticated
  USING (
    bucket_id = 'report-media'
    AND (
      (storage.foldername(name))[1] = auth.uid()::text
      OR public.is_moderator_or_admin()
    )
  );

-- UPDATE: same as INSERT (only own path); mods/admins not given broad write here
CREATE POLICY report_media_storage_update ON storage.objects
  FOR UPDATE TO authenticated
  USING (
    bucket_id = 'report-media'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- DELETE: only own path
CREATE POLICY report_media_storage_delete ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'report-media'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Caveat: Moderators/admins have broad SELECT only. They cannot UPDATE/DELETE objects
-- outside their own user_id folder via storage RLS (to keep policies simple and avoid
-- role lookups in storage context). If admin must delete another user's file, use
-- service role or a backend/Edge Function with elevated privileges.
