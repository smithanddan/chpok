import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert
} from "react-native";
import { useReportDraft } from "../../lib/report-draft-context";
import { supabase } from "../../lib/supabase-client";
import { ObjectType, ViolationType } from "../../lib/report-types";
import { getCurrentUserWithProfile } from "../../lib/auth-helpers";
import { uploadImagesForReport } from "../../lib/media-upload";

function labelForViolation(value: ViolationType | null): string {
  switch (value) {
    case "dangerous_driving":
      return "Dangerous driving";
    case "sidewalk_riding":
      return "Riding on the sidewalk";
    case "bad_parking":
      return "Bad parking";
    case "blocked_passage":
      return "Blocked passage";
    case "accident_or_near_miss":
      return "Accident or near miss";
    case "other":
      return "Other";
    default:
      return "Not specified";
  }
}

function labelForObjectType(value: ObjectType | null): string {
  switch (value) {
    case "scooter":
      return "Scooter";
    case "courier":
      return "Courier";
    case "carsharing":
      return "Carsharing";
    case "taxi":
      return "Taxi";
    case "car":
      return "Private car";
    case "other":
      return "Other";
    default:
      return "Not specified";
  }
}

export default function ReviewScreen() {
  const router = useRouter();
  const { draft, setDraft, resetDraft } = useReportDraft();
  const [submitting, setSubmitting] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // Basic auth check to surface clearer error if user is not logged in
    const init = async () => {
      if (!supabase) {
        setAuthReady(true);
        return;
      }
      await getCurrentUserWithProfile();
      setAuthReady(true);
    };
    init();
  }, []);

  const handleAddPhotos = async () => {
    if (!draft.reportId) {
      Alert.alert(
        "Draft not ready",
        "We could not find a draft report. Please go back and start a new report."
      );
      return;
    }
    setUploading(true);
    try {
      await uploadImagesForReport(draft.reportId);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!supabase) {
      Alert.alert(
        "Backend not configured",
        "Reporting backend is not configured on this device yet."
      );
      return;
    }
    if (!draft.reportId) {
      Alert.alert(
        "Draft not ready",
        "We could not find a draft report. Please go back and start a new report."
      );
      return;
    }
    setSubmitting(true);
    try {
      const { userId } = await getCurrentUserWithProfile();
      if (!userId) return;

      const submittedAt = new Date().toISOString();

      const { error: updateError } = await supabase
        .from("reports")
        .update({
          status: "submitted",
          violation_type: draft.violationType,
          object_type: draft.objectType,
          company_id: draft.companyId,
          company_name_manual: draft.companyNameManual,
          description: draft.description || null,
          is_anonymous: draft.isAnonymous,
          source: "mobile_app",
          submitted_at: submittedAt
        })
        .eq("id", draft.reportId);

      if (updateError) {
        console.error("Failed to update report to submitted", updateError);
        Alert.alert(
          "Could not send report",
          "Please try again in a minute. If the problem persists, contact support."
        );
        return;
      }

      // Record status change history
      await supabase.from("report_status_history").insert({
        report_id: draft.reportId,
        old_status: "draft",
        new_status: "submitted",
        changed_by: userId,
        comment: null
      });

      resetDraft();
      router.replace("/report/success");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <Text style={styles.heading}>Review your report</Text>

        <TouchableOpacity
          style={[
            styles.attachCard,
            uploading && styles.attachCardDisabled
          ]}
          onPress={handleAddPhotos}
          disabled={uploading}
        >
          <Text style={styles.attachTitle}>Add photos</Text>
          <Text style={styles.attachSubtitle}>
            Attach street photos from your gallery. They help operators see
            what''s happening.
          </Text>
          {uploading && (
            <View style={styles.statusRow}>
              <ActivityIndicator color="#FF2D8A" />
              <Text style={styles.statusText}>Uploading photos…</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.label}>Violation</Text>
          <Text style={styles.value}>{labelForViolation(draft.violationType)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Object</Text>
          <Text style={styles.value}>{labelForObjectType(draft.objectType)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Company</Text>
          <Text style={styles.value}>
            {draft.companyId
              ? draft.companyNameManual || "Selected company"
              : draft.companyNameManual || "Not specified"}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Anonymous</Text>
          <Text style={styles.value}>{draft.isAnonymous ? "Yes" : "No"}</Text>
        </View>

        {draft.description ? (
          <View style={styles.descriptionBlock}>
            <Text style={styles.label}>Description</Text>
            <Text style={styles.description}>{draft.description}</Text>
          </View>
        ) : null}

        {!authReady && (
          <View style={styles.statusRow}>
            <ActivityIndicator color="#FF2D8A" />
            <Text style={styles.statusText}>Preparing to send…</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.primaryButton, submitting && styles.primaryButtonDisabled]}
          onPress={handleSubmit}
          disabled={submitting || !authReady}
        >
          {submitting ? (
            <ActivityIndicator color="#020617" />
          ) : (
            <Text style={styles.primaryButtonText}>Send to city team</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: "#020617"
  },
  scroll: {
    flex: 1
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#F9FAFB",
    marginBottom: 20
  },
  attachCard: {
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#1F2937",
    marginBottom: 16
  },
  attachCardDisabled: {
    opacity: 0.7
  },
  attachTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#F9FAFB"
  },
  attachSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#9CA3AF",
    lineHeight: 18
  },
  row: {
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#0B1220",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  label: {
    fontSize: 13,
    color: "#9CA3AF"
  },
  value: {
    fontSize: 14,
    color: "#F9FAFB",
    fontWeight: "500",
    textAlign: "right",
    flexShrink: 1,
    marginLeft: 16
  },
  descriptionBlock: {
    marginTop: 8,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#1F2937"
  },
  description: {
    marginTop: 6,
    color: "#E5E7EB",
    fontSize: 14,
    lineHeight: 20
  },
  statusRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  statusText: {
    color: "#9CA3AF",
    fontSize: 13
  },
  footer: {
    marginTop: 8
  },
  primaryButton: {
    backgroundColor: "#FF2D8A",
    borderRadius: 999,
    paddingVertical: 18,
    alignItems: "center"
  },
  primaryButtonDisabled: {
    opacity: 0.7
  },
  primaryButtonText: {
    color: "#020617",
    fontWeight: "700",
    fontSize: 16
  }
});

