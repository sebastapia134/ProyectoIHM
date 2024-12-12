<?php
// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "Rodisejuda74";
$dbname = "memorizate";

$required_role = 'admin'; // Solo permite usuarios regulares

include 'auth.php';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Procesar la creación del nuevo usuario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuario = $_POST['usuario'];
    $contrasena = password_hash($_POST['contraseña'], PASSWORD_DEFAULT);  // Seguridad en la contraseña
    $rol = $_POST['rol'];

    // Insertar el nuevo usuario en la base de datos
    $sql = "INSERT INTO login (usuario, contraseña, rol) VALUES ('$usuario', '$contrasena', '$rol')";
    
    if ($conn->query($sql) === TRUE) {
        echo "<script>alert('Nuevo usuario creado correctamente');</script>";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Consulta para obtener los usuarios
$query = "SELECT * FROM login";
$result = $conn->query($query);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de Usuarios</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        th, td {
            padding: 12px;
            text-align: left;
            border: 1px solid #ddd;
        }
        th {
            background-color: #4CAF50;
            color: white;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        .btn {
            padding: 8px 12px;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            font-size: 14px;
        }
        .edit-btn {
            background-color: #4CAF50;
            color: white;
        }
        .delete-btn {
            background-color: #f44336;
            color: white;
        }
        .delete-btn:hover {
            background-color: #d32f2f;
        }
        .edit-btn:hover {
            background-color: #45a049;
        }
        .actions {
            display: flex;
            gap: 10px;
        }
        .form-container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
        }
        .form-container input,
        .form-container select {
            padding: 10px;
            margin-bottom: 10px;
            width: 100%;
            box-sizing: border-box;
            border-radius: 5px;
            border: 1px solid #ddd;
        }
        .form-container button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
        }
        .form-container button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Gestión de Usuarios</h1>

        <!-- Formulario para crear un nuevo usuario -->
        <div class="form-container">
            <h2>Crear Usuario</h2>
            <form method="POST" action="">
                <input type="text" name="usuario" placeholder="Nombre de usuario" required>
                <input type="password" name="contraseña" placeholder="Contraseña" required>
                <select name="rol" required>
                    <option value="usuario">Usuario</option>
                    <option value="admin">Administrador</option>
                </select>
                <button type="submit">Crear Usuario</button>
            </form>
        </div>

        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Usuario</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <?php while($row = $result->fetch_assoc()): ?>
                <tr>
                    <td><?= $row['id'] ?></td>
                    <td><?= $row['usuario'] ?></td>
                    <td><?= $row['rol'] ?></td>
                    <td class="actions">
                        <a href="editar_usuario.php?id=<?= $row['id'] ?>" class="btn edit-btn">Editar</a>
                        <a href="eliminar_usuario.php?id=<?= $row['id'] ?>" class="btn delete-btn" onclick="return confirm('¿Estás seguro de que deseas eliminar este usuario?')">Eliminar</a>
                    </td>
                </tr>
                <?php endwhile; ?>
            </tbody>
        </table>
    </div>
</body>
</html>

<?php
$conn->close();
?>
