<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Juego de Frutas</title>
    <link rel="stylesheet" href="estilosJuego.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Host+Grotesk:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
</head>
<body>

    <?php include 'auth.php'?>
    <!-- Modal de inicio -->
    <div id="startModal" class="modal">
        <div class="modal-content">
            <h2>¡Bienvenido al Juego! 🐭</h2>
            <p>En este juego se te mostrarán algunas frutas y deberás adivinar cuántas de ellas son un tipo específico. Haz clic en "Entendido" para comenzar.</p>
            <button id="startBtn">Entendido</button>
        </div>
    </div>

    <!-- Contenedor de juego -->
    <div id="gameContainer" class="game-container">
        <div id="imagesContainer"></div>
        <div id="questionContainer"></div>
        <div id="optionsContainer"></div>
        <div id="feedback"></div>
        <div id="puntajeDisplay" style="position: absolute; top: 5%; right: 50%;">Puntaje: 0</div>
        <div id="cuadrantes">
            <div class="cuadrante a">
                <span>A</span>
            </div>
            <div class="cuadrante b">
                <span>B</span>
            </div>
            <div class="cuadrante c">
                <span>C</span>
            </div>
            <div class="cuadrante d">
                <span>D</span>
            </div>
        </div>
        

        
    </div>

    <!-- Modal de selección de dificultad -->
<div id="difficultyModal" class="modal">
    <div class="modal-content" style="
    margin-left: 40px;
    margin-top: 40px;
">
        <h2>Selecciona la dificultad</h2>
        <button id="easyBtn">Fácil</button>
        <button id="mediumBtn">Medio</button>
        <button id="hardBtn">Difícil</button>
    </div>
</div>


    

    <script src="script.js"></script>
</body>
</html>
