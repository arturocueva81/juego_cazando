let canvas = document.getElementById('juego');
let ctx = canvas.getContext('2d');
let btnArriba = document.getElementById('btnArriba');
let btnAbajo = document.getElementById('btnAbajo');
let btnIzquierda = document.getElementById('btnIzquierda');
let btnDerecha = document.getElementById('btnDerecha');

const VELOCIDAD=50;

let gatoY=0;
const ANCHO_GATO=50;
const ALTURA_GATO=50;

let ratonX=50;
let ratonY=50;
const ANCHO_RATON=30;
const ALTURA_RATON=30;


function graficar(x,y,ancho,alto,color){
 ctx.fillStyle=color;
 ctx.fillRect(x,y,ancho,alto);   
}

function graficarGato(){
    graficar(gatoX,gatoY,ANCHO_GATO,ALTURA_GATO,'orange');
}

function graficarRaton(){
    graficar(ratonX,ratonY,ANCHO_RATON,ALTURA_RATON,'gray');
}

function iniciarJuego(){
 
    gatoX = (canvas.width / 2) - (ANCHO_GATO / 2);    
    gatoY = (canvas.height / 2) - (ALTURA_GATO / 2);   

 
    graficarGato();
    graficarRaton();
 
}

function mover(direccion){
    if (direccion === "arriba") 
        gatoY -= VELOCIDAD;     
    if (direccion === "abajo") 
        gatoY += VELOCIDAD;    
    if (direccion === "izquierda") 
        gatoX -= VELOCIDAD;     
    if (direccion === "derecha") 
        gatoX += VELOCIDAD;

    graficarGato();
}

document.getElementById("btnArriba").onclick = () => mover("arriba");
document.getElementById("btnAbajo").onclick = () => mover("abajo");
document.getElementById("btnIzquierda").onclick = () => mover("izquierda");
document.getElementById("btnDerecha").onclick = () => mover("derecha");

window.onload = iniciarJuego();