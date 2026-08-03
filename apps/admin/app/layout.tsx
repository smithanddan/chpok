import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "ЧПОК — операторская",
  description: "Операторская ЧПОКа: маршрутизация и обработка городских сигналов."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className="h-full">
      <body className="min-h-full antialiased">
        {children}
      </body>
    </html>
  );
}
