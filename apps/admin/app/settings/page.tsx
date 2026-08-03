import { CrmShell } from "../../components/crm-shell";
import { EmptyWorkspace } from "../../components/empty-workspace";

export default function SettingsPage() {
  return (
    <CrmShell
      pageTitle="Настройки"
      pageDescription="Правила команды, уведомления и связи с городскими сервисами."
    >
      <EmptyWorkspace eyebrow="настройка процесса" title="Сделаем реакцию города предсказуемой." text="Здесь появятся роли операторов, правила модерации, SLA и интеграции. Всё, что делает путь сигнала прозрачным." />
    </CrmShell>
  );
}
