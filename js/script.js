import Pokemon from "./Pokemon.js";


var pokemons = [];


// Selección boton del DOM
const button = document.querySelector("button");

function showConsole(){
    document.querySelectorAll("#filtro").forEach((e) => {
        e.style.visibility = "visible";
    });
    document.querySelectorAll('.btnMenu').forEach((e) => {
        e.style.visibility = "visible";
    });
}
button.addEventListener("click", () => {
        button.style.visibility ="hidden";
    startPokemon();
        
    });
    

    


const startPokemon = async () => {
    document.querySelector(".cargandoDatos").style.visibility ="visible";

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
    document.querySelector('#pokedex').style.visibility = "visible";

    document.querySelector(".cargandoDatos").style.visibility ="hidden";
    showConsole();
    const pokedex = document.getElementById("pokedex");

    for (var i = 0; i< pokemons.length; i++){
        var aux = 0;
        while (aux != pokemons[i].pkm_type.length){
            if(aux ==0) var tipo1 = pokemons[i].pkm_type[aux].type.name;
            if(aux ==1) var tipo2 = pokemons[i].pkm_type[aux].type.name;
            else tipo2 = "";
            aux ++;
        };
        pokedex.innerHTML += `<div class='card'>
    <img src="${pokemons[i].pkm_back}">
    <img class="front" src="${pokemons[i].pkm_front}"><br>
    ${pokemons[i].id}. ${pokemons[i].name}<br>
    <div class="types">${tipo1} ${tipo2}</div>
    </div>`;
    }
    
}