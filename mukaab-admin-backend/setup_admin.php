<?php
// ОДНОРАЗОВЫЙ СКРИПТ создания администратора.
// Откройте его в браузере один раз (например https://ваш-домен/mukaab-admin-backend/setup_admin.php),
// затем ОБЯЗАТЕЛЬНО УДАЛИТЕ этот файл с сервера — иначе им может воспользоваться кто угодно.

require_once __DIR__ . '/config.php';

try {
    $pdo = new PDO(
        'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
        DB_USER,
        DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    die('Ошибка подключения к БД: ' . $e->getMessage());
}

$message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if ($username === '' || strlen($password) < 8) {
        $message = 'Логин обязателен, пароль — минимум 8 символов.';
    } else {
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $pdo->prepare('INSERT INTO admin_users (username, password) VALUES (?, ?) ON DUPLICATE KEY UPDATE password = VALUES(password)');
        $stmt->execute([$username, $hash]);
        $message = "Готово! Администратор «$username» создан/обновлён. Теперь удалите этот файл (setup_admin.php) с сервера.";
    }
}
?>
<!DOCTYPE html>
<html lang="ru"><head><meta charset="UTF-8"><title>Создание администратора</title>
<style>body{font-family:Arial,sans-serif;background:#0a0a0a;color:#eee;display:flex;align-items:center;justify-content:center;height:100vh}
form{background:#141414;padding:30px;border-radius:8px;width:320px}input{width:100%;padding:10px;margin-bottom:12px;background:#1c1c1c;border:1px solid #333;color:#fff;border-radius:4px}
button{width:100%;padding:10px;background:#c8a96e;border:0;border-radius:4px;font-weight:700;cursor:pointer}
p{margin-bottom:15px;font-size:13px;color:#c8a96e}</style></head><body>
<form method="post">
<h2 style="margin-bottom:20px">Создать администратора</h2>
<?php if ($message): ?><p><?= htmlspecialchars($message) ?></p><?php endif; ?>
<input name="username" placeholder="Логин" required>
<input name="password" type="password" placeholder="Пароль (мин. 8 символов)" required>
<button>Создать</button>
</form></body></html>
