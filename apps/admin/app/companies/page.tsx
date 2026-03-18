import { CrmShell } from "../../components/crm-shell";

export default function CompaniesPage() {
  return (
    <CrmShell
      pageTitle="Компании"
      pageDescription="Справочник обслуживающих организаций и подрядчиков. Здесь позже появятся категории и счетчики инцидентов."
    >
      <div className="flex h-full items-center justify-center text-sm text-slate-400">
        Таблица компаний пока не реализована. Страница подготовлена под будущий список.
      </div>
    </CrmShell>
  );
}

