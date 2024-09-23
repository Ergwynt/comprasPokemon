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
    const request = new XMLHttpRequest();
    request.addEventListener("readystatechange", (e) =>{
        if (
            e.target.readyState ===4){
                
            }
    });

    request.open("GET", "https://pokeapi.co/api/v2/pokemon/");
    request.send();
}