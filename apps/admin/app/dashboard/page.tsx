import { CrmShell } from "../../components/crm-shell";

export default function DashboardPage() {
  return (
    <CrmShell
      pageTitle="Дашборд"
      pageDescription="Спокойный обзор очереди: что требует внимания прямо сейчас и где город ждёт ответа."
    >
      <div className="grid gap-3 lg:grid-cols-[1.4fr_.9fr]">
        <section className="rounded-[22px] bg-[#ff418e] p-7 text-[#17233b] sm:p-9"><p className="text-[10px] font-bold uppercase tracking-[.2em]">в фокусе сегодня</p><h2 className="mt-5 max-w-md text-4xl font-bold leading-[.9] tracking-[-.07em]">Новые сигналы должны получить маршрут.</h2><p className="mt-6 max-w-sm text-sm leading-6">Откройте очередь, чтобы проверить обращения с фото, координатами и понятным описанием.</p><a className="mt-8 inline-flex rounded-full bg-[#17233b] px-5 py-3 text-xs font-bold text-[#fff8ed]" href="/incidents">Открыть инциденты →</a></section>
        <section className="rounded-[22px] bg-[#17233b] p-7 text-[#fff8ed]"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#ffcf45]">ритм смены</p><div className="mt-7 grid grid-cols-2 gap-5"><Metric value="—" label="новых сигналов" /><Metric value="—" label="ожидают решения" /><Metric value="—" label="в пределах SLA" /><Metric value="—" label="передано службам" /></div></section>
      </div>
    </CrmShell>
  );
}

function Metric({ value, label }: { value: string; label: string }) { return <div><b className="block text-3xl tracking-[-.08em]">{value}</b><span className="mt-1 block text-[11px] leading-4 text-[#c0cee0]">{label}</span></div>; }
