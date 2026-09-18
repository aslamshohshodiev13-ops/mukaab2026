<?php
// Публичный эндпоинт БЕЗ авторизации — отдаёт только опубликованные записи.
// Используется страницами сайта (portfolio.html, vacancies.html и т.п.), не админкой.
require_once __DIR__ . '/../config.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *'); // при необходимости сузьте до своего домена

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

$allowedTypes = ['portfolio','services','architecture','interior','furniture','viz','supervision','designer','vacancies','nav','portfolio_cat','nav_home','nav_portfolio','nav_servis','nav_author6','nav_3dviz','nav_architecture','nav_designerday','nav_interior','nav_mebel','nav_vacancies'];
$type = $_GET['type'] ?? '';

if (!in_array($type, $allowedTypes, true)) {
    http_response_code(400);
    echo json_encode(['error' => 'Неизвестный тип раздела']);
    exit;
}

$stmt = $pdo->prepare('SELECT id, title_ru, title_en, category, location, area, image, description_ru, description_en, featured, sort_order, filter_cat, tags, gallery, badge_ru, badge_en, stats_ru, stats_en, requirements_ru, requirements_en, note_ru, note_en FROM content_items WHERE type = ? AND status = "published" ORDER BY sort_order ASC, id ASC');
$stmt->execute([$type]);
$items = $stmt->fetchAll();

function parse_lines($text) {
    // Разбиваем и по настоящему переносу строки, и по литеральному "\n" (на случай если MySQL сохранил его как 2 символа)
    $normalized = str_replace('\\n', "\n", (string)$text);
    return array_values(array_filter(array_map('trim', explode("\n", $normalized)), fn($l) => $l !== ''));
}
function parse_stats($text) {
    // "Подпись|Значение" построчно -> [{label, value}, ...]
    $out = [];
    foreach (parse_lines($text) as $line) {
        $parts = explode('|', $line, 2);
        $out[] = ['label' => trim($parts[0]), 'value' => trim($parts[1] ?? '')];
    }
    return $out;
}

foreach ($items as &$item) {
    $item['tags'] = $item['tags'] !== '' ? array_map('trim', explode(',', $item['tags'])) : [];
    $gallery = array_values(array_filter(array_map('trim', explode("\n", str_replace('\\n',"\n",(string)$item['gallery'])))));
    if (empty($gallery) && $item['image']) { $gallery = [$item['image']]; }
    $item['gallery'] = $gallery;
    $item['featured'] = (bool)$item['featured'];

    // Разбор полей вакансий в удобные массивы
    $item['stats_ru'] = parse_stats($item['stats_ru']);
    $item['stats_en'] = parse_stats($item['stats_en']);
    $item['requirements_ru'] = parse_lines($item['requirements_ru']);
    $item['requirements_en'] = parse_lines($item['requirements_en']);
}

echo json_encode(['items' => $items], JSON_UNESCAPED_UNICODE);
