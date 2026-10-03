import { useEffect, useState } from "react";
import { AppState, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import { patrolEvents, PatrolCandidate } from "../../lib/patrol/native";
import { addCandidate, loadCards, PATROL_LIMITS, PatrolCard, purgeExpiredCards } from "../../lib/patrol/queue";
import { videoSources, iphoneSource } from "../../lib/patrol/sources";

export default function PatrolScreen() {
  const router = useRouter();
  const [source, setSource] = useState<"iphone" | "import" | "meta">("iphone");
  const [running, setRunning] = useState(false);
  const [started, setStarted] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [cards, setCards] = useState<PatrolCard[]>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const refresh = async () => setCards(await loadCards());
  const receive = async (candidate: PatrolCandidate) => {
    try { await addCandidate(candidate); await refresh(); }
    catch (e) { setError(String(e)); }
  };
  useEffect(() => {
    purgeExpiredCards().catch(e => setError(String(e))).finally(refresh);
    const event = patrolEvents?.addListener("onCandidate", receive);
    const failure = patrolEvents?.addListener("onPatrolError", ({ message }: { message: string }) => { setError(message); setRunning(false); });
    const app = AppState.addEventListener("change", state => { if (state !== "active") { iphoneSource.stop(); setRunning(false); } });
    return () => { event?.remove(); failure?.remove(); app.remove(); iphoneSource.stop(); };
  }, []);
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => setSeconds(Math.floor((Date.now() - started) / 1000)), 1000);
    return () => clearInterval(timer);
  }, [running, started]);
  const stop = async () => { await iphoneSource.stop(); setRunning(false); };
  const start = async () => {
    setError(null);
    const selected = videoSources.find(item => item.id === source);
    if (!selected) return;
    setBusy("source");
    try {
      if (source === "iphone") {
        const permission = await Location.requestForegroundPermissionsAsync();
        if (permission.status !== "granted") setError("Геопозиция не разрешена. Координаты наблюдателя не будут записаны.");
      }
      const candidates = await selected.start();
      for (const candidate of candidates) await receive(candidate);
      if (source === "iphone") { setStarted(Date.now()); setSeconds(0); setRunning(true); }
      else if (source === "import" && !candidates.length) setError("В выбранном видео проверяемых событий не найдено.");
    } catch (e) { setError(e instanceof Error ? e.message : String(e)); }
    finally { setBusy(null); }
  };
  return <ScrollView style={styles.page} contentContainerStyle={styles.content}>
    <Text style={styles.title}>ЧПОК Патруль</Text>
    <Text style={styles.note}>Пилот: предполагаемая поездка вдвоём. Решение принимает человек после просмотра доказательства.</Text>
    <Text style={styles.heading}>Источник</Text>
    {videoSources.map(item => <TouchableOpacity key={item.id} style={[styles.source, source === item.id && styles.selected]} onPress={() => !running && item.available && setSource(item.id)} disabled={running || !item.available}>
      <Text style={styles.sourceText}>{item.label}</Text><Text>{item.available ? "Доступен" : "Недоступен"}</Text>
    </TouchableOpacity>)}
    <View style={styles.row}><Text style={styles.heading}>Сессия</Text><Text>{running ? `Идёт · ${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}` : "Остановлена"}</Text></View>
    <Text style={styles.note}>Клип {PATROL_LIMITS.clipSeconds} с · до {PATROL_LIMITS.maxPendingEvents} событий · сессия до 15 мин. Полная прогулка не записывается.</Text>
    <TouchableOpacity style={styles.button} disabled={Boolean(busy)} onPress={running ? stop : start}><Text style={styles.buttonText}>{running ? "Остановить и освободить камеру" : busy === "source" ? "Подключаем…" : "Начать"}</Text></TouchableOpacity>
    {error && <Text style={styles.error}>Ошибка: {error}</Text>}
    <Text style={styles.heading}>Очередь проверки · {cards.filter(card => card.status !== "confirmed").length}</Text>
    {cards.map(card => <View style={styles.card} key={card.id}>
      <Text style={styles.cardTitle}>Предполагаемая поездка вдвоём</Text>
      <Text style={styles.note}>{new Date(card.occurredAt).toLocaleString("ru-RU")} · {card.source === "iphone" ? "камера iPhone" : "импорт"}</Text>
      <Text style={styles.note}>{card.reason}</Text>
      <Text style={styles.note}>{card.observer ? `Координаты наблюдателя: ±${Math.round(card.observer.accuracyMeters)} м` : "Координаты наблюдателя неизвестны"}</Text>
      <Text style={styles.note}>Оператор и номер самоката: неизвестны</Text>
      <TouchableOpacity onPress={() => router.push({ pathname: "/patrol/review", params: { id: card.id } })}><Text style={styles.link}>Открыть клип и проверить →</Text></TouchableOpacity>
      {card.status === "confirmed" && <Text style={styles.note}>Отправлено · {card.reportId}</Text>}
    </View>)}
  </ScrollView>;
}
const styles = StyleSheet.create({ page: { flex: 1, backgroundColor: "#FFF8ED" }, content: { padding: 20, paddingBottom: 40, gap: 12 }, title: { fontSize: 27, fontWeight: "800", color: "#17233B" }, heading: { fontSize: 17, fontWeight: "700", color: "#17233B", marginTop: 10 }, note: { color: "#58657B", lineHeight: 19 }, source: { backgroundColor: "white", padding: 15, borderRadius: 14, flexDirection: "row", justifyContent: "space-between" }, selected: { borderWidth: 2, borderColor: "#FF418E" }, sourceText: { fontWeight: "700", color: "#17233B" }, row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 8 }, button: { backgroundColor: "#FF418E", padding: 17, borderRadius: 25, alignItems: "center" }, buttonText: { color: "white", fontWeight: "800" }, error: { color: "#A02222", backgroundColor: "#FFE5E5", padding: 12, borderRadius: 8 }, card: { backgroundColor: "white", borderRadius: 16, padding: 16, gap: 8 }, cardTitle: { fontWeight: "800", fontSize: 16, color: "#17233B" }, link: { color: "#CF216C", fontWeight: "700" }, reject: { color: "#A02222", fontWeight: "700" } });
