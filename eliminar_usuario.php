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

    // Eliminar usuario
    $delete_query = "DELETE FROM login WHERE id = ?";
    $stmt = $conn->prepare($delete_query);
    $stmt->bind_param("i", $id);
    $stmt->execute();

    header("Location: crudUsuarios.php");
    exit;
}

$conn->close();
?>
