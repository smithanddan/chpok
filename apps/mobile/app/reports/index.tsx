import { useEffect, useState } from "react";
import { Link } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList
} from "react-native";
import { supabase } from "../../lib/supabase-client";
import { PROVIDER_CATEGORY_LABELS, PROVIDER_LABELS } from "../../lib/provider-config";
import type { ProviderCategory, ProviderKey } from "../../lib/provider-config";

interface ReportListItem {
  id: string;
  status: string;
  created_at: string;
  submitted_at: string | null;
  violation_type: string | null;
  provider_category: ProviderCategory | null;
  provider_key: ProviderKey | null;
  has_media: boolean;
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

function StatusBadge({ status }: { status: string }) {
  const label = STATUS_LABELS[status] ?? status;
  const color =
    status === "resolved"
      ? "#22C55E"
      : status === "rejected"
      ? "#F97373"
      : status === "draft"
      ? "#9CA3AF"
      : "#FBBF24";

  return (
    <View style={[styles.statusBadge, { borderColor: color }]}>
      <Text style={[styles.statusBadgeText, { color }]}>{label}</Text>
    </View>
  );
}

export default function MyReportsScreen() {
  const [reports, setReports] = useState<ReportListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }
      const { data: userResult } = await supabase.auth.getUser();
      const userId = userResult?.user?.id;
      if (!userId) {
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from("reports")
        .select(
          `
          id,
          status,
          created_at,
          submitted_at,
          violation_type,
          provider_category,
          provider_key,
          report_media ( id )
        `
        )
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(50);

      if (isMounted) {
        if (!error && data) {
          const mapped = (data as any[]).map((row) => ({
            id: row.id as string,
            status: row.status as string,
            created_at: row.created_at as string,
            submitted_at: (row.submitted_at as string) ?? null,
            violation_type: (row.violation_type as string) ?? null,
            provider_category:
              (row.provider_category as ProviderCategory | null) ?? null,
            provider_key: (row.provider_key as ProviderKey | null) ?? null,
            has_media: Array.isArray(row.report_media)
              ? row.report_media.length > 0
              : false
          }));
          setReports(mapped);
        }
        setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const renderItem = ({ item }: { item: ReportListItem }) => {
    const providerLabel =
      (item.provider_key && PROVIDER_LABELS[item.provider_key]) || null;
    const categoryLabel =
      (item.provider_category &&
        PROVIDER_CATEGORY_LABELS[item.provider_category]) ||
      null;

    return (
      <Link href={`/reports/${item.id}`} asChild>
        <TouchableOpacity style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={{ flex: 1, paddingRight: 8 }}>
              <Text style={styles.cardTitle}>
                {item.violation_type
                  ? item.violation_type
                  : "Городской инцидент"}
              </Text>
              <View style={styles.metaRow}>
                <Text style={styles.categoryText}>
                  {categoryLabel ?? "Категория не указана"}
                </Text>
                {providerLabel && (
                  <Text style={styles.providerText}>{providerLabel}</Text>
                )}
              </View>
            </View>
            <View style={styles.headerRight}>
              <StatusBadge status={item.status} />
              <Text style={styles.dateText}>
                {new Date(
                  item.submitted_at ?? item.created_at
                ).toLocaleString()}
              </Text>
              {item.has_media && (
                <Text style={styles.mediaPill}>фото/видео</Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator color="#FF2D8A" />
          <Text style={styles.loadingText}>Загружаем ваши чпоки…</Text>
        </View>
      ) : reports.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>Пока нет чпоков</Text>
          <Text style={styles.emptyText}>
            Как только вы отправите первый сигнал, он появится здесь. Начните с
            подозрительной парковки или самоката на тротуаре.
          </Text>
        </View>
      ) : (
        <FlatList
          data={reports}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: 16 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    paddingHorizontal: 24
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8
  },
  loadingText: {
    color: "#9CA3AF",
    fontSize: 13
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#F9FAFB",
    marginBottom: 8
  },
  emptyText: {
    fontSize: 14,
    color: "#E5E7EB",
    textAlign: "center",
    lineHeight: 20
  },
  card: {
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#0B1220",
    marginBottom: 10
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4
  },
  cardTitle: {
    color: "#F9FAFB",
    fontSize: 15,
    fontWeight: "600"
  },
  statusBadge: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: "flex-end"
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase"
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginTop: 4,
    alignItems: "center"
  },
  categoryText: {
    fontSize: 12,
    color: "#9CA3AF"
  },
  providerText: {
    fontSize: 12,
    color: "#F9FAFB"
  },
  headerRight: {
    alignItems: "flex-end",
    gap: 4
  },
  dateText: {
    color: "#9CA3AF",
    fontSize: 11
  },
  mediaPill: {
    fontSize: 10,
    color: "#F9FAFB",
    backgroundColor: "#111827",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999
  }
});

