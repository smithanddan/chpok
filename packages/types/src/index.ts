export type IncidentStatus = "draft" | "submitted" | "in_review" | "in_progress" | "resolved" | "rejected";

export type IncidentCategory =
  | "infrastructure_pothole"
  | "lighting"
  | "waste_overflow"
  | "public_transport"
  | "safety"
  | "other";

export interface IncidentLocation {
  latitude: number;
  longitude: number;
  addressLine?: string;
  city?: string;
}

export interface Incident {
  id: string;
  createdAt: string;
  createdByUserId: string | null;
  title: string;
  description?: string;
  category: IncidentCategory;
  status: IncidentStatus;
  location: IncidentLocation;
  mediaUrls?: string[];
  source: "mobile" | "web" | "operator";
}

export type UserRole = "resident" | "operator" | "supervisor" | "admin";

export interface User {
  id: string;
  role: UserRole;
  displayName: string | null;
  email: string | null;
}

