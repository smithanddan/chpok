/** Delete every file before deleting its media rows and clearing the expiry marker.
 * A failed step leaves the report eligible for the next run. removeFile must treat
 * an already missing object as success so partial runs are retryable.
 */
export async function purgeExpiredEvidence(store, now, limit = 100) {
  const reports = await store.expiredReports(now, limit);
  const result = { processed: 0, failed: [] };
  for (const report of reports) {
    try {
      const media = await store.mediaForReport(report.id);
      for (const item of media) await store.removeFile(item.storage_path);
      await store.deleteMediaRows(report.id);
      await store.markEvidencePurged(report.id, now);
      result.processed += 1;
    } catch (error) {
      result.failed.push({ reportId: report.id, message: error instanceof Error ? error.message : String(error) });
    }
  }
  return result;
}
