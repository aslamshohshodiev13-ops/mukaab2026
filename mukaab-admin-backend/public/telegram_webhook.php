<?php
// Вебхук клиентского Telegram-бота. Telegram сам вызывает этот адрес,
// когда кто-то пишет боту — мы пересылаем сообщение админу в личку
// через админского бота (те же токен/chat_id из раздела "Контакты").
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../telegram_notify.php';

header('Content-Type: application/json; charset=utf-8');

try {
    $pdo = new PDO(
        'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
        DB_USER,
        DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    http_response_code(200); // Telegram ждёт 200 даже при внутренней ошибке, иначе будет повторять запрос
    exit;
}

// Проверка секрета вебхука (если задан в настройках) — защищает от посторонних запросов на этот адрес
$stmt = $pdo->query("SELECT setting_key, setting_value FROM settings WHERE setting_key IN ('client_bot_token','client_bot_webhook_secret')");
$s = [];
foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $row) { $s[$row['setting_key']] = $row['setting_value']; }

$secret = $s['client_bot_webhook_secret'] ?? '';
if ($secret !== '') {
    $received = $_SERVER['HTTP_X_TELEGRAM_BOT_API_SECRET_TOKEN'] ?? '';
    if (!hash_equals($secret, $received)) { http_response_code(403); exit; }
}

$raw = file_get_contents('php://input');
$update = json_decode($raw, true);
if (!$update) { http_response_code(200); exit; }

$message = $update['message'] ?? $update['edited_message'] ?? null;
if ($message) {
    $from = $message['from'] ?? [];
    $name = trim(($from['first_name'] ?? '') . ' ' . ($from['last_name'] ?? ''));
    $username = $from['username'] ?? '';
    $text = $message['text'] ?? '[сообщение без текста — фото/файл/стикер]';

    $forward = "<b>Сообщение от клиента в Telegram</b>\n"
             . "Имя: " . ($name ?: '—') . "\n"
             . ($username ? "Юзернейм: @{$username}\n" : '')
             . "Текст: {$text}";

    send_telegram_notification($pdo, $forward);

    // Также сохраняем как заявку, чтобы было видно в разделе "Заявки"
    $stmt = $pdo->prepare('INSERT INTO applications (name, contact, message, source_page, subject) VALUES (?,?,?,?,?)');
    $stmt->execute([$name ?: 'Telegram', $username ? '@'.$username : 'Telegram', $text, 'Telegram-бот', 'Сообщение боту']);
}

http_response_code(200);
echo json_encode(['ok' => true]);
