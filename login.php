<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login y Registro - Rediseñado</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Host Grotesk", sans-serif;
        }

        body {
            background-image: url("img/mosaico.jpg");
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            background-blend-mode: multiply; /* Otras opciones: overlay, screen, etc. */
            background-color: rgb(88, 111, 137); /* Capa de color (rojo semitransparente) */
        }

        .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: rgba(255, 255, 255, 0.15);
            border-radius: 15px;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
            padding: 30px;
            max-width: 900px;
            width: 90%;
            overflow: hidden;
        }

        .form-container {
            flex: 1;
            margin: 0 15px;
            text-align: center;
            padding: 20px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .form-container:hover {
            transform: scale(1.05);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
        }

        h2 {
            font-size: 2rem;
            margin-bottom: 20px;
            color: #000000;
        }

        form {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        input {
            padding: 15px;
            border-radius: 30px;
            border: none;
            outline: none;
            background: rgba(255, 255, 255, 0.8);
            color: #333;
            font-size: 1rem;
            transition: all 0.3s ease;
        }

        input:focus {
            background: rgba(255, 255, 255, 1);
            box-shadow: 0 0 10px #ffd700;
        }

        button {
            padding: 15px;
            border-radius: 30px;
            border: none;
            background: linear-gradient(135deg, #ff7eb3, #ff758c);
            color: #fff;
            font-size: 1.1rem;
            cursor: pointer;
            transition: transform 0.3s ease, background 0.3s ease;
        }

        button:hover {
            background: linear-gradient(135deg, #ff758c, #ff7eb3);
            transform: translateY(-5px);
        }

        .separator {
            width: 2px;
            height: 100px;
            background: rgba(255, 255, 255, 0.3);
            margin: 0 20px;
            position: relative;
        }

        .separator::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 10px;
            height: 10px;
            background: #ffd700;
            border-radius: 50%;
            box-shadow: 0 0 10px #ffd700;
        }

        @media (max-width: 768px) {
            .container {
                flex-direction: column;
                align-items: center;
                padding: 20px;
            }

            .separator {
                width: 80%;
                height: 2px;
                margin: 20px 0;
            }

            .separator::after {
                top: 50%;
                left: 50%;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Login Section -->
        <div class="form-container">
            <h2>Login</h2>
            <form action="sesion.php" method="POST">
                <input type="text" name="usuario" placeholder="Usuario" required>
                <input type="password" name="contraseña" placeholder="Contraseña" required>
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
        <div class="separator"></div>
        <!-- Registro Section -->
        <div class="form-container">
            <h2>Registro</h2>
            <form action="registro.php" method="POST">
                <input type="text" name="usuario" placeholder="Usuario" required>
                <input type="password" name="contraseña" placeholder="Contraseña" required>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    </div>
</body>
</html>
