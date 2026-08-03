import { CrmShell } from "../../components/crm-shell";

type SearchParams = { [key: string]: string | string[] | undefined };

function getParam(
  searchParams: SearchParams,
  key: string
): string | undefined {
  const value = searchParams[key];
  if (Array.isArray(value)) return value[0];
  return value;
}

export default function MapPage({
  searchParams
}: {
  searchParams: SearchParams;
}) {
  const incidentId = getParam(searchParams, "incidentId");
  const lat = getParam(searchParams, "lat");
  const lng = getParam(searchParams, "lng");

  const hasPoint = incidentId && lat && lng;

  return (
    <CrmShell
      pageTitle="Карта"
      pageDescription="Проверяйте адреса, горячие точки и маршруты передачи сигналов."
    >
      <div className="flex min-h-[420px] flex-col gap-3 text-sm text-slate-200">
        <div className="rounded-2xl bg-[#17233b] px-5 py-4 text-xs text-slate-300">
          {hasPoint ? (
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-[11px] text-slate-400">
                  Выбранный инцидент
                </p>
                <p className="font-mono text-xs text-slate-100">
                  {incidentId}
                </p>
              </div>
              <div className="text-right text-[11px] text-slate-300">
                <p>
                  Координаты:{" "}
                  <span className="font-mono">
                    {lat}, {lng}
                  </span>
                </p>
                <p className="text-[10px] text-slate-500">
                  В будущем точка будет отображаться на карте.
                </p>
              </div>
            </div>
          ) : (
            <p className="text-[11px] text-slate-400">
              Карта пока работает в режиме заглушки. Выберите инцидент в таблице
              и нажмите «Открыть на карте», чтобы увидеть его координаты.
            </p>
          )}
        </div>

        <div className="relative flex-1 overflow-hidden rounded-[22px] bg-[#c7e9f7]">
          <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(#17233b_1px,transparent_1px),linear-gradient(90deg,#17233b_1px,transparent_1px)] [background-size:42px_42px]" />
          <span className="absolute left-[18%] top-[25%] grid h-12 w-12 place-items-center rounded-full bg-[#ff418e] text-lg text-[#fff8ed] shadow-[4px_4px_0_#17233b]">!</span>
          <span className="absolute bottom-[20%] right-[24%] grid h-9 w-9 place-items-center rounded-full bg-[#ffcf45] text-[#17233b]">✦</span>
          <div className="absolute inset-0 grid place-items-center text-center"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#536177]">карта сигналов</p><p className="mt-2 max-w-xs text-lg font-bold leading-tight tracking-[-.04em] text-[#17233b]">Здесь появятся точки, когда в очереди будут обращения.</p></div></div>
        </div>
      </div>
    </CrmShell>
  );
}
