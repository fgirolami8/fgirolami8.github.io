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

let lanzamientoHome = document.querySelectorAll(".home-lanzamiento")[0];
let timerImgLanzamientoHome = setInterval(() => {
    
}, 1);


//CARROUSEL--------------------------


//botones de lft
let lftBtn_Carrousel_ARR = document.querySelectorAll('.atras');
let rgtBtn_Carrousel_ARR = document.querySelectorAll('.adelante');

lftBtn_Carrousel_ARR.forEach(e => {
    e.addEventListener('click', function(event){
        let carrousel = event.currentTarget.parentNode.querySelectorAll('.carrousel')[0];
        console.log(carrousel);
        let XYmove = 790;        
        if(carrousel.classList.contains("carrousel-home"))
            XYmove = 300;
        if(carrousel.style.left=="")
            carrousel.style.left=0;
        if(parseFloat(carrousel.style.left)>=0)
            return;
        carrousel.style.left= parseFloat(carrousel.style.left) + XYmove +"px";
    });
});

rgtBtn_Carrousel_ARR.forEach(e => {
    e.addEventListener('click', function(event){
        let carrousel = event.currentTarget.parentNode.querySelectorAll('.carrousel')[0];
        console.log(carrousel);
        let XYmove = 790;        
        if(carrousel.classList.contains("carrousel-home"))
            XYmove = 300;
        if(carrousel.style.left=="")
            carrousel.style.left=0;

        if((parseFloat(carrousel.style.left)<=-800 && XYMove==300) || (parseFloat(carrousel.style.left)<=-2100 && XYMove==790))
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

