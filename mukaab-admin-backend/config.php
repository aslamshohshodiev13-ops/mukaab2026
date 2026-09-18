<?php
// Настройки подключения к базе данных — впишите свои данные хостинга
define('DB_HOST', 'localhost');
define('DB_NAME', 'mukaab');
define('DB_USER', 'root');
define('DB_PASS', '');

// Папка для загруженных изображений (должна существовать и быть доступна на запись)
define('UPLOAD_DIR', __DIR__ . '/uploads/');
define('UPLOAD_URL', '/mukaab-admin-full/mukaab-admin-backend/uploads/'); // путь, по которому файлы отдаются в браузер