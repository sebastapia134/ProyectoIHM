<?php
session_start();

// Verificar si el usuario ha iniciado sesión
if (!isset($_SESSION['usuario'])) {
    header("Location: ./login.php");
    exit();
}

// Verificar el rol según el contexto de la página
if (isset($required_role)) { 
    // $required_role debe definirse en cada página antes de incluir este archivo
    if ($_SESSION['rol'] !== $required_role) {
        // Redirigir según el tipo de usuario o simplemente mostrar un mensaje de acceso denegado
        header("Location: ./login.php");
        exit();
    }
}
?>
