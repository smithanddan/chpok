import { Link, useRouter } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useReportDraft } from "../../lib/report-draft-context";
import { VIOLATION_OPTIONS, ViolationType } from "../../lib/report-types";

export default function ViolationTypeScreen() {
  const router = useRouter();
  const { draft, setDraft } = useReportDraft();

  const handleSelect = (value: ViolationType) => {
    setDraft((prev) => ({ ...prev, violationType: value }));
    router.push("/report/object-type");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <Text style={styles.stepLabel}>Step 2 of 4</Text>
        <Text style={styles.title}>What kind of violation?</Text>
        <Text style={styles.subtitle}>
          Choose the closest option. You can refine details later.
        </Text>
      </View>

      <ScrollView style={styles.list} contentContainerStyle={{ paddingBottom: 24 }}>
        {VIOLATION_OPTIONS.map((opt) => {
          const selected = draft.violationType === opt.value;
          return (
            <TouchableOpacity
              key={opt.value}
              style={[styles.chip, selected && styles.chipSelected]}
              onPress={() => handleSelect(opt.value)}
            >
              <Text
                style={[styles.chipLabel, selected && styles.chipLabelSelected]}
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <Link href="/report/object-type" asChild>
          <TouchableOpacity
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonText}>Skip for now</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: "#020617"
  },
  headerCard: {
    borderRadius: 24,
    padding: 20,
    backgroundColor: "#0B1220",
    marginBottom: 16
  },
  stepLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: 2
  },
  title: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: "700",
    color: "#F9FAFB"
  },
  subtitle: {
    marginTop: 6,
    fontSize: 13,
    color: "#E5E7EB",
    lineHeight: 18
  },
  list: {
    flex: 1,
    marginTop: 4
  },
  chip: {
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#374151",
    marginBottom: 10
  },
  chipSelected: {
    backgroundColor: "#FF2D8A22",
    borderColor: "#FF2D8A"
  },
  chipLabel: {
    color: "#E5E7EB",
    fontSize: 15,
    fontWeight: "500"
  },
  chipLabelSelected: {
    color: "#F9FAFB"
  },
  footer: {
    marginTop: 8
  },
  secondaryButton: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#374151",
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: "#020617"
  },
  secondaryButtonText: {
    color: "#E5E7EB",
    fontSize: 14,
    fontWeight: "500"
  }
});

