namespace Personas{

    var listaPersonas:Array<Persona> = new Array<Persona>();

    function PromiseFiltro(listaPersonas:Array<Persona>){

        return new Promise(function(resolve,reject){
         
        let filtro:string = (<HTMLInputElement>document.getElementById("comboFiltro")).value;
        let lista:any;

        (<HTMLInputElement>document.getElementById("promedio")).value = "";

        if(filtro != ""){
            if(filtro == "Hombre"){
             
            let listaAux:Array<Persona> = listaPersonas;

            lista = listaAux.filter(item => {
                if(item instanceof Cliente){
                    if (item.sexo == TipoEnumPersona.Hombre) {
                        return item;   
                    }
                }
            });

            }else{

            let listaAux:Array<Persona> = listaPersonas;

            lista = listaAux.filter(item => {
                if(item instanceof Cliente){
                    if (item.sexo == TipoEnumPersona.Mujer) {
                        return item;   
                    }
                }
            });

            }
        }

        resolve(lista);

        });
    }

    function PromisePromedio(listaPersonas:Array<Persona>){

        return new Promise(function(resolve,reject){
            let filtro:string = (<HTMLInputElement>document.getElementById("comboFiltro")).value;
            let promedio:number = 0;

            if (filtro == "") {
                promedio = listaPersonas.reduce((total, item) => {
    
                    if(item instanceof Cliente){
                        total+=item.edad;
                    }
                    return total;
                }, 0);
    
                promedio = promedio/listaPersonas.length;
                
            } else if (filtro == "Hombre"){
    
                let listaAux:Array<Persona> = listaPersonas;
    
                let lista = listaAux.filter(item => {
                    if(item instanceof Cliente){
                        if(item.sexo == TipoEnumPersona.Hombre){
                            return item;
                        }
                    }
                });
    
                promedio = lista.reduce((total, item) => {
                    if (item instanceof Cliente) {
                         total+=item.edad;
                    }
                    return total
                }, 0);
    
                promedio = promedio/lista.length;
    
            }else if(filtro == "Mujer"){
    
                let listaAux:Array<Persona> = listaPersonas;
    
                let lista = listaAux.filter(item => {
                    if(item instanceof Cliente){
                        if(item.sexo == TipoEnumPersona.Mujer){
                            return item;
                        }
                    }
                });
    
                promedio = lista.reduce((total, item) => {
                    if (item instanceof Cliente) {
                         total+=item.edad;
                    }
                    return total
                }, 0);
    
                promedio = promedio/lista.length;
            }

          resolve(promedio);
        });
      
      }


    //Escucho evento LOAD y asigno funciones a los eventos
    window.addEventListener("load", function () {

        //document.getElementById("vehiculoTipo")?.addEventListener("change", TiposAutomoviles);
        document.getElementById("comboFiltro")?.addEventListener("change", FiltrarLista);

    });

    export function AbrirGrilla(){
        //Seteo boton Guardar
        (<HTMLInputElement>document.getElementById("btnGuardar")).style.display = "block";
        //Oculto boton eliminar
        (<HTMLInputElement>document.getElementById("btnEliminar")).style.display = "none";

        const id = listaPersonas.reduce((cantidadPersonas, item) => {
            
            if(listaPersonas.length > 0){

                if(cantidadPersonas == 0){
                    cantidadPersonas = item.id;
                }

                if(item.id >= cantidadPersonas){
                    cantidadPersonas = item.id + 1;
                }
            }else{
                return cantidadPersonas = 1;
            }

            return cantidadPersonas;
        }, 1);


        (<HTMLInputElement>document.getElementById("personaID")).value = id.toString();
        (<HTMLInputElement>document.getElementById("contGrilla")).style.display = "block";
    }

    export function CerrarGrilla(){
        //Oculto Grilla
        (<HTMLInputElement>document.getElementById("contGrilla")).style.display = "none";
        //Limpio Elementos
        (<HTMLInputElement>document.getElementById("personaID")).value      = "";
        (<HTMLInputElement>document.getElementById("personaNombre")).value  = "";
        (<HTMLInputElement>document.getElementById("personaApellido")).value= "";
        (<HTMLInputElement>document.getElementById("personaEdad")).value    = "";
        (<HTMLInputElement>document.getElementById("personaSexo")).value    = "";
    }

    export function Guardar(){
        
        let sexo:string     = (<HTMLInputElement>document.getElementById("personaSexo")).value;

        let id:number       = parseInt((<HTMLInputElement>document.getElementById("personaID")).value);
        let nombre:string   =(<HTMLInputElement>document.getElementById("personaNombre")).value;
        let apellido:string =(<HTMLInputElement>document.getElementById("personaApellido")).value;
        let edad:number     = parseInt((<HTMLInputElement>document.getElementById("personaEdad")).value);

        if (sexo == "") {
            alert("ELEGIR SEXO ;)");
        }else{
            switch (sexo) {
                case "Hombre":
                    let auxH:Cliente = new Cliente(id, nombre, apellido, edad, TipoEnumPersona.Hombre);
                    listaPersonas.push(auxH);
                break;
                case "Mujer":
                    let auxM:Cliente = new Cliente(id, nombre, apellido, edad, TipoEnumPersona.Mujer);
                    listaPersonas.push(auxM);
                break;
            }
        }

        RefrescarLista(listaPersonas);
        CerrarGrilla();
    }

    export function RefrescarLista(listaPersonas:Array<Persona>) {

        let tCuerpo: HTMLTableElement = <HTMLTableElement>document.getElementById("tCuerpo");

        let id:number;
        let nombre:string;
        let apellido:string;
        let edad:number = 1;
        let sexo:string = "";

        while (tCuerpo.rows.length > 0) {
            tCuerpo.removeChild(tCuerpo.childNodes[0]);
        }

        for (const iterator of listaPersonas) {

            id = iterator.id;
            nombre = iterator.nombre;
            apellido = iterator.apellido;

            if(iterator instanceof Cliente){
                edad = iterator.edad;
                if(iterator.sexo == TipoEnumPersona.Hombre){
                    sexo = "Hombre";
                }else{
                    sexo = "Mujer";
                }
            }

        var tr: HTMLTableRowElement = document.createElement("tr");

        var td1: HTMLTableDataCellElement = document.createElement("td");
        var nodoTexto = document.createTextNode(id.toString());
        td1.appendChild(nodoTexto);
        tr.appendChild(td1);

        var td2: HTMLTableDataCellElement = document.createElement("td");
        var nodoTexto = document.createTextNode(nombre);
        td2.appendChild(nodoTexto);
        tr.appendChild(td2);

        var td3: HTMLTableDataCellElement = document.createElement("td");
        var nodoTexto = document.createTextNode(apellido);
        td3.appendChild(nodoTexto);
        tr.appendChild(td3);

        var td4: HTMLTableDataCellElement = document.createElement("td");
        var nodoTexto = document.createTextNode(edad.toString());
        td4.appendChild(nodoTexto);
        tr.appendChild(td4);

        var td5: HTMLTableDataCellElement = document.createElement("td");
        var nodoTexto = document.createTextNode(sexo);
        td5.appendChild(nodoTexto);
        tr.appendChild(td5);

        tr.addEventListener("dblclick", AbrirGrillaEliminar);

        //Agrego tr a la tabla
        tCuerpo.appendChild(tr);
        }
    }

    export function AbrirGrillaEliminar(event: any) {
        //Muestro tabla
        (<HTMLElement>document.getElementById("contGrilla")).style.display = "block";
        //Oculto boton Guardar
        (<HTMLInputElement>document.getElementById("btnGuardar")).style.display = "none";
        //Muestro boton Eliminar
        (<HTMLInputElement>document.getElementById("btnEliminar")).style.display = "block";
        
        //Escucho evento
        let trClick: any = event.target.parentNode;
        //Traigo informacion de la tabla
        let id: string          = trClick.childNodes[0].innerHTML;
        let nombre: string      = trClick.childNodes[1].innerHTML;
        let apellido: string    = trClick.childNodes[2].innerHTML;
        let edad: string        = trClick.childNodes[3].innerHTML;
        let sexo: string        = trClick.childNodes[4].innerHTML;
        let indexTabla          = trClick.rowIndex;

        (<HTMLInputElement>document.getElementById("personaID")).value      = id;
        (<HTMLInputElement>document.getElementById("personaNombre")).value  = nombre;
        (<HTMLInputElement>document.getElementById("personaApellido")).value= apellido;
        (<HTMLInputElement>document.getElementById("personaEdad")).value    = edad;
        (<HTMLInputElement>document.getElementById("personaSexo")).value    = sexo;

        //Me traigo el boton Eliminar
        var btnDel: HTMLInputElement = <HTMLInputElement>document.getElementById("btnEliminar");

        btnDel.onclick = function () {

            let cantidadDeCajasEnTabla:number = 5;

            for (let index = 0; index < cantidadDeCajasEnTabla; index++) {
                trClick.removeChild(trClick.childNodes[0]);
            }

            listaPersonas.splice(indexTabla - 1, 1);
            CerrarGrilla();
            RefrescarLista(listaPersonas);
        }
    }

    export function LimpiarLista() {

        listaPersonas.splice(0, listaPersonas.length);
        RefrescarLista(listaPersonas);

    }

    export function CalcularPromedio() {
        let promedio:any;
        
        PromisePromedio(listaPersonas).then(response=>{
            promedio = response;
            (<HTMLInputElement>document.getElementById("promedio")).value = promedio;
        });

    }

    export function FiltrarLista() {

        let lista:any;
        
        PromiseFiltro(listaPersonas).then(response=>{
            lista = response;
            RefrescarLista(lista);
        });
    }
}