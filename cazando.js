let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

const VELOCIDAD = 10;

let gatoX = 0;
let gatoY = 0;
const ANCHO_GATO = 60;
const ALTO_GATO  = 60;

let comidaX = 50;
let comidaY = 50;
const ANCHO_COMIDA = 50;
const ALTO_COMIDA  = 50;

let puntaje  = 0;
let tiempo   = 30;
let intervalo = null;

function limpiarCanva() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function graficarGato() {
  ctx.fillStyle = "orange";
  ctx.fillRect(gatoX, gatoY, ANCHO_GATO, ALTO_GATO);
}

function graficarComida() {
  ctx.fillStyle = "green";
  ctx.fillRect(comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA);
}

function iniciarJuego() {
  gatoX = canvas.width  / 2 - ANCHO_GATO  / 2;
  gatoY = canvas.height / 2 - ALTO_GATO   / 2;

  comidaX = canvas.width  - ANCHO_COMIDA - 10;
  comidaY = canvas.height - ALTO_COMIDA  - 10;

  puntaje = 0;
  tiempo  = 30;

  mostrarEnSpan("spanPuntaje", puntaje);
  mostrarEnSpan("tiempo", tiempo);

  ocultarMensaje();
  limpiarCanva();
  graficarGato();
  graficarComida();

  iniciarTemporizador();
}

function moverIzquierda() {
  if (gatoX > 0) gatoX -= VELOCIDAD;
  limpiarCanva();
  graficarGato();
  graficarComida();
  detectarColision();
}

function moverDerecha() {
  if (gatoX + ANCHO_GATO < canvas.width) gatoX += VELOCIDAD;
  limpiarCanva();
  graficarGato();
  graficarComida();
  detectarColision();
}

function moverArriba() {
  if (gatoY > 0) gatoY -= VELOCIDAD;
  limpiarCanva();
  graficarGato();
  graficarComida();
  detectarColision();
}

function moverAbajo() {
  if (gatoY + ALTO_GATO < canvas.height) gatoY += VELOCIDAD;
  limpiarCanva();
  graficarGato();
  graficarComida();
  detectarColision();
}

document.getElementById("btnArriba").onclick    = () => moverArriba();
document.getElementById("btnAbajo").onclick     = () => moverAbajo();
document.getElementById("btnIzquierda").onclick = () => moverIzquierda();
document.getElementById("btnDerecha").onclick   = () => moverDerecha();

function detectarColision() {
  let gatoDerechaX   = gatoX + ANCHO_GATO;
  let gatoAbajoY     = gatoY + ALTO_GATO;
  let comidaDerechaX = comidaX + ANCHO_COMIDA;
  let comidaAbajoY   = comidaY + ALTO_COMIDA;

  if (gatoX < comidaDerechaX && gatoDerechaX > comidaX && gatoY < comidaAbajoY  && gatoAbajoY > comidaY) 
  {
    reubicarComida();
    puntaje = puntaje + 1;
    mostrarEnSpan("spanPuntaje", puntaje);

    if (puntaje === 6) {
      clearInterval(intervalo);
      mostrarMensaje("win");
    }
  }
}

function reubicarComida() {
  comidaX = generarAleatorio(0, canvas.width  - ANCHO_COMIDA);
  comidaY = generarAleatorio(0, canvas.height - ALTO_COMIDA);
}

function reducirTiempo() {
  tiempo = tiempo - 1;
  mostrarEnSpan("tiempo", tiempo);

  if (tiempo === 0) {
    clearInterval(intervalo);
    mostrarMensaje("lose");
  }
}

function iniciarTemporizador() {
  clearInterval(intervalo);
  intervalo = setInterval(reducirTiempo, 1000);
}

function reiniciarJuego() {
  clearInterval(intervalo);

  puntaje = 0;
  tiempo  = 30;

  gatoX = canvas.width  / 2 - ANCHO_GATO  / 2;
  gatoY = canvas.height / 2 - ALTO_GATO   / 2;

  comidaX = canvas.width  - ANCHO_COMIDA - 10;
  comidaY = canvas.height - ALTO_COMIDA  - 10;

  mostrarEnSpan("spanPuntaje", puntaje);
  mostrarEnSpan("tiempo", tiempo);

  ocultarMensaje();
  limpiarCanva();
  graficarGato();
  graficarComida();
  iniciarTemporizador();
}

function mostrarMensaje(tipo) {
  const panel    = document.getElementById("panelMensaje");
  const textoMsg = document.getElementById("textoMensaje");

  if (tipo === "win") {
    textoMsg.textContent = "¡¡YOU WIN!!. Puntaje: " + puntaje;
    textoMsg.style.color = "black"
    ;
  } else {
    textoMsg.textContent = "GAME OVER. Puntaje: " + puntaje;
    textoMsg.style.color = "black";
  }

  panel.style.display = "block";
}

function ocultarMensaje() {
  document.getElementById("panelMensaje").style.display = "none";
}

document.getElementById("btnReiniciar").onclick = () => reiniciarJuego();