-- Отдельное меню специально для mukaab.html (главная страница) —
-- отличается от общего меню сайта, которое используют остальные 8 страниц.
-- mysql -u root -p mukaab < migration_016_nav_home_seed.sql

INSERT INTO content_items (type, title_ru, title_en, location, status, sort_order) VALUES
('nav_home','Портфолио','Portfolio','#portfolio','published',1),
('nav_home','Изделия','Products','#products','published',2),
('nav_home','О нас','About','#about','published',3),
('nav_home','Услуги','Services','#services','published',4),
('nav_home','Вакансии','Careers','vacancies.html','published',5),
('nav_home','Контакты','Contacts','#contacts','published',6);
