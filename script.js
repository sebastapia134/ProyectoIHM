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

    for (let i = 0; i < cantidadFrutas; i++) {
        const fruta = frutas[Math.floor(Math.random() * frutas.length)];
        frutasMostradas.push(fruta);
        const img = document.createElement('img');
        img.src = images[fruta];
        imagesContainer.appendChild(img);
    }
}

// Función que muestra la pregunta
function mostrarPregunta() {
    imagesContainer.innerHTML = '';
    const frutaPregunta = frutasMostradas[Math.floor(Math.random() * frutasMostradas.length)];
    const cantidadFrutaPregunta = frutasMostradas.filter(fruta => fruta === frutaPregunta).length;
    const opciones = generarOpciones(cantidadFrutaPregunta, frutaPregunta);

    questionContainer.innerHTML = `¿Cuántas ${frutaPregunta} había?`;
    optionsContainer.innerHTML = '';
    
    opciones.forEach((opcion, index) => {
        const button = document.createElement('button');
        button.textContent = `${optionsLetras[index]}: ${opcion}`;
        button.addEventListener('click', () => verificarRespuesta(opcion, cantidadFrutaPregunta));
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

// Función para verificar la respuesta
function verificarRespuesta(opcionSeleccionada, cantidadFrutaPregunta) {
    if (opcionSeleccionada === cantidadFrutaPregunta) {
        feedback.textContent = '¡Correcto!';
        puntaje += 100;
    } else {
        feedback.textContent = `Incorrecto, la respuesta correcta era ${cantidadFrutaPregunta}.`;
        puntaje -= 50;
    }

    puntajeDisplay.textContent = `Puntaje: ${puntaje}`;

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
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            // Dividir en cuadrantes
            dibujarCuadrantes();

            // Detectar color cada segundo
            setInterval(detectarPaleta, 1000);
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

    // Dividir en 4 cuadrantes
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // Etiquetas A, B, C, D
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText('A', width / 4, height / 4); // Cuadrante A
    ctx.fillText('B', 3 * width / 4, height / 4); // Cuadrante B
    ctx.fillText('C', width / 4, 3 * height / 4); // Cuadrante C
    ctx.fillText('D', 3 * width / 4, 3 * height / 4); // Cuadrante D
}

// Función para detectar la paleta roja
function detectarPaleta() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Dividir la imagen en los cuadrantes
    const cuadrantes = {
        A: { x: 0, y: 0, width: canvas.width / 2, height: canvas.height / 2 },
        B: { x: canvas.width / 2, y: 0, width: canvas.width / 2, height: canvas.height / 2 },
        C: { x: 0, y: canvas.height / 2, width: canvas.width / 2, height: canvas.height / 2 },
        D: { x: canvas.width / 2, y: canvas.height / 2, width: canvas.width / 2, height: canvas.height / 2 }
    };

    // Detectar el color rojo en los cuadrantes
    Object.keys(cuadrantes).forEach(cuadrante => {
        const { x, y, width, height } = cuadrantes[cuadrante];
        const pixels = ctx.getImageData(x, y, width, height).data;
        const colorRojo = detectarRojo(pixels);

        if (colorRojo) {
            cuadranteSeleccionado = cuadrante;
            setTimeout(() => {
                if (cuadranteSeleccionado === 'A') {
                    console.log('Respuesta A seleccionada');
                    // Lógica para elegir la respuesta A
                }
                if (cuadranteSeleccionado === 'B') {
                    console.log('Respuesta B seleccionada');
                    // Lógica para elegir la respuesta B
                }
                if (cuadranteSeleccionado === 'C') {
                    console.log('Respuesta C seleccionada');
                    // Lógica para elegir la respuesta C
                }
                if (cuadranteSeleccionado === 'D') {
                    console.log('Respuesta D seleccionada');
                    // Lógica para elegir la respuesta D
                }
            }, 3000); // Esperar 3 segundos
        }
    });
}

// Función para detectar el color rojo en los píxeles
function detectarRojo(pixels) {
    for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        if (r > 150 && g < 50 && b < 50) {
            return true; // Color rojo detectado
        }
    }
    return false;
}
