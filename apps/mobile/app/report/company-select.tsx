import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { useReportDraft } from "../../lib/report-draft-context";
import {
  PROVIDER_CONFIG,
  PROVIDER_CATEGORY_LABELS,
  PROVIDER_LABELS,
  type ProviderCategory,
  type ProviderKey
} from "../../lib/provider-config";

export default function CompanySelectScreen() {
  const router = useRouter();
  const { draft, setDraft } = useReportDraft();

  const category = (draft.providerCategory as ProviderCategory) ?? "other";
  const currentConfig =
    PROVIDER_CONFIG.find((c) => c.category === category) ??
    PROVIDER_CONFIG[PROVIDER_CONFIG.length - 1];

  const handleSelectProvider = (key: ProviderKey) => {
    setDraft((prev) => ({
      ...prev,
      providerCategory: currentConfig.category,
      providerKey: key
    }));
    router.push("/report/review");
  };

  const handleSkip = () => {
    setDraft((prev) => ({
      ...prev,
      providerKey: null
    }));
    router.push("/report/review");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <Text style={styles.stepLabel}>Шаг 4 из 4</Text>
        <Text style={styles.title}>Какой это сервис или транспорт?</Text>
        <Text style={styles.subtitle}>
          Вы выбрали категорию «{PROVIDER_CATEGORY_LABELS[currentConfig.category]}». Теперь
          отметьте бренд или выберите «Другое» / «Не знаю».
        </Text>
      </View>

      <ScrollView
        style={styles.list}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {currentConfig.providers.map((option) => {
          const selected = draft.providerKey === option.key;
          return (
            <TouchableOpacity
              key={option.key}
              style={[styles.companyCard, selected && styles.companyCardSelected]}
              onPress={() => handleSelectProvider(option.key)}
            >
              <Text
                style={[
                  styles.companyName,
                  selected && styles.companyNameSelected
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}

        <View style={styles.manualBlock}>
          <Text style={styles.manualLabel}>
            Не нашли подходящее? Можно пропустить этот шаг.
          </Text>
          <TouchableOpacity style={styles.secondaryButton} onPress={handleSkip}>
            <Text style={styles.secondaryButtonText}>Продолжить без бренда</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16
  },
  loadingText: {
    color: "#9CA3AF",
    fontSize: 13
  },
  companyCard: {
    borderRadius: 22,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#374151",
    marginBottom: 10
  },
  companyCardSelected: {
    backgroundColor: "#FF2D8A22",
    borderColor: "#FF2D8A"
  },
  companyName: {
    color: "#E5E7EB",
    fontSize: 15,
    fontWeight: "600"
  },
  companyNameSelected: {
    color: "#F9FAFB"
  },
  companyCategory: {
    marginTop: 2,
    color: "#9CA3AF",
    fontSize: 12
  },
  manualBlock: {
    marginTop: 16,
    borderRadius: 20,
    padding: 16,
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#1F2937"
  },
  manualLabel: {
    color: "#E5E7EB",
    fontSize: 13,
    marginBottom: 8
  },
  input: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#374151",
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#F9FAFB",
    fontSize: 14,
    marginBottom: 10
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

