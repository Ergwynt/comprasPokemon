import Pokemon from "./Pokemon.js";


var pokemons = [];


// Selección boton del DOM
const button = document.querySelector("button");

button.addEventListener("click", () => {
    document.querySelectorAll("#filtro").forEach((e) => {
        e.style.visibility = "visible";
    });
    let listaPokemon = document.querySelector(".listaPokemon");
    listaPokemon.style.visibility = "visible";

    startPokemon();
});


const startPokemon = async () => {
    for (var i = 1; i <= 151; i++) {
        try {

            await fetch("https://pokeapi.co/api/v2/pokemon/" + i + "/")
                .then(function (result) {
                    return result.json();
                })
                .then(function (data) {
                    const pokemon = new Pokemon(data); // Instancio una clase.
                    pushPokemon(pokemon); // Guardo los pokemones en un array.
                })
        }
        catch (error) {
            alert("Error");
        }


    };
    await showPokedex();

};

function pushPokemon(pokemon) {
    pokemons.push(pokemon);

}

const showPokedex = async () => {
    console.log(pokemons);
}