-- Выставляет правильный порядок карточек на странице "Услуги" (servis.html),
-- чтобы расположение больших/средних/маленьких карточек совпадало с оригиналом.
-- mysql -u root -p mukaab < migration_013_services_order.sql

UPDATE content_items SET sort_order=1 WHERE type='services' AND title_ru='Дизайн интерьера';
UPDATE content_items SET sort_order=2 WHERE type='services' AND title_ru='Архитектура';
UPDATE content_items SET sort_order=3 WHERE type='services' AND title_ru='3D-визуализация';
UPDATE content_items SET sort_order=4 WHERE type='services' AND title_ru='Мебель на заказ';
UPDATE content_items SET sort_order=5 WHERE type='services' AND title_ru='Designer Day';
UPDATE content_items SET sort_order=6 WHERE type='services' AND title_ru='Авторский надзор';
