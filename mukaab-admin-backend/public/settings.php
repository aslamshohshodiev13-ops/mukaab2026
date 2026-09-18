<?php
// Публичный эндпоинт БЕЗ авторизации — отдаёт настройки сайта (для главной страницы и др.)
// Использует ТУ ЖЕ таблицу settings, в которую пишет админка (api/settings.php).
require_once __DIR__ . '/../config.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

try {
    $pdo = new PDO(
        'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
        DB_USER,
        DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Ошибка подключения к базе данных']);
    exit;
}

$stmt = $pdo->query('SELECT setting_key, setting_value FROM settings');
$settings = [];
foreach ($stmt->fetchAll() as $row) { $settings[$row['setting_key']] = $row['setting_value']; }

echo json_encode(['settings' => $settings], JSON_UNESCAPED_UNICODE);
