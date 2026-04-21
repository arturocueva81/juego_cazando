let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");
 
let direccion = "abajo";
let intervaloMovimiento = null;

const imgFondo = new Image();
imgFondo.src = "img_cazando/fondo.png";

const imgGato = new Image();
imgGato.src = "img_cazando/cat_down.png";

const imgComida = new Image();
imgComida.src = "img_cazando/food_full.png";

const imgGatoArriba = new Image();
imgGatoArriba.src = "img_cazando/cat_up.png";

const imgGatoAbajo = new Image();
imgGatoAbajo.src = "img_cazando/cat_down.png";

const imgGatoIzquierda = new Image();
imgGatoIzquierda.src = "img_cazando/cat_left.png";

const imgGatoDerecha = new Image();
imgGatoDerecha.src = "img_cazando/cat_right.png";

let imgGatoActual = imgGatoAbajo;

const VELOCIDAD = 10;

let gatoX = 0;
let gatoY = 0;
const ANCHO_GATO = 60;
const ALTO_GATO = 60;

let comidaX = 50;
let comidaY = 50;
const ANCHO_COMIDA = 50;
const ALTO_COMIDA = 50;

let puntaje = 0;
let tiempo = 30;
let intervalo = null;

function limpiarCanva() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(imgFondo, 0, 0, canvas.width, canvas.height);
}

function graficarGato() {
  ctx.drawImage(imgGatoActual, gatoX, gatoY, ANCHO_GATO, ALTO_GATO);
}

function graficarComida() {
  ctx.drawImage(imgComida, comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA);
}

function iniciarJuego() {
  gatoX = canvas.width / 2 - ANCHO_GATO / 2;
  gatoY = canvas.height / 2 - ALTO_GATO / 2;

  comidaX = canvas.width - ANCHO_COMIDA - 10;
  comidaY = canvas.height - ALTO_COMIDA - 10;

  puntaje = 0;
  tiempo = 15;
  direccion = "abajo";
  imgGatoActual = imgGatoAbajo;

  mostrarEnSpan("spanPuntaje", puntaje);
  mostrarEnSpan("tiempo", tiempo);

  document.getElementById("imgGatoMensaje").src = "img_cazando/huella.png";
  document.getElementById("imgComidaMensaje").src = "img_cazando/huella.png";
  document.getElementById("textoMensaje").textContent = "¡A divertirnos!";
  document.getElementById("textoMensaje").style.color = "#f5c518";
  document.getElementById("btnIniciar").style.display = "none";
  limpiarCanva();
  graficarGato();
  graficarComida();
  iniciarMovimiento();
  iniciarTemporizador();
}

function mover() {
  if (direccion === "izquierda") {
    imgGatoActual = imgGatoIzquierda;
    if (gatoX > 0) gatoX -= VELOCIDAD;
  } else if (direccion === "derecha") {
    imgGatoActual = imgGatoDerecha;
    if (gatoX + ANCHO_GATO < canvas.width) gatoX += VELOCIDAD;
  } else if (direccion === "arriba") {
    imgGatoActual = imgGatoArriba;
    if (gatoY > 0) gatoY -= VELOCIDAD;
  } else if (direccion === "abajo") {
    imgGatoActual = imgGatoAbajo;
    if (gatoY + ALTO_GATO < canvas.height) gatoY += VELOCIDAD;
  }
  limpiarCanva();
  graficarGato();
  graficarComida();
  detectarColision();
}

function iniciarMovimiento() {
  clearInterval(intervaloMovimiento);
  intervaloMovimiento = setInterval(mover, 150);
}

document.getElementById("btnIniciar").onclick = () => iniciarJuego();

document.getElementById("btnArriba").onclick = () => {
  direccion = "arriba";
};
document.getElementById("btnAbajo").onclick = () => {
  direccion = "abajo";
};
document.getElementById("btnIzquierda").onclick = () => {
  direccion = "izquierda";
};
document.getElementById("btnDerecha").onclick = () => {
  direccion = "derecha";
};

function detectarColision() {
  let gatoDerechaX = gatoX + ANCHO_GATO;
  let gatoAbajoY = gatoY + ALTO_GATO;
  let comidaDerechaX = comidaX + ANCHO_COMIDA;
  let comidaAbajoY = comidaY + ALTO_COMIDA;

  if (
    gatoX < comidaDerechaX &&
    gatoDerechaX > comidaX &&
    gatoY < comidaAbajoY &&
    gatoAbajoY > comidaY
  ) {
    reubicarComida();
    puntaje = puntaje + 1;
    mostrarEnSpan("spanPuntaje", puntaje);

    if (puntaje === 6) {
      clearInterval(intervalo);
      clearInterval(intervaloMovimiento);
      mostrarMensaje("win");
      document.getElementById("btnIniciar").style.display = "block";
    }
  }
}

function reubicarComida() {
  comidaX = generarAleatorio(0, canvas.width - ANCHO_COMIDA);
  comidaY = generarAleatorio(0, canvas.height - ALTO_COMIDA);
}

function reducirTiempo() {
  tiempo = tiempo - 1;
  mostrarEnSpan("tiempo", tiempo);

  if (tiempo === 0) {
    clearInterval(intervalo);
    clearInterval(intervaloMovimiento);
    mostrarMensaje("lose");
    document.getElementById("btnIniciar").style.display = "block";
  }
}

function iniciarTemporizador() {
  clearInterval(intervalo);
  intervalo = setInterval(reducirTiempo, 1000);
}

function reiniciarJuego() {
  clearInterval(intervaloMovimiento);

  puntaje = 0;
  tiempo = 15;
  direccion = "abajo";
  imgGatoActual = imgGatoAbajo;

  gatoX = canvas.width / 2 - ANCHO_GATO / 2;
  gatoY = canvas.height / 2 - ALTO_GATO / 2;

  comidaX = canvas.width - ANCHO_COMIDA - 10;
  comidaY = canvas.height - ALTO_COMIDA - 10;

  mostrarEnSpan("spanPuntaje", puntaje);
  mostrarEnSpan("tiempo", tiempo);

  document.getElementById("imgGatoMensaje").src = "img_cazando/huella.png";
  document.getElementById("imgComidaMensaje").src = "img_cazando/huella.png";
  document.getElementById("textoMensaje").textContent = "¡A divertirnos!";
  document.getElementById("textoMensaje").style.color = "#f5c518";
  limpiarCanva();
  graficarGato();
  graficarComida();
  iniciarMovimiento();
  iniciarTemporizador();
}

function mostrarMensaje(tipo) {
  const textoMsg = document.getElementById("textoMensaje");
  const imgGatoMsg = document.getElementById("imgGatoMensaje");
  const imgComidaMsg = document.getElementById("imgComidaMensaje");

  document.getElementById("btnIniciar").style.display = "block";

  if (tipo === "win") {
    textoMsg.textContent = "¡¡YOU WIN!!. Puntaje: " + puntaje;
    textoMsg.style.color = "#27ae60";
    imgGatoMsg.src = "img_cazando/cat_WIN.png";
    imgComidaMsg.src = "img_cazando/food_empty.png";
  } else {
    textoMsg.textContent = "GAME OVER. Puntaje: " + puntaje;
    textoMsg.style.color = "#e05c4b";
    imgGatoMsg.src = "img_cazando/cat_LOSE.png";
    imgComidaMsg.src = "img_cazando/food_full.png";
  }
}

document.getElementById("btnReiniciar").onclick = () => reiniciarJuego();
