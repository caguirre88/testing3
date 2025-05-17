<?php
session_start();
if (!isset($_SESSION['user'])) {
    header('Location: login.php');
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Calculator</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="p-3">
  <div class="container">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Calculator</h1>
        <a href="logout.php" class="btn btn-outline-secondary">Logout</a>
    </div>
    <div class="row mb-2">
      <div class="col-12">
        <input id="display" type="text" class="form-control text-end" readonly>
      </div>
    </div>
    <div id="buttons" class="row row-cols-4 g-2"></div>
  </div>
  <script src="script.js"></script>
</body>
</html>
