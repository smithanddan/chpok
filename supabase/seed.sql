-- Chpok MVP: seed example companies
-- Run after migrations (e.g. supabase db reset or manually against empty DB).
-- Categories: delivery, micromobility, carsharing, taxi

INSERT INTO public.companies (name, slug, category) VALUES
  ('VkusVill', 'vkusvill', 'delivery'),
  ('Samokat', 'samokat', 'delivery'),
  ('Yandex Eda', 'yandex-eda', 'delivery'),
  ('Whoosh', 'whoosh', 'micromobility'),
  ('Urent', 'urent', 'micromobility'),
  ('Yandex Go', 'yandex-go', 'micromobility'),
  ('Delimobil', 'delimobil', 'carsharing'),
  ('BelkaCar', 'belkacar', 'carsharing'),
  ('Citydrive', 'citydrive', 'carsharing'),
  ('Yandex Taxi', 'yandex-taxi', 'taxi')
ON CONFLICT (slug) DO NOTHING;
