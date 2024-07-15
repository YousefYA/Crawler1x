<?php
session_start();
require 'config/config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user_id = $_SESSION['user_id'];
    $title = filter_input(INPUT_POST, 'title', FILTER_SANITIZE_STRING);
    $content = filter_input(INPUT_POST, 'content', FILTER_SANITIZE_STRING);
    $category = filter_input(INPUT_POST, 'category', FILTER_SANITIZE_STRING);

    $encryption_key = 'your-encryption-key';
    $iv = 'your-iv'; // Ensure you have a proper IV
    $encryptedContent = openssl_encrypt($content, 'aes-256-cbc', $encryption_key, 0, $iv);

    $stmt = $pdo->prepare("INSERT INTO notes (user_id, title, content, category) VALUES (?, ?, ?, ?)");
    $stmt->execute([$user_id, $title, $encryptedContent, $category]);

    header('Location: dashboard.php');
    exit();
}
