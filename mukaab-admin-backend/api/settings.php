<?php
require_once __DIR__ . '/../bootstrap.php';
require_auth();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query('SELECT setting_key, setting_value FROM settings');
    $out = [];
    foreach ($stmt->fetchAll() as $row) { $out[$row['setting_key']] = $row['setting_value']; }
    echo json_encode(['settings' => $out]);
    exit;
}

if ($method === 'POST') {
    $input = json_input();
    $stmt = $pdo->prepare('INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)');
    foreach ($input as $key => $value) {
        if (!is_string($key)) { continue; }
        $stmt->execute([$key, (string)$value]);
    }
    echo json_encode(['ok' => true]);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Метод не поддерживается']);
