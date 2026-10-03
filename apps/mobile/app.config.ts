import type { ExpoConfig } from "expo/config";

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
    bundleIdentifier: "app.chpok",
    supportsTablet: true,
    infoPlist: {
      NSCameraUsageDescription: "Камера нужна только во время запущенной сессии Патруля.",
      NSLocationWhenInUseUsageDescription: "Координаты наблюдателя помогают проверить место события."
    }
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
  plugins: [
    "expo-router",
    ["expo-image-picker", { photosPermission: "Разрешите выбрать видео для локальной проверки.", microphonePermission: false }]
  ]
});

export default defineConfig;
