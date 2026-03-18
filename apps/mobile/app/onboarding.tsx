import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import {
  getOnboardingCompleted,
  setOnboardingCompleted
} from "../lib/onboarding-storage";

const SCREENS = [
  {
    title: "Чпок — это быстрый сигнал городу",
    text: "Заметили опасную парковку, самокат на тротуаре или бардак во дворе? Зафиксируйте и отправьте за пару секунд."
  },
  {
    title: "Сфоткал, описал, отправил",
    text: "Сделайте фото, коротко опишите проблему и укажите, что именно не так. Остальное — забота города."
  },
  {
    title: "Каждый чпок — вклад в порядок",
    text: "Модераторы проверят сообщения, передадут их службам, а вы сможете отслеживать статусы в разделе «Мои обращения»."
  }
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const completed = await getOnboardingCompleted();
      if (!cancelled) {
        if (completed) {
          router.replace("/(tabs)/home");
        } else {
          setInitialLoading(false);
        }
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [router]);

  const handleNext = async () => {
    if (index < SCREENS.length - 1) {
      setIndex((prev) => prev + 1);
      return;
    }
    await setOnboardingCompleted();
    router.replace("/(tabs)/home");
  };

  if (initialLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color="#FF2D8A" />
        <Text style={styles.loadingText}>Готовим Chpok…</Text>
      </View>
    );
  }

  const step = SCREENS[index];
  const isLast = index === SCREENS.length - 1;

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>Ч</Text>
        </View>
        <Text style={styles.badge}>ГОРОДСКОЙ СИГНАЛ</Text>
        <Text style={styles.title}>{step.title}</Text>
        <Text style={styles.text}>{step.text}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.dots}>
          {SCREENS.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === index && styles.dotActive
              ]}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
          <Text style={styles.primaryText}>
            {isLast ? "Чпокнуть" : "Дальше"}
          </Text>
        </TouchableOpacity>
        {!isLast && (
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={async () => {
              await setOnboardingCompleted();
              router.replace("/(tabs)/home");
            }}
          >
            <Text style={styles.secondaryText}>Пропустить</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 32,
    justifyContent: "space-between"
  },
  loading: {
    flex: 1,
    backgroundColor: "#020617",
    alignItems: "center",
    justifyContent: "center",
    gap: 8
  },
  loadingText: {
    color: "#9CA3AF",
    fontSize: 13
  },
  hero: {
    borderRadius: 32,
    padding: 24,
    backgroundColor: "#0B1220"
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FF2D8A",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16
  },
  logoText: {
    color: "#020617",
    fontSize: 22,
    fontWeight: "800"
  },
  badge: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 3,
    textTransform: "uppercase",
    color: "#9CA3AF"
  },
  title: {
    marginTop: 12,
    fontSize: 24,
    fontWeight: "700",
    color: "#F9FAFB"
  },
  text: {
    marginTop: 12,
    fontSize: 14,
    color: "#E5E7EB",
    lineHeight: 20
  },
  footer: {
    gap: 16
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#1F2937"
  },
  dotActive: {
    backgroundColor: "#FF2D8A",
    width: 16
  },
  primaryButton: {
    backgroundColor: "#FF2D8A",
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center"
  },
  primaryText: {
    color: "#020617",
    fontWeight: "700",
    fontSize: 16
  },
  secondaryButton: {
    alignItems: "center",
    paddingVertical: 8
  },
  secondaryText: {
    color: "#9CA3AF",
    fontSize: 13
  }
});

