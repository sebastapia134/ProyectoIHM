<?php

$required_role = 'admin'; // Solo permite usuarios regulares

include 'auth.php';
// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "Rodisejuda74";
$dbname = "memorizate";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $query = "SELECT * FROM login WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $usuario = $_POST['usuario'];
    $rol = $_POST['rol'];

    // Actualizar el usuario
    $update_query = "UPDATE login SET usuario = ?, rol = ? WHERE id = ?";
    $stmt = $conn->prepare($update_query);
    $stmt->bind_param("ssi", $usuario, $rol, $id);
    $stmt->execute();
    
    header("Location: crudUsuarios.php");
    exit;
}

?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Usuario</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 50%;
            margin: 0 auto;
            padding: 20px;
            background-color: white;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
        }
        h1 {
            text-align: center;
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin: 10px 0;
            font-size: 16px;
        }
        input, select {
            width: 100%;
            padding: 10px;
            font-size: 14px;
            margin-bottom: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        .btn {
            padding: 10px 15px;
            background-color: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            font-size: 16px;
        }
        .btn:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Editar Usuario</h1>
        <form method="POST">
            <label for="usuario">Nombre de Usuario:</label>
            <input type="text" id="usuario" name="usuario" value="<?= $user['usuario'] ?>" required>

            <label for="rol">Rol:</label>
            <select id="rol" name="rol" required>
                <option value="usuario" <?= $user['rol'] == 'usuario' ? 'selected' : '' ?>>Usuario</option>
                <option value="admin" <?= $user['rol'] == 'admin' ? 'selected' : '' ?>>Admin</option>
            </select>

            <button type="submit" class="btn">Guardar Cambios</button>
        </form>
    </div>
</body>
</html>

<?php
$conn->close();
?>
