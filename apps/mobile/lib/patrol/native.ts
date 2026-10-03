import { requireOptionalNativeModule } from "expo-modules-core";
import { Platform } from "react-native";

export type PatrolCandidate = {
  id: string;
  occurredAt: string;
  source: "iphone" | "import";
  clipUri: string;
  frameUris: string[];
  reason: string;
};

type NativePatrol = {
  requestCamera(): Promise<boolean>;
  startCamera(): Promise<void>;
  stopCamera(): Promise<void>;
  analyzeVideo(uri: string): Promise<PatrolCandidate[]>;
};

type PatrolEvents = {
  onCandidate: (candidate: PatrolCandidate) => void;
  onPatrolError: (error: { message: string }) => void;
};
type PatrolEventSource = {
  addListener<K extends keyof PatrolEvents>(name: K, listener: PatrolEvents[K]): { remove(): void };
};

export const nativePatrol: (NativePatrol & PatrolEventSource) | null = Platform.OS === "ios"
  ? requireOptionalNativeModule<NativePatrol & PatrolEventSource>("ChpokPatrol")
  : null;
export const patrolEvents = nativePatrol;
