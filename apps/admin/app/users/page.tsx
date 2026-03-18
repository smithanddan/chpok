import { CrmShell } from "../../components/crm-shell";

export default function UsersPage() {
  return (
    <CrmShell
      pageTitle="Пользователи"
      pageDescription="Список пользователей Chpok. В следующем шаге сюда можно добавить роли, активность и счетчики инцидентов."
    >
      <div className="flex h-full items-center justify-center text-sm text-slate-400">
        Таблица пользователей пока не реализована. Страница подготовлена под будущий список.
      </div>
    </CrmShell>
  );
}

