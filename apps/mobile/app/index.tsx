import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { getOnboardingCompleted } from "../lib/onboarding-storage";

export default function Index() {
  const [ready, setReady] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const done = await getOnboardingCompleted();
      if (!cancelled) {
        setCompleted(done);
        setReady(true);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color="#FF418E" />
        <Text style={styles.loadingText}>Запускаем Chpok…</Text>
      </View>
    );
  }

  if (!completed) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/(tabs)/home" />;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: "#FFF8ED",
    alignItems: "center",
    justifyContent: "center",
    gap: 8
  },
  loadingText: {
    color: "#67758C",
    fontSize: 13
  }
});

