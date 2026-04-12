let canvas = document.getElementById('areaJuego');
let ctx = canvas.getContext('2d');

const VELOCIDAD = 10;
let gatoX = 0;
let gatoY = 0;
const ANCHO_GATO = 50;
const ALTURA_GATO = 50;

let comidaX = 0;
let comidaY = 0;
const ANCHO_COMIDA = 20;
const ALTO_COMIDA = 20;

function graficar(x, y, ancho, alto, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, ancho, alto);
}

function graficarGato() {
    graficar(gatoX, gatoY, ANCHO_GATO, ALTURA_GATO, 'orange');
}

function graficarComida() {
    graficar(comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA, 'green');
}

function limpiarCanva() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function detectarColision() {
    if (
        gatoX < comidaX + ANCHO_COMIDA &&
        gatoX + ANCHO_GATO > comidaX &&
        gatoY < comidaY + ALTO_COMIDA &&
        gatoY + ALTURA_GATO > comidaY
    ) {
        alert('¡El gato atrapó la comida!');
    }
}

function iniciarJuego() {
    gatoX = (canvas.width / 2) - (ANCHO_GATO / 2);
    gatoY = (canvas.height / 2) - (ALTURA_GATO / 2);

    comidaX = canvas.width - ANCHO_COMIDA;
    comidaY = canvas.height - ALTO_COMIDA;

    graficarGato();
    graficarComida();
}

function moverIzquierda() {
    gatoX -= 10;
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}

function moverDerecha() {
    gatoX += 10;
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}

function moverArriba() {
    gatoY -= 10;
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}

function moverAbajo() {
    gatoY += 10;
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}

document.getElementById("btnArriba").onclick = moverArriba;
document.getElementById("btnAbajo").onclick = moverAbajo;
document.getElementById("btnIzquierda").onclick = moverIzquierda;
document.getElementById("btnDerecha").onclick = moverDerecha;