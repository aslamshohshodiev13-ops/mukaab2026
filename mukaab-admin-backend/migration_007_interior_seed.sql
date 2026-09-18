-- Наполняет раздел "Дизайн интерьера" исходным содержимым страницы.
-- mysql -u root -p mukaab < migration_007_interior_seed.sql

INSERT INTO content_items (type, title_ru, title_en, description_ru, description_en, image, status, sort_order, filter_cat, stats_ru, stats_en, requirements_ru, requirements_en, note_ru, note_en, featured) VALUES

('interior','Дизайн интерьера','Interior Design',
 'Концепции, рабочая документация и авторский надзор — создаём пространства, которые живут.',
 'Concepts, working documentation and construction supervision — we create spaces that live.',
 'images/1.png','published',1,'hero','','','','','','',0),

('interior','Концепт-дизайн','Concept Design','','','','published',1,'design',
 'price|15$\nunit|/ м²','price|$15\nunit|/ m²',
 'Планировочное решение\nСтилевая концепция и мудборд\nПодбор цветовой палитры\nЗонирование пространства',
 'Layout planning\nStyle concept and moodboard\nColour palette selection\nSpace zoning','','',0),

('interior','Дизайн-проект','Design Project','','','','published',2,'design',
 'price|35$\nunit|/ м²','price|$35\nunit|/ m²',
 'Полный комплект чертежей\nРазвёртки стен с отделкой\nСпецификации материалов и мебели\nПодбор освещения и декора',
 'Full set of drawings\nWall elevations with finishes\nMaterial and furniture specifications\nLighting and decor selection','','',0),

('interior','Комплексный дизайн-проект','Full Design Project',
 'Полный цикл от концепции до авторского надзора:','Complete cycle from concept to author supervision:',
 '','published',3,'design','price|55$\nunit|/ м²','price|$55\nunit|/ m²',
 'Концепция и планировочные решения\nПолный комплект рабочих чертежей\n3D-визуализация всех помещений\nПодбор и комплектация мебели\nСпецификации отделочных материалов\nАвторский надзор за строительством\nПодготовка к ремонту: сметы и графики\nИтоговый фотоотчёт объекта',
 'Concept and layout solutions\nFull set of working drawings\n3D visualisation of all rooms\nFurniture selection and procurement\nFinishing material specifications\nAuthor supervision during construction\nPre-renovation: estimates and schedules\nFinal photo report of the object',
 '','',1),

('interior','Перепланировка пространства','Space Replanning','','','','published',4,'design',
 'price|500$\nunit|/ объект','price|$500\nunit|/ object',
 'Анализ несущих конструкций\nНесколько планировочных вариантов\nСогласование с технадзором',
 'Structural analysis\nMultiple layout options\nTechnical inspection coordination',
 'от 500$ за объект','from $500 per object',0),

('interior','Подбор мебели и материалов','Furniture & Materials Sourcing','','','','published',1,'style',
 'price|800$\nunit|/ объект','price|$800\nunit|/ object',
 'Формирование листа покупок\nПереговоры с поставщиками\nКонтроль поставки и качества\nРасстановка и стайлинг помещений',
 'Shopping list preparation\nSupplier negotiations\nDelivery and quality control\nRoom arrangement and styling',
 'от 800$ за объект','from $800 per object',0),

('interior','Авторский надзор за реализацией','Author Supervision','','','','published',2,'style',
 'price|По запросу','price|On request',
 'Регулярные выезды на объект — еженедельно или по требованию\nПроверка соответствия отделки проектной документации\nОперативное решение спорных вопросов с подрядчиком\nСтоимость рассчитывается индивидуально по объёму объекта',
 'Regular site visits — weekly or on demand\nVerification of finishes against project documentation\nPrompt resolution of disputes with contractors\nPrice calculated individually based on project scope',
 '','',0);
