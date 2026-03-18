import { createClient } from "./supabase-client";

export type IncidentDetail = {
  id: string;
  short_id: string;
  status: string;
  created_at: string;
  submitted_at: string | null;
  violation_type: string | null;
  object_type: string | null;
  company_name: string | null;
  address_text: string | null;
  lat: number | null;
  lng: number | null;
  is_anonymous: boolean;
  description: string | null;
  user_display_name: string | null;
  media: {
    id: string;
    storage_path: string;
    media_type: string;
  }[];
  status_history: {
    id: string;
    old_status: string | null;
    new_status: string;
    comment: string | null;
    changed_by_name: string | null;
    created_at: string;
  }[];
  admin_notes: {
    id: string;
    note: string;
    author_name: string | null;
    created_at: string;
  }[];
};

export async function fetchIncidentDetail(id: string): Promise<IncidentDetail | null> {
  const supabase = createClient();

  const { data: report, error } = await supabase
    .from("reports")
    .select(
      `
        id,
        created_at,
        submitted_at,
        status,
        violation_type,
        object_type,
        address_text,
        lat,
        lng,
        is_anonymous,
        description,
        companies ( name ),
        profiles ( display_name )
      `
    )
    .eq("id", id)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Failed to fetch incident detail", error);
    throw error;
  }

  if (!report) return null;

  const [mediaRes, historyRes, notesRes] = await Promise.all([
    supabase
      .from("report_media")
      .select("id, storage_path, media_type")
      .eq("report_id", id)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true }),
    supabase
      .from("report_status_history")
      .select(
        `
          id,
          old_status,
          new_status,
          comment,
          created_at,
          profiles!report_status_history_changed_by_fkey ( display_name )
        `
      )
      .eq("report_id", id)
      .order("created_at", { ascending: false }),
    supabase
      .from("admin_notes")
      .select(
        `
          id,
          note,
          created_at,
          profiles ( display_name )
        `
      )
      .eq("report_id", id)
      .order("created_at", { ascending: false })
  ]);

  if (mediaRes.error) {
    console.error("Failed to fetch media", mediaRes.error);
  }
  if (historyRes.error) {
    console.error("Failed to fetch status history", historyRes.error);
  }
  if (notesRes.error) {
    console.error("Failed to fetch admin notes", notesRes.error);
  }

  return {
    id: report.id,
    short_id: (report.id as string).slice(0, 8),
    status: report.status,
    created_at: report.created_at,
    submitted_at: report.submitted_at ?? null,
    violation_type: report.violation_type ?? null,
    object_type: report.object_type ?? null,
    company_name: report.companies?.name ?? null,
    address_text: report.address_text ?? null,
    lat: report.lat ?? null,
    lng: report.lng ?? null,
    is_anonymous: !!report.is_anonymous,
    description: report.description ?? null,
    user_display_name: report.profiles?.display_name ?? null,
    media:
      mediaRes.data?.map((m) => ({
        id: m.id as string,
        storage_path: m.storage_path as string,
        media_type: m.media_type as string
      })) ?? [],
    status_history:
      historyRes.data?.map((h: any) => ({
        id: h.id as string,
        old_status: h.old_status,
        new_status: h.new_status,
        comment: h.comment,
        created_at: h.created_at as string,
        changed_by_name: h.profiles?.display_name ?? null
      })) ?? [],
    admin_notes:
      notesRes.data?.map((n: any) => ({
        id: n.id as string,
        note: n.note as string,
        created_at: n.created_at as string,
        author_name: n.profiles?.display_name ?? null
      })) ?? []
  };
}

