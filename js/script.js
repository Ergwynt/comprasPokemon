import Pokemon from "./Pokemon.js";


var pokemons = [];


// Selección boton del DOM
const button = document.querySelector("button");


const btnListaDeseo = document.querySelector("#btn_lista_deseo");
const btnVerListaDeseo = document.querySelector("#btn_ver_lista_deseo");
const btnComprar = document.querySelector("#btn_comprar");
const btnVerCompra = document.querySelector("#btn_ver_compra");

btnListaDeseo.addEventListener("click", () => {
    console.log("He pulsado lista deseo");
})
btnVer  ListaDeseo.addEventListener("click", () => {
    console.log("He pulsado lista deseo");
})


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

    pokemons.forEach((pokemon) =>{
        var aux = 0;
        while (aux != pokemon.pkm_type.length){
            if(aux ==0) var tipo1 = pokemon.pkm_type[aux].type.name;
            if(aux ==1) var tipo2 = pokemon.pkm_type[aux].type.name;
            else tipo2 = "";
            aux ++;
        };

        const card = document.createElement("div");
        card.classList.add("card");
  

        card.innerHTML += `
                <img src="${pokemon.pkm_back}">
                <img class="front" src="${pokemon.pkm_front}"><br>
                ${pokemon.id}. ${pokemon.name}<br>
                <div class="types">${tipo1} ${tipo2}</div>
                `;
    
        card.addEventListener("click", () =>{
            alert(`Han pulsado a ${pokemon.name}`);
        });
        pokedex.appendChild(card);
    })
        
    
}