<?php
session_start(); // Iniciar la sesión

// Configuración de la base de datos
$servername = "localhost";
$username = "root";
$password = "Rodisejuda74"; // Cambia esto si tienes contraseña
$dbname = "memorizate";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Verificar si se envió el formulario
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = $_POST['usuario'];
    $contraseña = $_POST['contraseña'];

    // Preparar y ejecutar la consulta
    $stmt = $conn->prepare("SELECT * FROM login WHERE usuario = ?");
    $stmt->bind_param("s", $usuario);
    $stmt->execute();
    $result = $stmt->get_result();

    // Verificar si el usuario existe
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        
        // Verificar la contraseña (suponiendo que está encriptada)
        if (password_verify($contraseña, $row['contraseña'])) {
            // Guardar el usuario en la sesión
            $_SESSION['usuario'] = $usuario;
            header('Location: index.php'); // Redirigir a una página de éxito
            exit();
        } else {
            echo "Contraseña incorrecta.";
        }
    } else {
        echo "Usuario no encontrado.";
    }

    $stmt->close();
}

$conn->close();
?>