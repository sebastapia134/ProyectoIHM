<?php
session_start();

include 'auth.php';
// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "Rodisejuda74"; // Cambia esto si tienes contraseña
$dbname = "memorizate";


$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
  die("Conexión fallida: " . $conn->connect_error);
}

// Obtener los valores del formulario
$usuario_id = $_SESSION['id'] ?? 1;
$puntaje = $_POST['puntajeInput'];
$dificultad = $_POST['dificultadInput'];

// Consulta para insertar el nuevo puntaje
$sql = "INSERT INTO puntajes (usuario_id, puntaje, dificultad) VALUES (?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("iis", $usuario_id, $puntaje, $dificultad);
$stmt->execute();

// Verificar si se insertó correctamente
if ($stmt->affected_rows > 0) {
    // Redirigir a index.php
    header("Location: index.php");
    exit;
  } else {
    echo "Error al insertar el puntaje";
  }

// Cerrar la conexión
$stmt->close();
$conn->close();
?>