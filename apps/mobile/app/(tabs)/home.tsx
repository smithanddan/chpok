import { Link } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.badge}>CHPOK</Text>
        <Text style={styles.title}>Замечай. Чпокай. Город реагирует.</Text>
        <Text style={styles.subtitle}>
          Сообщите о парковке на тротуаре, опасной езде или бардаке во дворе за
          пару тапов.
        </Text>
      </View>

      <View style={styles.actions}>
        <Link href="/report/capture" asChild>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Чпокнуть проблему</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/(tabs)/my-reports" asChild>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Мои обращения</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <View style={styles.info}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Что дальше?</Text>
          <Text style={styles.infoText}>
            Модераторы проверят ваш чпок, передадут его ответственным службам, а
            статус будет меняться в разделе «Мои обращения».
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 32,
    backgroundColor: "#020617"
  },
  hero: {
    borderRadius: 28,
    padding: 24,
    backgroundColor: "#0B1220"
  },
  badge: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 4,
    textTransform: "uppercase",
    color: "#9CA3AF"
  },
  title: {
    marginTop: 12,
    fontSize: 26,
    fontWeight: "700",
    color: "#F9FAFB"
  },
  subtitle: {
    marginTop: 12,
    fontSize: 14,
    color: "#E5E7EB",
    lineHeight: 20
  },
  actions: {
    marginTop: 32,
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
    fontSize: 15,
    fontWeight: "500"
  },
  info: {
    marginTop: 32
  },
  infoCard: {
    borderRadius: 20,
    padding: 16,
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#1F2937"
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#F9FAFB",
    marginBottom: 6
  },
  infoText: {
    fontSize: 13,
    color: "#9CA3AF",
    lineHeight: 18
  }
});

