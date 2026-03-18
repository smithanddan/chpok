export type ReportStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "routed"
  | "waiting_info"
  | "resolved"
  | "rejected"
  | "duplicate";

export type ObjectType =
  | "scooter"
  | "courier"
  | "carsharing"
  | "taxi"
  | "car"
  | "other";

export type ViolationType =
  | "dangerous_driving"
  | "sidewalk_riding"
  | "bad_parking"
  | "blocked_passage"
  | "accident_or_near_miss"
  | "other";

export interface DraftReport {
  reportId: string | null;
  violationType: ViolationType | null;
  objectType: ObjectType | null;
  providerCategory: string | null;
  providerKey: string | null;
  description: string;
  isAnonymous: boolean;
}

export const VIOLATION_OPTIONS: { value: ViolationType; label: string }[] = [
  { value: "dangerous_driving", label: "Опасная езда" },
  { value: "sidewalk_riding", label: "Езда по тротуару" },
  { value: "bad_parking", label: "Плохая парковка" },
  { value: "blocked_passage", label: "Перекрыт проход/проезд" },
  { value: "accident_or_near_miss", label: "ДТП или почти ДТП" },
  { value: "other", label: "Другое" }
];


