// Selección boton del DOM
const button = document.querySelector("button");

button.addEventListener("click", () =>{
    document.querySelectorAll("#filtro").forEach((e) =>{
        e.style.visibility = "visible";
    });
    let listaPokemon = document.querySelector(".listaPokemon");
        listaPokemon.style.visibility = "visible";

    mostrarPokemon();
});


function mostrarPokemon(){
    document.querySelector(".cargandoDatos").style.visibility = "visible";
}