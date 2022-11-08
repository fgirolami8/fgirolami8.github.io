document.addEventListener("DOMContentLoaded", function(){

//COLUMNAS SON LAS DEL EJE Y ------------

let  cvs = document.getElementById("canvas");
let  ctx = cvs.getContext("2d");
ctx.lineWidth = "3";
// let form = document.getElementById("form");
let start = document.getElementById("start");
let timer = document.getElementById("timer");

//TABLERO -----------------
let radioCasilla = 25;
let tableroWidth = 500;
let tableroHeight = 500;
let tableroLeftPosition = cvs.width/2-tableroWidth/2;//lo centro
let fondo = new Image();
fondo.src = "img/fondo 4linea.jpg";
let tablero;
let timerInterval = null;
let seOcupoCasilla = false;

//JUGADORES
let cantFicha = 20;
let posInicialP2 = tableroLeftPosition + tableroWidth + tableroLeftPosition/2;
let p1, p2, jugadorEnTurno, hayGanador;

//FICHAS -------------------
mouseIsDown = false;
selectedFicha = null;//ficha q estoy seleccionando con el mouse

// let imgFicha = new Image();
// imgFicha.src = "poker.png";
// let imgFicha2 = new Image();
// imgFicha2.src = "hearth.png";

//ELEGIR FICHA------
let fichasP1 = document.querySelector('#fichas1').children;
let fichasP2 = document.querySelector('#fichas2').children;
let fichaSelectedP1 = fichasP1[0];
let fichaSelectedP2 = fichasP2[0];

seleccionFichas();//agrego los eventos a las fichas disponibles para poder seleccionarlas

function seleccionFichas(){
    for (let i = 0; i < fichasP1.length; i++) {
        fichasP1[i].addEventListener('click', function(){
            fichaSelectedP1 = fichasP1[i];
        });
        fichasP2[i].addEventListener('click', function(){
            fichaSelectedP2 = fichasP2[i];
        });
    }
}


//OPCIONES- --------
let largoLineaOption = document.querySelector('#largoLinea');//select del largo de linea ganadora
let largoLinea;// LARGO DE LINEA 4, 5, 6, 7, ... ------------
// console.log(document.querySelector('#largoLinea').selectedOption);
start.addEventListener('click', startGame);

// para que se muestre antes de empezar juego
tablero = new Tablero(tableroLeftPosition, 0, tableroWidth, tableroHeight, 10, ctx, fondo, radioCasilla, cvs, largoLinea);
tablero.draw();

//FUNCIONES --------------

//agrego eventos del mouse, dibujo tablero, fichas de jugadores y empiezo timer
function startGame(){
    cvs.addEventListener('mousemove', moverFicha);
    cvs.addEventListener('mouseup', soltarFicha);
    cvs.addEventListener('mousedown', tomarFicha);
    //obtengo valor de option selected
    largoLinea = largoLineaOption.options[largoLineaOption.selectedIndex].value;
    console.log(largoLinea);
    hayGanador = false;
    tablero = new Tablero(tableroLeftPosition, 0, tableroWidth, tableroHeight, 10, ctx, fondo, radioCasilla, cvs, largoLinea);
    tablero.draw();
    p1 = new Jugador(cantFicha, fichaSelectedP1, tableroLeftPosition/2, radioCasilla, ctx, "Jugador 1");
    p2 = new Jugador(cantFicha, fichaSelectedP2, posInicialP2, radioCasilla, ctx, "Jugador 2");
    p1.drawFichas();
    p2.drawFichas();
    jugadorEnTurno = p1; //para manejar al jugador que tenga el turno
    startTimer();
    jugadorEnTurno.drawTurno();
}

function startTimer(){
    //para q si lo vuelvo a llamar no duplique el interval
    if(timerInterval != null) clearInterval(timerInterval);
    let min = 1;
    let sec = 59;
    timerInterval = setInterval(() => {
        timer.innerHTML = min + ":" + sec;
        if(sec == 0){
            if(min == 0){ 
                //se acabo el tiempo
                alert("se acabo el tiempo");
                clearInterval(timerInterval);
                endGame();
             } 
            min--;
            sec = 59; 
        }
        else sec--;
    }, 1000);
}

//si el mouse se posa en ficha la "toma" y saca del arreglo de fichas del jugador
function tomarFicha(e) {
    if (jugadorEnTurno.fichaDisponible.isPointerInside(e.offsetX, e.offsetY)){
        mouseIsDown = true;
        selectedFicha = jugadorEnTurno.fichaDisponible;
        //saco ultima ficha del arreglo cuando la tomo 
        jugadorEnTurno.fichas.pop();
    }
}

//igualo la posicion del mouse con la posicion de la ficha seleccionada en tiempo real
function moverFicha(e) {

    // console.log(selectedFicha)
        if(!mouseIsDown || selectedFicha == null) return;
        //cada movimiento del mouse refresca el tablero
        tablero.draw();
        p1.drawFichas();
        p2.drawFichas();
        jugadorEnTurno.drawTurno();
        ctx.beginPath();
        //pos de mouse igual a pos de ficha
        selectedFicha.x = e.offsetX;
        selectedFicha.y = e.offsetY;
        //redibujo ficha con nueva pos
        selectedFicha.draw();
}

//cuando se suelta la ficha seleccionada verifico si esta dentro del tablero para agregarla a alguna casilla
function soltarFicha(e) {
    mouseIsDown=false;
    if(selectedFicha == null) return;
    for (let i = 0; i < tablero.casillas.length; i++) {
        if(//q este el mouse en el tablero y no mas abajo
            (selectedFicha.y < tableroHeight)  &&
            //con valor absoluto xq para la primera fila puede dar negativo 
            Math.abs(selectedFicha.x - tablero.casillas[i][0].x) < radioCasilla){
            //ubico la ficha en fila i y en la columna mas baja disponible
            // console.log( tablero.casillas[i][0]);
                hayGanador = tablero.ocuparCasilla(i, jugadorEnTurno.colorFicha);
                seOcupoCasilla = true;
                
        }
    } 
    //si se selecciono una ficha y no se ocupo casilla, la devuelvo a arreglo del player
    if (!seOcupoCasilla)
        jugadorEnTurno.fichas.push(selectedFicha);
    else if(!hayGanador)//para q me diga el ganador de el ultimo q puso la ficha
        jugadorEnTurno = (jugadorEnTurno == p1) ? p2: p1;
    seOcupoCasilla = false;//reinicio
    tablero.draw();
    p1.drawFichas();
    p2.drawFichas();
    selectedFicha = null;
    jugadorEnTurno.drawTurno();
    //verificar si alguien gano asi termino el juego
    if(hayGanador){
        setTimeout(() => {//time out para q llegue a imprimir la ficha ya insertada antes de mostrar alert
        alert("Ha ganado " + jugadorEnTurno.nombre);
        endGame();
        return;
        }, 5);
        
    }else{
        if(noQuedanFichas()){
            alert("no quedan fichas :(");
            endGame();
        }
        
    }

}
//verifico q los jugadores se quedan sin fichas
function noQuedanFichas() {
    return p1.fichas.length == 0 && p2.fichas.length == 0;
}




//finalizar juego cierro eventos de mouse y paro timer
function endGame(){
    cvs.removeEventListener('mousemove', moverFicha);
    cvs.removeEventListener('mouseup', soltarFicha);
    cvs.removeEventListener('mousedown', tomarFicha);
    clearInterval(timerInterval);
}




});