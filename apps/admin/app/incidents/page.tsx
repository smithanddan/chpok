import { Suspense } from "react";
import IncidentsClient from "./table-client";
import { CrmShell } from "../../components/crm-shell";
import { fetchIncidents, type IncidentFilters } from "../../lib/incidents";

type SearchParams = { [key: string]: string | string[] | undefined };

function parseFilters(searchParams: SearchParams): IncidentFilters {
  const get = (key: string): string | undefined => {
    const value = searchParams[key];
    if (Array.isArray(value)) return value[0];
    return value;
  };

  const filters: IncidentFilters = {};

  const status = get("status");
  const objectType = get("objectType");
  const violationType = get("violationType");
  const companyId = get("companyId");
  const hasMedia = get("hasMedia");
  const anonymous = get("anonymous");
  const dateFrom = get("dateFrom");
  const dateTo = get("dateTo");

  if (status) filters.status = status;
  if (objectType) filters.objectType = objectType;
  if (violationType) filters.violationType = violationType;
  if (companyId) filters.companyId = companyId;

  if (hasMedia === "true") filters.hasMedia = true;
  if (hasMedia === "false") filters.hasMedia = false;

  if (anonymous === "true") filters.anonymous = true;
  if (anonymous === "false") filters.anonymous = false;

  if (dateFrom) {
    filters.dateFrom = new Date(`${dateFrom}T00:00:00.000Z`).toISOString();
  }
  if (dateTo) {
    filters.dateTo = new Date(`${dateTo}T23:59:59.999Z`).toISOString();
  }

  return filters;
}

async function IncidentsTable({ searchParams }: { searchParams: SearchParams }) {
  const filters = parseFilters(searchParams);
  const incidents = await fetchIncidents(filters);

  return <IncidentsClient incidents={incidents} initialFilters={filters} />;
}

export default function IncidentsPage({
  searchParams
}: {
  searchParams: SearchParams;
}) {
  return (
    <CrmShell
      pageTitle="Инциденты"
      pageDescription="Таблица инцидентов Chpok: основные поля, статусы и быстрый просмотр без лишних карточек."
    >
      <Suspense
        fallback={
          <div className="flex h-full items-center justify-center text-xs text-slate-400">
            Загрузка инцидентов…
          </div>
        }
      >
        {/* @ts-expect-error Async Server Component */}
        <IncidentsTable searchParams={searchParams} />
      </Suspense>
    </CrmShell>
  );
}

