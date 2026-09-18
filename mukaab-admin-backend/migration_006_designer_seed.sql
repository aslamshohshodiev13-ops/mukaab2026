-- Наполняет раздел "Designer Day" исходным содержимым страницы.
-- mysql -u root -p mukaab < migration_006_designer_seed.sql

INSERT INTO content_items (type, title_ru, title_en, description_ru, description_en, image, status, sort_order, filter_cat, stats_ru, stats_en, requirements_ru, requirements_en, note_ru, note_en, area, featured) VALUES

('designer','День с дизайнером','A Day with a Designer',
 'Личная консультация и выезд дизайнера — решаем задачи вашего интерьера за один насыщенный день.',
 'Personal consultation and a site visit — we solve your interior challenges in one intensive day.',
 'images/62.png','published',1,'hero','','','','','','','',0),

('designer','Утро — диагностика пространства','Morning — Space Diagnosis','','','','published',1,'feature',
 'price|3 часа\nunit|/ блок','price|3 hours\nunit|/ block',
 'Выезд на объект и осмотр помещений\nАнализ планировки и зонирования\nРазбор ошибок текущего интерьера\nОбсуждение задач и пожеланий заказчика',
 'Site visit and room walkthrough\nLayout and zoning analysis\nReview of existing interior issues\nDiscussion of goals and wishes',
 '','','',0),

('designer','День — шоурумы и материалы','Afternoon — Showrooms & Materials','','','','published',2,'feature',
 'price|4 часа\nunit|/ блок','price|4 hours\nunit|/ block',
 'Совместный подбор отделочных материалов\nВизит в шоурумы мебели и освещения\nПомощь с цветом, фактурами и сочетаниями\nОриентировочные бюджеты по позициям',
 'Joint selection of finishing materials\nVisits to furniture and lighting showrooms\nColour, texture and combination advice\nIndicative budgets per category',
 '','','',0),

('designer','Полный день с дизайнером','Full Day with a Designer',
 '8 часов личной работы с дизайнером — от первого осмотра до готового плана действий:',
 '8 hours of personal work with a designer — from first walkthrough to a ready action plan:',
 '','published',3,'feature','price|450$\nunit|/ день','price|$450\nunit|/ day',
 'Выезд на объект и диагностика\nРазбор планировки и зонирования\nСовместный шопинг в шоурумах\nПодбор материалов, мебели, декора\nСоставление концепции интерьера\nРекомендации по подрядчикам\nПредварительная смета по итогам\nИтоговый отчёт с фото и референсами',
 'Site visit and diagnosis\nLayout and zoning review\nJoint showroom shopping\nSelection of materials, furniture, décor\nInterior concept development\nContractor recommendations\nPreliminary cost estimate\nFinal report with photos and references',
 'Транспортные расходы включены','Transport costs included','',1),

('designer','Онлайн-консультация','Online Consultation','','','','published',1,'pricing',
 'price|90$\nunit|/ 1,5 часа','price|$90\nunit|/ 1.5 hrs',
 'Видеозвонок с дизайнером\nРазбор планов, фото и вопросов\nСписок рекомендаций после встречи',
 'Video call with the designer\nReview of plans, photos and questions\nWritten recommendations after the session',
 '','','',0),

('designer','Полдня с дизайнером','Half Day with a Designer','','','','published',2,'pricing',
 'price|250$\nunit|/ 4 часа','price|$250\nunit|/ 4 hours',
 'Выезд на объект или шоурум\nКонсультация на месте\nКраткое резюме по итогам\nПодходит для одной конкретной задачи',
 'Site visit or showroom trip\nOn-site consultation\nBrief summary after the session\nIdeal for one specific task',
 '','','',0),

('designer','Полный день','Full Day','','','','published',3,'pricing',
 'price|450$\nunit|/ 8 часов','price|$450\nunit|/ 8 hours',
 'Выезд + шоурумы + концепция\nПодбор материалов и мебели\nИтоговый отчёт с референсами\nПредварительная смета по объекту',
 'Site + showrooms + concept\nMaterials and furniture selection\nFinal report with references\nPreliminary project estimate',
 'Максимальный результат за один день','Maximum result in a single day','',1),

('designer','Встреча на объекте, осмотр и знакомство','Meet at the site, walkthrough and briefing','','','','published',1,'step','','','','','','','09:00',0),
('designer','Анализ планировки и разбор задач','Layout analysis and task breakdown','','','','published',2,'step','','','','','','','10:00',0),
('designer','Поездка в шоурумы материалов и мебели','Trip to materials and furniture showrooms','','','','published',3,'step','','','','','','','12:00',0),
('designer','Подбор декора, текстиля, освещения','Selection of décor, textiles and lighting','','','','published',4,'step','','','','','','','14:00',0),
('designer','Составление концепции и сметы','Concept development and cost estimate','','','','published',5,'step','','','','','','','16:00',0),
('designer','Итоговое обсуждение и передача материалов','Final debrief and handover of materials','','','','published',6,'step','','','','','','','18:00',0),

('designer','Ремонт с нуля — нужен старт','Starting a renovation from scratch','','','','published',1,'object','','','','','','','',0),
('designer','Косметическое обновление интерьера','Cosmetic interior refresh','','','','published',2,'object','','','','','','','',0),
('designer','Покупка квартиры — оценка потенциала','New flat purchase — assessing potential','','','','published',3,'object','','','','','','','',0),
('designer','Тупик в процессе ремонта','Stuck mid-renovation','','','','published',4,'object','','','','','','','',0),
('designer','Подбор мебели и предметов интерьера','Furniture and accessory selection','','','','published',5,'object','','','','','','','',0),
('designer','Коммерческое помещение под брендинг','Commercial space branding','','','','published',6,'object','','','','','','','',0),

('designer','Чёткое понимание концепции интерьера','Clear interior concept direction','','','','published',1,'report','','','','','Всё в одном файле после встречи','Everything in one file after the meeting','',0),
('designer','Список материалов и поставщиков','List of materials and suppliers','','','','published',2,'report','','','','','','','',0),
('designer','Фотоотчёт с референсами и пометками','Photo report with references and notes','','','','published',3,'report','','','','','','','',0),
('designer','Предварительный бюджет по позициям','Preliminary budget breakdown','','','','published',4,'report','','','','','','','',0),

('designer','Результат','Outcome',
 'После одного дня у вас будет <strong>чёткий план действий</strong>, понимание бюджета и уверенность в выборе. Вы больше не тратите время на хаотичный поиск — дизайнер структурирует ваш запрос и даёт <strong>конкретные решения под ваш объект</strong>.',
 'After one day you will have a <strong>clear action plan</strong>, a realistic budget and confidence in your choices. No more time wasted on scattered searches — the designer structures your brief and delivers <strong>specific solutions for your space</strong>.',
 '','published',1,'result','','','','','','','',0);
