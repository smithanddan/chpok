// Schedule daily on the verified RF backend. The service-role key never belongs in the app.
import { createClient } from '@supabase/supabase-js';
import { purgeExpiredEvidence } from './purge-patrol-evidence-core.mjs';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (process.env.CHPOK_DATA_REGION !== 'ru' || !url || !key) {
  throw new Error('Verified RF backend and server credentials are required');
}
const db = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
const query = async (promise) => {
  const { data, error } = await promise;
  if (error) throw error;
  return data;
};
const store = {
  expiredReports: (now, limit) => query(db.from('reports').select('id').eq('source', 'patrol').lte('evidence_expires_at', now).order('id').limit(limit)),
  mediaForReport: (id) => query(db.from('report_media').select('storage_path').eq('report_id', id)),
  async removeFile(path) {
    const { error } = await db.storage.from('report-media').remove([path]);
    if (error) throw error;
  },
  deleteMediaRows: (id) => query(db.from('report_media').delete().eq('report_id', id)),
  markEvidencePurged: (id, now) => query(db.from('reports').update({ evidence_expires_at: null }).eq('id', id).lte('evidence_expires_at', now))
};
const result = await purgeExpiredEvidence(store, new Date().toISOString());
console.log(JSON.stringify(result));
if (result.failed.length) process.exitCode = 1;
