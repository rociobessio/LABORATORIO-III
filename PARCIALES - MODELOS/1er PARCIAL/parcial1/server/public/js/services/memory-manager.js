import { Table } from '../components/table.js';
import { Form } from '../components/form.js';
import { restXHR, restFetch } from './rest.js';
import { Validate } from './validations.js';
import { fieldsModel } from "../config/field-model.js";
import { ASCIIArt } from '../config/ascii-art.js';
import { Anuncio_Mascota } from '../config/datos-modelo.js';

/**
 * Administra la memoria de la aplicacion
 */
export class MemoryManager {
    constructor() {
        if (MemoryManager._instance) {
            throw "No se puede crear otra instancia de MemoryManager";
        }
        MemoryManager._instance = this;
        console.log(ASCIIArt);
        this.formInstance = new Form();
        // this.data = [];
    }
    static get instance() {
        if (!this._instance)
            new MemoryManager();
        return this._instance;
    }
    static _instance;

    tableElement;
    containerElement;
    formInstance;
    data;
    selectID;


    /**
     * Valida que la informacion recibida sea este correctamente tipada
     */
    validateTypes(data) {
        console.log(" ")
        console.log("%cValidate types", "color: green;")
        if (data[0]) {
            for (let rItem in data[0]) {
                let valid = false;
                for (let fm of fieldsModel) {
                    if (fm.nombre == rItem) valid = true;
                    // console.log("  -",fm.nombre)
                }
                let validColor = valid ? "green" : "red";
                console.log(`  ${rItem}:%c ${valid}`, `color: ${validColor};`);
            }
        }
    }

    crearObjetoAnuncio(data) {
        console.log("data", data)
        let lista = []
        data.forEach(item => {
            let anuncio = new Anuncio_Mascota(
                item.id,
                item.titulo,
                item.transaccion,
                item.descripcion,
                item.precio,
                item.animal,
                item.raza,
                item.fecha_de_nacimiento,
                item.vacunas);
            lista.push(anuncio);
        });

        console.log("anuncios", lista)
        return lista;
    }
    /**
     * Ejecuta la llamada para obtener la info 
     */
    readAndRender() {
        restXHR.get("traer").then(
            // restFetch.get("traer").then(
            (response) => {
                if (!this.containerElement)
                    this.containerElement = document.getElementById("container");
                if (this.tableElement)
                    this.containerElement.removeChild(this.tableElement);
                let noDataEl = document.querySelector(".sindatos");
                if (noDataEl)
                    this.containerElement.removeChild(noDataEl);

                this.data = this.validateTypes(response.data)
                this.data = this.crearObjetoAnuncio(response.data);
                this.tableElement = Table.render(this.data);
                this.containerElement.appendChild(this.tableElement);
            }
        )
    }

    /**
     * Ejecuta las llamadas para agregar o editar un item 
     */
    saveEditData() {
        let dto = this.formInstance.readFormValues();
        if (Validate.form(dto)) {
            if (this.formInstance.isEdit) {
                console.log("%cDTO Edit: ", "color:blue", dto)
                // restXHR.post("modificar", dto).then(
                restFetch.post("modificar", dto).then(
                    () => {
                        this.formInstance.formClose();
                        this.readAndRender()
                    }
                )

            } else {
                console.log("%cDTO New: ", "color:blue", dto)
                restXHR.post("alta", dto).then(
                    // restFetch.post("alta", dto).then(
                    () => {
                        this.formInstance.formClose();
                        this.readAndRender()
                    }
                )
            }
        }
    }

    /**
     * Ejecuta la llamada para borrar un item 
     */
    removeData() {
        let id = this.formInstance.readFormValues().id;
        let params = `id=${id}`;
        console.log("%cDelete: ", "color:blue", params)
        let header = [{ att: "content-type", value: "application/x-www-form-urlencoded" }]
        restXHR.post("baja", params, header).then(
            // let headerFetch = { "content-type": "application/x-www-form-urlencoded" }
            // restFetch.post("baja", params, headerFetch).then(
            () => {
                this.formInstance.formClose();
                this.readAndRender()
            }
        )
    }
}
