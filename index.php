<!DOCTYPE html>
<?php include 'auth.php'?>


<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="estilosIndex.css">
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
        <div id="jugar" onclick="window.location='juego.php';">>JUGAR<</div>
        <div id="saludo">Hola, <?php echo htmlspecialchars($_SESSION['usuario'])?>!</div>
        <div id="login"><img src="img/user_login.png" width="43px" height="43px"></div>
        <div id="ayuda" onclick=updateHelpContent()>?</div>
        <div id="ayudaBloque"></div>
    </div>

    <div id="right-container">

        <div id="configuracion" onclick="window.location='configuracion.html';"></div>
        <div id="salir" onclick="window.location='login.php';"></div>
    
    </div>


</body>
<div id="overlay"></div>
<script src="menu.js"></script>
</html>