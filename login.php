<?php
session_start();
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = isset($_POST['username']) ? $_POST['username'] : '';
    $password = $_POST['password'] ?? '';

    // File existence check
    if (file_exists('users.json')) {
        try {
            $usersJson = file_get_contents('users.json');
            if ($usersJson === false) {
                $error = 'Error reading user database.';
            } else {
                $users = json_decode($usersJson, true);
                if ($users === null) {
                    $error = 'Error parsing user database.';
                } elseif (isset($users[$username]) && password_verify($password, $users[$username]['password'])) {
                    $_SESSION['user'] = $username;
                    header('Location: calculator.php');
                    exit();
                } else {
                    $error = 'Invalid username or password.';
                }
            }
        } catch (Exception $e) {
            $error = 'An error occurred: ' . $e->getMessage();
        }
    } else {
        $error = 'User database not found.';
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="p-3">
<div class="container">
    <h1 class="mb-4">Login</h1>
    <?php if ($error && $_SERVER['REQUEST_METHOD'] === 'POST'): ?>
        <div class="alert alert-danger"><?php echo htmlspecialchars($error); ?></div>
    <?php endif; ?>
    <form method="post">
        <!-- Add CSRF Protection -->
        <?php
        if (!isset($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }
        ?>
        <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">

        <div class="mb-3">
            <label class="form-label">Username</label>
            <input type="text" name="username" class="form-control" required>
        </div>
        <div class="mb-3">
            <label class="form-label">Password</label>
            <input type="password" name="password" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
        <a href="register.php" class="btn btn-link">Create Account</a>
    </form>
</div>
</body>
</html>