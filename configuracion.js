let soundEnabled = true;

// Actualizar y mostrar tamaño de texto
function updateFontSize(change) {
    let fontSize = parseInt(localStorage.getItem("fontSize")) || 16;
    fontSize = Math.min(22, Math.max(12, fontSize + change)); // Limitar entre 12 y 24 px
    
    // Cambiar el tamaño de fuente de todos los elementos después del body

    document.body.style.fontSize = `${fontSize}px`;
    document.documentElement.style.fontSize = `${fontSize}px`;
  
    document.getElementById("fontSizeDisplay").textContent = fontSize;
    saveSettings("fontSize", fontSize);
  }
  

// Actualizar y mostrar escala
function updateScale(change) {
  let scale = parseFloat(localStorage.getItem("scale")) || 1.0;
  scale = Math.min(1.5, Math.max(1, scale + change)); // Limitar entre 0.5 y 2.0
  document.body.style.transform = `scale(${scale})`;
  document.body.style.transformOrigin = "top left";
  document.getElementById("scaleDisplay").textContent = scale.toFixed(1);
  saveSettings("scale", scale);
}

// Activar o desactivar sonidos
document.getElementById("toggleSoundBtn").addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  toggleSoundBtn.classList.toggle("active");
  toggleSoundBtn.querySelector(".toggle-text").textContent = soundEnabled
    ? "Desactivar Sonido"
    : "Activar Sonido";
  saveSettings("soundEnabled", soundEnabled);
});

// Guardar configuraciones en localStorage
function saveSettings(key, value) {
  localStorage.setItem(key, value);
}

// Cargar configuraciones al inicio
function loadSettings() {
  const fontSize = parseInt(localStorage.getItem("fontSize")) || 16;
  const scale = parseFloat(localStorage.getItem("scale")) || 1.0;
  const sound = localStorage.getItem("soundEnabled") === "true";

  document.body.style.fontSize = `${fontSize}px`;
  document.documentElement.style.fontSize = `${fontSize}px`;
  document.body.style.transform = `scale(${scale})`;
  document.body.style.transformOrigin = "top left";
  soundEnabled = sound;

  // Actualizar controles
  document.getElementById("fontSizeDisplay").textContent = fontSize;
  document.getElementById("scaleDisplay").textContent = scale.toFixed(1);
}

// Agregar eventos a los botones
document
  .getElementById("increaseFont")
  .addEventListener("click", () => updateFontSize(1));
document
  .getElementById("decreaseFont")
  .addEventListener("click", () => updateFontSize(-1));
document
  .getElementById("increaseScale")
  .addEventListener("click", () => updateScale(0.1));
document
  .getElementById("decreaseScale")
  .addEventListener("click", () => updateScale(-0.1));

// Cargar configuraciones cuando la página esté lista
window.addEventListener("DOMContentLoaded", loadSettings);
window.addEventListener("DOMContentLoaded", loadSettings);
