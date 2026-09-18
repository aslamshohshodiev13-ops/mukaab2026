-- Наполняет раздел "3D-визуализация" исходным содержимым страницы.
-- mysql -u root -p mukaab < migration_004_viz_seed.sql

INSERT INTO content_items (type, title_ru, title_en, description_ru, description_en, image, status, sort_order, filter_cat, stats_ru, stats_en, requirements_ru, requirements_en, note_ru, note_en, featured) VALUES

('viz','3D Визуализация','3D Visualisation',
 'Фотореалистичные рендеры, анимация и панорамы 360° — от концепции до финального изображения.',
 'Photorealistic renders, animation and 360° panoramas — from concept to final image.',
 'images/60.png','published',1,'hero','','','','','','',0),

('viz','Визуализация экстерьера','Exterior Visualisation','','','','published',1,'render',
 'price|20$\nunit|/ м²','price|$20\nunit|/ m²',
 'Детальная проработка фасадов\nДневное и вечернее освещение\nБлагоустройство территории\nНесколько ракурсов',
 'Detailed facade rendering\nDay and evening lighting\nLandscape and territory\nMultiple viewpoints','','',0),

('viz','Визуализация интерьера','Interior Visualisation','','','','published',2,'render',
 'price|25$\nunit|/ м²','price|$25\nunit|/ m²',
 'Фотореалистичные рендеры\nПодбор реальных текстур и мебели\nИтерации правок включены\nФорматы JPG / PNG / TIFF',
 'Photorealistic renders\nReal textures and furniture selection\nRevision rounds included\nJPG / PNG / TIFF formats','','',0),

('viz','Полный пакет визуализации','Full Visualisation Package',
 'Комплексная фотореалистичная визуализация объекта:','Comprehensive photorealistic visualisation of the object:',
 '','published',3,'render','price|40$\nunit|/ м²','price|$40\nunit|/ m²',
 'Экстерьер — дневные и вечерние ракурсы\nИнтерьер — все ключевые помещения\nРеалистичные материалы и текстуры\nЛандшафт и благоустройство участка\nНесколько вариантов освещения\nКорректировки по согласованию\nПодготовка изображений для презентаций\nФорматы JPG / PNG / TIFF / 4K',
 'Exterior — day and evening viewpoints\nInterior — all key rooms\nRealistic materials and textures\nLandscape and site development\nMultiple lighting options\nRevisions upon approval\nImages prepared for presentations\nJPG / PNG / TIFF / 4K formats',
 '','',1),

('viz','3D-моделирование объектов','3D Object Modelling','','','','published',4,'render',
 'price|100$\nunit|/ объект','price|$100\nunit|/ object',
 'Мебель и элементы декора\nЛестницы и ограждения\nМалые архитектурные формы',
 'Furniture and decor elements\nStaircases and railings\nSmall architectural forms',
 'от 100$ за объект','from $100 per object',0),

('viz','3D Анимация и видеопролёт','3D Animation & Flythrough','','','','published',1,'animation',
 'price|25$\nunit|/ сек','price|$25\nunit|/ sec',
 'Кинематографические пролёты\nВнутренние и внешние сцены\nЭкспорт Full HD / 4K\nПодготовка для соцсетей и презентаций',
 'Cinematic flythroughs\nInterior and exterior scenes\nFull HD / 4K export\nReady for social media and presentations',
 'от 25$ / сек · мин. 30 сек','from $25 / sec · min. 30 sec',0),

('viz','Панорамы 360° и виртуальный тур','360° Panoramas & Virtual Tour','','','','published',2,'animation',
 'price|По запросу','price|On request',
 'Интерактивные панорамы 360° экстерьера и интерьера\nВиртуальный тур по объекту — ссылка для клиента\nВстраивание на сайт или отправка в мессенджер\nСтоимость рассчитывается индивидуально по ТЗ',
 'Interactive 360° panoramas of exterior and interior\nVirtual tour of the property — link for the client\nEmbeddable on a website or sent via messenger\nCost is calculated individually per brief',
 '','',0);
