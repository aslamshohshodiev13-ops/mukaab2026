-- Дополняет существующие 6 услуг ссылками на страницы, картинками и размером карточки
-- для страницы-хаба servis.html.
-- mysql -u root -p mukaab < migration_012_services_hub.sql

UPDATE content_items SET location='interior_design.html', image='images/2.jpg', filter_cat='large'
  WHERE type='services' AND title_ru='Дизайн интерьера';

UPDATE content_items SET location='architecture_service.html', image='images/1.png.jpg', filter_cat='medium'
  WHERE type='services' AND title_ru='Архитектура';

UPDATE content_items SET location='3d_viz.html', image='images/3.jpg', filter_cat='large'
  WHERE type='services' AND title_ru='3D-визуализация';

UPDATE content_items SET location='mebel.html', image='images/furniture.jpg', filter_cat='small'
  WHERE type='services' AND title_ru='Мебель на заказ';

UPDATE content_items SET location='designer_day.html', image='images/5.jpg', filter_cat='small'
  WHERE type='services' AND title_ru='Designer Day';

UPDATE content_items SET location='Author6.html', image='images/61.png', filter_cat='small'
  WHERE type='services' AND title_ru='Авторский надзор';
