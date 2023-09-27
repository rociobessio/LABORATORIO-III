
const formulario = document.forms[0];//-->El unico formulario

//const { func } = require("joi");

//Manejador de eventos
// /**
//  * Forma #1 
//  * @param {*} e es equivalente a eventos
//  */
// formulario.onsubmit = function (e){

// }

/**
 * Forma #2 
 * @param {*} e es equivalente a evento, trae
 * informacion del evento
 */
formulario.addEventListener("submit",function (e){
    
    e.preventDefault();//-->Forma de cortar el comportamiento por defecto
    
    console.log(e.target);//-->Muestro el evento, this referencia el emisor del evento
})