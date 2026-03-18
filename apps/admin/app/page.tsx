import { CrmShell } from "../components/crm-shell";

export default function HomePage() {
  return (
    <CrmShell
      pageTitle="Дашборд"
      pageDescription="Общий обзор очереди инцидентов Chpok. В следующей итерации здесь появятся базовые показатели и виджеты."
    >
      <div className="flex h-full flex-col justify-center gap-4 text-sm text-slate-300">
        <p className="text-base font-medium text-slate-100">
          Новый CRM-интерфейс Chpok для модерации инцидентов.
        </p>
        <p>
          На этом экране позже появится концентратор показателей (количество открытых
          инцидентов, SLA, нагрузка на операторов). Пока основной рабочий раздел —
          вкладка <span className="font-semibold text-slate-50">«Инциденты»</span> в
          левом меню.
        </p>
      </div>
    </CrmShell>
  );
}

