class Ficha{
    constructor(x, y, r, ctx, color){
        this.x = x;
        this.y = y;
        this.r = r;//radio
        this.ctx = ctx;
        this.color = color;
        
    }


    draw(){
        this.ctx.beginPath();
        this.ctx.arc(
            this.x, 
            this.y, 
            this.r,
            0, 
            2*Math.PI);
        this.ctx.drawImage(this.color, this.x-25, this.y-25, 50, 50);
        this.ctx.stroke();
    }

    isPointerInside(_x, _y){
            return Math.sqrt(
                    ((_x - this.x) * (_x - this.x)) + 
                    ((_y - this.y) * (_y - this.y))
                ) <= this.r
    }
}