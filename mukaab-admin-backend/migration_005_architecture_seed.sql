-- Наполняет раздел "Архитектура" исходным содержимым страницы.
-- mysql -u root -p mukaab < migration_005_architecture_seed.sql

INSERT INTO content_items (type, title_ru, title_en, description_ru, description_en, image, status, sort_order, filter_cat, stats_ru, stats_en, requirements_ru, requirements_en, note_ru, note_en, featured) VALUES

('architecture','Архитектура','Architecture',
 'Полный цикл создания жилых и общественных зданий: от идеи до сдачи ключей.',
 'Full cycle of residential and public building design: from concept to handover.',
 'images/3.jpg','published',1,'hero','','','','','','',0),

('architecture','Консультация архитектора','Architect Consultation','','','','published',1,'design',
 'price|70$\nunit|/ час','price|$70\nunit|/ hour',
 'Анализ участка и его особенностей\nПосадка дома на рельеф\nВыбор технологии строительства\nРекомендации по материалам',
 'Site analysis and features\nBuilding placement on terrain\nConstruction technology selection\nMaterial recommendations','','',0),

('architecture','Эскизный проект','Sketch Design','','','','published',2,'design',
 'price|20$\nunit|/ м²','price|$20\nunit|/ m²',
 'Планировки всех этажей\nКонцепция фасадов\nПривязка к местности\nГенеральный план участка',
 'Floor plans for all levels\nFaçade concept\nSite placement\nMaster site plan','','',0),

('architecture','Архитектурно-строительный проект (АР + КР)','Architectural & Structural Design (AR+KR)',
 'Полный рабочий пакет документации для строительства:','Complete working documentation package for construction:',
 '','published',3,'design','price|40$\nunit|/ м²','price|$40\nunit|/ m²',
 'Архитектурные чертежи (планы, фасады, разрезы)\nКонструктив — фундаменты, стены, кровля\nУзлы и детали\nСпецификации материалов\nИнженерные разделы (водоснабжение, канализация)\nЭлектроснабжение и освещение\nОтопление и вентиляция\nСмета (по запросу)',
 'Architectural drawings (plans, elevations, sections)\nStructural — foundations, walls, roof\nJoints and details\nMaterial specifications\nUtilities (water supply, drainage)\nPower supply and lighting\nHeating and ventilation\nBudget estimate (on request)',
 '','',1),

('architecture','Авторский надзор и управление строительством','Construction Supervision & Management','','','','published',4,'design',
 'price|350$\nunit|/ месяц','price|$350\nunit|/ month',
 'Техническое сопровождение\nКонтроль качества работ на объекте\nВедение графика строительства\nКоммуникация с подрядчиком',
 'Technical support\nOn-site quality control\nConstruction schedule management\nContractor communication',
 'от 350$ / месяц','from $350 / month',0),

('architecture','Визуализация экстерьера','Exterior Visualisation','','','','published',1,'viz3d',
 'price|20$\nunit|/ м²','price|$20\nunit|/ m²',
 'Детальная проработка фасадов\nДневное и вечернее освещение\nБлагоустройство территории\nНесколько ракурсов',
 'Detailed facade rendering\nDay and evening lighting\nLandscape and territory\nMultiple viewpoints','','',0),

('architecture','Визуализация интерьера','Interior Visualisation','','','','published',2,'viz3d',
 'price|25$\nunit|/ м²','price|$25\nunit|/ m²',
 'Фотореалистичные рендеры\nПодбор реальных текстур и мебели\nИтерации правок включены\nФорматы JPG / PNG / TIFF',
 'Photorealistic renders\nReal textures and furniture selection\nRevision rounds included\nJPG / PNG / TIFF formats','','',0),

('architecture','3D-моделирование объектов и МАФ','3D Object & Landscape Modelling','','','','published',3,'viz3d',
 'price|100$\nunit|/ объект','price|$100\nunit|/ object',
 'Мебель и элементы декора\nЛестницы и ограждения\nМалые архитектурные формы',
 'Furniture and decor elements\nStaircases and railings\nSmall architectural forms',
 'от 100$ за объект','from $100 per object',0),

('architecture','Видео-облёты и панорамы 360°','Video Flythroughs & 360° Panoramas','','','','published',4,'viz3d',
 'price|По запросу','price|On request',
 'Анимированные видео-облёты фасадов и территории\nИнтерактивные панорамы 360° для виртуального тура\nСтоимость рассчитывается индивидуально по ТЗ',
 'Animated flythroughs of façades and grounds\nInteractive 360° panoramas for virtual tours\nCost is calculated individually per brief',
 '','',0),

('architecture','Corten Steel','Corten Steel',
 'Сталь Кортен — эффект благородной ржавчины. Не требует покраски, устойчива к атмосферным воздействиям.',
 'Corten steel — noble rust effect. No paint required, weather resistant.',
 '','published',1,'material','','','','','','',0),

('architecture','Нержавеющая сталь','Stainless Steel',
 'Полированная, шлифованная или матовая отделка. Долговечность и элегантность.',
 'Polished, brushed, or matte finish. Durability and elegance.',
 '','published',2,'material','','','','','','',0),

('architecture','Сталь с полимерным покрытием','Powder-coated Steel',
 'Любые цвета по каталогу RAL. Устойчивое порошковое покрытие для улицы и интерьера.',
 'Any RAL colour. Durable coating for outdoor and interior use.',
 '','published',3,'material','','','','','','',0),

('architecture','Услуги металлообработки','Metal Fabrication Services','','','','published',1,'metal','','',
 'Разработка чертежей КМ/КМД для лазерной резки и гибки\nИзготовление лестниц и ограждений\nПроизводство фасадных панелей\nМалые архитектурные формы (МАФ) и арт-объекты',
 'CM/CMD drawings for laser cutting and bending\nStaircase and railing fabrication\nFaçade panel production\nSmall architectural forms and art objects',
 '','',0),

('architecture','Стоимость','Pricing','','','','published',2,'metal',
 'price|50$\nunit|/ эскиз','price|$50\nunit|/ sketch',
 'Расчёт по ТЗ или готовым чертежам\nСерийное и единичное производство\nДоставка и монтаж на объекте',
 'Quote based on brief or ready drawings\nSerial and one-off production\nDelivery and on-site installation',
 'от 50$ за эскиз изделия','from $50 per product sketch',1);
