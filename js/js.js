"use strict";



// HAMBURGUESA--------------------

let burger = document.querySelectorAll(".burger")[0];
burger.addEventListener('click', showNav);

//gira burger y muestra nav
function showNav() {
    let nav = document.querySelectorAll("nav")[0];
    nav.classList.toggle('hiddenClass');
    burger.classList.toggle('flip');
}
//------------------------------------


//CARROUSEL--------------------------


//botones de lft
let lftBtn_Carrousel_ARR = document.querySelectorAll('.atras');
let rgtBtn_Carrousel_ARR = document.querySelectorAll('.adelante');

lftBtn_Carrousel_ARR.forEach(e => {
    e.addEventListener('click', function(event){
        let game = event.currentTarget;
        let carrousel = game.parentNode.querySelectorAll('.carrousel')[0];
        console.log(carrousel);
        let XYmove = 790;//lanzamiento-carrousel
        if(carrousel.classList.contains("carrousel-home"))
            (window.getComputedStyle(game).getPropertyValue('height') == "300px") ? XYmove = 250 : XYmove = 130;//si es mob-first se mueve menos el carrousel
        if(carrousel.style.left=="")
            carrousel.style.left=0;
        carrousel.style.left= parseFloat(carrousel.style.left) + XYmove +"px";
        //si se pasa q vuelva a left 0 
        if(parseFloat(carrousel.style.left)>=0){
            carrousel.style.left= 0 + "px";
        }
    });
});

rgtBtn_Carrousel_ARR.forEach(e => {
    e.addEventListener('click', function(event){
        let game = event.currentTarget;
        let carrousel = game.parentNode.querySelectorAll('.carrousel')[0];
        console.log(carrousel);
        let XYmove = 750;        
        if(carrousel.classList.contains("carrousel-home"))//DISTINTO PARA CARROUSEL DE LANZAMIENTO Y HOME
        (window.getComputedStyle(game).getPropertyValue('height') == "300px") ? XYmove = 250 : XYmove = 130;
           
        if(carrousel.style.left=="")
            carrousel.style.left=0;

        if((parseFloat(carrousel.style.left)<=-750 && XYmove==250) || (parseFloat(carrousel.style.left)<=-520 && XYmove==130) || (parseFloat(carrousel.style.left)<=-1500 && XYmove==750))
            return;
        carrousel.style.left = parseFloat(carrousel.style.left) - XYmove + "px";
    });
});
//-----------------------------------


// LOADING 

let home_btn = document.querySelectorAll('.logo')[0];
home_btn.addEventListener('click', function(e){
    location.href="loading.html";
   
})

let btn_style_lanzamiento = document.querySelectorAll(".btn-style-lanzamiento")[0];
btn_style_lanzamiento.addEventListener('click', function(e){
    location.href="lanzamiento.html";
   
})