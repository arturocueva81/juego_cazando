// ============================================================
// REFERENCIAS AL HTML
// Se obtienen el canvas donde se dibuja el juego y su contexto
// 2D, que permite usar las funciones de dibujo.
// ============================================================
let canvas = document.getElementById('areaJuego');
let ctx = canvas.getContext('2d');

// ============================================================
// CONSTANTES Y VARIABLES DEL JUEGO
// VELOCIDAD: píxeles que se mueve el gato por clic (definida
//            pero el movimiento está fijo en 10px).
// gatoX/gatoY: posición actual del gato en el canvas.
// comidaX/comidaY: posición actual de la comida (cambia al
//                  ser atrapada por el gato).
// ANCHO/ALTO: dimensiones en píxeles de cada personaje.
// puntaje: cantidad de veces que el gato atrapó la comida.
// tiempo: segundos restantes del contador regresivo.
// intervalo: referencia al setInterval del temporizador,
//            necesaria para poder detenerlo con clearInterval.
// ============================================================
const VELOCIDAD = 50;

let gatoX = 0;
let gatoY = 0;
const ANCHO_GATO = 50;
const ALTO_GATO = 50;

let comidaX = 50;
let comidaY = 50;
const ANCHO_COMIDA = 30;
const ALTO_COMIDA = 30;

let puntaje = 0;
let tiempo = 10;
let intervalo = null;  // se inicia en null para evitar intervalos duplicados

// ============================================================
// FUNCIÓN graficarRectangulo()
// Función genérica que dibuja un rectángulo en el canvas.
// Recibe posición (x, y), tamaño (ancho, alto) y color.
// Es la base que usan graficarGato() y graficarComida().
// ============================================================
function graficarRectangulo(x, y, ancho, alto, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, ancho, alto);
}

// ============================================================
// FUNCIONES graficarGato() y graficarComida()
// Llaman a graficarRectangulo() con los valores específicos de
// cada personaje. El gato es naranja y la comida es verde.
// ============================================================
function graficarGato() {
    graficarRectangulo(gatoX, gatoY, ANCHO_GATO, ALTO_GATO, 'orange');
}

function graficarComida() {
    graficarRectangulo(comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA, 'green');
}

// ============================================================
// FUNCIÓN iniciarJuego()
// Llamada desde el onload del HTML. Coloca al gato en el
// centro del canvas y la comida en la esquina inferior derecha.
// Reinicia puntaje y tiempo, actualiza los spans en pantalla,
// dibuja los personajes y arranca el temporizador.
// ============================================================
function iniciarJuego() {
    gatoX = (canvas.width / 2) - (ANCHO_GATO / 2);
    gatoY = (canvas.height / 2) - (ALTO_GATO / 2);

    comidaX = canvas.width - ANCHO_COMIDA;
    comidaY = canvas.height - ALTO_COMIDA;

    puntaje = 0;
    tiempo = 10;

    mostrarEnSpan("spanPuntaje", puntaje);
    mostrarEnSpan("tiempo", tiempo);

    limpiarCanva();
    graficarGato();
    graficarComida();

    iniciarTemporizador();
}

// ============================================================
// FUNCIÓN limpiarCanva()
// Borra todo el contenido del canvas antes de redibujar.
// Se llama en cada movimiento para evitar que el gato
// deje rastro al desplazarse.
// ============================================================
function limpiarCanva() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ============================================================
// FUNCIONES DE MOVIMIENTO
// Cada función mueve al gato 10px en su dirección.
// Primero verifica que el gato no esté en el borde para que
// no se salga del canvas. Luego limpia, redibuja ambos
// personajes y verifica si hubo colisión con la comida.
// ============================================================
function moverIzquierda() {
    if (gatoX > 0) {
        gatoX -= 10;
    }
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}

function moverDerecha() {
    if (gatoX + ANCHO_GATO < canvas.width) {
        gatoX += 10;
    }
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}

function moverArriba() {
    if (gatoY > 0) {
        gatoY -= 10;
    }
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}

function moverAbajo() {
    if (gatoY + ALTO_GATO < canvas.height) {
        gatoY += 10;
    }
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}

// ============================================================
// EVENTOS DE LOS BOTONES
// Cada botón llama a su función de movimiento correspondiente
// usando arrow functions como manejadores de evento onclick.
// ============================================================
document.getElementById("btnArriba").onclick    = () => moverArriba();
document.getElementById("btnAbajo").onclick     = () => moverAbajo();
document.getElementById("btnIzquierda").onclick = () => moverIzquierda();
document.getElementById("btnDerecha").onclick   = () => moverDerecha();

// ============================================================
// FUNCIÓN detectarColision()
// Calcula los 4 bordes del gato y de la comida, luego verifica
// si los rectángulos se solapan en X e Y simultáneamente
// (técnica AABB). Si hay colisión:
//   - Reubica la comida en posición aleatoria con reubicarComida().
//   - Incrementa el puntaje en 1 y lo muestra en pantalla.
//   - Si el puntaje llega a 6: detiene el temporizador,
//     muestra alert de victoria y reinicia el juego.
// ============================================================
function detectarColision() {
    let gatoDerechaX   = gatoX + ANCHO_GATO;
    let gatoAbajoY     = gatoY + ALTO_GATO;
    let comidaDerechaX = comidaX + ANCHO_COMIDA;
    let comidaAbajoY   = comidaY + ALTO_COMIDA;

    if (gatoX < comidaDerechaX &&
        gatoDerechaX > comidaX &&
        gatoY < comidaAbajoY   &&
        gatoAbajoY > comidaY) {

        reubicarComida();
        puntaje = puntaje + 1;
        mostrarEnSpan("spanPuntaje", puntaje);

        if (puntaje === 6) {
            clearInterval(intervalo);
            alert("YOU WIN!!!, Puntaje: " + puntaje);
            reiniciarJuego();
        }
    }
}

// ============================================================
// FUNCIÓN reubicarComida()
// Genera una nueva posición aleatoria para la comida usando
// generarAleatorio() de utils.js. El rango asegura que la
// comida siempre quede completamente dentro del canvas.
// ============================================================
function reubicarComida() {
    comidaX = generarAleatorio(0, canvas.width  - ANCHO_COMIDA);
    comidaY = generarAleatorio(0, canvas.height - ALTO_COMIDA);
}

// ============================================================
// FUNCIÓN reducirTiempo()
// Ejecutada por setInterval cada 1 segundo. Resta 1 al tiempo
// y actualiza el span en pantalla. Si el tiempo llega a 0:
// detiene el temporizador, muestra alert de Game Over
// y reinicia el juego automáticamente.
// ============================================================
function reducirTiempo() {
    tiempo = tiempo - 1;
    mostrarEnSpan("tiempo", tiempo);

    if (tiempo === 0) {
        clearInterval(intervalo);
        alert("¡GAME OVER!, PUNTAJE: " + puntaje);
        reiniciarJuego();
    }
}

// ============================================================
// FUNCIÓN iniciarTemporizador()
// Detiene cualquier intervalo activo antes de crear uno nuevo,
// evitando que se acumulen múltiples contadores simultáneos.
// Guarda la referencia en 'intervalo' para poder detenerlo.
// ============================================================
function iniciarTemporizador() {
    clearInterval(intervalo);
    intervalo = setInterval(reducirTiempo, 1000);
}

// ============================================================
// FUNCIÓN reiniciarJuego()
// Detiene el temporizador activo, restablece todas las
// variables a sus valores iniciales, actualiza los spans
// en pantalla, redibuja el canvas y arranca un nuevo
// temporizador limpio mediante iniciarTemporizador().
// ============================================================
function reiniciarJuego() {
    clearInterval(intervalo);

    puntaje = 0;
    tiempo  = 10;

    gatoX = (canvas.width  / 2) - (ANCHO_GATO  / 2);
    gatoY = (canvas.height / 2) - (ALTO_GATO   / 2);

    comidaX = canvas.width  - ANCHO_COMIDA;
    comidaY = canvas.height - ALTO_COMIDA;

    mostrarEnSpan("spanPuntaje", puntaje);
    mostrarEnSpan("tiempo", tiempo);

    limpiarCanva();
    graficarGato();
    graficarComida();

    iniciarTemporizador();
}

// Evento del botón reiniciar
document.getElementById("btnReiniciar").onclick = () => reiniciarJuego();