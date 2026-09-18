<?php
require_once __DIR__ . '/../bootstrap.php';

if (!empty($_SESSION['admin_id'])) {
    echo json_encode(['authenticated' => true, 'username' => $_SESSION['admin_username']]);
} else {
    echo json_encode(['authenticated' => false]);
}
