-- Наполняет раздел "Авторский надзор" исходным содержимым страницы Author6.html.
-- Дальше всё это редактируется в админке (Авторский надзор → карточки).
-- mysql -u root -p mukaab < migration_003_supervision_seed.sql

INSERT INTO content_items (type, title_ru, title_en, description_ru, description_en, image, status, sort_order, filter_cat, stats_ru, stats_en, requirements_ru, requirements_en, note_ru, note_en, featured) VALUES

('supervision','Авторский надзор','Construction Supervision',
 'Профессиональное сопровождение проекта на всех этапах реализации — от первого выезда до финальной приёмки.',
 'Professional project management at every stage of realisation — from the first site visit to final sign-off.',
 'images/61.png','published',1,'hero','','','','','','',0),

('supervision','Выезды на объект','Site Visits','','','','published',1,'feature',
 'price|20$\nunit|/ выезд','price|$20\nunit|/ visit',
 'Регулярные плановые визиты\nКонтроль соответствия работ проекту\nПроверка качества выполнения\nКонтроль применения материалов',
 'Regular scheduled inspections\nCompliance with approved drawings\nQuality control of workmanship\nVerification of specified materials',
 '','',0),

('supervision','Рабочая документация','Working Documentation','','','','published',2,'feature',
 'price|от 50$\nunit|/ корректировка','price|from $50\nunit|/ amendment',
 'Внесение корректировок по факту\nОперативное решение проектных вопросов\nСогласование изменений с заказчиком\nАктуализация чертежей и спецификаций',
 'On-site corrections and amendments\nPrompt resolution of design queries\nChange approval with the client\nDrawing and specification updates',
 '','',0),

('supervision','Полное сопровождение объекта','Full Project Supervision',
 'Комплексный авторский надзор от начала строительства до финальной сдачи объекта:',
 'Comprehensive construction supervision from groundbreaking to final handover:',
 '','published',3,'feature',
 'price|По запросу\nunit|/ весь объект','price|On request\nunit|/ whole project',
 'Регулярные выезды на объект\nКонтроль всех строительных работ\nКонсультации подрядчиков и строителей\nКоординация смежных специалистов\nФото- и видеоотчёты о ходе работ\nУчастие в приёмке выполненных работ\nКонтроль сроков выполнения работ\nСопровождение до завершения строительства',
 'Regular site visits\nControl of all construction works\nAdvice to contractors and builders\nCoordination of specialist trades\nPhoto and video progress reports\nParticipation in works sign-off\nMonitoring of programme and deadlines\nSupport until construction completion',
 'Стоимость рассчитывается индивидуально по ТЗ','Cost is calculated individually per brief',1),

('supervision','Разовый выезд','One-time Visit','','','','published',1,'pricing',
 'price|80$\nunit|/ визит','price|$80\nunit|/ visit',
 'Один выезд на объект по запросу\nОсмотр и фиксация замечаний\nПисьменный отчёт заказчику',
 'One site visit on request\nInspection and issue log\nWritten report to the client',
 '','',0),

('supervision','Пакет выездов','Visit Package','','','','published',2,'pricing',
 'price|350$\nunit|/ 5 визитов','price|$350\nunit|/ 5 visits',
 '5 плановых выездов на объект\nКонтроль по согласованному графику\nФотоотчёт после каждого выезда\nЭкономия 12% vs разовых визитов',
 '5 scheduled site visits\nMonitoring per agreed schedule\nPhoto report after every visit\n12% savings vs one-time visits',
 '','',0),

('supervision','Ежемесячный надзор','Monthly Supervision','','','','published',3,'pricing',
 'price|600$\nunit|/ месяц','price|$600\nunit|/ month',
 'Неограниченные выезды в течение месяца\nПриоритетный ответ в течение 2 часов\nКорректировки документации включены\nКоординация подрядчиков',
 'Unlimited visits during the month\nPriority response within 2 hours\nDocumentation updates included\nContractor coordination',
 'Оптимально для активной стройки','Best for active construction sites',1),

('supervision','Знакомство с проектом и подрядчиками','Project and contractor briefing','','','','published',1,'step','','','','','','',0),
('supervision','Составление графика выездов на объект','Scheduling site visits','','','','published',2,'step','','','','','','',0),
('supervision','Регулярный контроль хода строительства','Ongoing construction monitoring','','','','published',3,'step','','','','','','',0),
('supervision','Фиксация замечаний и внесение корректировок','Recording issues and implementing corrections','','','','published',4,'step','','','','','','',0),
('supervision','Координация и решение проектных вопросов','Coordination and resolution of design matters','','','','published',5,'step','','','','','','',0),
('supervision','Финальная приёмка и закрытие объекта','Final inspection and project close-out','','','','published',6,'step','','','','','','',0),

('supervision','Частные дома и виллы','Private houses and villas','','','','published',1,'object','','','','','','',0),
('supervision','Квартиры и апартаменты','Apartments and serviced units','','','','published',2,'object','','','','','','',0),
('supervision','Коммерческие объекты','Commercial properties','','','','published',3,'object','','','','','','',0),
('supervision','Рестораны и кафе','Restaurants and cafés','','','','published',4,'object','','','','','','',0),
('supervision','Офисные помещения','Office spaces','','','','published',5,'object','','','','','','',0),
('supervision','Гостиничные комплексы','Hotel complexes','','','','published',6,'object','','','','','','',0),

('supervision','Фотофиксация каждого выезда','Photo documentation of every visit','','','','published',1,'report','','','','','Прозрачность на каждом этапе','Full transparency at every stage',0),
('supervision','Видеоотчёты о ходе строительства','Video progress updates','','','','published',2,'report','','','','','','',0),
('supervision','Письменные замечания подрядчикам','Written notices to contractors','','','','published',3,'report','','','','','','',0),
('supervision','Сводные акты по итогам проверок','Summary inspection reports','','','','published',4,'report','','','','','','',0),

('supervision','Результат','Outcome',
 'Гарантия того, что реализованный объект будет полностью соответствовать <strong>архитектурной концепции</strong>, проектной документации и <strong>стандартам качества</strong>. Вы получаете объект именно таким, каким он был задуман — без отступлений от проекта и скрытых дефектов.',
 'A guarantee that the completed project fully conforms to the <strong>architectural concept</strong>, project documentation and <strong>quality standards</strong>. You receive the building exactly as designed — with no deviations and no hidden defects.',
 '','published',1,'result','','','','','','',0);
