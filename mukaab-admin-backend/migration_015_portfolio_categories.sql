-- Категории фильтра портфолио теперь управляются из админки, а не зашиты в HTML.
-- location используется как "slug" (значение data-cat на сайте).
-- mysql -u root -p mukaab < migration_015_portfolio_categories.sql

INSERT INTO content_items (type, title_ru, title_en, location, status, sort_order) VALUES
('portfolio_cat','Все работы','All Projects','all','published',1),
('portfolio_cat','Интерьер','Interior','interior','published',2),
('portfolio_cat','Архитектура','Architecture','arch','published',3),
('portfolio_cat','Мебель','Furniture','furniture','published',4),
('portfolio_cat','Коммерческие','Commercial','commercial','published',5);
