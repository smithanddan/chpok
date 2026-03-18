import { Link } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function SuccessScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Thank you for your signal</Text>
        <Text style={styles.subtitle}>
          Your report has been sent to the city team. You can track it in “My
          reports”.
        </Text>
      </View>

      <View style={styles.actions}>
        <Link href="/reports" replace asChild>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Go to My reports</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/" replace asChild>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Back to home</Text>
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
    backgroundColor: "#020617",
    justifyContent: "space-between"
  },
  card: {
    borderRadius: 28,
    padding: 24,
    backgroundColor: "#0B1220"
  },
  title: {
    fontSize: 24,
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
    gap: 12
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
    paddingVertical: 16,
    alignItems: "center",
    backgroundColor: "#020617"
  },
  secondaryButtonText: {
    color: "#E5E7EB",
    fontSize: 15,
    fontWeight: "500"
  }
});

