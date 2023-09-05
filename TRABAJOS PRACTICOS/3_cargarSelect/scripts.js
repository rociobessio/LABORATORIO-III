Array.prototype.unique = function (func) {
    // console.log( [...new Set(this.map(func))] )
    return [...new Set(this.map(func))]
};

$(function () {
    cargarPaises()
    //cargar paises

    //agregar manejador para que cuando cambie el valor de pais, filtre la lista de ciudades
    paises.onchange = function () {

    };
    paises.addEventListener("change", () => {
        let pais = document.getElementById("paises").value;
        cargarCiudades(pais)
    });

})

function cargarPaises() {
    let list = data.unique((i) => i.pais)
    let select = document.getElementById("paises");
    list.forEach(item => {
        let optEl = document.createElement("option");
        optEl.innerText = item;
        select.appendChild(optEl)
    });
}

function cargarCiudades(pais) {
    let list = data.filter((item) => item.pais == pais)
    console.log(list)
    list = list.unique((i) => i.ciudad)
    console.log(list)

    let select = document.getElementById("ciudades");

    while (select.lastElementChild) {
        select.removeChild(select.lastElementChild);
    }

    list.forEach(item => {
        let optEl = document.createElement("option");
        optEl.innerText = item;
        select.appendChild(optEl)
    });

}
