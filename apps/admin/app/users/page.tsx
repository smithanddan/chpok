import { CrmShell } from "../../components/crm-shell";
import { EmptyWorkspace } from "../../components/empty-workspace";

export default function UsersPage() {
  return (
    <CrmShell
      pageTitle="Пользователи"
      pageDescription="Жители, модераторы и их вклад в порядок города."
    >
      <EmptyWorkspace eyebrow="люди чпока" title="Здесь появятся те, кто замечает." text="Подключим профиль, роли и историю обращений. Пока сигналы можно вести без публичного профиля — важнее сама ситуация." />
    </CrmShell>
  );
}
