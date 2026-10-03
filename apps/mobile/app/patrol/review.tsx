import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Video, ResizeMode } from "expo-av";
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { loadCards, PatrolCard, rejectCard } from "../../lib/patrol/queue";
import { submitPatrolCard } from "../../lib/patrol/submit";

export default function PatrolReviewScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [card, setCard] = useState<PatrolCard | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => { loadCards().then(cards => setCard(cards.find(item => item.id === id) || null)); }, [id]);
  const confirm = async () => {
    if (!card) return;
    setBusy(true); setError("");
    try { await submitPatrolCard(card); Alert.alert("Отправлено", "Карточка поступила на проверку."); router.replace("/patrol"); }
    catch (e) { setError(e instanceof Error ? e.message : String(e)); }
    finally { setBusy(false); }
  };
  if (!card) return <Text style={styles.text}>Карточка не найдена.</Text>;
  return <ScrollView style={styles.page} contentContainerStyle={styles.content}>
    <Text style={styles.title}>Проверьте событие</Text>
    <Text style={styles.text}>Это предварительная гипотеза. Убедитесь, что оба человека движутся на одном самокате, а рядом нет прохожего или второго самоката.</Text>
    <Text style={styles.text}>Клип остаётся только на iPhone. В обращение попадут 1–3 кадра; модератор не сможет независимо проверить движение по видео.</Text>
    <Video source={{ uri: card.clipUri }} style={styles.video} useNativeControls resizeMode={ResizeMode.CONTAIN} />
    {card.frameUris.map(uri => <Image key={uri} source={{ uri }} style={styles.frame} resizeMode="contain" />)}
    <Text style={styles.text}>Время: {new Date(card.occurredAt).toLocaleString("ru-RU")}</Text>
    <Text style={styles.text}>Источник: {card.source === "iphone" ? "камера iPhone" : "импорт видео"}</Text>
    <Text style={styles.text}>Координаты наблюдателя: {card.observer ? `${card.observer.lat.toFixed(5)}, ${card.observer.lng.toFixed(5)} · точность ±${Math.round(card.observer.accuracyMeters)} м` : "неизвестны"}</Text>
    <Text style={styles.text}>Оператор и номер самоката: неизвестны</Text>
    <Text style={styles.text}>Загруженные кадры доступны только автору и модераторам. Для иного просмотра нужна копия с замазанными лицами.</Text>
    {!!error && <Text style={styles.error}>{error}</Text>}
    {card.status !== "confirmed" && <TouchableOpacity disabled={busy || card.frameUris.length === 0} style={styles.confirm} onPress={confirm}><Text style={styles.confirmText}>{busy ? "Отправляем…" : card.frameUris.length === 0 ? "Нет кадров для отправки" : "Подтверждаю подозрение и отправляю кадры"}</Text></TouchableOpacity>}
    {card.status !== "confirmed" && <TouchableOpacity disabled={busy} onPress={async () => { try { await rejectCard(card.id); router.replace("/patrol"); } catch (e) { setError(e instanceof Error ? e.message : String(e)); } }}><Text style={styles.reject}>Отклонить и удалить материалы</Text></TouchableOpacity>}
  </ScrollView>;
}
const styles = StyleSheet.create({ page: { flex: 1, backgroundColor: "#FFF8ED" }, content: { padding: 20, gap: 14 }, title: { fontSize: 23, fontWeight: "800", color: "#17233B" }, text: { color: "#35435B", lineHeight: 21 }, video: { height: 260, backgroundColor: "#17233B", borderRadius: 12 }, frame: { height: 180, backgroundColor: "#DDD", borderRadius: 12 }, confirm: { backgroundColor: "#FF418E", padding: 17, borderRadius: 25, alignItems: "center" }, confirmText: { color: "white", fontWeight: "800" }, reject: { color: "#A02222", textAlign: "center", fontWeight: "700", padding: 14 }, error: { color: "#A02222" } });
