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
        "Backend not configured",
        "Reporting backend is not configured on this device yet."
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
          "Could not start report",
          "Please try again in a minute. If the problem persists, contact support."
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
        <Text style={styles.stepLabel}>Step 1 of 4</Text>
        <Text style={styles.title}>What happened?</Text>
        <Text style={styles.subtitle}>
          You will add photos and details on the next screens. For now, start
          with the type of situation.
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleStart}>
          <Text style={styles.primaryButtonText}>Start new report</Text>
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
    backgroundColor: "#020617",
    justifyContent: "space-between"
  },
  card: {
    borderRadius: 28,
    padding: 24,
    backgroundColor: "#0B1220"
  },
  stepLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: 2
  },
  title: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: "700",
    color: "#F9FAFB"
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#E5E7EB",
    lineHeight: 20
  },
  actions: {
    gap: 16
  },
  primaryButton: {
    backgroundColor: "#FF2D8A",
    borderRadius: 999,
    paddingVertical: 18,
    alignItems: "center"
  },
  primaryButtonText: {
    color: "#020617",
    fontWeight: "700",
    fontSize: 16
  }
});

