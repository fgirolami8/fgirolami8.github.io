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
        if(carrousel.classList.contains("carrousel-home"))//DISTINTO PARA CARROUSEL DE LANZAMIENTO Y HOME
            XYmove = 250;
        if(carrousel.style.left=="")
            carrousel.style.left=0;

        if((parseFloat(carrousel.style.left)<=-750 && XYmove==250) || (parseFloat(carrousel.style.left)<=-2100 && XYmove==790))
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