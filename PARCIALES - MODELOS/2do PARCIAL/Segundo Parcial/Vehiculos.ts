
namespace Cars {


    window.addEventListener("load", function () {

        document.getElementById("vehiculos")?.addEventListener("change", verTipos);

        document.getElementById("filtroVehiculos")?.addEventListener("change", filtrarVehiculos);


    });

    export function filtrarVehiculos(){

        var tipoAuto = (<HTMLInputElement>document.getElementById("filtroVehiculos")).value;

        if (tipoAuto=="Auto") {
            
            var filtrados = vehiculos.filter(item=> item instanceof Auto);
            agregarAnimal(filtrados);
        } else {
            
            var filtrados = vehiculos.filter(item=> item instanceof Camioneta);
            agregarAnimal(filtrados);
        }



    }
    var vehiculos: Array<Vehiculo> = new Array<Vehiculo>();

    export function verTipos() {

        var tipoVehiculo: string = (<HTMLInputElement>document.getElementById("vehiculos")).value;

        if (tipoVehiculo == "Camioneta") {

            (<HTMLInputElement>document.getElementById("contTipoCamioneta")).hidden = false;
            (<HTMLInputElement>document.getElementById("contTipoAuto")).hidden = true;
        }
        else {

            (<HTMLInputElement>document.getElementById("contTipoAuto")).hidden = false;
            (<HTMLInputElement>document.getElementById("contTipoCamioneta")).hidden = true;
        }



    }


    export function abrirGrilla() {


        (<HTMLInputElement>document.getElementById("contGrilla")).style.display = "block";

        var contAgregar: any = <HTMLInputElement>document.getElementById("contGrilla");
        contAgregar.classList.add("verForm");


    }

    export function cerrarGrilla() {

        (<HTMLInputElement>document.getElementById("contGrilla")).style.display = "none";
        var contGrilla = (<HTMLInputElement>document.getElementById("contGrilla"));

        (<HTMLInputElement>document.getElementById("contTipoCamioneta")).hidden = true;
        (<HTMLInputElement>document.getElementById("contTipoAuto")).hidden = true;

        (<HTMLInputElement>document.getElementById("Idehiculo")).value = "";
        (<HTMLInputElement>document.getElementById("marcaVehiculo")).value = "";
        (<HTMLInputElement>document.getElementById("modeloVehiculo")).value = "";
        (<HTMLInputElement>document.getElementById("precioVehiculo")).value = "";
        (<HTMLInputElement>document.getElementById("cantidadPuertas")).value = "";
        
        contGrilla.classList.remove("verForm");
        
    }
    
    
    export function agregar() {
        
        var id;
        if(vehiculos.length == 0)
        {
            id = 1;
        }
        else
        {
            var auxVehiculos = vehiculos;
            id = auxVehiculos.reduce(function (max, item)
            {
                if(item.id >= max) {
                    return item.id + 1;
                }
                return max;
            }, 0);
            if(id == 0)
            {
                id + 1;
            }
        }
        
        var marca = (<HTMLInputElement>document.getElementById("marcaVehiculo")).value;
        var modelo = (<HTMLInputElement>document.getElementById("modeloVehiculo")).value;
        var precio = (<HTMLInputElement>document.getElementById("precioVehiculo")).value;
        var tipoVehiculo = (<HTMLInputElement>document.getElementById("vehiculos")).value;
        var tipoCamioneta = (<HTMLInputElement>document.getElementById("tipoCamioneta")).value;
        var puertas = (<HTMLInputElement>document.getElementById("cantidadPuertas")).value;
        
        
        
        if (tipoVehiculo === "Auto") {
            
            
            var auto: Auto = new Auto(marca, modelo, parseInt(precio), parseInt(puertas),id);
            vehiculos.push(auto);
            
        }
        else if (tipoVehiculo === "Camioneta") {


            if (tipoCamioneta == "Es4X4") {

                var camioneta: Camioneta = new Camioneta(marca, modelo, parseInt(precio), true,id);
                vehiculos.push(camioneta);
            }
            else {
                var camioneta: Camioneta = new Camioneta(marca, modelo, parseInt(precio), false,id);
                vehiculos.push(camioneta);
            }
        }
        agregarAnimal(vehiculos);

        cerrarGrilla();

    }



    function agregarAnimal(mascotas: Array<Vehiculo>) {

        var marca: string = "";
        var modelo: string = "";
        var precio: any;
        var id: any;
        var detalle: any;
        var tipoVehiculo: string = "";

        var tCuerpo: HTMLTableElement = <HTMLTableElement>document.getElementById("tCuerpo");

        while (tCuerpo.rows.length > 0) {
            tCuerpo.removeChild(tCuerpo.childNodes[0]);
        }



        for (const item of mascotas) {

            id = item.id;
            marca = item.marca;
            modelo = item.modelo;
            precio = item.precio;

            if (item instanceof Auto) {
                tipoVehiculo = "Auto"
                detalle = item.cantidadPuertas;

            }

            else if (item instanceof Camioneta) {
                tipoVehiculo = "Camioneta"

                if (item.cuatroXcuatro) {

                    detalle = "4X4";
                }
                else {
                    detalle = "No es 4x4";
                }

            }

            var btnDel = document.createElement('input');
            btnDel.type = 'button';
            btnDel.className = 'botonEliminar';
            btnDel.value = "Eliminar";            
            btnDel.onclick = function(){eliminarGrilla(mascotas.indexOf(item))};

            var tr: HTMLTableRowElement = document.createElement("tr");

            var td1: HTMLTableDataCellElement = document.createElement("td");
            var nodoTexto = document.createTextNode(id);
            td1.appendChild(nodoTexto);
            tr.appendChild(td1);

            var td2: HTMLTableDataCellElement = document.createElement("td");
            var nodoTexto = document.createTextNode(marca);
            td2.appendChild(nodoTexto);
            tr.appendChild(td2);

            var td3: HTMLTableDataCellElement = document.createElement("td");
            var nodoTexto = document.createTextNode(modelo);
            td3.appendChild(nodoTexto);
            tr.appendChild(td3);

            var td4: HTMLTableDataCellElement = document.createElement("td");
            var nodoTexto = document.createTextNode(precio);
            td4.appendChild(nodoTexto);
            tr.appendChild(td4);

            var td5: HTMLTableDataCellElement = document.createElement("td");
            var nodoTexto = document.createTextNode(tipoVehiculo);
            td5.appendChild(nodoTexto);
            tr.appendChild(td5);

            var td6: HTMLTableDataCellElement = document.createElement("td");
            var nodoTexto = document.createTextNode(detalle);
            td6.appendChild(nodoTexto);
            tr.appendChild(td6);

            var td7: HTMLTableDataCellElement = document.createElement("td");
            td7.appendChild(btnDel);
            tr.appendChild(td7);

            tCuerpo.appendChild(tr);

        }

    }




    function eliminarGrilla(id: number) {

        vehiculos.splice(id , 1);
        agregarAnimal(vehiculos);

    }

}