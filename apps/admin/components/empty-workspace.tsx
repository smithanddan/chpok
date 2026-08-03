import type { ReactNode } from "react";

export function EmptyWorkspace({ eyebrow, title, text, children }: { eyebrow: string; title: string; text: string; children?: ReactNode }) {
  return <section className="relative min-h-[420px] overflow-hidden rounded-[22px] bg-[#f5e5ac] p-7 sm:p-10"><span className="absolute -right-8 -top-12 text-[220px] font-bold leading-none text-[#ffcf45]">✦</span><div className="relative max-w-xl"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#765f13]">{eyebrow}</p><h2 className="mt-5 text-4xl font-bold leading-[.9] tracking-[-.07em] sm:text-6xl">{title}</h2><p className="mt-6 max-w-md text-sm leading-6 text-[#4e4a3e]">{text}</p>{children}</div></section>;
}
