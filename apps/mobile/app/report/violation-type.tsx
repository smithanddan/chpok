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
        <Text style={styles.stepLabel}>Шаг 2 из 4</Text>
        <Text style={styles.title}>Что именно не так?</Text>
        <Text style={styles.subtitle}>
          Выберите самый близкий вариант. Детали можно уточнить позже.
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
            <Text style={styles.secondaryButtonText}>Пропустить</Text>
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
    backgroundColor: "#FFF8ED"
  },
  headerCard: {
    borderRadius: 24,
    padding: 20,
    backgroundColor: "#FFFFFF",
    marginBottom: 16
  },
  stepLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#67758C",
    textTransform: "uppercase",
    letterSpacing: 2
  },
  title: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: "700",
    color: "#17233B"
  },
  subtitle: {
    marginTop: 6,
    fontSize: 13,
    color: "#35435B",
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
    backgroundColor: "#FFF8ED",
    borderWidth: 1,
    borderColor: "#AAB3C0",
    marginBottom: 10
  },
  chipSelected: {
    backgroundColor: "#FFE1ED",
    borderColor: "#FF418E"
  },
  chipLabel: {
    color: "#35435B",
    fontSize: 15,
    fontWeight: "500"
  },
  chipLabelSelected: {
    color: "#17233B"
  },
  footer: {
    marginTop: 8
  },
  secondaryButton: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#AAB3C0",
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: "#FFF8ED"
  },
  secondaryButtonText: {
    color: "#35435B",
    fontSize: 14,
    fontWeight: "500"
  }
});
