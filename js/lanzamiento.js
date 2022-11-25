
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
