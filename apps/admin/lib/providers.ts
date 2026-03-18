export type ProviderCategory =
  | "delivery"
  | "micromobility"
  | "carsharing"
  | "taxi"
  | "car"
  | "other";

export type ProviderCode =
  | "samokat"
  | "yandex_eda"
  | "vkusvill"
  | "kuper"
  | "ozon_fresh"
  | "magnit_dostavka"
  | "pyaterochka"
  | "perekrestok"
  | "lenta"
  | "delivery_other"
  | "delivery_unknown"
  | "whoosh"
  | "mts_urent"
  | "yandex_go"
  | "private_sim"
  | "micromobility_other"
  | "micromobility_unknown"
  | "delimobil"
  | "citydrive"
  | "yandex_drive"
  | "belkacar"
  | "carsharing_other"
  | "carsharing_unknown"
  | "yandex_taxi"
  | "uber"
  | "maxim"
  | "drivee"
  | "taxi_other"
  | "taxi_unknown"
  | "private_car"
  | "service_car"
  | "municipal_car"
  | "car_unknown"
  | "other_other"
  | "other_unknown";

export type ProviderConfigItem = {
  code: ProviderCode;
  label: string;
};

export type ProviderConfig = {
  category: ProviderCategory;
  categoryLabel: string;
  providers: ProviderConfigItem[];
};

export const PROVIDER_CONFIG: ProviderConfig[] = [
  {
    category: "delivery",
    categoryLabel: "Доставка",
    providers: [
      { code: "samokat", label: "Самокат" },
      { code: "yandex_eda", label: "Яндекс Еда" },
      { code: "vkusvill", label: "ВкусВилл" },
      { code: "kuper", label: "Купер" },
      { code: "ozon_fresh", label: "Ozon Fresh" },
      { code: "magnit_dostavka", label: "Магнит Доставка" },
      { code: "pyaterochka", label: "Пятёрочка" },
      { code: "perekrestok", label: "Перекрёсток" },
      { code: "lenta", label: "Лента" },
      { code: "delivery_other", label: "Другое (доставка)" },
      { code: "delivery_unknown", label: "Неизвестно (доставка)" }
    ]
  },
  {
    category: "micromobility",
    categoryLabel: "Микромобильность",
    providers: [
      { code: "whoosh", label: "Whoosh" },
      { code: "mts_urent", label: "МТС Urent" },
      { code: "yandex_go", label: "Яндекс Go" },
      { code: "private_sim", label: "Частный самокат/велосипед" },
      { code: "micromobility_other", label: "Другое (микромобильность)" },
      { code: "micromobility_unknown", label: "Неизвестно (микромобильность)" }
    ]
  },
  {
    category: "carsharing",
    categoryLabel: "Каршеринг",
    providers: [
      { code: "delimobil", label: "Делимобиль" },
      { code: "citydrive", label: "Citydrive" },
      { code: "yandex_drive", label: "Яндекс Драйв" },
      { code: "belkacar", label: "BelkaCar" },
      { code: "carsharing_other", label: "Другое (каршеринг)" },
      { code: "carsharing_unknown", label: "Неизвестно (каршеринг)" }
    ]
  },
  {
    category: "taxi",
    categoryLabel: "Такси",
    providers: [
      { code: "yandex_taxi", label: "Яндекс Такси" },
      { code: "uber", label: "Uber" },
      { code: "maxim", label: "Максим" },
      { code: "drivee", label: "Drivee" },
      { code: "taxi_other", label: "Другое (такси)" },
      { code: "taxi_unknown", label: "Неизвестно (такси)" }
    ]
  },
  {
    category: "car",
    categoryLabel: "Авто",
    providers: [
      { code: "private_car", label: "Частный автомобиль" },
      { code: "service_car", label: "Служебный автомобиль" },
      { code: "municipal_car", label: "Муниципальный автомобиль" },
      { code: "car_unknown", label: "Неизвестно (авто)" }
    ]
  },
  {
    category: "other",
    categoryLabel: "Другое",
    providers: [
      { code: "other_other", label: "Другое" },
      { code: "other_unknown", label: "Неизвестно" }
    ]
  }
];

export const PROVIDER_LABELS: Record<ProviderCode, string> = PROVIDER_CONFIG
  .flatMap((group) => group.providers)
  .reduce(
    (acc, item) => {
      acc[item.code] = item.label;
      return acc;
    },
    {} as Record<ProviderCode, string>
  );

export const PROVIDER_CATEGORY_LABELS: Record<ProviderCategory, string> =
  PROVIDER_CONFIG.reduce(
    (acc, item) => {
      acc[item.category] = item.categoryLabel;
      return acc;
    },
    {} as Record<ProviderCategory, string>
  );

/**
 * Intended usage:
 *
 * - Мобильные формы выбора нарушителя/бренда:
 *   - сначала показывают список категорий (PROVIDER_CONFIG[x].categoryLabel),
 *   - затем сразу список брендов внутри выбранной категории (providers[]),
 *     без дополнительного шага "подтип актёра".
 *
 * - Админ-фильтры и справочники:
 *   - могут строить селекты по категориям и брендам на основе PROVIDER_CONFIG,
 *   - использовать PROVIDER_LABELS/PROVIDER_CATEGORY_LABELS для русских подписей.
 *
 * - Бэкенд/БД:
 *   - могут хранить пару (category, provider_code) или только provider_code,
 *     без отдельного второго уровня подтипа.
 */

