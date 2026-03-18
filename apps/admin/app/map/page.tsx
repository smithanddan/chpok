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
      pageDescription="Простая карта для проверки координат инцидентов. Далее сюда можно добавить полноценный тайл-сервис и кластеризацию."
    >
      <div className="flex h-full flex-col gap-3 text-sm text-slate-200">
        <div className="rounded-md border border-slate-900 bg-slate-950/80 px-3 py-2 text-xs text-slate-300">
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

        <div className="flex-1 rounded-xl border border-slate-900 bg-slate-950/80">
          <div className="flex h-full items-center justify-center text-xs text-slate-500">
            Здесь позже появится настоящий виджет карты (например, Leaflet или
            Mapbox) с точками инцидентов.
          </div>
        </div>
      </div>
    </CrmShell>
  );
}


