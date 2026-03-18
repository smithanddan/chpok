"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { IncidentFilters, IncidentRow } from "../../lib/incidents";
import {
  OBJECT_TYPE_LABELS,
  STATUS_BADGE_CLASSES,
  STATUS_LABELS,
  VIOLATION_TYPE_LABELS
} from "../../lib/domain-maps";
import { IncidentDetailDrawer } from "../../components/incident-detail-drawer";

function StatusBadge({ status }: { status: string }) {
  const label = STATUS_LABELS[status] ?? status;
  const badgeClass =
    STATUS_BADGE_CLASSES[status] ??
    "bg-slate-900 text-slate-100 border-slate-700";

  return (
    <span
      className={`inline-flex max-w-[140px] items-center justify-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${badgeClass}`}
    >
      {label}
    </span>
  );
}

function formatDate(value: string | null) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

type Props = {
  incidents: IncidentRow[];
  initialFilters: IncidentFilters;
};

export default function IncidentsClient({ incidents, initialFilters }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filters, setFilters] = useState<IncidentFilters>(initialFilters);
  const router = useRouter();

  const companies =
    incidents
      .filter((i) => i.company_id && i.company_name)
      .reduce<
        { id: string; name: string }[]
      >((acc, item) => {
        if (!acc.find((c) => c.id === item.company_id)) {
          acc.push({ id: item.company_id as string, name: item.company_name as string });
        }
        return acc;
      }, []) ?? [];

  const applyFilters = (next: IncidentFilters) => {
    setFilters(next);
    const params = new URLSearchParams();

    if (next.status) params.set("status", next.status);
    if (next.objectType) params.set("objectType", next.objectType);
    if (next.violationType) params.set("violationType", next.violationType);
    if (next.companyId) params.set("companyId", next.companyId);

    if (typeof next.hasMedia === "boolean") {
      params.set("hasMedia", String(next.hasMedia));
    }

    if (typeof next.anonymous === "boolean") {
      params.set("anonymous", String(next.anonymous));
    }

    if (next.dateFrom) params.set("dateFrom", next.dateFrom.slice(0, 10));
    if (next.dateTo) params.set("dateTo", next.dateTo.slice(0, 10));

    const query = params.toString();
    router.push(query ? `/incidents?${query}` : "/incidents", { scroll: false });
  };

  const resetFilters = () => {
    applyFilters({});
  };

  return (
    <div className="flex h-full flex-col gap-3">
      {/* Filters row */}
      <div className="flex items-center justify-between gap-2">
        <div className="grid flex-1 grid-cols-2 gap-2 text-xs sm:grid-cols-3 lg:grid-cols-7">
          <select
            value={filters.status ?? ""}
            onChange={(e) =>
              applyFilters({
                ...filters,
                status: e.target.value || undefined
              })
            }
            className="rounded-md border border-slate-800 bg-slate-900/80 px-2 py-1.5 text-xs text-slate-100 outline-none focus:border-chpok-pink/70 focus:ring-1 focus:ring-chpok-pink/40"
          >
            <option value="">Статус</option>
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <select
            value={filters.violationType ?? ""}
            onChange={(e) =>
              applyFilters({
                ...filters,
                violationType: e.target.value || undefined
              })
            }
            className="rounded-md border border-slate-800 bg-slate-900/80 px-2 py-1.5 text-xs text-slate-100 outline-none focus:border-chpok-pink/70 focus:ring-1 focus:ring-chpok-pink/40"
          >
            <option value="">Тип нарушения</option>
            {Object.entries(VIOLATION_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <select
            value={filters.objectType ?? ""}
            onChange={(e) =>
              applyFilters({
                ...filters,
                objectType: e.target.value || undefined
              })
            }
            className="hidden rounded-md border border-slate-800 bg-slate-900/80 px-2 py-1.5 text-xs text-slate-100 outline-none focus:border-chpok-pink/70 focus:ring-1 focus:ring-chpok-pink/40 sm:block"
          >
            <option value="">Тип объекта</option>
            {Object.entries(OBJECT_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <select
            value={filters.companyId ?? ""}
            onChange={(e) =>
              applyFilters({
                ...filters,
                companyId: e.target.value || undefined
              })
            }
            className="hidden rounded-md border border-slate-800 bg-slate-900/80 px-2 py-1.5 text-xs text-slate-100 outline-none focus:border-chpok-pink/70 focus:ring-1 focus:ring-chpok-pink/40 lg:block"
          >
            <option value="">Компания</option>
            {companies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            value={
              typeof filters.hasMedia === "boolean"
                ? String(filters.hasMedia)
                : ""
            }
            onChange={(e) => {
              const value = e.target.value;
              applyFilters({
                ...filters,
                hasMedia:
                  value === ""
                    ? undefined
                    : value === "true"
            });
            }}
            className="hidden rounded-md border border-slate-800 bg-slate-900/80 px-2 py-1.5 text-xs text-slate-100 outline-none focus:border-chpok-pink/70 focus:ring-1 focus:ring-chpok-pink/40 lg:block"
          >
            <option value="">Медиа</option>
            <option value="true">С медиа</option>
            <option value="false">Без медиа</option>
          </select>
          <select
            value={
              typeof filters.anonymous === "boolean"
                ? String(filters.anonymous)
                : ""
            }
            onChange={(e) => {
              const value = e.target.value;
              applyFilters({
                ...filters,
                anonymous:
                  value === ""
                    ? undefined
                    : value === "true"
              });
            }}
            className="hidden rounded-md border border-slate-800 bg-slate-900/80 px-2 py-1.5 text-xs text-slate-100 outline-none focus:border-chpok-pink/70 focus:ring-1 focus:ring-chpok-pink/40 lg:block"
          >
            <option value="">Анонимность</option>
            <option value="true">Анонимно</option>
            <option value="false">Не анонимно</option>
          </select>
          <div className="hidden items-center gap-1 rounded-md border border-slate-800 bg-slate-900/80 px-2 py-1.5 text-[11px] text-slate-100 lg:flex">
            <input
              type="date"
              value={filters.dateFrom ? filters.dateFrom.slice(0, 10) : ""}
              onChange={(e) =>
                applyFilters({
                  ...filters,
                  dateFrom: e.target.value
                    ? new Date(`${e.target.value}T00:00:00.000Z`).toISOString()
                    : undefined
                })
              }
              className="w-full bg-transparent text-[11px] text-slate-100 outline-none"
            />
            <span className="px-1 text-slate-600">—</span>
            <input
              type="date"
              value={filters.dateTo ? filters.dateTo.slice(0, 10) : ""}
              onChange={(e) =>
                applyFilters({
                  ...filters,
                  dateTo: e.target.value
                    ? new Date(`${e.target.value}T23:59:59.999Z`).toISOString()
                    : undefined
                })
              }
              className="w-full bg-transparent text-[11px] text-slate-100 outline-none"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={resetFilters}
          className="whitespace-nowrap rounded-md border border-slate-800 bg-slate-950/80 px-3 py-1.5 text-[11px] text-slate-200 hover:border-slate-600 hover:bg-slate-900"
        >
          Сбросить
        </button>
      </div>

      {/* Table */}
      <div className="relative flex-1 overflow-hidden rounded-lg border border-slate-900 bg-slate-950/60">
        <div className="max-h-[560px] overflow-auto">
          <table className="min-w-full border-separate border-spacing-0 text-xs">
            <thead className="sticky top-0 z-10 bg-slate-950">
              <tr>
                <th className="sticky left-0 z-20 border-b border-slate-900 bg-slate-950 px-2 py-2 text-left font-medium text-slate-400">
                  ID
                </th>
                <th className="border-b border-slate-900 px-2 py-2 text-left font-medium text-slate-400">
                  Создан
                </th>
                <th className="border-b border-slate-900 px-2 py-2 text-left font-medium text-slate-400">
                  Статус
                </th>
                <th className="border-b border-slate-900 px-2 py-2 text-left font-medium text-slate-400">
                  Нарушение
                </th>
                <th className="border-b border-slate-900 px-2 py-2 text-left font-medium text-slate-400">
                  Объект
                </th>
                <th className="border-b border-slate-900 px-2 py-2 text-left font-medium text-slate-400">
                  Компания
                </th>
                <th className="border-b border-slate-900 px-2 py-2 text-left font-medium text-slate-400">
                  Адрес
                </th>
                <th className="border-b border-slate-900 px-2 py-2 text-left font-medium text-slate-400">
                  Пользователь
                </th>
                <th className="border-b border-slate-900 px-2 py-2 text-center font-medium text-slate-400">
                  Медиа
                </th>
                <th className="border-b border-slate-900 px-2 py-2 text-center font-medium text-slate-400">
                  Анонимно
                </th>
                <th className="border-b border-slate-900 px-2 py-2 text-left font-medium text-slate-400">
                  Отправлен
                </th>
              </tr>
            </thead>
            <tbody>
              {incidents.length === 0 ? (
                <tr>
                  <td
                    colSpan={11}
                    className="border-t border-slate-900 px-3 py-10 text-center text-xs text-slate-500"
                  >
                    Пока нет инцидентов. Как только пользователи начнут отправлять
                    сообщения, они появятся здесь.
                  </td>
                </tr>
              ) : (
                incidents.map((incident) => {
                  const isSelected = selectedId === incident.id;
                  return (
                    <tr
                      key={incident.id}
                      onClick={() =>
                        setSelectedId((prev) =>
                          prev === incident.id ? null : incident.id
                        )
                      }
                      className={`cursor-pointer border-t border-slate-900/80 text-[11px] text-slate-200 hover:bg-slate-900/70 ${
                        isSelected ? "bg-slate-900" : ""
                      }`}
                    >
                      <td className="sticky left-0 z-10 max-w-[80px] truncate border-r border-slate-900 bg-slate-950/90 px-2 py-2 font-mono text-[11px] text-slate-300">
                        {incident.short_id}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-slate-300">
                        {formatDate(incident.created_at)}
                      </td>
                      <td className="px-2 py-2">
                        <StatusBadge status={incident.status} />
                      </td>
                      <td className="max-w-[120px] truncate px-2 py-2 text-slate-200">
                        {incident.violation_type
                          ? VIOLATION_TYPE_LABELS[incident.violation_type] ??
                            incident.violation_type
                          : "—"}
                      </td>
                      <td className="max-w-[120px] truncate px-2 py-2 text-slate-200">
                        {incident.object_type
                          ? OBJECT_TYPE_LABELS[incident.object_type] ??
                            incident.object_type
                          : "—"}
                      </td>
                      <td className="max-w-[160px] truncate px-2 py-2 text-slate-200">
                        {incident.company_name ?? "—"}
                      </td>
                      <td className="max-w-[200px] truncate px-2 py-2 text-slate-300">
                        {incident.address_text ?? "—"}
                      </td>
                      <td className="max-w-[140px] truncate px-2 py-2 text-slate-300">
                        {incident.user_display_name ?? "—"}
                      </td>
                      <td className="px-2 py-2 text-center">
                        {incident.has_media ? (
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-chpok-pink/60 bg-chpok-pink/10 text-[10px] text-chpok-pink">
                            +
                          </span>
                        ) : (
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-700 text-[10px] text-slate-500">
                            —
                          </span>
                        )}
                      </td>
                      <td className="px-2 py-2 text-center">
                        {incident.anonymous ? (
                          <span className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 px-2 py-0.5 text-[10px] text-slate-100">
                            да
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-500">нет</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-slate-300">
                        {formatDate(incident.submitted_at)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <IncidentDetailDrawer
        incidentId={selectedId}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}

