import { useRouter } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useReportDraft } from "../../lib/report-draft-context";
import { supabase } from "../../lib/supabase-client";
import { getCurrentUserWithProfile } from "../../lib/auth-helpers";

export default function ReportCaptureScreen() {
  const router = useRouter();
  const { draft, setDraft, resetDraft } = useReportDraft();

  const handleStart = async () => {
    // Start from a clean draft if previous one was completed.
    if (draft.reportId) {
      // For MVP we reuse the same draft object; if future flows need multiple drafts,
      // we can add an explicit \"New draft\" action.
    }

    const { userId } = await getCurrentUserWithProfile();
    if (!userId) {
      return;
    }

    if (!supabase) {
      Alert.alert(
        "Сервис пока не подключён",
        "На этом устройстве пока нельзя отправлять обращения."
      );
      return;
    }

    // If a draft report row already exists, reuse it.
    if (!draft.reportId) {
      const { data, error } = await supabase
        .from("reports")
        .insert({
          user_id: userId,
          status: "draft",
          source: "mobile_app"
        })
        .select("id")
        .maybeSingle();

      if (error || !data) {
        console.error("Failed to create draft report", error);
        Alert.alert(
          "Не получилось начать обращение",
          "Попробуйте ещё раз через минуту. Если ошибка повторится, напишите команде."
        );
        return;
      }

      setDraft((prev) => ({ ...prev, reportId: data.id as string }));
    }

    router.push("/report/violation-type");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.stepLabel}>Шаг 1 из 4</Text>
        <Text style={styles.title}>Что случилось?</Text>
        <Text style={styles.subtitle}>
          Фото и детали добавим на следующих шагах. Начните с типа ситуации.
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleStart}>
          <Text style={styles.primaryButtonText}>Начать обращение</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    backgroundColor: "#FFF8ED",
    justifyContent: "space-between"
  },
  card: {
    borderRadius: 28,
    padding: 24,
    backgroundColor: "#FFFFFF"
  },
  stepLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#67758C",
    textTransform: "uppercase",
    letterSpacing: 2
  },
  title: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: "700",
    color: "#17233B"
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#35435B",
    lineHeight: 20
  },
  actions: {
    gap: 16
  },
  primaryButton: {
    backgroundColor: "#FF418E",
    borderRadius: 999,
    paddingVertical: 18,
    alignItems: "center"
  },
  primaryButtonText: {
    color: "#FFF8ED",
    fontWeight: "700",
    fontSize: 16
  }
});
