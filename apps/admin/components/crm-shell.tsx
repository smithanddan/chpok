"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Building2, LayoutGrid, MapPin, Menu, Settings, TriangleAlert, Users } from "lucide-react";

type NavItem = { label: string; href: string; icon: React.ComponentType<{ className?: string }> };

const NAV_ITEMS: NavItem[] = [
  { label: "Обзор", href: "/dashboard", icon: LayoutGrid },
  { label: "Инциденты", href: "/incidents", icon: TriangleAlert },
  { label: "Карта", href: "/map", icon: MapPin },
  { label: "Пользователи", href: "/users", icon: Users },
  { label: "Компании", href: "/companies", icon: Building2 },
  { label: "Настройки", href: "/settings", icon: Settings }
];

export function CrmShell({ children, pageTitle, pageDescription }: { children: ReactNode; pageTitle: string; pageDescription?: string }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-[#17233b] text-[#fff8ed]">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#17233b]/95 px-4 backdrop-blur lg:px-8">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2.5" aria-label="ЧПОК CRM — обзор">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#ff418e] text-base font-bold text-[#17233b]">✦</span>
            <span className="leading-none"><b className="block text-[18px] tracking-[-0.08em]">чпок</b><i className="mt-1 block text-[9px] font-bold uppercase tracking-[0.18em] text-[#b7c7dd] not-italic">операторская</i></span>
          </Link>
          <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex" aria-label="Навигация CRM">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
              return <Link key={item.href} href={item.href} className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold transition ${active ? "bg-[#fff8ed] text-[#17233b]" : "text-[#c0cee0] hover:bg-white/10 hover:text-white"}`}><Icon className="h-3.5 w-3.5" />{item.label}</Link>;
            })}
          </nav>
          <div className="ml-auto flex items-center gap-3"><span className="hidden items-center gap-1.5 text-[11px] text-[#c0cee0] sm:flex"><i className="h-2 w-2 rounded-full bg-[#ffcf45]" />смена активна</span><span className="grid h-9 w-9 place-items-center rounded-2xl bg-[#ffcf45] text-[11px] font-bold text-[#17233b]">ОП</span><button className="grid h-9 w-9 place-items-center rounded-full border border-white/15 lg:hidden" aria-label="Меню"><Menu className="h-4 w-4" /></button></div>
        </div>
      </header>
      <main className="px-4 py-7 lg:px-8 lg:py-10">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ffcf45]">операторский центр / чпок</p><h1 className="text-4xl font-bold leading-none tracking-[-0.07em] text-[#fff8ed] sm:text-5xl">{pageTitle}</h1>{pageDescription ? <p className="mt-3 max-w-2xl text-sm leading-6 text-[#c0cee0]">{pageDescription}</p> : null}</div>
            <span className="w-fit rounded-full border border-white/15 px-3 py-1.5 text-[11px] font-semibold text-[#c0cee0]">обновлено только что</span>
          </div>
          <div className="rounded-[28px] bg-[#fff8ed] p-3 text-[#17233b] shadow-[12px_12px_0_rgba(255,65,142,.38)] sm:p-5">{children}</div>
        </div>
      </main>
    </div>
  );
}
