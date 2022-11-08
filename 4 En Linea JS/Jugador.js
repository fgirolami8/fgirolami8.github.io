class Jugador{

    constructor(cantFichas, colorFicha, posX, radioFicha, ctx, n){
        this.nombre = n;
        this.fichas = new Array(cantFichas);
        this.colorFicha = colorFicha;
        this.turno = false;
        this.fichasPosX = posX;
        this.radioFicha = radioFicha;
        this.ctx = ctx;
        this.fichaDisponible = null;//la q se selecciona en el turno
    }

    //dibujo un indicador de que el jugador tiene el turno
    drawTurno(){
        this.ctx.beginPath();
        this.ctx.fillStyle = "#fff";
        this.ctx.arc(this.fichasPosX, 450, 30, 0, 2*Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
    }


    drawFichas(){
        for(let i = 0; i < this.fichas.length; i++){
            this.fichas[i] = new Ficha(this.fichasPosX, (i*10) + 50, this.radioFicha, this.ctx, this.colorFicha);
            this.fichas[i].draw();
        }
        this.fichaDisponible = this.fichas[this.fichas.length-1];
    }
}