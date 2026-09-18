<?php
require_once __DIR__ . '/../bootstrap.php';
require_auth();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query('SELECT * FROM media ORDER BY id DESC');
    $items = $stmt->fetchAll();
    foreach ($items as &$m) { $m['url'] = UPLOAD_URL . $m['filename']; }
    echo json_encode(['items' => $items]);
    exit;
}

if ($method === 'POST') {
    // Удаление: JSON { action: 'delete', id: N }
    if (empty($_FILES)) {
        $input = json_input();
        if (($input['action'] ?? '') === 'delete') {
            $id = (int)($input['id'] ?? 0);
            $stmt = $pdo->prepare('SELECT filename FROM media WHERE id = ?');
            $stmt->execute([$id]);
            $row = $stmt->fetch();
            if ($row) {
                $path = UPLOAD_DIR . $row['filename'];
                if (is_file($path)) { @unlink($path); }
                $del = $pdo->prepare('DELETE FROM media WHERE id = ?');
                $del->execute([$id]);
            }
            echo json_encode(['ok' => true]);
            exit;
        }
        http_response_code(400);
        echo json_encode(['error' => 'Неизвестное действие']);
        exit;
    }

    // Загрузка файлов: multipart/form-data, поле files[]
    $allowedExt = ['jpg','jpeg','png','webp','gif','mp4','webm','mov'];
    $videoExt = ['mp4','webm','mov'];
    $uploaded = [];

    if (!is_dir(UPLOAD_DIR)) { mkdir(UPLOAD_DIR, 0755, true); }

    $files = $_FILES['files'] ?? null;
    if (!$files) {
        http_response_code(400);
        echo json_encode(['error' => 'Файлы не переданы']);
        exit;
    }

    $count = is_array($files['name']) ? count($files['name']) : 1;
    for ($i = 0; $i < $count; $i++) {
        $name = is_array($files['name']) ? $files['name'][$i] : $files['name'];
        $tmp = is_array($files['tmp_name']) ? $files['tmp_name'][$i] : $files['tmp_name'];
        $error = is_array($files['error']) ? $files['error'][$i] : $files['error'];
        $size = is_array($files['size']) ? $files['size'][$i] : $files['size'];

        if ($error !== UPLOAD_ERR_OK) { continue; }

        $ext = strtolower(pathinfo($name, PATHINFO_EXTENSION));
        if (!in_array($ext, $allowedExt, true)) { continue; }
        $maxSize = in_array($ext, $videoExt, true) ? 60 * 1024 * 1024 : 8 * 1024 * 1024; // видео до 60МБ, фото до 8МБ
        if ($size > $maxSize) { continue; }

        $safeName = bin2hex(random_bytes(8)) . '.' . $ext;
        $dest = UPLOAD_DIR . $safeName;

        if (move_uploaded_file($tmp, $dest)) {
            $stmt = $pdo->prepare('INSERT INTO media (filename, path, size) VALUES (?,?,?)');
            $stmt->execute([$safeName, UPLOAD_URL . $safeName, $size]);
            $uploaded[] = ['id' => $pdo->lastInsertId(), 'filename' => $safeName, 'url' => UPLOAD_URL . $safeName];
        }
    }

    echo json_encode(['ok' => true, 'uploaded' => $uploaded]);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Метод не поддерживается']);
