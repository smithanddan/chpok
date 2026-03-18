import { createClient } from "./supabase-client";

export type IncidentRow = {
  id: string;
  short_id: string | null;
  created_at: string;
  status: string;
  violation_type: string | null;
  object_type: string | null;
  company_id: string | null;
  company_name: string | null;
  address_text: string | null;
  user_display_name: string | null;
  has_media: boolean;
  anonymous: boolean;
  submitted_at: string | null;
};

export type IncidentFilters = {
  status?: string;
  objectType?: string;
  violationType?: string;
  companyId?: string;
  hasMedia?: boolean;
  anonymous?: boolean;
  dateFrom?: string;
  dateTo?: string;
};

export async function fetchIncidents(filters: IncidentFilters = {}) {
  const supabase = createClient();

  let query = supabase
    .from("reports")
    .select(
      `
        id,
        created_at,
        status,
        violation_type,
        object_type,
        address_text,
        anonymous,
        submitted_at,
        company_id,
        profiles ( display_name ),
        companies ( name ),
        report_media ( id )
      `
    )
    .order("created_at", { ascending: false })
    .limit(200);

  if (filters.status) {
    query = query.eq("status", filters.status);
  }

  if (filters.objectType) {
    query = query.eq("object_type", filters.objectType);
  }

  if (filters.violationType) {
    query = query.eq("violation_type", filters.violationType);
  }

  if (filters.companyId) {
    query = query.eq("company_id", filters.companyId);
  }

  if (typeof filters.anonymous === "boolean") {
    query = query.eq("anonymous", filters.anonymous);
  }

  if (filters.dateFrom) {
    query = query.gte("created_at", filters.dateFrom);
  }

  if (filters.dateTo) {
    query = query.lte("created_at", filters.dateTo);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Failed to fetch incidents", error);
    throw error;
  }

  let rows: IncidentRow[] =
    data?.map((row: any) => {
      const media = Array.isArray(row.report_media) ? row.report_media : [];
      const createdAt = row.created_at as string;

      return {
        id: row.id,
        short_id: row.id?.slice?.(0, 8) ?? row.id,
        created_at: createdAt,
        status: row.status,
        violation_type: row.violation_type,
        object_type: row.object_type,
        company_id: row.company_id ?? null,
        company_name: row.companies?.name ?? null,
        address_text: row.address_text ?? null,
        user_display_name: row.profiles?.display_name ?? null,
        has_media: media.length > 0,
        anonymous: !!row.anonymous,
        submitted_at: row.submitted_at ?? null
      };
    }) ?? [];

  if (typeof filters.hasMedia === "boolean") {
    rows = rows.filter((row) =>
      filters.hasMedia ? row.has_media : !row.has_media
    );
  }

  return rows;
}

