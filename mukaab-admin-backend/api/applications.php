<?php
require_once __DIR__ . '/../bootstrap.php';
require_once __DIR__ . '/../telegram_notify.php';
require_auth();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query('SELECT * FROM applications ORDER BY created_at DESC');
    echo json_encode(['items' => $stmt->fetchAll()]);
    exit;
}

if ($method === 'POST') {
    $input = json_input();
    $action = $input['action'] ?? '';
    $id = (int)($input['id'] ?? 0);

    if ($action === 'mark') {
        $status = in_array($input['status'] ?? '', ['new','read','done'], true) ? $input['status'] : 'read';
        $stmt = $pdo->prepare('UPDATE applications SET status=? WHERE id=?');
        $stmt->execute([$status, $id]);
        echo json_encode(['ok' => true]);
        exit;
    }

    if ($action === 'delete') {
        $stmt = $pdo->prepare('DELETE FROM applications WHERE id=?');
        $stmt->execute([$id]);
        echo json_encode(['ok' => true]);
        exit;
    }

    if ($action === 'test_telegram') {
        $result = send_telegram_notification($pdo, "<b>Тестовое сообщение</b>\nБот подключён и работает верно.");
        echo json_encode($result);
        exit;
    }

    if ($action === 'connect_client_bot') {
        $stmt = $pdo->query("SELECT setting_key, setting_value FROM settings WHERE setting_key IN ('client_bot_token','client_bot_webhook_secret')");
        $s = [];
        foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $row) { $s[$row['setting_key']] = $row['setting_value']; }
        $token = trim($s['client_bot_token'] ?? '');
        if ($token === '') { echo json_encode(['ok' => false, 'error' => 'Сначала впиши и сохрани токен клиентского бота']); exit; }

        // Генерируем и сохраняем секрет вебхука, если его ещё нет
        $secret = trim($s['client_bot_webhook_secret'] ?? '');
        if ($secret === '') {
            $secret = bin2hex(random_bytes(16));
            $pdo->prepare('INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)')
                ->execute(['client_bot_webhook_secret', $secret]);
        }

        $webhookUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' ? 'https://' : 'http://') . $_SERVER['HTTP_HOST'] . dirname(dirname($_SERVER['SCRIPT_NAME'])) . '/public/telegram_webhook.php';

        $apiUrl = "https://api.telegram.org/bot{$token}/setWebhook";
        $ch = curl_init($apiUrl);
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => json_encode(['url' => $webhookUrl, 'secret_token' => $secret]),
            CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 8,
        ]);
        $response = curl_exec($ch);
        $err = curl_error($ch);
        curl_close($ch);

        if ($err) { echo json_encode(['ok' => false, 'error' => 'cURL: ' . $err]); exit; }
        $decoded = json_decode($response, true);
        if (!($decoded['ok'] ?? false)) {
            echo json_encode(['ok' => false, 'error' => ($decoded['description'] ?? 'Неизвестная ошибка') . ' (URL: ' . $webhookUrl . ')']);
            exit;
        }
        echo json_encode(['ok' => true, 'url' => $webhookUrl]);
        exit;
    }

    http_response_code(400);
    echo json_encode(['error' => 'Неизвестное действие']);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Метод не поддерживается']);
