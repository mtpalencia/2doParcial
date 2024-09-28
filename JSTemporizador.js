// Variables para el temporizador
let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;  // Estados 
let isPaused = false; 
let actionType = "";    // Variable para almacenar el tipo de acción: 'start', 'pause', 'reset'

// Función para dar formato al tiempo en h,m,s 
function timeToString(time) {
    let diffInHrs = Math.floor(time / 3600000);
    let diffInMin = Math.floor((time % 3600000) / 60000);
    let diffInSec = Math.floor((time % 60000) / 1000);

    let formattedHrs = diffInHrs.toString().padStart(2, "0");
    let formattedMin = diffInMin.toString().padStart(2, "0");
    let formattedSec = diffInSec.toString().padStart(2, "0");

    return `${formattedHrs}:${formattedMin}:${formattedSec}`;
}

// Función que actualiza el temporizador
function print(txt) {
    document.getElementById("timer-display").innerHTML = txt;
}

// Funciones Iniciar, Pausar y Reinciar
function startTimer() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(function() {
            elapsedTime = Date.now() - startTime;
            print(timeToString(elapsedTime));
        }, 1000);
        isRunning = true;
        isPaused = false;
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        isPaused = true;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    print("00:00:00");
    elapsedTime = 0;
    isRunning = false;
    isPaused = false;
}

// Evento para el botón de iniciar
document.getElementById("start-btn").addEventListener("click", function() {
    actionType = "start";  
    document.getElementById('password-input').value = ''; 
    $('#passwordModal').modal('show'); 
    document.getElementById('password-input').focus(); 
});

// Evento para el botón de pausar
document.getElementById("pause-btn").addEventListener("click", function() {
    actionType = "pause"; 
    document.getElementById('password-input').value = ''; 
    $('#passwordModal').modal('show'); 
    document.getElementById('password-input').focus(); 
});

// Evento para el botón de reiniciar
document.getElementById("reset-btn").addEventListener("click", function() {
    actionType = "reset";  
    document.getElementById('password-input').value = ''; 
    $('#passwordModal').modal('show'); 
    document.getElementById('password-input').focus(); 
});

// Evento para el botón de aceptar en el modal
document.getElementById("submit-password-btn").addEventListener("click", function() {
    const passwordInput = document.getElementById('password-input').value;
    const correctPassword = "1997"; 

    if (passwordInput === correctPassword) {
        $('#passwordModal').modal('hide'); // Cerrar el modal
        if (actionType === "start") {
            startTimer(); 
        } else if (actionType === "pause") {
            pauseTimer(); 
        } else if (actionType === "reset") {
            resetTimer(); 
        }
    } else {
        alert('Acceso no autorizado, por favor pague el tiempo que consumió!'); // Mensaje de error
    }
});

// Función para registrar intervalos
document.getElementById("log-interval-btn").addEventListener("click", function() {
    let interval = timeToString(elapsedTime);
    let listItem = document.createElement("li");
    listItem.textContent = interval;
    listItem.className = "list-group-item";
    document.getElementById("interval-list").appendChild(listItem);
});
