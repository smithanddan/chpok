export function IncidentSnapshotCard() {
  return (
    <div className="grid gap-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4 sm:grid-cols-3">
      <div className="space-y-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          New today
        </p>
        <p className="text-2xl font-semibold text-slate-50">—</p>
        <p className="text-xs text-slate-500">
          Will show how many fresh incidents city residents reported in the last 24
          hours.
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          Waiting for action
        </p>
        <p className="text-2xl font-semibold text-amber-300">—</p>
        <p className="text-xs text-slate-500">
          Once wired, this highlights reports that still need triage or routing.
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          Resolved this week
        </p>
        <p className="text-2xl font-semibold text-emerald-400">—</p>
        <p className="text-xs text-slate-500">
          A simple signal for how many incidents you closed for the city.
        </p>
      </div>
    </div>
  );
}

