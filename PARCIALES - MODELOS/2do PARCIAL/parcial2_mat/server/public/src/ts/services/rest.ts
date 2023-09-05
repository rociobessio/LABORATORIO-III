import { MemoryManager } from './memory-manager.js';
import { Anuncio_Mascota } from '../config/datos-modelo.js';

/** Administra los request de la aplicacion con XMLHttpRequest */
export class restXHR {
    static url = "http://localhost:3000/";

    /**
     * Ejecuta el Request con el metodo Get y con el resource indicado, con la Web Api XMLHttpRequest
     */
    static async get(resource) {
        loading.addL();
        return new Promise((resolve, reject) => {
            console.log("%crestXHR.get", "color:blue;");
            let xhr = new XMLHttpRequest();

            xhr.onreadystatechange = () => {
                // console.log("xhr.readyState", xhr.readyState);
                if (xhr.readyState == 4) {
                    loading.removeL();
                    if (xhr.status == 200) {
                        console.log("xhr.responseText", JSON.parse(xhr.responseText))
                        resolve(JSON.parse(xhr.responseText))
                    } else {
                        console.log(xhr.status + " " + xhr.statusText)
                        // reject(JSON.parse(xhr.responseText))
                        resolve(null);
                        // ? MAnejo el error dentro del metodo por eso no retorno el reject()
                        alert("No se pudieron obtener los datos");
                    }
                }
            }
            xhr.open('GET', `${restXHR.url}${resource}`);
            xhr.send()
        })
    }

    /**
     * Ejecuta el Request con el metodo Post, el resource, parametros y header indicado, con la Web Api XMLHttpRequest
     */
    static async post(resource: string, params: object | string, header?: iXHRHeader[]) {
        loading.addL();
        return new Promise((resolve, reject) => {
            console.log("%crestXHR.post", "color:blue;");
            // defaults
            let rBody;
            let rHeader;
            if (params && typeof params === 'object') {
                rBody = JSON.stringify(params);
            } else {
                rBody = params
            }
            rHeader = !header ? [{ att: "content-type", value: "application/json" }] : header

            // call
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                // console.log("xhr.readyState", xhr.readyState);
                if (xhr.readyState == 4) {
                    loading.removeL();
                    if (xhr.status == 200) {
                        console.log("xhr.responseText", JSON.parse(xhr.responseText))
                        resolve(JSON.parse(xhr.responseText))
                    } else {
                        console.log(xhr.status + " " + xhr.statusText)
                        // reject(JSON.parse(xhr.responseText))
                        resolve(null);
                        // ? MAnejo el error dentro del metodo por eso no retorno el reject()
                        alert("No se pudo completar la operacion");
                    }
                }
            }
            xhr.open('POST', `${restXHR.url}${resource}`);
            console.log(rHeader)
            rHeader.forEach(h => {
                xhr.setRequestHeader(h.att, h.value);
            });
            xhr.send(rBody)
        })
    }

}
/** Administra add/remove loading */
export class loading {
    /**
     * Agrega al DOM el elemento loading
     */
    static addL() {
        let loadingEl = document.createElement('div');
        loadingEl.classList.add("loading");
        // loadingEl.innerHTML = `<img src="./assets/img/loading.gif" class="spiner" alt="loading" >`
        loadingEl.innerHTML = `<img src="./assets/img/loading.png" class="spiner" alt="loading" >`
        let bodyEl = document.querySelector("body");
        bodyEl.appendChild(loadingEl)
    }

    /**
     * Agrega del DOM el elemento loading
     */
    static removeL() {
        let bodyEl = document.querySelector("body");
        bodyEl.removeChild(document.querySelector(".loading"))
    }
}

/** Administra los request de la aplicacion con fetch */
export class restFetch {
    static url = "http://localhost:3000/";

    /**
     * Ejecuta el Request con el metodo Get, con el resource indicado y la Web Api fetch
     */
    static async get(resource) {
        console.log("%crestFetch.get", "color:blue;");
        loading.addL();
        return new Promise((resolve, reject) => {
            fetch(`${restXHR.url}${resource}`)
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    console.log("%cResponse: ", "color:blue", data);
                    loading.removeL();
                    resolve(data)
                })
                .catch((err) => {
                    // console.error("Error get: " + resource, err);
                    loading.removeL();
                    // reject(err);
                    resolve(null);
                    // ? MAnejo el error dentro del metodo por eso no retorno el reject()
                    alert("No se pudieron obtener los datos");
                })
        })
    }

    /**
     * Ejecuta el Request con el metodo Post, el resource, parametros y header indicado, con la Web Api fetch
     */
    static async post(resource: string, params: object | string, header?: iFetchHeader) {
        loading.addL();
        return new Promise((resolve, reject) => {
            console.log("%crestFetch.post", "color:blue;");
            // defaults
            let rBody;
            let rHeader;
            if (params && typeof params === 'object') {
                rBody = JSON.stringify(params);
            } else {
                rBody = params
            }
            rHeader = !header ? { "content-type": "application/json" } : header

            // call
            fetch(`${restXHR.url}${resource}`, {
                method: 'post',
                headers: rHeader,
                body: rBody
            })
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    console.log("%cResponse: ", "color:blue", data);
                    loading.removeL();
                    resolve(data)
                })
                .catch((err) => {
                    // console.error("Error post: " + resource, err);
                    loading.removeL();
                    // reject(err);
                    // ? MAnejo el error dentro del metodo por eso no retorno el reject() 
                    resolve(null);
                    alert("No se pudo completar la operacion");
                })
        })
    }

}

export interface iXHRHeader {
    att: string;
    value: string;
}
export interface iFetchHeader {
    "content-type": string;
}


/** Administra los request de la aplicacion con jquey */
export class restJquery {
    static url = "http://localhost:3000/";

    /** Ejecuta el Request con el metodo Get, con el resource indicado y con jquey */
    static async get(resource) {
        loading.addL();
        return new Promise((resolve, reject) => {
            console.log("%crestJquery.get", "color:blue;");
            $.get(`${restJquery.url}${resource}`, function (data) {
                resolve(data)
            })
                .fail(function (err) {
                    console.error("Error post: " + resource, err);
                    // ? MAnejo el error dentro del metodo por eso no retorno el reject() 
                    resolve(null);
                    alert("No se pudieron obtener los datos");
                })
                .always(function () {
                    loading.removeL();
                });
        })
    }

    /** Ejecuta el Request con el metodo Post, el resource, parametros y header indicado, con con jquey */
    static async post(resource: string, params: object | string, header?: iFetchHeader) {
        loading.addL();
        return new Promise((resolve, reject) => {
            console.log("%crestJquery.post", "color:blue;");
            // defaults
            let rBody;
            let rHeader;
            if (params && typeof params === 'object') {
                rBody = JSON.stringify(params);
            } else {
                rBody = params
            }
            rHeader = !header ? { "content-type": "application/json" } : header
            $.ajax({
                url: `${restJquery.url}${resource}`,
                type: 'post',
                data: rBody,
                headers: rHeader,
                success: function (data) {
                    console.info(data);
                    resolve(data)
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("No se pudo completar la operacion");
                }
            })
                .always(function () {
                    loading.removeL();
                });
        });
    }

}

export class restLocaltorage {

    /** Ejecuta el Request con el metodo Get, con el resource indicado y con jquey */
    static async gets(resource) {
        // loading.addL();
        return new Promise((resolve, reject) => {
            console.log("%crestLocaltorage.get", "color:blue;");
            let data
            try {
                data = localStorage.getItem("data");
                if (data) data = JSON.parse(data);
            } catch (error) {
                data = []
                alert("No se pudieron obtener los datos");
            }

            console.log("restLocaltorage data ", data);
            resolve(data)
            // loading.removeL();

            // .fail(function (err) {
            //     console.error("Error post: " + resource, err);
            //     // ? MAnejo el error dentro del metodo por eso no retorno el reject() 
            //     resolve(null);
            //     alert("No se pudieron obtener los datos");
            // })
        })
    }

    /** Ejecuta el Request con el metodo Post, el resource, parametros y header indicado, con con jquey */
    static async post(resource: string, params: object | string, header?: iFetchHeader) {
        // loading.addL();
        return new Promise((resolve, reject) => {
            console.log("%crestLocaltorage.post", "color:blue;");
            let list = [...MemoryManager.instance.data]

            if (resource == "alta") {
                let id = Math.max(...list.map((e) => e.id)) + 1;
                (params as Anuncio_Mascota).id = id
                list.push(params as Anuncio_Mascota)

            } else if (resource == "modificar") {
                list = list.map((item) => item = (item.id == (params as Anuncio_Mascota).id)
                    ? (params as Anuncio_Mascota)
                    : item)

            } else if (resource == "baja") {
                // console.log("params", params)
                let id: number = parseInt((params as string).split("=")[1])
                if (typeof id == "number") { list = list.filter((item) => item.id != id) }
                else { console.log("delete error", id) }

            } else {
                resolve(null)
                alert("No se pudo completar la operacion");
            }
            let data = { data: list }
            // console.log("localStorage data", data)
            localStorage.setItem("data", JSON.stringify(data));
            resolve(data)
            // loading.removeL();
        });
    }


}