class Casilla{
    constructor(x, y, radioCasilla, ctx){
        this.x = x;
        this.y = y;
        this.ocupada = false;
        this.radioCasilla = radioCasilla;
        this.ctx = ctx;
        this.color = "rgba(255,255, 255, 0.5)";
    }

    ocupar(){
        this.ocupada = true;
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radioCasilla, 0, 2*Math.PI);
        if(!this.ocupada){
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
        }else{
            //resto 25 para q img se centre en ficha
            this.ctx.drawImage(this.color, this.x-25, this.y-25, this.radioCasilla*2, this.radioCasilla*2);//cuadro con fondo de tablero

        }
        this.ctx.stroke();

    }
}