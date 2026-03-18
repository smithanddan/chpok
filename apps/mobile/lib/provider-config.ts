export type ProviderCategory =
  | "delivery"
  | "micromobility"
  | "carsharing"
  | "taxi"
  | "car"
  | "other";

export type ProviderKey =
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

export type ProviderOption = {
  key: ProviderKey;
  label: string;
};

export type ProviderCategoryConfig = {
  category: ProviderCategory;
  categoryLabel: string;
  providers: ProviderOption[];
};

export const PROVIDER_CONFIG: ProviderCategoryConfig[] = [
  {
    category: "delivery",
    categoryLabel: "Доставка",
    providers: [
      { key: "samokat", label: "Самокат" },
      { key: "yandex_eda", label: "Яндекс Еда" },
      { key: "vkusvill", label: "ВкусВилл" },
      { key: "kuper", label: "Купер" },
      { key: "ozon_fresh", label: "Ozon Fresh" },
      { key: "magnit_dostavka", label: "Магнит Доставка" },
      { key: "pyaterochka", label: "Пятёрочка" },
      { key: "perekrestok", label: "Перекрёсток" },
      { key: "lenta", label: "Лента" },
      { key: "delivery_other", label: "Другое" },
      { key: "delivery_unknown", label: "Не знаю" }
    ]
  },
  {
    category: "micromobility",
    categoryLabel: "Микромобильность",
    providers: [
      { key: "whoosh", label: "Whoosh" },
      { key: "mts_urent", label: "МТС Urent" },
      { key: "yandex_go", label: "Яндекс Go" },
      { key: "private_sim", label: "Частный самокат/велосипед" },
      { key: "micromobility_other", label: "Другое" },
      { key: "micromobility_unknown", label: "Не знаю" }
    ]
  },
  {
    category: "carsharing",
    categoryLabel: "Каршеринг",
    providers: [
      { key: "delimobil", label: "Делимобиль" },
      { key: "citydrive", label: "Citydrive" },
      { key: "yandex_drive", label: "Яндекс Драйв" },
      { key: "belkacar", label: "BelkaCar" },
      { key: "carsharing_other", label: "Другое" },
      { key: "carsharing_unknown", label: "Не знаю" }
    ]
  },
  {
    category: "taxi",
    categoryLabel: "Такси",
    providers: [
      { key: "yandex_taxi", label: "Яндекс Такси" },
      { key: "uber", label: "Uber" },
      { key: "maxim", label: "Максим" },
      { key: "drivee", label: "Drivee" },
      { key: "taxi_other", label: "Другое" },
      { key: "taxi_unknown", label: "Не знаю" }
    ]
  },
  {
    category: "car",
    categoryLabel: "Авто",
    providers: [
      { key: "private_car", label: "Частный автомобиль" },
      { key: "service_car", label: "Служебный автомобиль" },
      { key: "municipal_car", label: "Муниципальный автомобиль" },
      { key: "car_unknown", label: "Не знаю" }
    ]
  },
  {
    category: "other",
    categoryLabel: "Другое",
    providers: [
      { key: "other_other", label: "Другое" },
      { key: "other_unknown", label: "Не знаю" }
    ]
  }
];

export const PROVIDER_LABELS: Record<ProviderKey, string> = PROVIDER_CONFIG
  .flatMap((group) => group.providers)
  .reduce(
    (acc, item) => {
      acc[item.key] = item.label;
      return acc;
    },
    {} as Record<ProviderKey, string>
  );

export const PROVIDER_CATEGORY_LABELS: Record<ProviderCategory, string> =
  PROVIDER_CONFIG.reduce(
    (acc, item) => {
      acc[item.category] = item.categoryLabel;
      return acc;
    },
    {} as Record<ProviderCategory, string>
  );

