import { Link } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.badge}>✦ ЧПОК / ГОРОДСКОЙ СИГНАЛ</Text>
        <Text style={styles.title}>Заметил — чпокни.</Text>
        <Text style={styles.subtitle}>
          Сообщите о проблеме на улице или во дворе. Город увидит сигнал и
          поймёт, кому его передать.
        </Text>
      </View>

      <View style={styles.actions}>
        <Link href="/report/capture" asChild>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Сообщить о проблеме  ↗</Text>
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
          <Text style={styles.infoTitle}>Что будет дальше</Text>
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
    backgroundColor: "#FFF8ED"
  },
  hero: {
    borderRadius: 28,
    padding: 24,
    backgroundColor: "#FFFFFF"
  },
  badge: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 4,
    textTransform: "uppercase",
    color: "#67758C"
  },
  title: {
    marginTop: 12,
    fontSize: 26,
    fontWeight: "700",
    color: "#17233B"
  },
  subtitle: {
    marginTop: 12,
    fontSize: 14,
    color: "#35435B",
    lineHeight: 20
  },
  actions: {
    marginTop: 32,
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
    fontSize: 15,
    fontWeight: "500"
  },
  info: {
    marginTop: 32
  },
  infoCard: {
    borderRadius: 20,
    padding: 16,
    backgroundColor: "#FFF8ED",
    borderWidth: 1,
    borderColor: "#D9DDE3"
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#17233B",
    marginBottom: 6
  },
  infoText: {
    fontSize: 13,
    color: "#67758C",
    lineHeight: 18
  }
});
