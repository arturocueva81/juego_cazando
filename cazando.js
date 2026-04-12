let canvas = document.getElementById('areaJuego');
let ctx = canvas.getContext('2d');
let btnArriba = document.getElementById('btnArriba');
let btnAbajo = document.getElementById('btnAbajo');
let btnIzquierda = document.getElementById('btnIzquierda');
let btnDerecha = document.getElementById('btnDerecha');

const VELOCIDAD=50;
let gatoX=0;
let gatoY=0;
const ANCHO_GATO=50;
const ALTURA_GATO=50;

let comidaX=50;
let comidaY=50;
const ANCHO_COMIDA=20;
const ALTO_COMIDA=20;

function graficar(x,y,ancho,alto,color){
 ctx.fillStyle=color;
 ctx.fillRect(x,y,ancho,alto);   
}

function graficarGato(){
    graficar(gatoX,gatoY,ANCHO_GATO,ALTURA_GATO,'orange');
}

function graficarComida(){
    graficar(comidaX,comidaY,ANCHO_COMIDA,ALTO_COMIDA,'green');
}

function iniciarJuego(){
 
    gatoX = (canvas.width / 2) - (ANCHO_GATO / 2);    
    gatoY = (canvas.height / 2) - (ALTURA_GATO / 2);   

 
    graficarGato();
    graficarComida();
 
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

//window.onload = iniciarJuego();
