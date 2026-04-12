let canvas = document.getElementById('areaJuego');
let ctx = canvas.getContext('2d');

const VELOCIDAD = 10;
let gatoX = 0;
let gatoY = 0;
const ANCHO_GATO = 50;
const ALTURA_GATO = 50;

let comidaX = 0;
let comidaY = 0;
const ANCHO_COMIDA = 30;
const ALTO_COMIDA = 30;

let puntos = 0;
let tiempo = 10;

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

function reposicionarComida() {
    comidaX = generarAleatorio(0, canvas.width - ANCHO_COMIDA);
    comidaY = generarAleatorio(0, canvas.height - ALTO_COMIDA);
}

function restarTiempo() {
    tiempo -= 1;
    mostrarEnSpan('tiempo', tiempo);
}

function detectarColision() {
    if (
        gatoX < comidaX + ANCHO_COMIDA &&
        gatoX + ANCHO_GATO > comidaX &&
        gatoY < comidaY + ALTO_COMIDA &&
        gatoY + ALTURA_GATO > comidaY
    ) {
        puntos += 1;
        mostrarEnSpan('puntos', puntos);
        reposicionarComida();
    }
}

function iniciarJuego() {
    gatoX = (canvas.width / 2) - (ANCHO_GATO / 2);
    gatoY = (canvas.height / 2) - (ALTURA_GATO / 2);

    comidaX = canvas.width - ANCHO_COMIDA;
    comidaY = canvas.height - ALTO_COMIDA;

    puntos = 0;
    tiempo = 10;
    mostrarEnSpan('puntos', puntos);
    mostrarEnSpan('tiempo', tiempo);

    setInterval(restarTiempo, 1000);

    graficarGato();
    graficarComida();
}

function moverIzquierda() {
    if (gatoX - VELOCIDAD >= 0)
        gatoX -= VELOCIDAD;
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}

function moverDerecha() {
    if (gatoX + ANCHO_GATO + VELOCIDAD <= canvas.width)
        gatoX += VELOCIDAD;
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}

function moverArriba() {
    if (gatoY - VELOCIDAD >= 0)
        gatoY -= VELOCIDAD;
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}

function moverAbajo() {
    if (gatoY + ALTURA_GATO + VELOCIDAD <= canvas.height)
        gatoY += VELOCIDAD;
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}

document.getElementById("btnArriba").onclick = moverArriba;
document.getElementById("btnAbajo").onclick = moverAbajo;
document.getElementById("btnIzquierda").onclick = moverIzquierda;
document.getElementById("btnDerecha").onclick = moverDerecha;