// Datos del juego
const frutas = ['manzanas', 'peras', 'bananas'];
const images = {
    manzanas: 'img/manzana.png',
    peras: 'img/pera.png',
    bananas: 'img/banana.png'
};



let frutasMostradas = [];
let opcionesMostradas = false;

let puntaje = 0;
let cuadranteSeleccionado = null;
let frutaPreguntaActual = null;
let cantidadFrutaPreguntaActual = 0;
let opcionesGeneradas = [];
let opcionCorrecta = null;



// Elementos HTML
const startModal = document.getElementById('startModal');
const resultados= document.getElementById('resultados');
const puntajeHTML=document.getElementById('puntaje');
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
const difficultyModal = document.getElementById('difficultyModal');
const easyBtn = document.getElementById('easyBtn');
const mediumBtn = document.getElementById('mediumBtn');
const hardBtn = document.getElementById('hardBtn');


let puntajeInput = document.getElementById("puntajeInput").value;
let dificultadInput = document.getElementById("dificultadInput").value;

let dificultad;

// Iniciar el juego
startBtn.addEventListener('click', () => {
    startModal.style.display = 'none';
    
    difficultyModal.style.display = 'block';
});

easyBtn.addEventListener('click', () => {

    frutas.push(); // No se añaden frutas extra
    difficultyModal.style.display = 'none';
    gameContainer.style.display = 'block';
    dificultad='facil';
    console.log(dificultad);
    dificultadInput.value=dificultad;
    iniciarJuego(dificultad);
    iniciarCamara();

});

mediumBtn.addEventListener('click', () => {
    frutas.push('naranjas');
    images['naranjas'] = 'img/naranja.png';
    difficultyModal.style.display = 'none';
    gameContainer.style.display = 'block';
    dificultad='media';
    dificultadInput.value=dificultad;

    iniciarJuego(dificultad);
    iniciarCamara();
});

hardBtn.addEventListener('click', () => {
    frutas.push('naranjas', 'sandias');
    images['naranjas'] = 'img/naranja.png';
    images['sandias'] = 'img/sandia.png';
    difficultyModal.style.display = 'none';
    gameContainer.style.display = 'block';
    dificultad='dificil';
    dificultadInput.value=dificultad;

    iniciarJuego(dificultad);
    iniciarCamara();
});

// Función que inicia el juego
function iniciarJuego(dificultad) {
    
        mostrarFrutas(dificultad);
        setTimeout(mostrarPregunta, 5000);

   
}

// Función que muestra frutas al azar
function mostrarFrutas(dificultad) {
    let maxFrutas, minFrutas;
    
    // Establecer el mínimo y máximo según la dificultad
    switch (dificultad) {
        case 'facil':
            maxFrutas = 3;
            minFrutas = 1;  // Mínimo de 1 fruta
            break;
        case 'media':
            maxFrutas = 5;
            minFrutas = 3;  // Mínimo de 3 frutas
            break;
        case 'dificil':
            maxFrutas = 7;
            minFrutas = 6;  // Mínimo de 6 frutas
            break;
        default:
            maxFrutas = 5;
            minFrutas = 1;
    }

    console.log(dificultad);

    imagesContainer.innerHTML = '';
    
    // Asegurarse de que la cantidad de frutas esté entre el mínimo y el máximo
    const cantidadFrutas = Math.floor(Math.random() * (maxFrutas - minFrutas + 1)) + minFrutas;
    
    frutasMostradas = [];
    console.log(`Generando ${cantidadFrutas} frutas...`); 

    for (let i = 0; i < cantidadFrutas; i++) {
        const fruta = frutas[Math.floor(Math.random() * frutas.length)];
        frutasMostradas.push(fruta);
        const img = document.createElement('img');
        img.src = images[fruta];
        imagesContainer.appendChild(img);
    }

    console.log(`Frutas generadas (${cantidadFrutas}): ${frutasMostradas.join(', ')}`);
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

    // Activar detección
    opcionesMostradas = true;
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

let contador=0;
let puntajeFinal=0;
// Función para verificar la respuesta automáticamente
function verificarRespuestaAutomatica() {
    if (cuadranteSeleccionado === null) return;

    const indexOpcionCorrecta = opcionesGeneradas.indexOf(opcionCorrecta);
    const opcionCorrectaSeleccionada = optionsLetras[indexOpcionCorrecta];

    console.log(`Fruta seleccionada: ${frutaPreguntaActual}`);
    console.log(`Cantidad correcta: ${opcionCorrecta}`);
    console.log(`Opción seleccionada: ${cuadranteSeleccionado}`);
    console.log(`Opción correcta: ${opcionCorrectaSeleccionada}`);

    let imagenFeedback = document.getElementById("feedbackImagen");

    if (cuadranteSeleccionado === opcionCorrectaSeleccionada) {
        feedback.textContent = '¡Correcto!';
        puntaje += 100;

        // Mostrar imagen de ratón correcto
        imagenFeedback.innerHTML = `<img src="img/ratonBien.png" alt="Correcto" />`;
        imagenFeedback.style.display = 'block';

    } else {
        feedback.textContent = `Incorrecto, la respuesta correcta era ${opcionCorrectaSeleccionada}.`;
        puntaje -= 50;

        // Mostrar imagen de ratón incorrecto
        imagenFeedback.innerHTML = `<img src="img/ratonMal.png" alt="Incorrecto" />`;
        imagenFeedback.style.display = 'block';
    }

    puntajeDisplay.textContent = `Puntaje: ${puntaje}`;
    puntajeFinal = puntaje;
    opcionesMostradas = false; // Desactivar detección

    // Ocultar la imagen después de 2 segundos
    setTimeout(() => {
        imagenFeedback.style.display = 'none';
    }, 2000);

    if (contador <= 5) {
        contador++;

        setTimeout(() => {
            feedback.textContent = '';
            imagesContainer.innerHTML = '';
            questionContainer.innerHTML = '';
            optionsContainer.innerHTML = '';
    
            setTimeout(() => {
                mostrarFrutas(dificultad);
                setTimeout(mostrarPregunta, 5000);
            }, 1000);
        }, 2000);
    } else {
        puntajeHTML.textContent = `Puntaje: ${puntajeFinal}`;
        
        document.getElementById("puntajeInput").value = `${puntajeFinal}`;
        document.getElementById("dificultadInput").value = `${dificultad}`;
        console.log("Valores después de cambiar:");
        console.log(`puntajeInput.value: ${document.getElementById("puntajeInput").value}`);
        console.log(`dificultadInput.value: ${document.getElementById("dificultadInput").value}`);
      
        resultados.style.display = 'block';
    }
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
                video.style.top = '10%'; 
                video.style.right = '5%'; 
                video.style.width = `${videoWidth}px`;
                video.style.height = `${videoHeight}px`;
                video.style.zIndex = '-1'; 

                canvas.style.position = 'absolute';
                canvas.style.top = '10%';
                canvas.style.right = '5%';
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
    if (!opcionesMostradas || detectando || tiempoDeEspera) return;

    detectando = true;
    console.log("Detectando... no te muevas");

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const cuadrantes = {
        A: { x: 0, y: 0, width: canvas.width / 2, height: canvas.height / 2 },
        B: { x: canvas.width / 2, y: 0, width: canvas.width / 2, height: canvas.height / 2 },
        C: { x: 0, y: canvas.height / 2, width: canvas.width / 2, height: canvas.height / 2 },
        D: { x: canvas.width / 2, y: canvas.height / 2, width: canvas.width / 2, height: canvas.height / 2 }
    };

    let rojoDetectadoEnAlgúnCuadrante = false;

    Object.keys(cuadrantes).forEach(cuadrante => {
        const { x, y, width, height } = cuadrantes[cuadrante];
        const pixels = ctx.getImageData(x, y, width, height).data;
        const colorRojo = detectarRojo(pixels);

        if (colorRojo) {
            if (!rojoDetectadoEnAlgúnCuadrante) {
                console.log("Detectando... no te muevas");
                rojoDetectadoEnAlgúnCuadrante = true;
            }

            if (cuadrante !== ultimoCuadranteDetectado) {
                cuadranteSeleccionado = cuadrante;
                console.log(`Respuesta ${cuadrante} seleccionada`);

                ultimoCuadranteDetectado = cuadrante;
                verificarRespuestaAutomatica();

                tiempoDeEspera = true;
                setTimeout(() => {
                    tiempoDeEspera = false;
                    ultimoCuadranteDetectado = null;
                }, 3000);
            }
        }
    });

    if (!rojoDetectadoEnAlgúnCuadrante && colorRojoDetectado) {
        console.log("Se detuvo el movimiento, prepárate para detectar nuevamente.");
        colorRojoDetectado = false;
    } else if (rojoDetectadoEnAlgúnCuadrante) {
        colorRojoDetectado = true;
    }

    setTimeout(() => {
        detectando = false;
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


function loadSettings() {
    const fontSize = parseInt(localStorage.getItem("fontSize")) || 16;
    const scale = parseFloat(localStorage.getItem("scale")) || 1.0;
    const sound = localStorage.getItem("soundEnabled") === "true";
  
    document.body.style.fontSize = `${fontSize}px`;
    document.documentElement.style.fontSize = `${fontSize}px`;
    document.body.style.transform = `scale(${scale})`;
    document.body.style.transformOrigin = "top left";
    soundEnabled = sound;

    document.documentElement.style.setProperty('--current-scale', scale);
  
    // Actualizar controles
    document.getElementById("fontSizeDisplay").textContent = fontSize;
    document.getElementById("scaleDisplay").textContent = scale.toFixed(1);
  }

  loadSettings();
