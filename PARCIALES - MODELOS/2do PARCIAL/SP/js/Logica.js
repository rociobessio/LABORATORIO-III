"use strict";
var Personas;
(function (Personas) {
    var listaPersonas = new Array();
    function PromiseFiltro(listaPersonas) {
        return new Promise(function (resolve, reject) {
            var filtro = document.getElementById("comboFiltro").value;
            var lista;
            document.getElementById("promedio").value = "";
            if (filtro != "") {
                if (filtro == "Hombre") {
                    var listaAux = listaPersonas;
                    lista = listaAux.filter(function (item) {
                        if (item instanceof Personas.Cliente) {
                            if (item.sexo == Personas.TipoEnumPersona.Hombre) {
                                return item;
                            }
                        }
                    });
                }
                else {
                    var listaAux = listaPersonas;
                    lista = listaAux.filter(function (item) {
                        if (item instanceof Personas.Cliente) {
                            if (item.sexo == Personas.TipoEnumPersona.Mujer) {
                                return item;
                            }
                        }
                    });
                }
            }
            resolve(lista);
        });
    }
    function PromisePromedio(listaPersonas) {
        return new Promise(function (resolve, reject) {
            var filtro = document.getElementById("comboFiltro").value;
            var promedio = 0;
            if (filtro == "") {
                promedio = listaPersonas.reduce(function (total, item) {
                    if (item instanceof Personas.Cliente) {
                        total += item.edad;
                    }
                    return total;
                }, 0);
                promedio = promedio / listaPersonas.length;
            }
            else if (filtro == "Hombre") {
                var listaAux = listaPersonas;
                var lista = listaAux.filter(function (item) {
                    if (item instanceof Personas.Cliente) {
                        if (item.sexo == Personas.TipoEnumPersona.Hombre) {
                            return item;
                        }
                    }
                });
                promedio = lista.reduce(function (total, item) {
                    if (item instanceof Personas.Cliente) {
                        total += item.edad;
                    }
                    return total;
                }, 0);
                promedio = promedio / lista.length;
            }
            else if (filtro == "Mujer") {
                var listaAux = listaPersonas;
                var lista = listaAux.filter(function (item) {
                    if (item instanceof Personas.Cliente) {
                        if (item.sexo == Personas.TipoEnumPersona.Mujer) {
                            return item;
                        }
                    }
                });
                promedio = lista.reduce(function (total, item) {
                    if (item instanceof Personas.Cliente) {
                        total += item.edad;
                    }
                    return total;
                }, 0);
                promedio = promedio / lista.length;
            }
            resolve(promedio);
        });
    }
    //Escucho evento LOAD y asigno funciones a los eventos
    window.addEventListener("load", function () {
        var _a;
        //document.getElementById("vehiculoTipo")?.addEventListener("change", TiposAutomoviles);
        (_a = document.getElementById("comboFiltro")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", FiltrarLista);
    });
    function AbrirGrilla() {
        //Seteo boton Guardar
        document.getElementById("btnGuardar").style.display = "block";
        //Oculto boton eliminar
        document.getElementById("btnEliminar").style.display = "none";
        var id = listaPersonas.reduce(function (cantidadPersonas, item) {
            if (listaPersonas.length > 0) {
                if (cantidadPersonas == 0) {
                    cantidadPersonas = item.id;
                }
                if (item.id >= cantidadPersonas) {
                    cantidadPersonas = item.id + 1;
                }
            }
            else {
                return cantidadPersonas = 1;
            }
            return cantidadPersonas;
        }, 1);
        document.getElementById("personaID").value = id.toString();
        document.getElementById("contGrilla").style.display = "block";
    }
    Personas.AbrirGrilla = AbrirGrilla;
    function CerrarGrilla() {
        //Oculto Grilla
        document.getElementById("contGrilla").style.display = "none";
        //Limpio Elementos
        document.getElementById("personaID").value = "";
        document.getElementById("personaNombre").value = "";
        document.getElementById("personaApellido").value = "";
        document.getElementById("personaEdad").value = "";
        document.getElementById("personaSexo").value = "";
    }
    Personas.CerrarGrilla = CerrarGrilla;
    function Guardar() {
        var sexo = document.getElementById("personaSexo").value;
        var id = parseInt(document.getElementById("personaID").value);
        var nombre = document.getElementById("personaNombre").value;
        var apellido = document.getElementById("personaApellido").value;
        var edad = parseInt(document.getElementById("personaEdad").value);
        if (sexo == "") {
            alert("ELEGIR SEXO ;)");
        }
        else {
            switch (sexo) {
                case "Hombre":
                    var auxH = new Personas.Cliente(id, nombre, apellido, edad, Personas.TipoEnumPersona.Hombre);
                    listaPersonas.push(auxH);
                    break;
                case "Mujer":
                    var auxM = new Personas.Cliente(id, nombre, apellido, edad, Personas.TipoEnumPersona.Mujer);
                    listaPersonas.push(auxM);
                    break;
            }
        }
        RefrescarLista(listaPersonas);
        CerrarGrilla();
    }
    Personas.Guardar = Guardar;
    function RefrescarLista(listaPersonas) {
        var tCuerpo = document.getElementById("tCuerpo");
        var id;
        var nombre;
        var apellido;
        var edad = 1;
        var sexo = "";
        while (tCuerpo.rows.length > 0) {
            tCuerpo.removeChild(tCuerpo.childNodes[0]);
        }
        for (var _i = 0, listaPersonas_1 = listaPersonas; _i < listaPersonas_1.length; _i++) {
            var iterator = listaPersonas_1[_i];
            id = iterator.id;
            nombre = iterator.nombre;
            apellido = iterator.apellido;
            if (iterator instanceof Personas.Cliente) {
                edad = iterator.edad;
                if (iterator.sexo == Personas.TipoEnumPersona.Hombre) {
                    sexo = "Hombre";
                }
                else {
                    sexo = "Mujer";
                }
            }
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            var nodoTexto = document.createTextNode(id.toString());
            td1.appendChild(nodoTexto);
            tr.appendChild(td1);
            var td2 = document.createElement("td");
            var nodoTexto = document.createTextNode(nombre);
            td2.appendChild(nodoTexto);
            tr.appendChild(td2);
            var td3 = document.createElement("td");
            var nodoTexto = document.createTextNode(apellido);
            td3.appendChild(nodoTexto);
            tr.appendChild(td3);
            var td4 = document.createElement("td");
            var nodoTexto = document.createTextNode(edad.toString());
            td4.appendChild(nodoTexto);
            tr.appendChild(td4);
            var td5 = document.createElement("td");
            var nodoTexto = document.createTextNode(sexo);
            td5.appendChild(nodoTexto);
            tr.appendChild(td5);
            tr.addEventListener("dblclick", AbrirGrillaEliminar);
            //Agrego tr a la tabla
            tCuerpo.appendChild(tr);
        }
    }
    Personas.RefrescarLista = RefrescarLista;
    function AbrirGrillaEliminar(event) {
        //Muestro tabla
        document.getElementById("contGrilla").style.display = "block";
        //Oculto boton Guardar
        document.getElementById("btnGuardar").style.display = "none";
        //Muestro boton Eliminar
        document.getElementById("btnEliminar").style.display = "block";
        //Escucho evento
        var trClick = event.target.parentNode;
        //Traigo informacion de la tabla
        var id = trClick.childNodes[0].innerHTML;
        var nombre = trClick.childNodes[1].innerHTML;
        var apellido = trClick.childNodes[2].innerHTML;
        var edad = trClick.childNodes[3].innerHTML;
        var sexo = trClick.childNodes[4].innerHTML;
        var indexTabla = trClick.rowIndex;
        document.getElementById("personaID").value = id;
        document.getElementById("personaNombre").value = nombre;
        document.getElementById("personaApellido").value = apellido;
        document.getElementById("personaEdad").value = edad;
        document.getElementById("personaSexo").value = sexo;
        //Me traigo el boton Eliminar
        var btnDel = document.getElementById("btnEliminar");
        btnDel.onclick = function () {
            var cantidadDeCajasEnTabla = 5;
            for (var index = 0; index < cantidadDeCajasEnTabla; index++) {
                trClick.removeChild(trClick.childNodes[0]);
            }
            listaPersonas.splice(indexTabla - 1, 1);
            CerrarGrilla();
            RefrescarLista(listaPersonas);
        };
    }
    Personas.AbrirGrillaEliminar = AbrirGrillaEliminar;
    function LimpiarLista() {
        listaPersonas.splice(0, listaPersonas.length);
        RefrescarLista(listaPersonas);
    }
    Personas.LimpiarLista = LimpiarLista;
    function CalcularPromedio() {
        var promedio;
        PromisePromedio(listaPersonas).then(function (response) {
            promedio = response;
            document.getElementById("promedio").value = promedio;
        });
    }
    Personas.CalcularPromedio = CalcularPromedio;
    function FiltrarLista() {
        var lista;
        PromiseFiltro(listaPersonas).then(function (response) {
            lista = response;
            RefrescarLista(lista);
        });
    }
    Personas.FiltrarLista = FiltrarLista;
})(Personas || (Personas = {}));
