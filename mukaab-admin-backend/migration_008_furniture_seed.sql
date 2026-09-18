-- Наполняет раздел "Мебель" исходным содержимым страницы mebel.html.
-- mysql -u root -p mukaab < migration_008_furniture_seed.sql

INSERT INTO content_items (type, title_ru, title_en, description_ru, description_en, image, status, sort_order, filter_cat, requirements_ru, requirements_en, note_ru, note_en, featured) VALUES

('furniture','Индивидуальная<br>мебель','Bespoke Furniture',
 'Проектирование и изготовление мебели по индивидуальным размерам и требованиям заказчика.',
 'Design and manufacture of furniture to your individual dimensions and requirements.',
 'images/59.png','published',1,'hero','','','','',0),

('furniture','Авторский дизайн мебели','Bespoke Furniture Design','','','','published',1,'design',
 'Разработка концепции и стилистики\nЭскизы и 3D-визуализация изделий\nПодбор материалов и фурнитуры\nРабочие чертежи для производства',
 'Concept and style development\nSketches and 3D visualisation\nMaterial and hardware selection\nProduction drawings','','',0),

('furniture','Кухни по индивидуальному проекту','Custom-Project Kitchens','','','','published',2,'design',
 'Проект под планировку и технику\nФасады МДФ, шпон, эмаль, пластик\nСтолешницы из камня, керамики, дерева\nВстроенная техника и освещение',
 'Layout and appliance-driven design\nMDF, veneer, enamel, laminate fronts\nStone, ceramic and wood worktops\nBuilt-in appliances and lighting','','',0),

('furniture','Гардеробные и системы хранения','Walk-in Wardrobes & Storage Systems',
 'Проектируем пространство хранения под ваши нужды — от компактной гардеробной до стеллажной системы в гостиной:',
 'We design every centimetre of your storage — from a compact walk-in to a full living-room shelving wall:',
 '','published',3,'design',
 'Встроенные и отдельностоящие гардеробные\nСистемы хранения для спален и прихожих\nСтеллажи и библиотеки под заказ\nПодсветка, зеркала, аксессуары\nОптимальное использование каждого сантиметра\nМатериалы: ЛДСП, шпон, МДФ, металл',
 'Built-in and freestanding wardrobes\nBedroom and hallway storage systems\nCustom shelving and libraries\nLighting, mirrors and accessories\nOptimised use of every centimetre\nMaterials: chipboard, veneer, MDF, metal',
 '','',1),

('furniture','Шкафы и встроенная мебель','Wardrobes & Built-in Furniture','','','','published',1,'product',
 'Шкафы-купе и распашные шкафы\nВстроенные ниши и подиумы\nМебель под скошенные потолки\nТВ-зоны и декоративные панели',
 'Sliding and hinged wardrobes\nBuilt-in alcoves and podiums\nFurniture for sloped ceilings\nTV units and decorative panels','','',0),

('furniture','Мебель для гостиных и спален','Living Room & Bedroom Furniture','','','','published',2,'product',
 'Кровати с мягким изголовьем и каркасами\nТумбы, комоды и консоли\nДиваны и банкетки на заказ\nТуалетные столики и зеркала',
 'Upholstered bed frames and headboards\nBedside tables, chests and consoles\nCustom sofas and benches\nDressing tables and mirrors','','',0),

('furniture','Офисная и коммерческая мебель','Office & Commercial Furniture','','','','published',3,'product',
 'Рабочие столы и переговорные зоны\nРесепшн и стойки администраторов\nТорговое оборудование и витрины\nМебель для ресторанов и отелей',
 'Desks and meeting areas\nReception and admin counters\nRetail displays and showcases\nFurniture for restaurants and hotels','','',0),

('furniture','МДФ и эмаль','MDF & Enamel','Гладкие крашеные фасады, матовые и глянцевые покрытия, любые цвета RAL','Smooth painted fronts, matt and gloss finishes, full RAL palette','','published',1,'material','','','','',0),
('furniture','Шпон и массив','Veneer & Solid Wood','Натуральные породы дерева: дуб, орех, ясень, ольха — под лак, масло или морилку','Natural species: oak, walnut, ash, alder — lacquered, oiled or stained','','published',2,'material','','','','',0),
('furniture','ЛДСП и пластик','Chipboard & Laminate','Широкий выбор декоров, имитация камня, металла и дерева, высокая износостойкость','Wide decor range, stone/metal/wood effects, high durability','','published',3,'material','','','','',0),
('furniture','Камень и керамика','Stone & Ceramic','Столешницы и подоконники из кварцевого агломерата, натурального мрамора и керамогранита','Worktops from quartz agglomerate, natural marble and porcelain stoneware','','published',4,'material','','','','',0),
('furniture','Металл и стекло','Metal & Glass','Каркасы и декоративные элементы из стали, латуни, алюминия; закалённое и тонированное стекло','Frames and decorative elements in steel, brass, aluminium; toughened and tinted glass','','published',5,'material','','','','',0),
('furniture','Фурнитура','Hardware','Blum, Grass, Hettich, Häfele — плавное закрывание, push-to-open, скрытые петли','Blum, Grass, Hettich, Häfele — soft-close, push-to-open, concealed hinges','','published',6,'material','','','','',0),

('furniture','Частные дома и квартиры','Private houses and apartments','','','','published',1,'object','','','','',0),
('furniture','Офисы и коворкинги','Offices and co-working spaces','','','','published',2,'object','','','','',0),
('furniture','Рестораны, кафе и бары','Restaurants, cafés and bars','','','','published',3,'object','','','','',0),
('furniture','Отели и апартаменты','Hotels and serviced apartments','','','','published',4,'object','','','','',0),
('furniture','Коммерческие пространства и шоурумы','Commercial spaces and showrooms','','','','published',5,'object','','','','',0),

('furniture','Замер и техническое задание','Site survey and brief','','','','published',1,'step','','','Сопровождение на всех этапах','Full support at every stage',0),
('furniture','Дизайн-проект и визуализация','Design concept and visualisation','','','','published',2,'step','','','','',0),
('furniture','Согласование и производство','Approval and production','','','','published',3,'step','','','','',0),
('furniture','Доставка и монтаж','Delivery and installation','','','','published',4,'step','','','','',0);
