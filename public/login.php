<?php
session_start();
$message = isset($_SESSION['message']) ? $_SESSION['message'] : '';
$message_type = isset($_SESSION['message_type']) ? $_SESSION['message_type'] : '';
unset($_SESSION['message'], $_SESSION['message_type']);
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="assets/fonts/icomoon/style.css" />
  <link rel="stylesheet" href="assets/css/owl.carousel.min.css" />
  <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
  <link rel="stylesheet" href="assets/css/login_style.css" />
  <title>Login - Secure Notes</title>
  <style>
    .message {
      display: none;
      margin-bottom: 20px;
      padding: 10px;
      border-radius: 5px;
    }
    .error {
      background-color: #f8d7da;
      color: #721c24;
    }
    .success {
      background-color: #d4edda;
      color: #155724;
    }
  </style>
</head>
<body>
<?php
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }
    
    if (isset($_SESSION['error_message'])) {
        echo '<p style="color: red;">' . $_SESSION['error_message'] . '</p>';
        unset($_SESSION['error_message']); // Clear the error message after displaying it
    }
    ?>
<div class="logo">
    <img src="assets/images/user-icon.png" alt="Logo" class="logo-img">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 600 150" id="secure-note-logo">
      <title>Secure Note</title>
      <text class="logo-text" x="50" y="50">S E C U R E</text>
      <text class="logo-text note" x="50" y="100">N O T E</text>
    </svg>
  </div>
  <div class="content">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <img src="assets/images/undraw_remotely_2j6y.svg" alt="Image" class="img-fluid">
        </div>
        <div class="col-md-6 contents">
          <div class="row justify-content-center">
            <div class="col-md-8">
              <h1 class="typer-content">
                Secure Notes is
                <span class="typer" id="main" data-words="secure,private,encrypted,safe" data-delay="100" data-deleteDelay="1000"></span>
                <span class="cursor" data-owner="main"></span>
              </h1>
              <p>the ultimate solution for secure note-taking</p>
              <div class="mb-4">
                <h3>Sign In</h3>
                <p class="mb-4">Access your secure notes easily and safely.</p>
              </div>
              <form id="login-form" method="POST" action="login_handler.php">                <div class="input-group">
                  <input required type="text" name="username" autocomplete="off" class="input" id="username">
                  <label class="user-label" for="username">Username</label>
                </div>
                <div class="input-group">
                  <input required type="password" name="password" autocomplete="off" class="input" id="password">
                  <label class="user-label" for="password">Password</label>
                </div>
                <div class="d-flex mb-5 align-items-center">
                  <label class="control control--checkbox mb-0">
                    <span class="caption">Remember me</span>
                    <input type="checkbox" checked="checked">
                    <div class="control__indicator"></div>
                  </label>
                  <span class="ml-auto"><a href="#" class="forgot-pass">Forgot Password</a></span>
                </div>
                <input type="submit" value="Log In" class="btn btn-block btn-primary login-button">
              </form>
              <div class="social-login">
                <a href="#" class="social-icon"><i class="icon-facebook"></i></a>
                <a href="#" class="social-icon"><i class="icon-twitter"></i></a>
                <a href="#" class="social-icon"><i class="icon-google"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script>
    // Pass PHP session variables to JavaScript
    const message = <?php echo json_encode($message); ?>;
    const messageType = <?php echo json_encode($message_type); ?>;
  </script>
  <script src="assets/js/jquery-3.3.1.min.js"></script>
  <script src="assets/js/popper.min.js"></script>
  <script src="assets/js/bootstrap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"></script>
  <script async src="https://unpkg.com/typer-dot-js@0.1.0/typer.js"></script>
  <script src="assets/js/login_main.js"></script>
  <script src="assets/js/login.js"></script>
</body>
</html>
