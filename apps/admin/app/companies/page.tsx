import { CrmShell } from "../../components/crm-shell";
import { EmptyWorkspace } from "../../components/empty-workspace";

export default function CompaniesPage() {
  return (
    <CrmShell
      pageTitle="Компании"
      pageDescription="Кому передаём сигнал и кто помогает городу реагировать."
    >
      <EmptyWorkspace eyebrow="маршрутизация" title="Нужные контакты — в одном месте." text="Здесь будет справочник операторов, подрядчиков и городских служб с категориями обращений и скоростью ответа." />
    </CrmShell>
  );
}
