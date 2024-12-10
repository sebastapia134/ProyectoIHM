// Variable para almacenar el paso actual
let currentStep = 1;

// Función para actualizar el contenido de la ayuda
function updateHelpContent() {
  const ayudaBloque = document.getElementById('ayudaBloque');
  
  // Limpiar el contenido previo del bloque de ayuda
  ayudaBloque.style.display = 'block';
  ayudaBloque.innerHTML = '';
  const overlay = document.getElementById('overlay');
  overlay.style.display = 'block';
  const campoJugar = document.getElementById('jugar');
  const campoLogin = document.getElementById('login');
  const campoConfiguracion = document.getElementById('configuracion');
  const campoSalir = document.getElementById('salir');
  campoJugar.style.pointerEvents = 'none';
  campoConfiguracion.style.pointerEvents = 'none';
  campoLogin.style.pointerEvents = 'none';
  campoSalir.style.pointerEvents = 'none';

  let helpText = '';
  let buttonText = '';
  
  // Contenido según el paso actual
  if (currentStep === 1) {
    campoJugar.style.zIndex = 1000;
    
    helpText = 'Haz clic en el botón de "Jugar" para iniciar una nueva partida!';
    buttonText = 'Siguiente';
    ayudaBloque.style.transform= 'translate(-50%, 95%)'; /* Mueve el bloque hacia abajo un 20% de su altura */
  } else if (currentStep === 2) {
    campoJugar.style.zIndex = 999;
    campoLogin.style.zIndex = 1000;
    helpText = 'Con este botón puedes ingresar con tu cuenta o registrarte!';
    buttonText = 'Siguiente';
    ayudaBloque.style.transform= 'translate(-35%, -25%)';
  } else if(currentStep === 3){
    campoLogin.style.zIndex = 999;
    campoConfiguracion.style.zIndex = 1000;
    helpText = 'Ve a la configuración para ajustar los sonidos y el tamaño del texto!';
    buttonText = 'Siguiente';
    ayudaBloque.style.transform= 'translate(0%, 45%)';
  }
   else if (currentStep === 4) {
    campoConfiguracion.style.zIndex = 999;
    campoSalir.style.zIndex = 1000;
    helpText = 'Haz clic en el botón de "Salir" para salir del juego!';
    buttonText = 'Cerrar';
    ayudaBloque.style.transform= 'translate(0%, 225%)';
  }

  // Crear un nuevo elemento de texto
  const helpParagraph = document.createElement('p');
  helpParagraph.textContent = helpText;
  ayudaBloque.appendChild(helpParagraph);

  // Crear el botón para avanzar al siguiente paso
  const nextButton = document.createElement('button');
  nextButton.textContent = buttonText;
  nextButton.style.marginTop = '10px';
  nextButton.style.padding = '5px 10px';
  nextButton.style.backgroundColor = '#4CAF50';
  nextButton.style.color = 'white';
  nextButton.style.border = 'none';
  nextButton.style.cursor = 'pointer';
  
  // Evento del botón de avanzar
  nextButton.addEventListener('click', function() {
    if (currentStep < 4) {
      currentStep++;
      updateHelpContent(); // Actualiza el contenido con el siguiente paso
    } else {
      campoSalir.style.zIndex = 999;
      campoJugar.style.pointerEvents = 'all';
      campoConfiguracion.style.pointerEvents = 'all';
      campoLogin.style.pointerEvents = 'all';
      campoSalir.style.pointerEvents = 'all';
      closeHelp(); // Cierra la ayuda al llegar al último paso
    }
  });

  // Añadir el botón al bloque de ayuda
  ayudaBloque.appendChild(nextButton);
}

// Función para cerrar la ayuda
function closeHelp() {
    const ayudaBloque = document.getElementById('ayudaBloque');
    const overlay = document.getElementById('overlay');
    
    ayudaBloque.innerHTML = ''; // Limpiar el contenido del bloque de ayuda
    ayudaBloque.style.display = 'none'; // Ocultar el bloque de ayuda
    overlay.style.display = 'none'; // Ocultar el fondo oscuro
    currentStep = 1;
  }

