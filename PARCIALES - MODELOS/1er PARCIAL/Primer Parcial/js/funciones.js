window.onload = function () {


    var http = new XMLHttpRequest();

    http.onreadystatechange = function () {

        if (http.readyState == 4 && http.status == 200) {

            var objJson = JSON.parse(http.responseText);

            for (var i = 0; i < objJson.length; i++) {

                agregarTodos(objJson[i].nombre, objJson[i].cuatrimestre, objJson[i].fechaFinal, objJson[i].turno, objJson[i].id);

            }

        }


    }
    http.open("GET", "http://localhost:3000/materias", true)
    http.send();

}


function agregarTodos(nombre, cuatrimestre, fecha, turno, id) {


    var tCuerpo = document.getElementById("tCuerpo");

    var tr = document.createElement("tr");

    tr.setAttribute("idPersona", id);

    var td1 = document.createElement("td");
    var nodoTexto = document.createTextNode(nombre);
    td1.appendChild(nodoTexto);
    tr.appendChild(td1);

    var td2 = document.createElement("td");
    var nodoTexto = document.createTextNode(cuatrimestre);
    td2.appendChild(nodoTexto);
    tr.appendChild(td2);

    var td3 = document.createElement("td");
    var nodoTexto = document.createTextNode(fecha);
    td3.appendChild(nodoTexto);
    tr.appendChild(td3);


    var td4 = document.createElement("td");
    var nodoTexto = document.createTextNode(turno);
    td4.appendChild(nodoTexto);
    tr.appendChild(td4);

    tr.addEventListener("dblclick", abrirGrilla)

    tCuerpo.appendChild(tr);



}


function abrirGrilla(event) {

    var trClick = event.target.parentNode;

    var id = trClick.getAttribute("idPersona");
    var nombre = trClick.childNodes[0].innerHTML;
    var cuatrimestre = trClick.childNodes[1].innerHTML;
    var fecha = trClick.childNodes[2].innerHTML;
    var turno = trClick.childNodes[3].innerHTML;

    if (turno == "Mañana") {

        document.getElementById("Tmañana").checked = true;
    } else {
        document.getElementById("TNoche").checked = true;
    }


    document.getElementById("nombre").value = nombre;
    document.getElementById("cuatri").value = cuatrimestre;
    document.getElementById("cuatri").disabled = true;

    var array = fecha.split('/');
    var fechaFormateada = array[2] + "-" + array[1] + "-" + array[0];

    document.getElementById("final").value = fechaFormateada;

    document.getElementById("contGrilla").style.display = "block"

    var btnMod = document.getElementById("btnModificar");
    var btnDel = document.getElementById("btnEliminar");
    


    btnMod.onclick = function () {

        var nuevoNombre = document.getElementById("nombre").value;
        var nuevaFecha = document.getElementById("final").value;
        var nuevoTurno = document.querySelector('input[name="turno"]:checked').value;
        
        
        var array = nuevaFecha.split('-');
        var nuevaFechaFormateada = array[2] + "/" + array[1] + "/" + array[0];
        

            var httpPost = new XMLHttpRequest();

            httpPost.onreadystatechange = function () {

                if (httpPost.readyState == 4 && httpPost.status == 200) {
                    document.getElementById("Cargando").style.display = "none";

                    trClick.childNodes[0].innerHTML = nuevoNombre;



                    trClick.childNodes[2].innerHTML = nuevaFechaFormateada;
                    turno = document.querySelector('input[name="turno"]:checked').value;
                    trClick.childNodes[3].innerHTML = nuevoTurno;
                }
                cerrarGrilla();

            }
      
        httpPost.open("POST", "http://localhost:3000/editar", true)
        httpPost.setRequestHeader("Content-Type", "application/Json");
        document.getElementById("Cargando").style.display = "flex";
        var JsonPersona = { "id": id, "nombre": nuevoNombre, "cuatrimestre": cuatrimestre, "fechaFinal": nuevaFechaFormateada, "turno": nuevoTurno };

        httpPost.send(JSON.stringify(JsonPersona));



    }


    btnDel.onclick = function () {


        var httpPost = new XMLHttpRequest();

        httpPost.onreadystatechange = function () {

            if (httpPost.readyState == 4 && httpPost.status == 200) {
                document.getElementById("Cargando").style.display = "none";

                trClick.removeChild(trClick.childNodes[0]);
                trClick.removeChild(trClick.childNodes[0]);
                trClick.removeChild(trClick.childNodes[0]);
                trClick.removeChild(trClick.childNodes[0]);

            }
            cerrarGrilla();

        }

        httpPost.open("POST", "http://localhost:3000/eliminar", true)
        httpPost.setRequestHeader("Content-Type", "application/Json");
        document.getElementById("Cargando").style.display = "flex";
        var JsonPersona = { "id": id };

        httpPost.send(JSON.stringify(JsonPersona));


    }


}

function cerrarGrilla() {

    document.getElementById("contGrilla").style.display = "none"

}


