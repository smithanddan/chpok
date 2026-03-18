import { CrmShell } from "../../components/crm-shell";

export default function DashboardPage() {
  return (
    <CrmShell
      pageTitle="Дашборд"
      pageDescription="Здесь позже появится обзор по очереди инцидентов, SLA и нагрузке операторов."
    >
      <div className="flex h-full items-center justify-center text-sm text-slate-400">
        Дашборд пока в разработке. Основная рабочая область — раздел «Инциденты».
      </div>
    </CrmShell>
  );
}

