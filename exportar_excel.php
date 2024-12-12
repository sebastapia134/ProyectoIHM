<?php
// Configuración de la base de datos
$servername = "localhost";
$username = "root";
$password = "Rodisejuda74";
$dbname = "memorizate";

// Conexión a la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Consulta para obtener los datos del ranking
$query = "SELECT u.usuario AS usuario, p.puntaje, p.dificultad, p.fecha, 
       DENSE_RANK() OVER (ORDER BY p.puntaje DESC) AS posicion
FROM puntajes p
INNER JOIN login u ON p.usuario_id = u.id
ORDER BY p.puntaje DESC;";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    // Establece las cabeceras para la descarga
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=ranking.csv');

    // Abre un flujo de salida
    $output = fopen('php://output', 'w');

    // Escribe la primera fila con los encabezados
    fputcsv($output, array('Posicion', 'Usuario', 'Puntaje', 'Dificultad', 'Fecha'));

    // Escribe los datos fila por fila
    while ($row = $result->fetch_assoc()) {
        fputcsv($output, $row);
    }

    fclose($output);
} else {
    echo "No hay datos en el ranking.";
}

$conn->close();
?>
