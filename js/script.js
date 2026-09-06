import Pokemon from "./Pokemon.js";

var pokemons = [];
var pkm_selected = [];

// Selección de botones del DOM
const button = document.querySelector("button");
const btnListaDeseo = document.querySelector("#btn_lista_deseo");
const btnVerListaDeseo = document.querySelector("#btn_ver_lista_deseo");
const btnComprar = document.querySelector("#btn_comprar");
const btnVerCompra = document.querySelector("#btn_ver_compra");

// Selección de los filtros
const filtroTipoInput = document.getElementById("filtroTipo");
const filtroAtack = document.getElementById("filtroAtaque");
const filtroDefense = document.getElementById("filtroDefensa");

btnListaDeseo.addEventListener("click", () => {
    console.log("He pulsado lista deseo");
    console.log("Añadido a Lista de deseo: ");

    pkm_selected.forEach((pkm) => {
        if (pkm.name == "squirtle") {
            console.log("Squirting");
        } else {
            console.log(pkm.name);
        }
    });

    console.log(navigator.appName);
    window.open();
});

btnVerListaDeseo.addEventListener("click", () => {
    console.log("He pulsado ver lista deseo");
});

function showConsole() {
    document.querySelectorAll("#filtro").forEach((e) => {
        e.style.visibility = "visible";
    });

    document.querySelectorAll(".input").forEach((e) => {
        e.style.visibility = "visible";

        e.addEventListener("keypress", (t) => {
            const tp1 = document.getElementById("filtroTipo").value;
            console.log(tp1);
            pokemonsFiltered = [];

            pokemons.forEach((pk) => {
                if (pk.pkm_type[0] == tp1) {
                    pokemonsFiltered.push(pk);
                }
            });
        });
    });

    document.querySelectorAll(".btnMenu").forEach((e) => {
        e.style.visibility = "visible";
    });
}

button.addEventListener("click", () => {
    button.style.visibility = "hidden";
    startPokemon();
});

const startPokemon = async () => {
    document.querySelector(".cargandoDatos").style.visibility = "visible";

    for (var i = 1; i <= 151; i++) {
        try {
            await fetch("https://pokeapi.co/api/v2/pokemon/" + i + "/")
                .then((result) => result.json())
                .then((data) => {
                    const pokemon = new Pokemon(data);
                    pushPokemon(pokemon);
                });
        } catch (error) {
            alert("Error");
        }
    }

    await showPokedex();
};

function pushPokemon(pokemon) {
    pokemons.push(pokemon);
}

const showPokedex = async () => {
    document.querySelector("#pokedex").style.visibility = "visible";
    document.querySelector(".cargandoDatos").style.visibility = "hidden";
    showConsole();

    const pokedex = document.getElementById("pokedex");

    pokemons.forEach((pokemon) => {
        var aux = 0;
        let tipo1 = "", tipo2 = "";

        while (aux != pokemon.pkm_type.length) {
            if (aux == 0) tipo1 = pokemon.pkm_type[aux].type.name;
            if (aux == 1) tipo2 = pokemon.pkm_type[aux].type.name;
            aux++;
        }

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="stats">Ataque: ${pokemon.pkm_attack}</div>
            <div class="stats">Defensa: ${pokemon.pkm_defense}</div>
            <img src="${pokemon.pkm_back}">
            <img class="front" src="${pokemon.pkm_front}"><br>
            ${pokemon.id}. ${pokemon.name}<br>
            <div class="types">${tipo1} ${tipo2}</div>
            <div class="precio">${pokemon.precio}€</div>
        `;

        card.addEventListener("click", () => {
            console.log(`Han pulsado a ${pokemon.name}`);
            pkm_selected.push(pokemon);
        });

        pokedex.appendChild(card);
    });
};

const filtrarPokemons = () => {
    const filtroTipo = filtroTipoInput.value.toLowerCase();
    const filtroAtak = filtroAtack.value.toLowerCase();
    const filtroDef = filtroDefense.value.toLowerCase();

    const pokemonsFiltrados = pokemons.filter((pokemon) => {
        const tipoCoincide = pokemon.pkm_type.some((typeInfo) =>
            typeInfo.type.name.includes(filtroTipo)
        );

        const ataqueCoincide = pokemon.pkm_attack.toString().includes(filtroAtak);
        const defensaCoincide = pokemon.pkm_defense.toString().includes(filtroDef);

        return (
            (filtroTipo === '' || tipoCoincide) &&
            (filtroAtak === '' || ataqueCoincide) &&
            (filtroDef === '' || defensaCoincide)
        );
    });

    mostrarPokemonFiltrados(pokemonsFiltrados);
};

filtroTipoInput.addEventListener("input", filtrarPokemons);
filtroAtack.addEventListener("input", filtrarPokemons);
filtroDefense.addEventListener("input", filtrarPokemons);

const mostrarPokemonFiltrados = (pokemonsFiltrados) => {
    const pokedex = document.getElementById("pokedex");

    pokedex.innerHTML = "";

    const mensajeExistente = document.getElementById("no_encuentra");

    if (mensajeExistente) {
        mensajeExistente.remove();
    }

    if (pokemonsFiltrados.length === 0) {
        const mensaje = document.createElement("div");
        mensaje.setAttribute("id", "no_encuentra");
        mensaje.textContent = "No se encontraron Pokémon que coincidan con los filtros.";
        pokedex.appendChild(mensaje);
        return;
    }

    pokemonsFiltrados.forEach((pokemon) => {
        let tipo1 = pokemon.pkm_type[0]?.type.name || "";
        let tipo2 = pokemon.pkm_type[1]?.type.name || "";

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="stats">Ataque: ${pokemon.pkm_attack}</div>
            <div class="stats">Defensa: ${pokemon.pkm_defense}</div>
            <img src="${pokemon.pkm_back}">
            <img class="front" src="${pokemon.pkm_front}"><br>
            ${pokemon.id}. ${pokemon.name}<br>
            <div class="types">${tipo1} ${tipo2}</div>
            <div class="precio">${pokemon.precio}€</div>
        `;

        card.addEventListener("click", () => {
            console.log(`Han pulsado a ${pokemon.name}`);
            pkm_selected.push(pokemon);
        });

        pokedex.appendChild(card);
    });
};
