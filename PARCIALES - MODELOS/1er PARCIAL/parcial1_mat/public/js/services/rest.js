
/**
 * Administra los request de la aplicacion con XMLHttpRequest
 */
export class restXHR {
    static url = "http://localhost:3000/";

    /**
     * Ejecuta el Request con el metodo Get y con el resource indicado, con la Web Api XMLHttpRequest
     */
    static async get(resource) {
        loading.addL();
        return new Promise((resolve, reject) => {
            console.log("%crestXHR.get", "color:blue");
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
    static async post(resource, params, header) {
        loading.addL();
        return new Promise((resolve, reject) => {
            console.log("%crestXHR.post", "color:blue");
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
/**
 * Administra add/remove loading
 */
export class loading {
    /**
     * Agrega al DOM el elemento loading
     */
    static addL() {
        let loadingEl = document.createElement('div');
        loadingEl.classList.add("loading");
        loadingEl.innerHTML = `<img src="./assets/img/loading.svg" alt="loading" >`
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

/**
 * Administra los request de la aplicacion con fetch
 */
export class restFetch {
    static url = "http://localhost:3000/";

    /**
     * Ejecuta el Request con el metodo Get, con el resource indicado y la Web Api fetch
     */
    static async get(resource) {
        console.log("%crestFetch.get", "color:blue");
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
    static async post(resource, params, header) {
        loading.addL();
        return new Promise((resolve, reject) => {
            console.log("%crestFetch.post", "color:blue");
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


// ? Pruebas

// let alta = {
//     id: "2",
//     titulo: "Mansion de Lujo",
//     transaccion: "alquiler",
//     descripcion: "Mansion de lujo con helipuerto a un precio irresistible. Ideal para transportarse facilmente",
//     precio: "$5,310,0000",
//     num_wc: "4",
//     num_estacionamiento: "4",
//     num_dormitorio: "7",
//     active: "true"
// }

// let header = [{att:"content-type", value:"application/x-www-form-urlencoded"}]
// let headerFetch = {"content-type": "application/x-www-form-urlencoded" }
// let baja = `id=${3}`


// let modificar = {
//     id: "2",
//     titulo: "Casucha de cuarta",
//     transaccion: "alquiler",
//     descripcion: "Mansion de cuarta con 4 paredes a un precio demasiado alto para lo que es. Ideal para pasarla mal",
//     precio: "$1000",
//     num_wc: "1",
//     num_estacionamiento: "0",
//     num_dormitorio: "1",
//     active: "true"
// }

//? XHR
// restXHR.get("traer").then(
//     (d)=>{data = d} 
// )
// restXHR.post("alta",alta).then(
//     (d)=>{data = d} 
// )
// restXHR.post("baja",baja,header).then(
//     (d)=>{data = d} 
// )
// restXHR.post("modificar",modificar).then(
//     (d)=>{data = d} 
// )

//? fetch
// restFetch.get("traer").then(
//     (d)=>{data = d} 
// )
// restFetch.post("alta",alta).then(
//     (d)=>{data = d} 
// )
// restFetch.post("baja",baja,headerFetch).then(
//     (d)=>{data = d} 
// )
// restFetch.post("modificar",modificar).then(
//     (d)=>{data = d} 
// )