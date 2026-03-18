import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "chpok_onboarding_completed_v1";

export async function getOnboardingCompleted(): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(KEY);
    return value === "true";
  } catch {
    return false;
  }
}

export async function setOnboardingCompleted(): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, "true");
  } catch {
    // ignore
  }
}

