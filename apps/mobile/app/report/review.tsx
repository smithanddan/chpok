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
      return "Опасная езда";
    case "sidewalk_riding":
      return "Езда по тротуару";
    case "bad_parking":
      return "Неправильная парковка";
    case "blocked_passage":
      return "Перекрыт проход";
    case "accident_or_near_miss":
      return "ДТП или опасная ситуация";
    case "other":
      return "Другое";
    default:
      return "Не указано";
  }
}

function labelForObjectType(value: ObjectType | null): string {
  switch (value) {
    case "scooter":
      return "Самокат";
    case "courier":
      return "Курьер";
    case "carsharing":
      return "Каршеринг";
    case "taxi":
      return "Такси";
    case "car":
      return "Личный автомобиль";
    case "other":
      return "Другое";
    default:
      return "Не указано";
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
        "Черновик не найден",
        "Вернитесь назад и начните новое обращение."
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
        "Сервис пока не подключён",
        "На этом устройстве пока нельзя отправить обращение."
      );
      return;
    }
    if (!draft.reportId) {
      Alert.alert(
        "Черновик не найден",
        "Вернитесь назад и начните новое обращение."
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
          "Не получилось отправить",
          "Попробуйте ещё раз через минуту. Если ошибка повторится, напишите команде."
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
      <Text style={styles.heading}>Проверьте обращение</Text>

        <TouchableOpacity
          style={[
            styles.attachCard,
            uploading && styles.attachCardDisabled
          ]}
          onPress={handleAddPhotos}
          disabled={uploading}
        >
          <Text style={styles.attachTitle}>Добавьте фото</Text>
          <Text style={styles.attachSubtitle}>
            Добавьте фото с улицы: так оператору будет проще понять ситуацию.
          </Text>
          {uploading && (
            <View style={styles.statusRow}>
              <ActivityIndicator color="#FF418E" />
              <Text style={styles.statusText}>Загружаем фото…</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.label}>Нарушение</Text>
          <Text style={styles.value}>{labelForViolation(draft.violationType)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Объект</Text>
          <Text style={styles.value}>{labelForObjectType(draft.objectType)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Сервис</Text>
          <Text style={styles.value}>
            {draft.companyId
              ? draft.companyNameManual || "Выбранный сервис"
              : draft.companyNameManual || "Не указан"}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Анонимно</Text>
          <Text style={styles.value}>{draft.isAnonymous ? "Да" : "Нет"}</Text>
        </View>

        {draft.description ? (
          <View style={styles.descriptionBlock}>
            <Text style={styles.label}>Описание</Text>
            <Text style={styles.description}>{draft.description}</Text>
          </View>
        ) : null}

        {!authReady && (
          <View style={styles.statusRow}>
            <ActivityIndicator color="#FF418E" />
            <Text style={styles.statusText}>Готовим отправку…</Text>
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
            <ActivityIndicator color="#FFF8ED" />
          ) : (
            <Text style={styles.primaryButtonText}>Отправить сигнал</Text>
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
    backgroundColor: "#FFF8ED"
  },
  scroll: {
    flex: 1
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#17233B",
    marginBottom: 20
  },
  attachCard: {
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#FFF8ED",
    borderWidth: 1,
    borderColor: "#D9DDE3",
    marginBottom: 16
  },
  attachCardDisabled: {
    opacity: 0.7
  },
  attachTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#17233B"
  },
  attachSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#67758C",
    lineHeight: 18
  },
  row: {
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  label: {
    fontSize: 13,
    color: "#67758C"
  },
  value: {
    fontSize: 14,
    color: "#17233B",
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
    backgroundColor: "#FFF8ED",
    borderWidth: 1,
    borderColor: "#D9DDE3"
  },
  description: {
    marginTop: 6,
    color: "#35435B",
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
    color: "#67758C",
    fontSize: 13
  },
  footer: {
    marginTop: 8
  },
  primaryButton: {
    backgroundColor: "#FF418E",
    borderRadius: 999,
    paddingVertical: 18,
    alignItems: "center"
  },
  primaryButtonDisabled: {
    opacity: 0.7
  },
  primaryButtonText: {
    color: "#FFF8ED",
    fontWeight: "700",
    fontSize: 16
  }
});
