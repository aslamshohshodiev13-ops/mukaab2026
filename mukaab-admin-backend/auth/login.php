<?php
require_once __DIR__ . '/../bootstrap.php';

$input = json_input();
$username = trim($input['username'] ?? '');
$password = (string)($input['password'] ?? '');

if ($username === '' || $password === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Введите логин и пароль']);
    exit;
}

$stmt = $pdo->prepare('SELECT id, username, password FROM admin_users WHERE username = ? LIMIT 1');
$stmt->execute([$username]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Неверный логин или пароль']);
    exit;
}

// Против фиксации сессии
session_regenerate_id(true);
$_SESSION['admin_id'] = $user['id'];
$_SESSION['admin_username'] = $user['username'];

echo json_encode(['ok' => true, 'username' => $user['username']]);
