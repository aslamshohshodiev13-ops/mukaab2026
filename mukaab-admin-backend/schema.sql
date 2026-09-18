-- MUKAAB Admin — схема базы данных
-- Импортируйте этот файл в MySQL: mysql -u root -p mukaab_admin < schema.sql
-- (базу mukaab_admin нужно создать заранее: CREATE DATABASE mukaab_admin CHARACTER SET utf8mb4;)

CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS content_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(30) NOT NULL,          -- portfolio, services, architecture, interior, furniture, viz, supervision, designer, vacancies
  title_ru VARCHAR(255) NOT NULL,
  title_en VARCHAR(255) DEFAULT '',
  category VARCHAR(120) DEFAULT '',
  location VARCHAR(120) DEFAULT '',
  area VARCHAR(50) DEFAULT '',
  image VARCHAR(255) DEFAULT '',
  status ENUM('published','draft','hidden') DEFAULT 'draft',
  description_ru TEXT,
  description_en TEXT,
  featured TINYINT(1) DEFAULT 0,
  sort_order INT DEFAULT 1,
  filter_cat VARCHAR(20) DEFAULT '',   -- только для portfolio: interior / arch / furniture / commercial
  tags VARCHAR(255) DEFAULT '',        -- теги через запятую, напр. "Минимализм,Камень,Авторская мебель"
  gallery TEXT,                        -- доп. фото галереи проекта, по одному пути на строку
  badge_ru VARCHAR(50) DEFAULT '',     -- для вакансий: тип занятости, напр. "Полная занятость"
  badge_en VARCHAR(50) DEFAULT '',
  stats_ru TEXT,                       -- для вакансий: строки "Подпись|Значение", по одной на строку
  stats_en TEXT,
  requirements_ru TEXT,                -- для вакансий: список обязанностей, один пункт на строку
  requirements_en TEXT,
  note_ru VARCHAR(255) DEFAULT '',     -- для вакансий: доп. пометка, напр. "Возможен перевод в штат"
  note_en VARCHAR(255) DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_type (type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS media (
  id INT AUTO_INCREMENT PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  path VARCHAR(255) NOT NULL,
  size INT DEFAULT 0,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS settings (
  setting_key VARCHAR(100) PRIMARY KEY,
  setting_value TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Начальные настройки сайта
INSERT INTO settings (setting_key, setting_value) VALUES
  ('site_name', 'MUKAAB'),
  ('email', 'info@mukaab.com'),
  ('phone', ''),
  ('telegram', ''),
  ('whatsapp', ''),
  ('instagram', ''),
  ('address', 'Таджикистан'),
  ('lang', 'RU'),
  ('seo_title', 'MUKAAB — Архитектура и дизайн'),
  ('seo_description', 'Архитектура, дизайн интерьера, мебель и визуализация.')
ON DUPLICATE KEY UPDATE setting_key=setting_key;

-- Демо-контент портфолио (как на сайте portfolio.html), можно редактировать/удалить из панели
INSERT INTO content_items (type, title_ru, title_en, category, location, area, image, status, description_ru, description_en, filter_cat, tags, gallery) VALUES
  ('portfolio','Апартаменты в Минске — 120 м²','Minsk Apartment — 120 m²','Интерьер','Минск','120 м²','images/5.jpg','published','Минималистичный интерьер в нейтральной палитре с акцентом на фактуры натурального камня и дерева.','Minimalist interior in a neutral palette with an emphasis on natural stone and wood textures.','interior','Минимализм,Камень,Авторская мебель','images/5.jpg'),
  ('portfolio','Загородный дом — 280 м²','Country House — 280 m²','Интерьер','Минский р-н','280 м²','images/1.png','published','Тёплый скандинавский стиль с элементами japandi — дерево, лён, натуральный свет.','Warm Scandinavian style with japandi elements — wood, linen, natural light.','interior','Japandi,Дерево,Панорамные окна','images/1.png'),
  ('portfolio','Пентхаус — 340 м²','Penthouse — 340 m²','Интерьер · Premium','Минск','340 м²','images/3.jpg','published','Представительский интерьер с панорамными видами. Мрамор, латунь, велюр, авторская мебель.','Representative interior with panoramic views. Marble, brass, velvet, bespoke furniture.','interior','Luxury,Мрамор,Умный дом','images/3.jpg'),
  ('portfolio','Частный дом — концепция фасада','Private House — Façade Concept','Архитектура','Минский р-н','420 м²','images/3.jpg','draft','Современный минималистичный фасад из клинкерного кирпича и тёмного металла.','Contemporary minimalist façade in anthracite clinker brick and dark metal.','arch','Клинкер,Металл,Фасад','images/3.jpg'),
  ('portfolio','Вилла на озере — авторский надзор','Lakeside Villa — Construction Supervision','Архитектура + Надзор','Нарочь','560 м²','images/proj5_cover.jpg','published','Полный цикл от проекта до сдачи. Стекло, бетон, дерево — органичная связь с ландшафтом.','Full cycle from concept to handover. Glass, concrete and timber in harmony with the landscape.','arch','Стекло,Бетон,Ландшафт','images/proj5_cover.jpg');

INSERT INTO content_items (type, title_ru, status) VALUES
  ('services','Дизайн интерьера','published'),
  ('services','Архитектура','published'),
  ('services','Мебель на заказ','published'),
  ('services','3D-визуализация','published'),
  ('services','Авторский надзор','published'),
  ('services','Designer Day','published'),
  ('vacancies','Архитектор','published'),
  ('vacancies','Дизайнер интерьера','published'),
  ('vacancies','3D-визуализатор','draft');
