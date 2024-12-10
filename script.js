// Datos del juego
const frutas = ['manzanas', 'peras', 'bananas'];
const images = {
    manzanas: 'img/manzana.png',
    peras: 'img/pera.png',
    bananas: 'img/banana.png'
};

let frutasMostradas = [];
let puntaje = 0;
let cuadranteSeleccionado = null;
let frutaPreguntaActual = null;
let cantidadFrutaPreguntaActual = 0;
let opcionesGeneradas = [];
let opcionCorrecta = null;



// Elementos HTML
const startModal = document.getElementById('startModal');
const startBtn = document.getElementById('startBtn');
const gameContainer = document.getElementById('gameContainer');
const imagesContainer = document.getElementById('imagesContainer');
const questionContainer = document.getElementById('questionContainer');
const optionsContainer = document.getElementById('optionsContainer');
const feedback = document.getElementById('feedback');
const puntajeDisplay = document.getElementById('puntajeDisplay');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const video = document.createElement('video');
const optionsLetras = ['A', 'B', 'C', 'D'];

// Iniciar el juego
startBtn.addEventListener('click', () => {
    startModal.style.display = 'none';
    gameContainer.style.display = 'block';
    iniciarJuego();
    iniciarCamara();
});

// Función que inicia el juego
function iniciarJuego() {
    mostrarFrutas();
    setTimeout(mostrarPregunta, 5000);
}

// Función que muestra frutas al azar
function mostrarFrutas() {
    imagesContainer.innerHTML = '';
    const cantidadFrutas = Math.floor(Math.random() * 5) + 1;
    frutasMostradas = [];

    console.log(`Generando ${cantidadFrutas} frutas...`); // Registra la cantidad de frutas generadas

    for (let i = 0; i < cantidadFrutas; i++) {
        const fruta = frutas[Math.floor(Math.random() * frutas.length)];
        frutasMostradas.push(fruta);
        const img = document.createElement('img');
        img.src = images[fruta];
        imagesContainer.appendChild(img);
    }

    console.log(`Frutas mostradas: ${frutasMostradas.join(', ')}`); // Registra las frutas que se mostraron
}


// Función que muestra la pregunta
function mostrarPregunta() {
    imagesContainer.innerHTML = '';
    frutaPreguntaActual = frutasMostradas[Math.floor(Math.random() * frutasMostradas.length)];
    cantidadFrutaPreguntaActual = frutasMostradas.filter(fruta => fruta === frutaPreguntaActual).length;

    // Generar opciones
    const opciones = generarOpciones(cantidadFrutaPreguntaActual, frutaPreguntaActual);

    // Almacenar las opciones generadas y la respuesta correcta
    opcionesGeneradas = opciones;
    opcionCorrecta = cantidadFrutaPreguntaActual;

    console.log(`Pregunta generada: ¿Cuántas ${frutaPreguntaActual} había?`);
    console.log(`Cantidad de ${frutaPreguntaActual}: ${cantidadFrutaPreguntaActual}`);

    questionContainer.innerHTML = `¿Cuántas ${frutaPreguntaActual} había?`;
    optionsContainer.innerHTML = '';
    
    opciones.forEach((opcion, index) => {
        const button = document.createElement('button');
        button.textContent = `${optionsLetras[index]}: ${opcion}`;
        button.addEventListener('click', () => verificarRespuesta(opcion, cantidadFrutaPreguntaActual));
        optionsContainer.appendChild(button);
    });
}


// Función que genera opciones aleatorias
function generarOpciones(cantidadFrutaPregunta, frutaPregunta) {
    const opciones = [cantidadFrutaPregunta];
    while (opciones.length < 4) {
        const randomOption = Math.floor(Math.random() * 6);
        if (!opciones.includes(randomOption)) {
            opciones.push(randomOption);
        }
    }
    return opciones.sort(() => Math.random() - 0.5);
}

// Función para verificar la respuesta automáticamente
function verificarRespuestaAutomatica() {
    if (cuadranteSeleccionado === null) return;

    const indexOpcionCorrecta = opcionesGeneradas.indexOf(opcionCorrecta);
    const opcionCorrectaSeleccionada = optionsLetras[indexOpcionCorrecta];

    console.log(`Fruta seleccionada: ${frutaPreguntaActual}`);
    console.log(`Cantidad correcta: ${opcionCorrecta}`);
    console.log(`Opción seleccionada: ${cuadranteSeleccionado}`);
    console.log(`Opción correcta: ${opcionCorrectaSeleccionada}`);

    if (cuadranteSeleccionado === opcionCorrectaSeleccionada) {
        feedback.textContent = '¡Correcto!';
        puntaje += 100;
    } else {
        feedback.textContent = `Incorrecto, la respuesta correcta era ${opcionCorrectaSeleccionada}.`;
        puntaje -= 50;
    }

    puntajeDisplay.textContent = `Puntaje: ${puntaje}`;

    // Restablecer vista
    setTimeout(() => {
        feedback.textContent = '';
        imagesContainer.innerHTML = '';
        questionContainer.innerHTML = '';
        optionsContainer.innerHTML = '';

        setTimeout(() => {
            mostrarFrutas();
            setTimeout(mostrarPregunta, 5000);
        }, 1000);
    }, 2000);
}



// Iniciar la cámara
function iniciarCamara() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
            video.play();
            document.body.appendChild(video);

            video.onloadedmetadata = function() {
                const videoWidth = 320;  
                const videoHeight = 240;

                canvas.width = videoWidth;
                canvas.height = videoHeight;

                video.style.position = 'absolute';
                video.style.top = '50px'; 
                video.style.right = '20px'; 
                video.style.width = `${videoWidth}px`;
                video.style.height = `${videoHeight}px`;
                video.style.zIndex = '-1'; 

                canvas.style.position = 'absolute';
                canvas.style.top = '50px';
                canvas.style.right = '20px';
                canvas.style.zIndex = '1';

                dibujarCuadrantes(); 

                setInterval(detectarPaleta, 1000);
            };
        })
        .catch(err => {
            console.error('Error al acceder a la cámara: ', err);
        });
}

// Función para dividir la pantalla en cuadrantes
function dibujarCuadrantes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
    const width = canvas.width;
    const height = canvas.height;

    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText('A', width / 4, height / 4);
    ctx.fillText('B', 3 * width / 4, height / 4);
    ctx.fillText('C', width / 4, 3 * height / 4);
    ctx.fillText('D', 3 * width / 4, 3 * height / 4);
}

let detectando = false; // Evitar múltiples procesos simultáneos
let tiempoDeEspera = false; // Evitar detecciones consecutivas inmediatas
let ultimoCuadranteDetectado = null; // Registrar el último cuadrante detectado
let colorRojoDetectado = false; // Estado para saber si el rojo fue detectado

function detectarPaleta() {
    if (detectando || tiempoDeEspera) return;

    detectando = true;
    console.log("Detectando... no te muevas");

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const cuadrantes = {
        A: { x: 0, y: 0, width: canvas.width / 2, height: canvas.height / 2 },
        B: { x: canvas.width / 2, y: 0, width: canvas.width / 2, height: canvas.height / 2 },
        C: { x: 0, y: canvas.height / 2, width: canvas.width / 2, height: canvas.height / 2 },
        D: { x: canvas.width / 2, y: canvas.height / 2, width: canvas.width / 2, height: canvas.height / 2 }
    };

    // Variable para saber si se detectó rojo en algún cuadrante
    let rojoDetectadoEnAlgúnCuadrante = false;

    // Recorremos los cuadrantes para detectar rojo
    Object.keys(cuadrantes).forEach(cuadrante => {
        const { x, y, width, height } = cuadrantes[cuadrante];
        const pixels = ctx.getImageData(x, y, width, height).data;
        const colorRojo = detectarRojo(pixels);

        if (colorRojo) {
            if (!rojoDetectadoEnAlgúnCuadrante) {
                // Si es la primera vez que detectamos rojo
                console.log("Detectando... no te muevas");
                rojoDetectadoEnAlgúnCuadrante = true;
            }

            if (cuadrante !== ultimoCuadranteDetectado) {
                cuadranteSeleccionado = cuadrante;
                console.log(`Respuesta ${cuadrante} seleccionada`);

                ultimoCuadranteDetectado = cuadrante; // Actualizar cuadrante detectado
                verificarRespuestaAutomatica(); // Verificar la respuesta

                // Bloquear detección adicional temporalmente
                tiempoDeEspera = true;
                setTimeout(() => {
                    tiempoDeEspera = false; // Reanudar detección
                    ultimoCuadranteDetectado = null; // Resetear el último cuadrante
                }, 3000);
            }
        }
    });

    // Si no hay más color rojo, resetear el estado
    if (!rojoDetectadoEnAlgúnCuadrante && colorRojoDetectado) {
        console.log("Se detuvo el movimiento, prepárate para detectar nuevamente.");
        colorRojoDetectado = false;
    } else if (rojoDetectadoEnAlgúnCuadrante) {
        colorRojoDetectado = true; // Aseguramos que detectamos rojo al menos una vez
    }

    setTimeout(() => {
        detectando = false; // Permitir nuevas detecciones
    }, 1000);
}

function detectarRojo(pixels) {
    for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        if (r > 150 && g < 50 && b < 50) { // Condición de color rojo
            return true;
        }
    }
    return false;
}