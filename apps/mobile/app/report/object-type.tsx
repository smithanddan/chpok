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
  PROVIDER_CATEGORY_LABELS,
  type ProviderCategory
} from "../../lib/provider-config";

export default function ObjectTypeScreen() {
  const router = useRouter();
  const { draft, setDraft } = useReportDraft();

  const handleSelect = (category: ProviderCategory) => {
    setDraft((prev) => ({
      ...prev,
      providerCategory: category,
      providerKey: null
    }));
    router.push("/report/company-select");
  };

  const categories = Object.entries(PROVIDER_CATEGORY_LABELS) as [
    ProviderCategory,
    string
  ][];

  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <Text style={styles.stepLabel}>Шаг 3 из 4</Text>
        <Text style={styles.title}>Кого или что вы чпокаете?</Text>
        <Text style={styles.subtitle}>
          Сначала выберите тип: доставка, такси, каршеринг, авто или что-то ещё.
        </Text>
      </View>

      <ScrollView
        style={styles.list}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {categories.map(([value, label]) => {
          const selected = draft.providerCategory === value;
          return (
            <TouchableOpacity
              key={value}
              style={[styles.card, selected && styles.cardSelected]}
              onPress={() => handleSelect(value)}
            >
              <Text
                style={[styles.cardLabel, selected && styles.cardLabelSelected]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push("/report/company-select")}
        >
          <Text style={styles.secondaryButtonText}>Пропустить</Text>
        </TouchableOpacity>
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
  card: {
    borderRadius: 22,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#FFF8ED",
    borderWidth: 1,
    borderColor: "#AAB3C0",
    marginBottom: 10
  },
  cardSelected: {
    backgroundColor: "#FFE1ED",
    borderColor: "#FF418E"
  },
  cardLabel: {
    color: "#35435B",
    fontSize: 15,
    fontWeight: "500"
  },
  cardLabelSelected: {
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
