"use strict";

// ACHICAR HEADER----------------

let header = document.getElementsByTagName("header")[0];
window.addEventListener("scroll", function(){
    if(window.scrollY > 100){
        header.classList.add('headerInScroll');
    }else{
        header.classList.remove('headerInScroll');
    }
});






// HAMBURGUESA--------------------

let burger = document.querySelectorAll(".burger")[0];

let burgerLines = burger.children[0].children;

burger.addEventListener('click', showNav);

//gira burger y muestra nav
function showNav() {
    let nav = document.querySelectorAll("nav")[0];
    let items = nav.children[0].children;
    nav.classList.toggle('hiddenClass');
    burgerLines[0].classList.toggle('flip');
    burgerLines[1].classList.toggle('flip');
    burgerLines[2].classList.toggle('flip');
    console.log(items[1])

    //cargar de a uno los elem del nav
    if(!nav.classList.contains("hiddenClass")){
        let i = 0;
        let intervalItems = setInterval(() => {
            items[i].style.opacity=1;
            i++;
            if(i==items.length) clearInterval(intervalItems);
        }, 200);
    }else{//para que los oculte instantaneamente
        for (let j = 0; j < items.length; j++) {
            items[j].style.opacity=0;
            
        }
    }

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
        let carrChildren;
        let rotType;
        if(carrousel.classList.contains("carrousel-home")){
        rotType = 'rotateCardR';
        carrChildren = carrousel.children;
        for (let i = 0; i < carrChildren.length; i++) {
            carrChildren[i].classList.toggle(rotType);
            console.log(carrChildren[i].classList);
        }
    }
        let XYmove = 750;        
        if(carrousel.classList.contains("carrousel-home"))//DISTINTO PARA CARROUSEL DE LANZAMIENTO Y HOME
        (window.getComputedStyle(game).getPropertyValue('height') == "300px") ? XYmove = 250 : XYmove = 130;
           
        if(carrousel.style.left=="")
            carrousel.style.left=0;

        if((parseFloat(carrousel.style.left)<=-750 && XYmove==250) || (parseFloat(carrousel.style.left)<=-520 && XYmove==130) || (parseFloat(carrousel.style.left)<=-1500 && XYmove==750))
            return;
        carrousel.style.left = parseFloat(carrousel.style.left) - XYmove + "px";

        if(carrousel.classList.contains("carrousel-home")) flipCards(carrChildren, rotType)
    });
});

function flipCards(cards, rotType) {
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.add(rotType);
    }
    
}




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