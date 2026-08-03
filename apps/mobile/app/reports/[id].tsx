import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image
} from "react-native";
import { supabase } from "../../lib/supabase-client";
import {
  PROVIDER_CATEGORY_LABELS,
  PROVIDER_LABELS
} from "../../lib/provider-config";
import type {
  ProviderCategory,
  ProviderKey
} from "../../lib/provider-config";

interface MediaItem {
  id: string;
  storage_path: string;
  media_type: string;
}

interface StatusHistoryItem {
  id: string;
  old_status: string | null;
  new_status: string;
  comment: string | null;
  created_at: string;
}

interface ReportDetail {
  id: string;
  status: string;
  description: string | null;
  violation_type: string | null;
  provider_category: ProviderCategory | null;
  provider_key: ProviderKey | null;
  is_anonymous: boolean;
  created_at: string;
  submitted_at: string | null;
  media: MediaItem[];
  status_history: StatusHistoryItem[];
}

const STATUS_LABELS: Record<string, string> = {
  draft: "Черновик",
  submitted: "Отправлено",
  under_review: "На проверке",
  routed: "Передано",
  waiting_info: "Ждём инфо",
  resolved: "Решено",
  rejected: "Отклонено",
  duplicate: "Дубликат"
};

const STATUS_HELP: Record<string, string> = {
  draft: "Черновик виден только вам, его можно дописать и отправить позже.",
  submitted: "Заявка отправлена и ждёт проверки модератора.",
  under_review: "Модератор проверяет ваш сигнал и решает, куда его передать.",
  routed: "Сигнал передан ответственному сервису или городской службе.",
  waiting_info: "Нужны дополнительные детали — проверьте, нет ли запроса в приложении позже.",
  resolved: "Проблема помечена как решённая. Если на месте по‑прежнему плохо — можно чпокнуть ещё раз.",
  rejected: "Сигнал не смогли обработать (например, недостаточно данных или дубликат).",
  duplicate: "Такой сигнал уже есть в системе — ваш чпок помогает подтвердить проблему."
};

function StatusBadge({ status }: { status: string }) {
  const label = STATUS_LABELS[status] ?? status;
  const color =
    status === "resolved"
      ? "#269B67"
      : status === "rejected"
      ? "#E96C66"
      : status === "draft"
      ? "#67758C"
      : "#DEA920";

  return (
    <View style={[styles.statusBadge, { borderColor: color }]}>
      <Text style={[styles.statusBadgeText, { color }]}>{label}</Text>
    </View>
  );
}

export default function ReportDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [report, setReport] = useState<ReportDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      if (!supabase || !id) {
        setLoading(false);
        return;
      }

      const { data: reportRow, error } = await supabase
        .from("reports")
        .select(
          `
            id,
            status,
            description,
            violation_type,
            provider_category,
            provider_key,
            is_anonymous,
            created_at,
            submitted_at,
            report_media ( id, storage_path, media_type ),
            report_status_history ( id, old_status, new_status, comment, created_at )
          `
        )
        .eq("id", id)
        .maybeSingle();

      if (isMounted) {
        if (!error && reportRow) {
          const media: MediaItem[] = Array.isArray(reportRow.report_media)
            ? reportRow.report_media
            : [];
          const history: StatusHistoryItem[] = Array.isArray(
            reportRow.report_status_history
          )
            ? (reportRow.report_status_history as any[]).sort(
                (a, b) =>
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
              )
            : [];

          setReport({
            id: reportRow.id,
            status: reportRow.status,
            description: reportRow.description,
            violation_type: reportRow.violation_type,
            provider_category: reportRow.provider_category,
            provider_key: reportRow.provider_key,
            is_anonymous: !!reportRow.is_anonymous,
            created_at: reportRow.created_at,
            submitted_at: reportRow.submitted_at ?? null,
            media,
            status_history: history
          });
        }
        setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color="#FF418E" />
        <Text style={styles.loadingText}>Загружаем ваш чпок…</Text>
      </View>
    );
  }

  if (!report) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>
          Не удалось найти это обращение. Возможно, оно было удалено.
        </Text>
      </View>
    );
  }

  const providerLabel =
    (report.provider_key && PROVIDER_LABELS[report.provider_key]) || null;
  const categoryLabel =
    (report.provider_category &&
      PROVIDER_CATEGORY_LABELS[report.provider_category]) ||
    null;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 24, paddingBottom: 32 }}
    >
      <Text style={styles.heading}>Ваш чпок</Text>

      <View style={styles.statusBlock}>
        <View style={styles.statusHeader}>
          <StatusBadge status={report.status} />
          <Text style={styles.statusDate}>
            Отправлено:{" "}
            {new Date(
              report.submitted_at ?? report.created_at
            ).toLocaleString()}
          </Text>
        </View>
        <Text style={styles.statusHelp}>
          {STATUS_HELP[report.status] ??
            "Статус помогает понять, где сейчас ваше обращение."}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Категория</Text>
        <Text style={styles.value}>
          {categoryLabel ?? "Категория не указана"}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Сервис / транспорт</Text>
        <Text style={styles.value}>
          {providerLabel ?? "Не указано или неизвестно"}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Анонимно</Text>
        <Text style={styles.value}>
          {report.is_anonymous ? "Да, без имени" : "Нет, с профилем"}
        </Text>
      </View>

      {report.description && (
        <View style={styles.descriptionBlock}>
          <Text style={styles.label}>Что случилось</Text>
          <Text style={styles.description}>{report.description}</Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Медиа</Text>
        {report.media.length === 0 ? (
          <Text style={styles.sectionText}>
            Фото и видео не прикреплены. В следующий раз можно добавить кадр,
            чтобы городу было проще реагировать.
          </Text>
        ) : (
          <View style={styles.mediaGrid}>
            {report.media.map((m) => (
              <View key={m.id} style={styles.mediaPlaceholder}>
                <Text style={styles.mediaLabel}>
                  {m.media_type.startsWith("video") ? "Видео" : "Фото"}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>История статусов</Text>
        {report.status_history.length === 0 ? (
          <Text style={styles.sectionText}>
            Пока изменений статуса нет. Когда ваш чпок начнут обрабатывать, мы
            покажем здесь шаги.
          </Text>
        ) : (
          report.status_history.map((h) => (
            <View key={h.id} style={styles.historyRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.historyStatus}>
                  {(h.old_status && STATUS_LABELS[h.old_status]) ||
                    h.old_status ||
                    "—"}{" "}
                  → {STATUS_LABELS[h.new_status] ?? h.new_status}
                </Text>
                {h.comment && (
                  <Text style={styles.historyComment}>{h.comment}</Text>
                )}
              </View>
              <Text style={styles.historyDate}>
                {new Date(h.created_at).toLocaleString()}
              </Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8ED"
  },
  loading: {
    flex: 1,
    backgroundColor: "#FFF8ED",
    alignItems: "center",
    justifyContent: "center",
    gap: 8
  },
  loadingText: {
    color: "#67758C",
    fontSize: 13,
    textAlign: "center",
    paddingHorizontal: 32
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#17233B",
    marginBottom: 16
  },
  statusBlock: {
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    marginBottom: 12
  },
  statusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6
  },
  statusBadge: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase"
  },
  statusDate: {
    fontSize: 11,
    color: "#67758C"
  },
  statusHelp: {
    marginTop: 4,
    fontSize: 12,
    color: "#35435B",
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
  section: {
    marginTop: 16
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#17233B",
    marginBottom: 6
  },
  sectionText: {
    fontSize: 13,
    color: "#67758C",
    lineHeight: 18
  },
  mediaGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 6
  },
  mediaPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "#FFF8ED",
    borderWidth: 1,
    borderColor: "#D9DDE3",
    alignItems: "center",
    justifyContent: "center"
  },
  mediaLabel: {
    fontSize: 11,
    color: "#67758C"
  },
  historyRow: {
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#FFF8ED",
    borderWidth: 1,
    borderColor: "#D9DDE3",
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8
  },
  historyStatus: {
    fontSize: 12,
    color: "#35435B"
  },
  historyComment: {
    marginTop: 2,
    fontSize: 11,
    color: "#67758C"
  },
  historyDate: {
    fontSize: 11,
    color: "#8A95A5",
    textAlign: "right"
  }
});

