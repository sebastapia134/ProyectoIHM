<!DOCTYPE html>
<html>
<head>
  <title>Ranking de Puntajes</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f0f0f0;
    }
    h1 {
      text-align: center;
      margin-bottom: 20px;
      color: #333;
      font-size: 36px;
      font-weight: bold;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 20px auto;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    th, td {
      border: 1px solid #ddd;
      padding: 10px;
      text-align: left;
    }
    th {
      background-color: #4CAF50;
      color: #fff;
      font-weight: bold;
    }
    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
    tr:hover {
      background-color: #f2f2f2;
    }
    td {
      transition: background-color 0.3s ease;
    }
    .posicion {
      font-weight: bold;
      font-size: 18px;
    }
    .usuario {
      color: #666;
    }
    .puntaje {
      font-weight: bold;
      font-size: 18px;
      color: #4CAF50;
    }
    .dificultad {
      color: #666;
    }
    .fecha {
      color: #999;
    }
  </style>
</head>
<body>
  <h1>Ranking de Puntajes</h1>
  <table>
    <tr>
      <th>Posición</th>
      <th>Usuario</th>
      <th>Puntaje</th>
      <th>Dificultad</th>
      <th>Fecha</th>
    </tr>
    <?php
    $required_role = 'admin'; // Solo permite usuarios regulares
    
    include 'puntajes.php';
    include 'auth.php';
    
    foreach ($puntajes as $puntaje) { ?>
      <tr>
        <td class="posicion"><?= $puntaje['posicion'] ?></td>
        <td class="usuario"><?= $puntaje['usuario'] ?></td>
        <td class="puntaje"><?= $puntaje['puntaje'] ?></td>
        <td class="dificultad"><?= $puntaje['dificultad'] ?></td>
        <td class="fecha"><?= $puntaje['fecha'] ?></td>
      </tr>
    <?php } ?>
  </table>
  <script>
    // Animación de carga
    document.addEventListener("DOMContentLoaded", function() {
      var table = document.querySelector("table");
      table.classList.add("animate");
    });
  </script>
  <style>
    .animate {
      animation: fadeIn 1s ease;
    }
    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  </style>

<form action="exportar_excel.php" method="post">
    <button type="submit">Descargar Excel</button>
  </form>
</body>
</html>