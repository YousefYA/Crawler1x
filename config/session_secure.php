<?php
if (session_status() == PHP_SESSION_NONE) {
    // Set session cookie parameters before starting the session
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'domain' => '',
        'secure' => true,
        'httponly' => true,
        'samesite' => 'Strict'
    ]);
    session_start();
}
?>
