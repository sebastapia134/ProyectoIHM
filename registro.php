<?php
$servername = "localhost";
$username = "root";
$password = "Rodisejuda74"; // Cambia esto si tienes contraseña
$dbname = "memorizate";

// Conexión a la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $usuario = $_POST['usuario'];
    $contraseña = password_hash($_POST['contraseña'], PASSWORD_DEFAULT); // Encripta la contraseña
    $rol = 'usuario'; // Rol por defecto

    // Verifica si el usuario ya existe
    $query = "SELECT * FROM login WHERE usuario = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $usuario);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo "El usuario ya está registrado.";
    } else {
        // Inserta un nuevo usuario con rol predeterminado
        $query = "INSERT INTO login (usuario, contraseña, rol) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("sss", $usuario, $contraseña, $rol);
        if ($stmt->execute()) {
            echo "Registro exitoso. <a href='login.php'>Volver al login</a>";
        } else {
            echo "Error al registrar: " . $conn->error;
        }
    }

    $stmt->close();
}
$conn->close();
?>
