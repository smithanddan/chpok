export const STATUS_LABELS: Record<string, string> = {
  draft: "Черновик",
  submitted: "Отправлено",
  in_review: "На проверке",
  in_progress: "В работе",
  resolved: "Решено",
  rejected: "Отклонено"
};

export const STATUS_BADGE_CLASSES: Record<string, string> = {
  draft: "bg-slate-800 text-slate-100 border-slate-700",
  submitted: "bg-slate-900 text-slate-100 border-slate-700",
  in_review: "bg-amber-900/60 text-amber-100 border-amber-700/70",
  in_progress: "bg-sky-900/70 text-sky-100 border-sky-700/80",
  resolved: "bg-emerald-900/60 text-emerald-100 border-emerald-700/80",
  rejected: "bg-rose-950/70 text-rose-100 border-rose-700/80"
};

export const VIOLATION_TYPE_LABELS: Record<string, string> = {
  parking: "Парковка",
  trash: "Мусор",
  road: "Дороги",
  lighting: "Освещение",
  other: "Другое"
};

export const OBJECT_TYPE_LABELS: Record<string, string> = {
  yard: "Двор",
  street: "Улица",
  building: "Здание",
  playground: "Площадка",
  transport: "Транспорт",
  other: "Другое"
};

