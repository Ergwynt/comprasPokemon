// Selección boton del DOM
const button = document.querySelector("button");

button.addEventListener("click", () =>{
    document.querySelectorAll("#filtro").forEach((e) =>{
        e.style.visibility = "visible"
    });


});
