<?php
// Общая функция отправки уведомления в Telegram через Bot API.
// Настройки (токен, chat_id, включено/выключено) хранятся в таблице settings,
// заполняются администратором в разделе "Контакты" — сюда токен никогда не передаётся из чата с ассистентом.

function send_telegram_notification(PDO $pdo, string $text): array {
    try {
        $stmt = $pdo->query("SELECT setting_key, setting_value FROM settings WHERE setting_key IN ('telegram_bot_token','telegram_bot_chat_id','telegram_bot_enabled')");
        $s = [];
        foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $row) { $s[$row['setting_key']] = $row['setting_value']; }

        if (($s['telegram_bot_enabled'] ?? '') !== '1') {
            return ['ok' => false, 'error' => 'Бот выключен в настройках'];
        }
        $token = trim($s['telegram_bot_token'] ?? '');
        $chatId = trim($s['telegram_bot_chat_id'] ?? '');
        if ($token === '' || $chatId === '') {
            return ['ok' => false, 'error' => 'Не заполнен токен или Chat ID'];
        }

        $url = "https://api.telegram.org/bot{$token}/sendMessage";
        $payload = json_encode(['chat_id' => $chatId, 'text' => $text, 'parse_mode' => 'HTML']);

        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $payload,
            CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 8,
        ]);
        $response = curl_exec($ch);
        $err = curl_error($ch);
        curl_close($ch);

        if ($err) { return ['ok' => false, 'error' => 'cURL: ' . $err]; }
        $decoded = json_decode($response, true);
        if (!($decoded['ok'] ?? false)) { return ['ok' => false, 'error' => $decoded['description'] ?? 'Неизвестная ошибка Telegram API']; }

        return ['ok' => true];
    } catch (Throwable $e) {
        return ['ok' => false, 'error' => $e->getMessage()];
    }
}
