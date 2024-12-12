<!DOCTYPE html>
<?php 
$required_role = 'admin'; // Solo permite usuarios regulares

include 'auth.php'?>


<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="estilosIndexAdmin.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Host+Grotesk:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
    
</head>
<body>
    <div id="sidebar">
        <div id="profile-picture"></div>
    </div>

    <div id="principal">
        <div id="titulo"></div>
        <div id="saludo">Hola, <?php echo htmlspecialchars($_SESSION['usuario'])?>!</div>
        <div id="usuarios"><img src="img/usuarios.png" width="43px" height="43px" onclick="window.location='crudUsuarios.php';"></div>
        <div id="login"><img src="img/ranking.png" width="43px" height="43px" onclick="window.location='ranking.php';"></div>
        <div id="ayudaBloque"></div>
    </div>

    <div id="right-container">

        <div id="configuracion" onclick="window.location='configuracionAdmin.html';"></div>
        <div id="salir" onclick="window.location='login.php';"></div>
    
    </div>


</body>
<div id="overlay"></div>
<script src="menu.js"></script>
</html>