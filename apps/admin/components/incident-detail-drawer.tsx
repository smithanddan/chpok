"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { X, MapPin, FileWarning, Loader2 } from "lucide-react";
import type { IncidentDetail } from "../lib/incident-detail";
import { fetchIncidentDetail } from "../lib/incident-detail";
import {
  OBJECT_TYPE_LABELS,
  STATUS_BADGE_CLASSES,
  STATUS_LABELS,
  VIOLATION_TYPE_LABELS
} from "../lib/domain-maps";
import { createClient } from "../lib/supabase-client";
import { getSignedMediaUrl } from "../lib/media";

type Props = {
  incidentId: string | null;
  onClose: () => void;
};

type DrawerState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "loaded"; data: IncidentDetail };

const STATUS_OPTIONS = Object.entries(STATUS_LABELS).map(([value, label]) => ({
  value,
  label
}));

function formatDateTime(value: string | null | undefined) {
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

type ActiveMedia =
  | null
  | {
      storagePath: string;
      mediaType: string;
    };

export function IncidentDetailDrawer({ incidentId, onClose }: Props) {
  const [state, setState] = useState<DrawerState>({ status: "idle" });
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [statusComment, setStatusComment] = useState("");
  const [noteText, setNoteText] = useState("");
  const [activeMedia, setActiveMedia] = useState<ActiveMedia>(null);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [mediaError, setMediaError] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [addingNote, setAddingNote] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!incidentId) {
        setState({ status: "idle" });
        return;
      }
      setState({ status: "loading" });
      try {
        const detail = await fetchIncidentDetail(incidentId);
        if (cancelled) return;
        if (!detail) {
          setState({
            status: "error",
            message: "Инцидент не найден или недоступен."
          });
          return;
        }
        setSelectedStatus(detail.status);
        setState({ status: "loaded", data: detail });
      } catch (e) {
        console.error(e);
        if (cancelled) return;
        setState({
          status: "error",
          message: "Не удалось загрузить детали инцидента."
        });
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [incidentId]);

  const supabase = useMemo(() => {
    try {
      return createClient();
    } catch {
      return null;
    }
  }, []);

  if (!incidentId) return null;

  const showOverlay = state.status === "loading" || state.status === "loaded" || state.status === "error";

  return (
    <>
      {showOverlay && (
        <div
          className="fixed inset-0 z-30 bg-black/40"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed inset-y-0 right-0 z-40 w-full max-w-md transform border-l border-slate-900 bg-slate-950/95 shadow-2xl shadow-black/70 transition-transform duration-200 sm:max-w-lg ${
          showOverlay ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Детали инцидента"
      >
        <div className="flex h-full flex-col">
          <header className="flex items-start justify-between border-b border-slate-900 px-4 py-3">
            <div className="space-y-1">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                Инцидент
              </p>
              {state.status === "loaded" ? (
                <div className="flex items-center gap-2">
                  <p className="font-mono text-xs text-slate-100">
                    {state.data.short_id}
                  </p>
                  <span className="text-[10px] text-slate-500">
                    {state.data.id}
                  </span>
                </div>
              ) : (
                <p className="text-xs text-slate-400">Загрузка…</p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 text-slate-300 hover:border-slate-500 hover:text-slate-50"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto px-4 py-3 text-xs text-slate-200">
            {state.status === "loading" && (
              <div className="flex h-full items-center justify-center gap-2 text-slate-400">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Загружаем детали инцидента…</span>
              </div>
            )}

            {state.status === "error" && (
              <div className="rounded-md border border-rose-900/80 bg-rose-950/60 px-3 py-2 text-[11px] text-rose-100">
                {state.message}
              </div>
            )}

            {state.status === "loaded" && (
              <div className="space-y-4">
                {/* Основная шапка */}
                <section className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge status={state.data.status} />
                    <span className="rounded-full border border-slate-800 bg-slate-900/70 px-2 py-0.5 text-[11px] text-slate-300">
                      Создан: {formatDateTime(state.data.created_at)}
                    </span>
                    <span className="rounded-full border border-slate-800 bg-slate-900/70 px-2 py-0.5 text-[11px] text-slate-300">
                      Отправлен: {formatDateTime(state.data.submitted_at)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <DetailItem
                      label="Нарушение"
                      value={
                        state.data.violation_type
                          ? VIOLATION_TYPE_LABELS[state.data.violation_type] ??
                            state.data.violation_type
                          : "—"
                      }
                    />
                    <DetailItem
                      label="Объект"
                      value={
                        state.data.object_type
                          ? OBJECT_TYPE_LABELS[state.data.object_type] ??
                            state.data.object_type
                          : "—"
                      }
                    />
                    <DetailItem
                      label="Компания"
                      value={state.data.company_name ?? "—"}
                    />
                    <DetailItem
                      label="Пользователь"
                      value={
                        state.data.is_anonymous
                          ? "Анонимно"
                          : state.data.user_display_name ?? "—"
                      }
                    />
                  </div>

                  <DetailItem
                    label="Адрес"
                    value={state.data.address_text ?? "—"}
                  />

                  {(state.data.lat && state.data.lng) && (
                    <div className="flex items-center justify-between rounded-md border border-slate-800 bg-slate-900/60 px-2.5 py-1.5 text-[11px] text-slate-200">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-chpok-pink" />
                        <span>
                          {state.data.lat.toFixed(5)},{" "}
                          {state.data.lng.toFixed(5)}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          router.push(
                            `/map?incidentId=${encodeURIComponent(
                              state.data.id
                            )}&lat=${state.data.lat}&lng=${state.data.lng}`,
                            { scroll: false }
                          );
                        }}
                        className="text-[11px] font-medium text-chpok-pink hover:text-chpok-pink/80"
                      >
                        Открыть на карте
                      </button>
                    </div>
                  )}
                </section>

                {/* Описание */}
                <section className="space-y-1.5">
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Описание
                  </h3>
                  <div className="rounded-md border border-slate-900 bg-slate-950/80 px-2.5 py-2 text-[11px] leading-relaxed text-slate-200">
                    {state.data.description?.trim()
                      ? state.data.description
                      : "Описание отсутствует."}
                  </div>
                </section>

                {/* Медиа */}
                <section className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Медиа
                    </h3>
                    <span className="text-[10px] text-slate-500">
                      {state.data.media.length} файлов
                    </span>
                  </div>
                  {state.data.media.length === 0 ? (
                    <div className="flex items-center gap-1.5 rounded-md border border-slate-900 bg-slate-950/80 px-2.5 py-2 text-[11px] text-slate-500">
                      <FileWarning className="h-3.5 w-3.5" />
                      <span>Нет вложений.</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-1.5">
                      {state.data.media.map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() =>
                            setActiveMedia({
                              storagePath: m.storage_path,
                              mediaType: m.media_type
                            })
                          }
                          className="group relative aspect-[4/3] overflow-hidden rounded-md border border-slate-800 bg-slate-900/80"
                        >
                          <div className="flex h-full w-full items-center justify-center text-[10px] text-slate-400">
                            {m.media_type.startsWith("video") ? "Видео" : "Фото"}
                          </div>
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        </button>
                      ))}
                    </div>
                  )}
                </section>

                {/* Обновление статуса */}
                <section className="space-y-1.5">
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Изменить статус
                  </h3>
                  <form
                    className="space-y-2 rounded-md border border-slate-900 bg-slate-950/80 px-2.5 py-2.5"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (!supabase || state.status !== "loaded") return;
                      if (!selectedStatus || selectedStatus === state.data.status) return;
                      setUpdatingStatus(true);
                      try {
                        const { error: updateError } = await supabase
                          .from("reports")
                          .update({ status: selectedStatus })
                          .eq("id", state.data.id);
                        if (updateError) throw updateError;

                        const { error: historyError } = await supabase
                          .from("report_status_history")
                          .insert({
                            report_id: state.data.id,
                            old_status: state.data.status,
                            new_status: selectedStatus,
                            comment: statusComment || null
                          });
                        if (historyError) throw historyError;

                        const updated: IncidentDetail = {
                          ...state.data,
                          status: selectedStatus,
                          status_history: [
                            {
                              id: `local-${Date.now()}`,
                              old_status: state.data.status,
                              new_status: selectedStatus,
                              comment: statusComment || null,
                              created_at: new Date().toISOString(),
                              changed_by_name: null
                            },
                            ...state.data.status_history
                          ]
                        };

                        setState({ status: "loaded", data: updated });
                        setStatusComment("");
                      } catch (err) {
                        console.error("Failed to update status", err);
                      } finally {
                        setUpdatingStatus(false);
                      }
                    }}
                  >
                    <select
                      value={selectedStatus ?? ""}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full rounded-md border border-slate-800 bg-slate-900/80 px-2 py-1.5 text-[11px] text-slate-100 outline-none focus:border-chpok-pink/70 focus:ring-1 focus:ring-chpok-pink/40"
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <textarea
                      value={statusComment}
                      onChange={(e) => setStatusComment(e.target.value)}
                      placeholder="Комментарий (опционально)"
                      rows={2}
                      className="w-full resize-none rounded-md border border-slate-800 bg-slate-950/80 px-2 py-1.5 text-[11px] text-slate-100 outline-none placeholder:text-slate-500 focus:border-chpok-pink/70 focus:ring-1 focus:ring-chpok-pink/40"
                    />
                    <button
                      type="submit"
                      disabled={
                        updatingStatus ||
                        !selectedStatus ||
                        (state.data && selectedStatus === state.data.status)
                      }
                      className="inline-flex w-full items-center justify-center rounded-md border border-chpok-pink/80 bg-chpok-pink/90 px-2 py-1.5 text-[11px] font-medium text-slate-950 shadow-sm shadow-chpok-pink/40 hover:bg-chpok-pink disabled:cursor-not-allowed disabled:border-slate-700 disabled:bg-slate-800 disabled:text-slate-400"
                    >
                      {updatingStatus ? (
                        <>
                          <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />
                          Сохраняем…
                        </>
                      ) : (
                        "Обновить статус"
                      )}
                    </button>
                  </form>
                </section>

                {/* История статусов */}
                <section className="space-y-1.5">
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    История статусов
                  </h3>
                  <div className="space-y-1.5 rounded-md border border-slate-900 bg-slate-950/80 px-2.5 py-2">
                    {state.data.status_history.length === 0 ? (
                      <p className="text-[11px] text-slate-500">
                        История изменений пуста.
                      </p>
                    ) : (
                      state.data.status_history.map((h) => (
                        <div
                          key={h.id}
                          className="flex items-start justify-between gap-2 text-[11px]"
                        >
                          <div className="space-y-0.5">
                            <p className="text-slate-200">
                              {STATUS_LABELS[h.old_status ?? ""] ??
                                h.old_status ??
                                "—"}{" "}
                              →{" "}
                              {STATUS_LABELS[h.new_status] ??
                                h.new_status}
                            </p>
                            {h.comment && (
                              <p className="text-[10px] text-slate-400">
                                {h.comment}
                              </p>
                            )}
                          </div>
                          <div className="text-right text-[10px] text-slate-500">
                            <p>{formatDateTime(h.created_at)}</p>
                            {h.changed_by_name && (
                              <p>{h.changed_by_name}</p>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </section>

                {/* Заметки админа */}
                <section className="space-y-1.5">
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Заметки модераторов
                  </h3>
                  <form
                    className="space-y-1.5 rounded-md border border-slate-900 bg-slate-950/80 px-2.5 py-2.5"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (!supabase || state.status !== "loaded") return;
                      if (!noteText.trim()) return;
                      setAddingNote(true);
                      try {
                        const { data, error } = await supabase
                          .from("admin_notes")
                          .insert({
                            report_id: state.data.id,
                            note: noteText.trim()
                          })
                          .select(
                            `
                              id,
                              note,
                              created_at,
                              profiles ( display_name )
                            `
                          )
                          .single();
                        if (error) throw error;

                        const profile = Array.isArray(data.profiles)
                          ? data.profiles[0]
                          : data.profiles;
                        const newNote = {
                          id: data.id as string,
                          note: data.note as string,
                          created_at: data.created_at as string,
                          author_name: profile?.display_name ?? null
                        };

                        setState({
                          status: "loaded",
                          data: {
                            ...state.data,
                            admin_notes: [newNote, ...state.data.admin_notes]
                          }
                        });
                        setNoteText("");
                      } catch (err) {
                        console.error("Failed to add note", err);
                      } finally {
                        setAddingNote(false);
                      }
                    }}
                  >
                    <textarea
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Новая заметка по инциденту"
                      rows={2}
                      className="w-full resize-none rounded-md border border-slate-800 bg-slate-950/80 px-2 py-1.5 text-[11px] text-slate-100 outline-none placeholder:text-slate-500 focus:border-chpok-pink/70 focus:ring-1 focus:ring-chpok-pink/40"
                    />
                    <button
                      type="submit"
                      disabled={addingNote || !noteText.trim()}
                      className="inline-flex w-full items-center justify-center rounded-md border border-slate-700 bg-slate-900/90 px-2 py-1.5 text-[11px] font-medium text-slate-100 hover:border-slate-500 hover:bg-slate-800 disabled:cursor-not-allowed disabled:border-slate-800 disabled:bg-slate-900 disabled:text-slate-500"
                    >
                      {addingNote ? (
                        <>
                          <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />
                          Сохраняем…
                        </>
                      ) : (
                        "Добавить заметку"
                      )}
                    </button>
                  </form>

                  <div className="space-y-1.5 rounded-md border border-slate-900 bg-slate-950/80 px-2.5 py-2">
                    {state.data.admin_notes.length === 0 ? (
                      <p className="text-[11px] text-slate-500">
                        Пока нет внутренних заметок.
                      </p>
                    ) : (
                      state.data.admin_notes.map((n) => (
                        <div
                          key={n.id}
                          className="space-y-0.5 rounded border border-slate-900 bg-slate-950/80 px-2 py-1.5 text-[11px]"
                        >
                          <p className="text-slate-200">{n.note}</p>
                          <div className="flex justify-between text-[10px] text-slate-500">
                            <span>{n.author_name ?? "Модератор"}</span>
                            <span>{formatDateTime(n.created_at)}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>

        {/* Модальное окно просмотра медиа */}
        {activeMedia && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            onClick={() => setActiveMedia(null)}
          >
            <div
              className="max-h-[90vh] max-w-[90vw] rounded-lg border border-slate-800 bg-slate-950/95 p-3 text-xs text-slate-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Просмотр вложения
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setActiveMedia(null);
                    setMediaUrl(null);
                    setMediaError(null);
                  }}
                  className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 text-slate-300 hover:border-slate-500 hover:text-slate-50"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
              <MediaContent
                activeMedia={activeMedia}
                mediaUrl={mediaUrl}
                setMediaUrl={setMediaUrl}
                mediaError={mediaError}
                setMediaError={setMediaError}
              />
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

function StatusBadge({ status }: { status: string }) {
  const label = STATUS_LABELS[status] ?? status;
  const badgeClass =
    STATUS_BADGE_CLASSES[status] ??
    "bg-slate-900 text-slate-100 border-slate-700";

  return (
    <span
      className={`inline-flex max-w-[160px] items-center justify-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${badgeClass}`}
    >
      {label}
    </span>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-0.5">
      <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <p className="text-[11px] text-slate-200">{value}</p>
    </div>
  );
}

type MediaContentProps = {
  activeMedia: ActiveMedia;
  mediaUrl: string | null;
  setMediaUrl: (url: string | null) => void;
  mediaError: string | null;
  setMediaError: (msg: string | null) => void;
};

function MediaContent({
  activeMedia,
  mediaUrl,
  setMediaUrl,
  mediaError,
  setMediaError
}: MediaContentProps) {
  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!activeMedia) return;
      setMediaError(null);
      setMediaUrl(null);
      const url = await getSignedMediaUrl(activeMedia.storagePath);
      if (cancelled) return;
      if (!url) {
        setMediaError("Файл недоступен.");
        return;
      }
      setMediaUrl(url);
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [activeMedia, setMediaUrl, setMediaError]);

  if (!activeMedia) return null;

  if (mediaError) {
    return (
      <div className="flex h-64 w-[70vw] max-w-md items-center justify-center rounded-md border border-rose-900/80 bg-rose-950/60 text-[11px] text-rose-100">
        {mediaError}
      </div>
    );
  }

  if (!mediaUrl) {
    return (
      <div className="flex h-64 w-[70vw] max-w-md items-center justify-center rounded-md border border-slate-800 bg-slate-900/80 text-[11px] text-slate-400">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Загружаем файл…
      </div>
    );
  }

  const isVideo = activeMedia.mediaType.startsWith("video");

  return (
    <div className="flex h-64 w-[70vw] max-w-md items-center justify-center rounded-md border border-slate-800 bg-slate-900/80">
      {isVideo ? (
        <video
          src={mediaUrl}
          controls
          className="h-full w-full rounded-md object-contain"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={mediaUrl}
          alt="Медиафайл инцидента"
          className="h-full w-full rounded-md object-contain"
        />
      )}
    </div>
  );
}


