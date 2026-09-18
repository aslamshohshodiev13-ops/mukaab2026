<?php
require_once __DIR__ . '/../bootstrap.php';
require_auth();

$method = $_SERVER['REQUEST_METHOD'];
$allowedTypes = ['portfolio','services','architecture','interior','furniture','viz','supervision','designer','vacancies','nav','portfolio_cat','nav_home','nav_portfolio','nav_servis','nav_author6','nav_3dviz','nav_architecture','nav_designerday','nav_interior','nav_mebel','nav_vacancies'];

function bad_type_check($type, $allowedTypes) {
    if (!in_array($type, $allowedTypes, true)) {
        http_response_code(400);
        echo json_encode(['error' => 'Неизвестный тип раздела']);
        exit;
    }
}

if ($method === 'GET') {
    $action = $_GET['action'] ?? 'list';

    if ($action === 'list') {
        $type = $_GET['type'] ?? '';
        bad_type_check($type, $allowedTypes);
        $stmt = $pdo->prepare('SELECT * FROM content_items WHERE type = ? ORDER BY sort_order ASC, id DESC');
        $stmt->execute([$type]);
        echo json_encode(['items' => $stmt->fetchAll()]);
        exit;
    }

    if ($action === 'get') {
        $id = (int)($_GET['id'] ?? 0);
        $stmt = $pdo->prepare('SELECT * FROM content_items WHERE id = ? LIMIT 1');
        $stmt->execute([$id]);
        $item = $stmt->fetch();
        if (!$item) {
            http_response_code(404);
            echo json_encode(['error' => 'Не найдено']);
            exit;
        }
        echo json_encode(['item' => $item]);
        exit;
    }

    if ($action === 'counts') {
        // количество записей по каждому разделу — для бейджей в сайдбаре
        $stmt = $pdo->query('SELECT type, COUNT(*) as cnt FROM content_items GROUP BY type');
        $out = [];
        foreach ($stmt->fetchAll() as $row) { $out[$row['type']] = (int)$row['cnt']; }
        echo json_encode(['counts' => $out]);
        exit;
    }

    http_response_code(400);
    echo json_encode(['error' => 'Неизвестное действие']);
    exit;
}

if ($method === 'POST') {
    $input = json_input();
    $action = $input['action'] ?? '';

    if ($action === 'save') {
        $type = $input['type'] ?? '';
        bad_type_check($type, $allowedTypes);

        $id = (int)($input['id'] ?? 0);
        $fields = [
            'title_ru' => trim($input['title_ru'] ?? ''),
            'title_en' => trim($input['title_en'] ?? ''),
            'category' => trim($input['category'] ?? ''),
            'location' => trim($input['location'] ?? ''),
            'area' => trim($input['area'] ?? ''),
            'image' => trim($input['image'] ?? ''),
            'status' => in_array($input['status'] ?? '', ['published','draft','hidden'], true) ? $input['status'] : 'draft',
            'description_ru' => $input['description_ru'] ?? '',
            'description_en' => $input['description_en'] ?? '',
            'featured' => !empty($input['featured']) ? 1 : 0,
            'sort_order' => (int)($input['sort_order'] ?? 1),
            'filter_cat' => trim($input['filter_cat'] ?? ''),
            'tags' => trim($input['tags'] ?? ''),
            'gallery' => trim($input['gallery'] ?? ''),
            'badge_ru' => trim($input['badge_ru'] ?? ''),
            'badge_en' => trim($input['badge_en'] ?? ''),
            'stats_ru' => trim($input['stats_ru'] ?? ''),
            'stats_en' => trim($input['stats_en'] ?? ''),
            'requirements_ru' => trim($input['requirements_ru'] ?? ''),
            'requirements_en' => trim($input['requirements_en'] ?? ''),
            'note_ru' => trim($input['note_ru'] ?? ''),
            'note_en' => trim($input['note_en'] ?? ''),
        ];

        if ($fields['title_ru'] === '') {
            http_response_code(400);
            echo json_encode(['error' => 'Название обязательно']);
            exit;
        }

        if ($id > 0) {
            $sql = 'UPDATE content_items SET title_ru=?, title_en=?, category=?, location=?, area=?, image=?, status=?, description_ru=?, description_en=?, featured=?, sort_order=?, filter_cat=?, tags=?, gallery=?, badge_ru=?, badge_en=?, stats_ru=?, stats_en=?, requirements_ru=?, requirements_en=?, note_ru=?, note_en=? WHERE id=?';
            $stmt = $pdo->prepare($sql);
            $stmt->execute([...array_values($fields), $id]);
            echo json_encode(['ok' => true, 'id' => $id]);
        } else {
            $sql = 'INSERT INTO content_items (type, title_ru, title_en, category, location, area, image, status, description_ru, description_en, featured, sort_order, filter_cat, tags, gallery, badge_ru, badge_en, stats_ru, stats_en, requirements_ru, requirements_en, note_ru, note_en) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$type, ...array_values($fields)]);
            echo json_encode(['ok' => true, 'id' => $pdo->lastInsertId()]);
        }
        exit;
    }

    if ($action === 'delete') {
        $id = (int)($input['id'] ?? 0);
        $stmt = $pdo->prepare('DELETE FROM content_items WHERE id = ?');
        $stmt->execute([$id]);
        echo json_encode(['ok' => true]);
        exit;
    }

    http_response_code(400);
    echo json_encode(['error' => 'Неизвестное действие']);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Метод не поддерживается']);
