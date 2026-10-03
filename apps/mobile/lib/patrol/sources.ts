import * as ImagePicker from "expo-image-picker";
import { nativePatrol, PatrolCandidate } from "./native";

export interface VideoSource {
  id: "iphone" | "import" | "meta";
  label: string;
  available: boolean;
  start(): Promise<PatrolCandidate[]>;
  stop(): Promise<void>;
}

export const iphoneSource: VideoSource = {
  id: "iphone", label: "Камера iPhone", available: Boolean(nativePatrol),
  async start() {
    if (!nativePatrol) throw new Error("Нужна iOS development build с модулем Патруля");
    if (!(await nativePatrol.requestCamera())) throw new Error("Доступ к камере отклонён");
    await nativePatrol.startCamera();
    return [];
  },
  async stop() { await nativePatrol?.stopCamera(); }
};
export const importSource: VideoSource = {
  id: "import", label: "Импорт видео", available: Boolean(nativePatrol),
  async start() {
    if (!nativePatrol) throw new Error("Нужна iOS development build с модулем Патруля");
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ["videos"], allowsEditing: false });
    if (result.canceled || !result.assets[0]) return [];
    return nativePatrol.analyzeVideo(result.assets[0].uri);
  },
  async stop() {}
};
export const metaSource: VideoSource = {
  id: "meta", label: "Очки Meta — интеграция не подключена", available: false,
  async start() { throw new Error("Интеграция Meta ещё не подключена и не проверена на устройстве"); },
  async stop() {}
};
export const videoSources = [iphoneSource, importSource, metaSource];
