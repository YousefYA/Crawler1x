<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
require_once '../config/config.php'; // Ensure this path is correct

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
    $password = $_POST['password'];

    $stmt = $pdo->prepare("SELECT * FROM users WHERE name = ? OR email = ?");
    $stmt->execute([$username, $username]); // Check for both username and email
    $user = $stmt->fetch();

    if ($user) {
        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['name'];
            header('Location: dashboard.php'); // Redirect to the dashboard
            exit;
        } else {
            $_SESSION['error_message'] = 'Invalid password';
            header('Location: login.php'); // Redirect back to login page with an error
            exit;
        }
    } else {
        $_SESSION['error_message'] = 'User not found';
        header('Location: login.php'); // Redirect back to login page with an error
        exit;
    }
} else {
    $_SESSION['error_message'] = 'Invalid request method';
    header('Location: login.php'); // Redirect back to login page with an error
    exit;
}
?>
