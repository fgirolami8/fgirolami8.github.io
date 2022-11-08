class Tablero{

    constructor(x, y, w, h, cantCasillas, ctx, fondo, radioCasilla, cvs, largoLinea){
        this.x = x;
        this.y = y;
        this.w = w;//width
        this.h = h;
        this.casillas = new Array(cantCasillas);
        this.ctx = ctx;
        this.fondo = fondo;
        this.radioCasilla = radioCasilla;
        this.cvs = cvs;
        this.largoLinea = largoLinea;
        this.addCasillas();
    }

    //agrego casillas a matriz del tablero
    addCasillas(){
        //para cada fila
        for (let i = 0; i < this.casillas.length; i++) {
            this.casillas[i] = new Array(this.casillas.length);
            //para c/col
            for (let j = 0; j < this.casillas[i].length; j++)
                this.casillas[i][j] = new Casilla(
                        i * 2 * this.radioCasilla + this.radioCasilla + this.x,
                        j * 2 * this.radioCasilla + this.radioCasilla + this.y, 
                        this.radioCasilla, this.ctx);
                    //+radioCasilla xq sino el centro del 1er circulo empieza en el top left de canvas xq i, j = 0
                    //*2 x diametro
        }
    }

    draw() {
        //limpio todo para que no queden residuos
        this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);

        this.ctx.beginPath();
        this.ctx.drawImage(this.fondo, this.x, this.y, this.w, this.h);//cuadro con fondo de tablero
        this.ctx.strokeRect(this.x, this.y, this.w, this.h);//borde

        //fondo de jugadores
        this.ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
        this.ctx.fillRect(0, this.y, this.x/*el anocho es hasta donde empieza tablero*/ , this.h);
        this.ctx.fillStyle = "rgba(0, 0, 255, 0.3)";
        this.ctx.fillRect(this.x + this.w, this.y, this.x/*el anocho es hasta donde empieza tablero*/ , this.h);
        this.ctx.stroke();
        // this.ctx.fillStyle = "#000";//reseteo

        this.drawCasillas();
        
    }
    
    //tablero tiene una matriz de objetos casilla
    drawCasillas(){
        for (let i = 0; i < this.casillas.length; i++) 
            for (let j = 0; j < this.casillas[i].length; j++) 
                this.casillas[i][j].draw();
    }

    //retorna la columna disponible (si la hay) de la fila en la q se solto la ficha
    getColumnaDisponible(fila){
        for (let cel = this.casillas[fila].length-1; cel>=0; cel--) {
            // console.log(cel);
            if(!this.casillas[fila][cel].ocupada)
             return cel;
        }
        return -1;
    }

    //ocupa la casilla si esta disponible y retorna true si se hizo un "x en linea"
    ocuparCasilla(fila, color){
        let cel = this.getColumnaDisponible(fila);
        if (cel == -1)
            return;
        this.casillas[fila][cel].color = color;
        this.casillas[fila][cel].ocupar();
        return this.formaLinea(fila, cel, color);
    }

    //para verificar que halla x fichas en linea me paro en la ficha agregada y cuento cuantas fichas del mismo color hay para ambos lados (en vertical solo verifico las de abajo, en horizontal las de izq y der y en diagonal lo mismo basicamente)

    //retorna true si se hizo "x en linea" horizontal, vertical o diagonalmente
    formaLinea(fila, col, color){
        return this.formaLineaHorizontal(fila, col, color) || this.formaLineaVertical(fila, col, color) || this.formaLineaDiagonal(fila, col, color);
    }

    formaLineaHorizontal(fila, col, color){
        let c = 0;
        //hacia derecha
        for(let i = fila; i < this.casillas.length; i++){
            // console.log(c);
            if(this.continuaLinea(i, col, color))
                c++;
            else 
                break;
        }
        //hacia izquierda
        for(let i = fila-1/* -1 para no contar de nuevo la ficha de partida*/; i >= 0; i--){
            // console.log(c);
            if(this.continuaLinea(i,col, color))
                c++;
            else 
                break;
        }
        return c == this.largoLinea;
    }

    formaLineaVertical(fila, col, color){
        let c = 0;
        for(let i = col; i < this.casillas[fila].length; i++){
            // console.log(c);
            if(this.continuaLinea(fila, i, color))
                c++;
            else 
                break;
        }
        return c == this.largoLinea;
    }

    formaLineaDiagonal(fila, col, color){

        // diagonal hacia abajo ( \ )---------------
        let c = 0;
        //hacia derecha
        for(let i = fila, j = col; i < this.casillas.length && j < this.casillas[0].length; i++, j++){
            // console.log(c);
            if(this.continuaLinea(i, j, color))
                c++;
            else 
                break;
        }
        //hacia izquierda
        for(let i = fila-1, j = col-1; i >= 0 && j >=0; i--, j--){
            // console.log(c);
            if(this.continuaLinea(i, j, color))
                c++;
            else 
                break;
        }
        if(c == this.largoLinea)
            return true;
            
        // diagonal hacia arriba ( / )---------------
        c = 0;//reinicio
        //hacia derecha
        for(let i = fila, j = col; i >= 0 && j < this.casillas[0].length; i--, j++){
            // console.log(c);
            if(this.continuaLinea(i, j, color, color))
                c++;
            else 
                break;
        }
        //hacia izquierda
        for(let i = fila+1, j = col-1; i < this.casillas.length && j >= 0; i++, j--){
            // console.log(c);
            if(this.continuaLinea(i, j, color))
                c++;
            else 
                break;
        }
        return c == this.largoLinea;
    }

    //verifico si la casilla adyacente tiene misma ficha que estoy siguiendo
    continuaLinea(i, j, color){
        return this.casillas[i][j].ocupada && this.casillas[i][j].color == color;
    }
}