"use strict";
var Cars;
(function (Cars) {
    window.addEventListener("load", function () {
        var _a, _b;
        (_a = document.getElementById("vehiculos")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", verTipos);
        (_b = document.getElementById("filtroVehiculos")) === null || _b === void 0 ? void 0 : _b.addEventListener("change", filtrarVehiculos);
    });
    function filtrarVehiculos() {
        var tipoAuto = document.getElementById("filtroVehiculos").value;
        if (tipoAuto == "Auto") {
            var filtrados = vehiculos.filter(function (item) { return item instanceof Cars.Auto; });
            agregarAnimal(filtrados);
        }
        else {
            var filtrados = vehiculos.filter(function (item) { return item instanceof Cars.Camioneta; });
            agregarAnimal(filtrados);
        }
    }
    Cars.filtrarVehiculos = filtrarVehiculos;
    var vehiculos = new Array();
    function verTipos() {
        var tipoVehiculo = document.getElementById("vehiculos").value;
        if (tipoVehiculo == "Camioneta") {
            document.getElementById("contTipoCamioneta").hidden = false;
            document.getElementById("contTipoAuto").hidden = true;
        }
        else {
            document.getElementById("contTipoAuto").hidden = false;
            document.getElementById("contTipoCamioneta").hidden = true;
        }
    }
    Cars.verTipos = verTipos;
    function abrirGrilla() {
        document.getElementById("contGrilla").style.display = "block";
        var contAgregar = document.getElementById("contGrilla");
        contAgregar.classList.add("verForm");
    }
    Cars.abrirGrilla = abrirGrilla;
    function cerrarGrilla() {
        document.getElementById("contGrilla").style.display = "none";
        var contGrilla = document.getElementById("contGrilla");
        document.getElementById("contTipoCamioneta").hidden = true;
        document.getElementById("contTipoAuto").hidden = true;
        document.getElementById("Idehiculo").value = "";
        document.getElementById("marcaVehiculo").value = "";
        document.getElementById("modeloVehiculo").value = "";
        document.getElementById("precioVehiculo").value = "";
        document.getElementById("cantidadPuertas").value = "";
        contGrilla.classList.remove("verForm");
    }
    Cars.cerrarGrilla = cerrarGrilla;
    function agregar() {
        var id;
        if (vehiculos.length == 0) {
            id = 1;
        }
        else {
            var auxVehiculos = vehiculos;
            id = auxVehiculos.reduce(function (max, item) {
                if (item.id >= max) {
                    return item.id + 1;
                }
                return max;
            }, 0);
            if (id == 0) {
                id + 1;
            }
        }
        var marca = document.getElementById("marcaVehiculo").value;
        var modelo = document.getElementById("modeloVehiculo").value;
        var precio = document.getElementById("precioVehiculo").value;
        var tipoVehiculo = document.getElementById("vehiculos").value;
        var tipoCamioneta = document.getElementById("tipoCamioneta").value;
        var puertas = document.getElementById("cantidadPuertas").value;
        if (tipoVehiculo === "Auto") {
            var auto = new Cars.Auto(marca, modelo, parseInt(precio), parseInt(puertas), id);
            vehiculos.push(auto);
        }
        else if (tipoVehiculo === "Camioneta") {
            if (tipoCamioneta == "Es4X4") {
                var camioneta = new Cars.Camioneta(marca, modelo, parseInt(precio), true, id);
                vehiculos.push(camioneta);
            }
            else {
                var camioneta = new Cars.Camioneta(marca, modelo, parseInt(precio), false, id);
                vehiculos.push(camioneta);
            }
        }
        agregarAnimal(vehiculos);
        cerrarGrilla();
    }
    Cars.agregar = agregar;
    function agregarAnimal(mascotas) {
        var marca = "";
        var modelo = "";
        var precio;
        var id;
        var detalle;
        var tipoVehiculo = "";
        var tCuerpo = document.getElementById("tCuerpo");
        while (tCuerpo.rows.length > 0) {
            tCuerpo.removeChild(tCuerpo.childNodes[0]);
        }
        var _loop_1 = function (item) {
            id = item.id;
            marca = item.marca;
            modelo = item.modelo;
            precio = item.precio;
            if (item instanceof Cars.Auto) {
                tipoVehiculo = "Auto";
                detalle = item.cantidadPuertas;
            }
            else if (item instanceof Cars.Camioneta) {
                tipoVehiculo = "Camioneta";
                if (item.cuatroXcuatro) {
                    detalle = "4X4";
                }
                else {
                    detalle = "No es 4x4";
                }
            }
            btnDel = document.createElement('input');
            btnDel.type = 'button';
            btnDel.className = 'botonEliminar';
            btnDel.value = "Eliminar";
            btnDel.onclick = function () { eliminarGrilla(mascotas.indexOf(item)); };
            tr = document.createElement("tr");
            td1 = document.createElement("td");
            nodoTexto = document.createTextNode(id);
            td1.appendChild(nodoTexto);
            tr.appendChild(td1);
            td2 = document.createElement("td");
            nodoTexto = document.createTextNode(marca);
            td2.appendChild(nodoTexto);
            tr.appendChild(td2);
            td3 = document.createElement("td");
            nodoTexto = document.createTextNode(modelo);
            td3.appendChild(nodoTexto);
            tr.appendChild(td3);
            td4 = document.createElement("td");
            nodoTexto = document.createTextNode(precio);
            td4.appendChild(nodoTexto);
            tr.appendChild(td4);
            td5 = document.createElement("td");
            nodoTexto = document.createTextNode(tipoVehiculo);
            td5.appendChild(nodoTexto);
            tr.appendChild(td5);
            td6 = document.createElement("td");
            nodoTexto = document.createTextNode(detalle);
            td6.appendChild(nodoTexto);
            tr.appendChild(td6);
            td7 = document.createElement("td");
            td7.appendChild(btnDel);
            tr.appendChild(td7);
            tCuerpo.appendChild(tr);
        };
        var btnDel, tr, td1, nodoTexto, td2, nodoTexto, td3, nodoTexto, td4, nodoTexto, td5, nodoTexto, td6, nodoTexto, td7;
        for (var _i = 0, mascotas_1 = mascotas; _i < mascotas_1.length; _i++) {
            var item = mascotas_1[_i];
            _loop_1(item);
        }
    }
    function eliminarGrilla(id) {
        vehiculos.splice(id, 1);
        agregarAnimal(vehiculos);
    }
})(Cars || (Cars = {}));
