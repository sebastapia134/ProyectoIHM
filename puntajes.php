<?php
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

// Consulta para obtener los puntajes ordenados por puntaje descendente
$sql = "SELECT u.usuario AS usuario, p.puntaje, p.dificultad, p.fecha, 
       DENSE_RANK() OVER (ORDER BY p.puntaje DESC) AS posicion
FROM puntajes p
INNER JOIN login u ON p.usuario_id = u.id
ORDER BY p.puntaje DESC;";

$result = $conn->query($sql);

// Verificar si hay resultados
if ($result->num_rows > 0) {
  $puntajes = array();
  while($row = $result->fetch_assoc()) {
    $puntajes[] = $row;
  }
} else {
  echo "No hay resultados";
}

// Cerrar la conexión
$conn->close();

// Mostrar el ranking
?>