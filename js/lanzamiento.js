//  DESVANECER H1

//cuando se craga pag o el scroll esta en el hero aparece titulo

let h1 = document.querySelector(".heroH1");

document.addEventListener("DOMContentLoaded", function(){
    h1.classList.add("show-hero-h1");
})
window.addEventListener("scroll", show_h1);
//se muestra con scroll menor a 500
function show_h1(){
    if(window.scrollY<350){
        if(!h1.classList.contains("show-hero-h1")){
            h1.classList.add("show-hero-h1");
        }
    }
    else{
        if(h1.classList.contains("show-hero-h1")){
            h1.classList.remove("show-hero-h1");
        }
    }
}

// CARD DE LANZAMIENTO ANIMADA----------------
window.addEventListener("scroll", moverCards);

function moverCards(){
    //cuando el scroll llega a caracteristicas deshago la clase de card q las mantiene ocultas (con transition y scale)
    if(window.scrollY>500){
        let cards = document.querySelectorAll(".feature-card");
        for (let i = 0; i < cards.length; i++) {
                cards[i].classList.remove("ocultar-cards");
        }
    }
}

// carrousel

//botones de lft
let lft = document.querySelectorAll('.lft');
let rgt = document.querySelectorAll('.rgt');


lft.forEach(e => {
    e.addEventListener('click', function(event){  
        let game = event.currentTarget;
        let carrousel = game.parentNode.querySelectorAll('.carrousel')[0];
        move(750, parseFloat(carrousel.style.left)>=0, carrousel);
    })
})

rgt.forEach(e => {
    e.addEventListener('click', function(event){
        let game = event.currentTarget;
        let carrousel = game.parentNode.querySelectorAll('.carrousel')[0];
        move(-750, parseFloat(carrousel.style.left)<=-1500, carrousel);
    })
})
function move(move, limit, carrousel){
    if(carrousel.style.left=="")
        carrousel.style.left=0;
    if (limit)
        return;
    carrousel.style.left = parseFloat(carrousel.style.left) + move + "px";
}


// descripcion


window.addEventListener("scroll", function(){
    let descText1 = document.querySelector(".descText1");
    let descText2 = document.querySelector(".descText2");
    let descImg = document.querySelector(".img-desc1");
    if(window.scrollY>1900 && window.scrollY<2250){
        descImg.src = "css/img/desc1.jpg";
        if(!descText2.classList.contains("ocultarDesc"))
            descText2.classList.add("ocultarDesc");
        if(descText1.classList.contains("ocultarDesc"))
            descText1.classList.remove("ocultarDesc");

    }
    else if(window.scrollY>2250 && window.scrollY<2650){
        descImg.src = "css/img/desc2.jpg";
        
        if(!descText1.classList.contains("ocultarDesc"))
            descText1.classList.add("ocultarDesc");
        if(descText2.classList.contains("ocultarDesc"))
            descText2.classList.remove("ocultarDesc");
    }else{
        if(!descText2.classList.contains("ocultarDesc"))
            descText2.classList.add("ocultarDesc");
        if(!descText1.classList.contains("ocultarDesc"))
            descText1.classList.add("ocultarDesc");
    }
});