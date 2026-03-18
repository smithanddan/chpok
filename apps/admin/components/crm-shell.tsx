 "use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Menu, MapPin, Settings, Users, Building2, LayoutGrid, AlertTriangle } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Дашборд", href: "/dashboard", icon: LayoutGrid },
  { label: "Инциденты", href: "/incidents", icon: AlertTriangle },
  { label: "Карта", href: "/map", icon: MapPin },
  { label: "Пользователи", href: "/users", icon: Users },
  { label: "Компании", href: "/companies", icon: Building2 },
  { label: "Настройки", href: "/settings", icon: Settings }
];

export function CrmShell({ children, pageTitle, pageDescription }: { children: ReactNode; pageTitle: string; pageDescription?: string; }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-50">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-slate-800 bg-slate-950/80 px-4 py-5 lg:flex lg:flex-col">
        <div className="mb-6 flex items-center gap-2 px-1">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-chpok-pink text-xs font-semibold text-slate-950">
            Ч
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-tight">Chpok CRM</p>
            <p className="text-[11px] text-slate-400">Модерация инцидентов</p>
          </div>
        </div>

        <nav className="space-y-1 text-sm">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-lg px-2.5 py-2 transition-colors ${
                  isActive
                    ? "bg-slate-900 text-slate-50"
                    : "text-slate-400 hover:bg-slate-900/70 hover:text-slate-100"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-4 text-[11px] text-slate-500">
          Сессия оператора
        </div>
      </aside>

      {/* Main column */}
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Topbar */}
        <header className="flex h-14 items-center justify-between border-b border-slate-800 bg-slate-950/80 px-3 lg:px-6">
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 text-slate-200"
              aria-label="Меню"
            >
              <Menu className="h-4 w-4" />
            </button>
            <span className="text-sm font-semibold tracking-tight">Chpok CRM</span>
          </div>

          <div className="hidden flex-1 items-center gap-3 lg:flex">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Операционный центр
              </p>
              <p className="text-sm font-medium text-slate-100">
                {pageTitle}
              </p>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-end gap-3 lg:flex-none">
            <div className="hidden w-full max-w-xs items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-300 shadow-sm shadow-slate-950/30 sm:flex">
              <span className="text-[11px] text-slate-500">Поиск</span>
              <span className="line-clamp-1 flex-1 text-left text-[11px] text-slate-400">
                ID, адрес, компания, пользователь…
              </span>
              <span className="rounded-full bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400">
                ⌘K
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-chpok-pink to-slate-50 text-xs font-semibold text-slate-950">
                ОП
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 bg-slate-950/95 px-3 pb-6 pt-3 lg:px-6 lg:pt-4">
          <div className="mx-auto flex h-full max-w-6xl flex-col gap-3">
            <div className="lg:hidden">
              <h1 className="text-base font-semibold text-slate-100">
                {pageTitle}
              </h1>
              {pageDescription ? (
                <p className="mt-1 text-xs text-slate-400">{pageDescription}</p>
              ) : null}
            </div>
            {pageDescription && (
              <div className="hidden rounded-xl border border-slate-900 bg-slate-900/60 px-4 py-2 text-xs text-slate-300 lg:block">
                {pageDescription}
              </div>
            )}
            <div className="flex-1 rounded-xl border border-slate-900 bg-slate-950/80 p-3 lg:p-4">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

