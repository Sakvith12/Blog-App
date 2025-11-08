

<?php
require_once '../../config/db.php';

header('Cache-Control: no-store, no-cache, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');
header('Content-Type: application/json');

if (isset($_SESSION['user_id'])) {
    echo json_encode(['user' => [
        'id' => $_SESSION['user_id'],
        'username' => $_SESSION['username'] ?? 'User'
    ]]);
} else {
    echo json_encode(['user' => null]);
}
?>