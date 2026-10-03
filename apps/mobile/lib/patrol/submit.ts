import { supabase } from "../supabase-client";
import { getCurrentUserWithProfile } from "../auth-helpers";
import { PatrolCard, updateCard } from "./queue";

const bucket = "report-media";
async function uploadOne(userId: string, card: PatrolCard, reportId: string, uri: string, name: string, mediaType: string, order: number) {
  if (!supabase) throw new Error("Контур обращений не настроен");
  const path = `${userId}/${reportId}/${name}`;
  const response = await fetch(uri);
  const blob = await response.blob();
  if (blob.size > 10 * 1024 * 1024) throw new Error("Доказательство превышает лимит 10 МБ");
  const { error: uploadError } = await supabase.storage.from(bucket).upload(path, blob, { contentType: mediaType, upsert: false });
  if (uploadError && !/already exists|duplicate/i.test(uploadError.message)) throw uploadError;
  const { data: existing, error: lookupError } = await supabase.from("report_media").select("id").eq("storage_path", path).maybeSingle();
  if (lookupError) throw lookupError;
  if (!existing) {
    const { error: rowError } = await supabase.from("report_media").insert({ report_id: reportId, user_id: userId, storage_path: path, media_type: mediaType, sort_order: order });
    if (rowError && rowError.code !== "23505") throw rowError;
  }
}

export async function submitPatrolCard(card: PatrolCard): Promise<string> {
  if (!supabase) throw new Error("Контур обращений не настроен");
  if (card.frameUris.length < 1 || card.frameUris.length > 3) throw new Error("Для отправки нужны 1–3 кадра события");
  if (process.env.EXPO_PUBLIC_DATA_REGION !== "ru") throw new Error("Отправка выключена: РФ-контур данных не подтверждён в конфигурации");
  const { userId } = await getCurrentUserWithProfile();
  if (!userId) throw new Error("Войдите в аккаунт, чтобы отправить чпок");
  const reportId = card.reportId || card.id;
  // Client-generated report ID and deterministic storage paths make retries idempotent.
  const { error: insertError } = await supabase.from("reports").insert({
    id: reportId, user_id: userId, status: "draft", source: "patrol",
    object_type: "scooter", violation_type: "scooter_double_riding",
    description: "Предполагаемая поездка вдвоём на одном самокате. Пользователь проверил локальный клип; в обращение отправлены только кадры. Движение не может быть перепроверено по серверным доказательствам. Оператор и номер неизвестны.",
    occurred_at: card.occurredAt,
    lat: card.observer?.lat ?? null, lng: card.observer?.lng ?? null,
    patrol_event_id: card.id, patrol_video_source: card.source,
    observer_accuracy_m: card.observer?.accuracyMeters ?? null,
    patrol_analysis: "heuristic_suspicion",
    evidence_expires_at: new Date(Date.now() + 30 * 86400000).toISOString()
  });
  if (insertError && insertError.code !== "23505") throw insertError;
  if (insertError) {
    const { data: existing, error: readError } = await supabase.from("reports").select("id,user_id,patrol_event_id,status").eq("id", reportId).maybeSingle();
    if (readError || !existing || existing.user_id !== userId || existing.patrol_event_id !== card.id) throw new Error("Конфликт идентификатора события");
    if (existing.status === "submitted") { await updateCard(card.id, { status: "confirmed", reportId }); return reportId; }
    if (existing.status !== "draft") throw new Error("Событие уже обработано");
  }
  await updateCard(card.id, { status: "uploading", reportId });
  for (let index = 0; index < card.frameUris.length; index++) {
    await uploadOne(userId, card, reportId, card.frameUris[index], `patrol-frame-${index}.jpg`, "image/jpeg", index);
  }
  const { error: submitError } = await supabase.from("reports").update({ status: "submitted", submitted_at: new Date().toISOString() }).eq("id", reportId).eq("status", "draft");
  if (submitError) throw submitError;
  await updateCard(card.id, { status: "confirmed", reportId });
  return reportId;
}
