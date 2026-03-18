import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Chpok Admin",
  description: "Chpok admin panel for managing urban incident reports and city responses."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-chpok-bg text-slate-50 antialiased">
        {children}
      </body>
    </html>
  );
}

