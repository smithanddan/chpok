import { Link } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>Ч</Text>
        </View>
        <View>
          <Text style={styles.name}>Гость Chpok</Text>
          <Text style={styles.meta}>Профиль скоро станет умнее</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Награды</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Награды скоро появятся</Text>
          <Text style={styles.cardText}>
            Здесь будут бейджи за точные чпоки, полезные сигналы и заботу о
            городе.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Активность</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Пока тихо</Text>
          <Text style={styles.cardText}>
            Как только вы начнёте отправлять сообщения, мы покажем простой
            счётчик и динамику.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ещё</Text>
        <View style={styles.links}>
          <Link href="/onboarding" asChild>
            <TouchableOpacity style={styles.linkRow}>
              <Text style={styles.linkText}>Посмотреть onboarding заново</Text>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity style={styles.linkRow}>
            <Text style={styles.linkText}>Помощь и контакт с командой</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8ED",
    paddingHorizontal: 24,
    paddingTop: 40
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FF418E",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12
  },
  avatarText: {
    color: "#FFF8ED",
    fontWeight: "700",
    fontSize: 20
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#17233B"
  },
  meta: {
    fontSize: 13,
    color: "#67758C",
    marginTop: 2
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#35435B",
    marginBottom: 8
  },
  card: {
    borderRadius: 18,
    padding: 14,
    backgroundColor: "#FFFFFF"
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#17233B",
    marginBottom: 4
  },
  cardText: {
    fontSize: 13,
    color: "#67758C",
    lineHeight: 18
  },
  links: {
    borderRadius: 18,
    backgroundColor: "#FFF8ED",
    borderWidth: 1,
    borderColor: "#D9DDE3"
  },
  linkRow: {
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  linkText: {
    fontSize: 13,
    color: "#35435B"
  }
});

