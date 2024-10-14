import Pokemon from "./Pokemon.js";

var pokemons = [];
var pkm_selected = [];

// Selección de botones del DOM
const button = document.querySelector("button");
const btnListaDeseo = document.querySelector("#btn_lista_deseo");
const btnVerListaDeseo = document.querySelector("#btn_ver_lista_deseo");
const btnComprar = document.querySelector("#btn_comprar");
const btnVerCompra = document.querySelector("#btn_ver_compra");

// Selección del input de filtro por tipo
const filtroTipoInput = document.getElementById("filtroTipo");
const filtroAtack = document.getElementById("filtroAtaque")
const filtroDefense = document.getElementById("filtroDefensa");

// Evento para añadir a la lista de deseos
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

// Evento para ver la lista de deseos
btnVerListaDeseo.addEventListener("click", () => {
    console.log("He pulsado ver lista deseo");
});

// Mostrar la consola para interacciones adicionales
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

// Inicializar la carga de Pokémon cuando se pulsa el botón principal
button.addEventListener("click", () => {
    button.style.visibility = "hidden";
    startPokemon();
});

// Función para obtener los datos de los primeros 151 Pokémon
const startPokemon = async () => {
    document.querySelector(".cargandoDatos").style.visibility = "visible";

    for (var i = 1; i <= 151; i++) {
        try {
            await fetch("https://pokeapi.co/api/v2/pokemon/" + i + "/")
                .then((result) => result.json())
                .then((data) => {
                    const pokemon = new Pokemon(data); // Instancio una clase.
                    pushPokemon(pokemon); // Guardo los Pokémon en un array.
                });
        } catch (error) {
            alert("Error");
        }
    }

    await showPokedex(); // Mostrar la Pokédex con todos los Pokémon cargados
};

// Función para añadir Pokémon al array
function pushPokemon(pokemon) {
    pokemons.push(pokemon);
}

// Mostrar todos los Pokémon en la Pokédex
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
            <div class = "stats"> Ataque: ${pokemon.pkm_attack}</div>
            <div class ="stats">Defensa:${pokemon.pkm_defense}</div>
            <img src="${pokemon.pkm_back}">
            
            <img class="front" src="${pokemon.pkm_front}"><br>
            ${pokemon.id}. ${pokemon.name}<br>
            <div class="types">${tipo1} ${tipo2}</div>
            <div class="precio">${pokemon.precio}€</div>
        `;

        // Evento para añadir el Pokémon a la lista de deseos
        card.addEventListener("click", () => {
            console.log(`Han pulsado a ${pokemon.name}`);
            pkm_selected.push(pokemon);
        });

        pokedex.appendChild(card); // Añadir cada Pokémon al DOM
    });
};

// Función para filtrar Pokémon
const filtrarPokemons = () => {
    // Obtener los valores de los filtros
    const filtroTipo = filtroTipoInput.value.toLowerCase();
    const filtroAtak = filtroAtack.value.toLowerCase();
    const filtroDef = filtroDefense.value.toLowerCase();

    // Filtrar los Pokémon por tipo y ataque
    const pokemonsFiltrados = pokemons.filter((pokemon) => {
        const tipoCoincide = pokemon.pkm_type.some((typeInfo) => typeInfo.type.name.includes(filtroTipo));
        const ataqueCoincide = pokemon.pkm_attack.toString().includes(filtroAtak);
        const defensaCoincide = pokemon.pkm_defense.toString().includes(filtroDef);
        
        return (filtroTipo === '' || tipoCoincide) && (filtroAtak === '' || ataqueCoincide) && (filtroDef === '' || defensaCoincide );
    });

    // Mostrar los Pokémon filtrados
    mostrarPokemonFiltrados(pokemonsFiltrados);
};

// Agregar el evento input al filtro por tipo de Pokémon
filtroTipoInput.addEventListener("input", filtrarPokemons);

// Agregar el evento input al filtro por ataque normal
filtroAtack.addEventListener("input", filtrarPokemons);

// Agregar el evento input al filtro por defensa normal
filtroDefense.addEventListener("input",filtrarPokemons);

// Función para mostrar los Pokémon filtrados
const mostrarPokemonFiltrados = (pokemonsFiltrados) => {
    const pokedex = document.getElementById("pokedex");

    // Limpiar la lista de la Pokédex antes de mostrar los filtrados
    pokedex.innerHTML = "";
    // Limpiar el mensaje si existe
    const mensajeExistente = document.getElementById('no_encuentra');
    if (mensajeExistente) {
         mensajeExistente.remove(); // Eliminar el mensaje si existe
    }
 
    // Verificar si hay Pokémon filtrados
    if (pokemonsFiltrados.length === 0) {
        // Crear un mensaje si no hay resultados
        const mensaje = document.createElement("div");
        mensaje.setAttribute('id', 'no_encuentra');
        mensaje.textContent = "No se encontraron Pokémon que coincidan con los filtros.";
        pokedex.appendChild(mensaje);
        return; // Salir de la función
    }
    // Iterar sobre los Pokémon filtrados y mostrarlos
    pokemonsFiltrados.forEach((pokemon) => {
        let tipo1 = pokemon.pkm_type[0]?.type.name || '';
        let tipo2 = pokemon.pkm_type[1]?.type.name || '';

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class = "stats"> Ataque: ${pokemon.pkm_attack}</div>
            <div class ="stats">Defensa:${pokemon.pkm_defense}</div>
            <img src="${pokemon.pkm_back}">
            <img class="front" src="${pokemon.pkm_front}"><br>
            ${pokemon.id}. ${pokemon.name}<br>
            <div class="types">${tipo1} ${tipo2}</div>
            <div class = "precio">${pokemon.precio}€</div>
        `;

        // Evento para añadir el Pokémon a la lista de deseos
        card.addEventListener("click", () => {
            console.log(`Han pulsado a ${pokemon.name}`);
            pkm_selected.push(pokemon);
        });

        // Agregar la tarjeta del Pokémon a la Pokédex
        pokedex.appendChild(card);
    });

   
};

