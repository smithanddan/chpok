import { Link } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function SuccessScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Сигнал отправлен</Text>
        <Text style={styles.subtitle}>
          Обращение ушло на проверку. Статус будет меняться в разделе «Мои
          обращения».
        </Text>
      </View>

      <View style={styles.actions}>
        <Link href="/reports" replace asChild>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>К моим обращениям</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/" replace asChild>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>На главную</Text>
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
  title: {
    fontSize: 24,
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
    gap: 12
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
    paddingVertical: 16,
    alignItems: "center",
    backgroundColor: "#FFF8ED"
  },
  secondaryButtonText: {
    color: "#35435B",
    fontSize: 15,
    fontWeight: "500"
  }
});
