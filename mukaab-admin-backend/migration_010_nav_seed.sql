-- Наполняет редактируемое верхнее меню исходными пунктами.
-- mysql -u root -p mukaab < migration_010_nav_seed.sql

INSERT INTO content_items (type, title_ru, title_en, location, status, sort_order) VALUES
('nav','Главная','Home','mukaab.html','published',1),
('nav','Интерьеры','Interiors','interior_design.html','published',2),
('nav','Архитектура','Architecture','architecture_service.html','published',3),
('nav','Услуги','Services','servis.html','published',4),
('nav','Портфолио','Portfolio','portfolio.html','published',5);
