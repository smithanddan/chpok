import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import * as Location from "expo-location";
import { PatrolCandidate } from "./native";
import { supabase } from "../supabase-client";

const KEY = "chpok.patrol.queue.v1";
export const PATROL_LIMITS = {
  frameIntervalSeconds: 0.5,
  clipSeconds: 6,
  maxSessionSeconds: 900,
  cooldownSeconds: 30,
  maxPendingEvents: 12,
  maxClipBytes: 10 * 1024 * 1024,
  localRetentionDays: 7,
  originalRetentionDays: 30
} as const;

export type PatrolCard = PatrolCandidate & {
  status: "pending" | "uploading" | "confirmed";
  observer: { lat: number; lng: number; accuracyMeters: number } | null;
  reportId: string | null;
  createdAt: string;
};

const directory = `${FileSystem.documentDirectory}patrol/`;
async function saveMedia(uri: string, id: string, suffix: string) {
  await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
  const ext = uri.toLowerCase().endsWith(".jpg") ? "jpg" : "mp4";
  const target = `${directory}${id}-${suffix}.${ext}`;
  await FileSystem.copyAsync({ from: uri, to: target });
  return target;
}
export async function loadCards(): Promise<PatrolCard[]> {
  try { return JSON.parse((await AsyncStorage.getItem(KEY)) || "[]") as PatrolCard[]; }
  catch { return []; }
}
async function writeCards(cards: PatrolCard[]) { await AsyncStorage.setItem(KEY, JSON.stringify(cards)); }
export async function addCandidate(candidate: PatrolCandidate): Promise<PatrolCard | null> {
  const cards = await loadCards();
  if (cards.some(card => card.id === candidate.id) || cards.filter(card => card.status !== "confirmed").length >= PATROL_LIMITS.maxPendingEvents) {
    for (const uri of [candidate.clipUri, ...candidate.frameUris]) await FileSystem.deleteAsync(uri, { idempotent: true });
    return null;
  }
  const clipInfo = await FileSystem.getInfoAsync(candidate.clipUri, { size: true });
  if (!clipInfo.exists || ("size" in clipInfo && clipInfo.size > PATROL_LIMITS.maxClipBytes)) {
    for (const uri of [candidate.clipUri, ...candidate.frameUris]) await FileSystem.deleteAsync(uri, { idempotent: true });
    throw new Error("Клип больше 10 МБ; событие не сохранено");
  }
  const clipUri = await saveMedia(candidate.clipUri, candidate.id, "clip");
  const frameUris = await Promise.all(candidate.frameUris.slice(0, 3).map((uri, i) => saveMedia(uri, candidate.id, `frame-${i}`)));
  for (const uri of [candidate.clipUri, ...candidate.frameUris]) await FileSystem.deleteAsync(uri, { idempotent: true });
  let observer: PatrolCard["observer"] = null;
  try {
    const permission = await Location.getForegroundPermissionsAsync();
    if (permission.granted) {
      const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      if (position.coords.accuracy != null) observer = { lat: position.coords.latitude, lng: position.coords.longitude, accuracyMeters: position.coords.accuracy };
    }
  } catch { /* Location is optional. */ }
  const card: PatrolCard = { ...candidate, clipUri, frameUris, observer, status: "pending", reportId: null, createdAt: new Date().toISOString() };
  await writeCards([card, ...cards]);
  return card;
}
export async function updateCard(id: string, patch: Partial<PatrolCard>) {
  const cards = await loadCards();
  await writeCards(cards.map(card => card.id === id ? { ...card, ...patch } : card));
}
export async function rejectCard(id: string) {
  const cards = await loadCards();
  const card = cards.find(item => item.id === id);
  if (!card) return;
  if (card.reportId && card.status !== "confirmed") {
    if (!supabase) throw new Error("Нет связи с контуром для удаления загруженных файлов");
    const { data: userResult, error: userError } = await supabase.auth.getUser();
    if (userError || !userResult.user) throw new Error("Войдите, чтобы удалить уже загруженный черновик");
    const reportId = card.reportId;
    const { data: report, error: reportError } = await supabase.from("reports").select("status").eq("id", reportId).maybeSingle();
    if (reportError || report?.status !== "draft") throw new Error("Загруженное событие уже отправлено или недоступно для удаления");
    const paths = card.frameUris.map((_, i) => `${userResult.user.id}/${reportId}/patrol-frame-${i}.jpg`);
    const { error: storageError } = await supabase.storage.from("report-media").remove(paths);
    if (storageError) throw storageError;
    const { error: deleteError } = await supabase.from("reports").delete().eq("id", reportId).eq("status", "draft");
    if (deleteError) throw deleteError;
  }
  for (const uri of [card.clipUri, ...card.frameUris]) await FileSystem.deleteAsync(uri, { idempotent: true });
  await writeCards(cards.filter(item => item.id !== id));
}
export async function purgeExpiredCards() {
  const cards = await loadCards();
  const expiry = Date.now() - PATROL_LIMITS.localRetentionDays * 86400000;
  for (const card of cards.filter(item => Date.parse(item.createdAt) < expiry)) await rejectCard(card.id);
  const retained = new Set((await loadCards()).flatMap(card => [card.clipUri, ...card.frameUris]));
  try {
    for (const name of await FileSystem.readDirectoryAsync(directory)) {
      const uri = `${directory}${name}`;
      if (!retained.has(uri)) await FileSystem.deleteAsync(uri, { idempotent: true });
    }
  } catch { /* The directory may not exist before the first event. */ }
}
