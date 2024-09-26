import Pokemon from './Pokemon.js';

// Creamos un array para los 151 pokemons que obtendremos desde la API
var pokemons = [];


// Selección boton del DOM
const button = document.querySelector("button");

button.addEventListener("click", () =>{
    document.querySelectorAll("#filtro").forEach((e) =>{
        e.style.visibility = "visible";
    });
    let listaPokemon = document.querySelector(".listaPokemon");
        listaPokemon.style.visibility = "visible";

    startPokemon();
});


const startPokemon = async() =>{
    for (var i=1; i <= 151; i++){
        try{

            await fetch("https://pokeapi.co/api/v2/pokemon/"+i+"/")
                .then(function(result){
                    return result.json();
                })
                .then(function(data){
                    console.log(data)
                })
            }
        catch (error){
            alert("Error")
        }
    }
    
    // document.querySelector(".cargandoDatos").style.visibility = "visible";
    // const request = new XMLHttpRequest();
    // request.addEventListener("readystatechange", (e) =>{
    //     if (e.target.readyState ===4 ){
    //             const datos = JSON.parse(e.target.responseText);
    //             console.log(datos)
    //         }
    // });

    // request.open("GET", "https://pokeapi.co/api/v2/pokemon/");
    // request.send();
}