-- Даёт каждой из 9 страниц СВОЁ, независимое от остальных, меню.
-- Изначально везде одинаковый набор (Главная/Интерьеры/Архитектура/Услуги/Портфолио),
-- дальше каждое можно менять отдельно через соответствующий раздел в админке.
-- mysql -u root -p mukaab < migration_017_per_page_nav.sql

INSERT INTO content_items (type, title_ru, title_en, location, status, sort_order) VALUES
-- Портфолио (portfolio.html)
('nav_portfolio','Главная','Home','mukaab.html','published',1),
('nav_portfolio','Интерьеры','Interiors','interior_design.html','published',2),
('nav_portfolio','Архитектура','Architecture','architecture_service.html','published',3),
('nav_portfolio','Услуги','Services','servis.html','published',4),
('nav_portfolio','Портфолио','Portfolio','portfolio.html','published',5),

-- Услуги (servis.html)
('nav_servis','Главная','Home','mukaab.html','published',1),
('nav_servis','Интерьеры','Interiors','interior_design.html','published',2),
('nav_servis','Архитектура','Architecture','architecture_service.html','published',3),
('nav_servis','Услуги','Services','servis.html','published',4),
('nav_servis','Портфолио','Portfolio','portfolio.html','published',5),

-- Авторский надзор (Author6.html)
('nav_author6','Главная','Home','mukaab.html','published',1),
('nav_author6','Интерьеры','Interiors','interior_design.html','published',2),
('nav_author6','Архитектура','Architecture','architecture_service.html','published',3),
('nav_author6','Услуги','Services','servis.html','published',4),
('nav_author6','Портфолио','Portfolio','portfolio.html','published',5),

-- 3D-визуализация (3d_viz.html)
('nav_3dviz','Главная','Home','mukaab.html','published',1),
('nav_3dviz','Интерьеры','Interiors','interior_design.html','published',2),
('nav_3dviz','Архитектура','Architecture','architecture_service.html','published',3),
('nav_3dviz','Услуги','Services','servis.html','published',4),
('nav_3dviz','Портфолио','Portfolio','portfolio.html','published',5),

-- Архитектура (architecture_service.html)
('nav_architecture','Главная','Home','mukaab.html','published',1),
('nav_architecture','Интерьеры','Interiors','interior_design.html','published',2),
('nav_architecture','Архитектура','Architecture','architecture_service.html','published',3),
('nav_architecture','Услуги','Services','servis.html','published',4),
('nav_architecture','Портфолио','Portfolio','portfolio.html','published',5),

-- Designer Day (designer_day.html)
('nav_designerday','Главная','Home','mukaab.html','published',1),
('nav_designerday','Интерьеры','Interiors','interior_design.html','published',2),
('nav_designerday','Архитектура','Architecture','architecture_service.html','published',3),
('nav_designerday','Услуги','Services','servis.html','published',4),
('nav_designerday','Портфолио','Portfolio','portfolio.html','published',5),

-- Дизайн интерьера (interior_design.html)
('nav_interior','Главная','Home','mukaab.html','published',1),
('nav_interior','Интерьеры','Interiors','interior_design.html','published',2),
('nav_interior','Архитектура','Architecture','architecture_service.html','published',3),
('nav_interior','Услуги','Services','servis.html','published',4),
('nav_interior','Портфолио','Portfolio','portfolio.html','published',5),

-- Мебель (mebel.html)
('nav_mebel','Главная','Home','mukaab.html','published',1),
('nav_mebel','Интерьеры','Interiors','interior_design.html','published',2),
('nav_mebel','Архитектура','Architecture','architecture_service.html','published',3),
('nav_mebel','Услуги','Services','servis.html','published',4),
('nav_mebel','Портфолио','Portfolio','portfolio.html','published',5),

-- Вакансии (vacancies.html)
('nav_vacancies','Главная','Home','mukaab.html','published',1),
('nav_vacancies','Интерьеры','Interiors','interior_design.html','published',2),
('nav_vacancies','Архитектура','Architecture','architecture_service.html','published',3),
('nav_vacancies','Услуги','Services','servis.html','published',4),
('nav_vacancies','Портфолио','Portfolio','portfolio.html','published',5);
