import { ExpoConfig } from "expo-config";

const defineConfig = (): ExpoConfig => ({
  name: "Chpok",
  slug: "chpok",
  scheme: "chpok",
  version: "0.1.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#FFF8ED"
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFF8ED"
    }
  },
  web: {
    favicon: "./assets/favicon.png"
  },
  plugins: ["expo-router"],
  extra: {
    eas: {
      projectId: "chpok-placeholder-project-id"
    }
  }
});

export default defineConfig;
