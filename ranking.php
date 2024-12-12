<!DOCTYPE html>
<html>
<head>
  <title>Ranking de Puntajes</title>
  <style>
    table {
      border-collapse: collapse;
      width: 100%;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 10px;
      text-align: left;
    }
    th {
      background-color: #f0f0f0;
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
    include 'puntajes.php';
    include 'auth.php';
    
    foreach ($puntajes as $puntaje) { ?>
      <tr>
        <td><?= $puntaje['posicion'] ?></td>
        <td><?= $puntaje['usuario'] ?></td>
        <td><?= $puntaje['puntaje'] ?></td>
        <td><?= $puntaje['dificultad'] ?></td>
        <td><?= $puntaje['fecha'] ?></td>
      </tr>
    <?php } ?>
  </table>
</body>
</html>