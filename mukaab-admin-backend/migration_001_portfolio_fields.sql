-- Выполни этот файл ТОЛЬКО если база mukaab_admin уже была создана раньше
-- (по прошлой версии schema.sql) и в таблице content_items ещё нет колонок
-- filter_cat / tags / gallery. Если ты создаёшь базу с нуля — просто используй schema.sql,
-- этот файл не нужен.
--
-- mysql -u root -p mukaab_admin < migration_001_portfolio_fields.sql

ALTER TABLE content_items
  ADD COLUMN IF NOT EXISTS filter_cat VARCHAR(20) DEFAULT '' AFTER sort_order,
  ADD COLUMN IF NOT EXISTS tags VARCHAR(255) DEFAULT '' AFTER filter_cat,
  ADD COLUMN IF NOT EXISTS gallery TEXT AFTER tags;

-- Проставим filter_cat для уже существующих записей портфолио по полю category
UPDATE content_items SET filter_cat='interior'   WHERE type='portfolio' AND filter_cat='' AND category LIKE '%нтерьер%';
UPDATE content_items SET filter_cat='arch'       WHERE type='portfolio' AND filter_cat='' AND category LIKE '%рхитектур%';
UPDATE content_items SET filter_cat='furniture'  WHERE type='portfolio' AND filter_cat='' AND category LIKE '%ебель%';
UPDATE content_items SET filter_cat='commercial' WHERE type='portfolio' AND filter_cat='' AND (category LIKE '%коммерч%' OR category LIKE '%офис%' OR category LIKE '%отел%' OR category LIKE '%ресторан%');
