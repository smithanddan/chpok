# Landing (Vite)

Статичный лендинг из макета Figma: [Redesign landing page](https://www.figma.com/design/DJkCPcpbmCChTnIExSSrvx/Redesign-landing-page).

## Запуск в монорепозитории

Из корня `chpok`:

```bash
npm install
npm run dev:landing
```

Или из этой папки:

```bash
npm run dev
```

Сборка:

```bash
npm run build
# или из корня: npm run build:landing
```

Preview production build: `npm run preview`.

См. также `ATTRIBUTIONS.md` в этой директории.

## Если «не работает» / пустой экран

1. **Зависимости только из корня монорепы:**  
   `cd chpok && npm install`  
   Не открывайте `index.html` двойным щелчком — нужен dev-сервер Vite.

2. **Откройте URL из терминала** (часто `http://localhost:5173/`; если порт занят — Vite напишет другой, например 5174).

3. **Node:** для Vite 6 нужен **Node 18+** (лучше **20 LTS**). Проверка: `node -v`.

4. **Жёсткий сброс кэша Vite:** удалите `apps/landing/node_modules/.vite` (если есть) и перезапустите `npm run dev:landing`.

5. Белая страница + ошибки в консоли браузера (F12) — пришлите текст из **Console**, чтобы можно было точечно поправить.
