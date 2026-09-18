<?php
// Публичный эндпоинт БЕЗ авторизации — принимает заявки с сайта (кнопки "Оставить заявку" и т.п.)
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../telegram_notify.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Метод не поддерживается']);
    exit;
}

try {
    $pdo = new PDO(
        'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
        DB_USER,
        DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Ошибка подключения к базе данных']);
    exit;
}

$raw = file_get_contents('php://input');
$input = json_decode($raw, true) ?: [];

$name = trim($input['name'] ?? '');
$contact = trim($input['contact'] ?? '');
$message = trim($input['message'] ?? '');
$source_page = trim($input['source_page'] ?? '');
$subject = trim($input['subject'] ?? '');

if ($name === '' || $contact === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Укажите имя и контакт']);
    exit;
}

$stmt = $pdo->prepare('INSERT INTO applications (name, contact, message, source_page, subject) VALUES (?,?,?,?,?)');
$stmt->execute([$name, $contact, $message, $source_page, $subject]);

// Best-effort уведомление в Telegram — не влияет на успешность самой заявки
$text = "<b>Новая заявка с сайта</b>\n"
      . "Имя: {$name}\n"
      . "Контакт: {$contact}\n"
      . ($subject !== '' ? "Тема: {$subject}\n" : '')
      . ($source_page !== '' ? "Страница: {$source_page}\n" : '')
      . ($message !== '' ? "Сообщение: {$message}" : '');
send_telegram_notification($pdo, $text);

echo json_encode(['ok' => true]);
