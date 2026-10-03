import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, writeFile, access, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { purgeExpiredEvidence } from './purge-patrol-evidence-core.mjs';

test('deletes files, media rows and expiry; retry recovers after partial deletion', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'chpok-patrol-retention-'));
  const one = join(dir, 'one.jpg');
  const two = join(dir, 'two.jpg');
  await writeFile(one, 'frame one');
  await writeFile(two, 'frame two');
  const report = { id: 'event-1', expiry: '2026-01-01' };
  let rows = [{ storage_path: one }, { storage_path: two }];
  let failSecondOnce = true;
  const store = {
    async expiredReports(now) { return report.expiry && report.expiry <= now ? [report] : []; },
    async mediaForReport() { return rows; },
    async removeFile(path) {
      if (path === two && failSecondOnce) { failSecondOnce = false; throw new Error('network timeout'); }
      await rm(path, { force: true });
    },
    async deleteMediaRows() { rows = []; },
    async markEvidencePurged() { report.expiry = null; }
  };
  try {
    const first = await purgeExpiredEvidence(store, '2026-10-03');
    assert.equal(first.processed, 0);
    assert.equal(first.failed.length, 1);
    assert.equal(rows.length, 2);
    assert.equal(report.expiry, '2026-01-01');
    await assert.rejects(access(one));
    await access(two);
    const retry = await purgeExpiredEvidence(store, '2026-10-03');
    assert.equal(retry.processed, 1);
    assert.deepEqual(retry.failed, []);
    assert.equal(rows.length, 0);
    assert.equal(report.expiry, null);
    await assert.rejects(access(two));
    const again = await purgeExpiredEvidence(store, '2026-10-03');
    assert.equal(again.processed, 0);
  } finally { await rm(dir, { recursive: true, force: true }); }
});

test('database deletion failure retains expiry and succeeds on next run', async () => {
  let rows = [{ storage_path: 'already-missing.jpg' }];
  let expiry = '2026-01-01';
  let fail = true;
  const store = {
    async expiredReports() { return expiry ? [{ id: 'event-2' }] : []; },
    async mediaForReport() { return rows; },
    async removeFile() {},
    async deleteMediaRows() { if (fail) { fail = false; throw new Error('database unavailable'); } rows = []; },
    async markEvidencePurged() { expiry = null; }
  };
  assert.equal((await purgeExpiredEvidence(store, '2026-10-03')).failed.length, 1);
  assert.equal(expiry, '2026-01-01');
  assert.equal((await purgeExpiredEvidence(store, '2026-10-03')).processed, 1);
  assert.equal(expiry, null);
});
