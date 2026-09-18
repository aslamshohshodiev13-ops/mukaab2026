-- Добавляет поля под вакансии (и любые другие разделы с похожей структурой).
-- Безопасно выполнять на уже работающей базе — только добавляет колонки, ничего не удаляет.
-- mysql -u root -p mukaab < migration_002_vacancy_fields.sql

ALTER TABLE content_items
  ADD COLUMN IF NOT EXISTS badge_ru VARCHAR(50) DEFAULT '' AFTER gallery,
  ADD COLUMN IF NOT EXISTS badge_en VARCHAR(50) DEFAULT '' AFTER badge_ru,
  ADD COLUMN IF NOT EXISTS stats_ru TEXT AFTER badge_en,
  ADD COLUMN IF NOT EXISTS stats_en TEXT AFTER stats_ru,
  ADD COLUMN IF NOT EXISTS requirements_ru TEXT AFTER stats_en,
  ADD COLUMN IF NOT EXISTS requirements_en TEXT AFTER requirements_ru,
  ADD COLUMN IF NOT EXISTS note_ru VARCHAR(255) DEFAULT '' AFTER requirements_en,
  ADD COLUMN IF NOT EXISTS note_en VARCHAR(255) DEFAULT '' AFTER note_ru;

-- Формат stats_ru / stats_en: одна строка = одна характеристика, в формате "Подпись|Значение"
--   Опыт работы|от 3 лет
--   Зарплата|от 2 000 $
--   График|5/2, офис
-- Формат requirements_ru / requirements_en: один пункт списка обязанностей на строку.
