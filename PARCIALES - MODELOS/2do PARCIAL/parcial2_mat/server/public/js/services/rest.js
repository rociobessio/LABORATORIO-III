var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MemoryManager } from './memory-manager.js';
export class restXHR {
    static get(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            loading.addL();
            return new Promise((resolve, reject) => {
                console.log("%crestXHR.get", "color:blue;");
                let xhr = new XMLHttpRequest();
                xhr.onreadystatechange = () => {
                    if (xhr.readyState == 4) {
                        loading.removeL();
                        if (xhr.status == 200) {
                            console.log("xhr.responseText", JSON.parse(xhr.responseText));
                            resolve(JSON.parse(xhr.responseText));
                        }
                        else {
                            console.log(xhr.status + " " + xhr.statusText);
                            resolve(null);
                            alert("No se pudieron obtener los datos");
                        }
                    }
                };
                xhr.open('GET', `${restXHR.url}${resource}`);
                xhr.send();
            });
        });
    }
    static post(resource, params, header) {
        return __awaiter(this, void 0, void 0, function* () {
            loading.addL();
            return new Promise((resolve, reject) => {
                console.log("%crestXHR.post", "color:blue;");
                let rBody;
                let rHeader;
                if (params && typeof params === 'object') {
                    rBody = JSON.stringify(params);
                }
                else {
                    rBody = params;
                }
                rHeader = !header ? [{ att: "content-type", value: "application/json" }] : header;
                let xhr = new XMLHttpRequest();
                xhr.onreadystatechange = () => {
                    if (xhr.readyState == 4) {
                        loading.removeL();
                        if (xhr.status == 200) {
                            console.log("xhr.responseText", JSON.parse(xhr.responseText));
                            resolve(JSON.parse(xhr.responseText));
                        }
                        else {
                            console.log(xhr.status + " " + xhr.statusText);
                            resolve(null);
                            alert("No se pudo completar la operacion");
                        }
                    }
                };
                xhr.open('POST', `${restXHR.url}${resource}`);
                console.log(rHeader);
                rHeader.forEach(h => {
                    xhr.setRequestHeader(h.att, h.value);
                });
                xhr.send(rBody);
            });
        });
    }
}
restXHR.url = "http://localhost:3000/";
export class loading {
    static addL() {
        let loadingEl = document.createElement('div');
        loadingEl.classList.add("loading");
        loadingEl.innerHTML = `<img src="./assets/img/loading.png" class="spiner" alt="loading" >`;
        let bodyEl = document.querySelector("body");
        bodyEl.appendChild(loadingEl);
    }
    static removeL() {
        let bodyEl = document.querySelector("body");
        bodyEl.removeChild(document.querySelector(".loading"));
    }
}
export class restFetch {
    static get(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("%crestFetch.get", "color:blue;");
            loading.addL();
            return new Promise((resolve, reject) => {
                fetch(`${restXHR.url}${resource}`)
                    .then((res) => {
                    return res.json();
                })
                    .then((data) => {
                    console.log("%cResponse: ", "color:blue", data);
                    loading.removeL();
                    resolve(data);
                })
                    .catch((err) => {
                    loading.removeL();
                    resolve(null);
                    alert("No se pudieron obtener los datos");
                });
            });
        });
    }
    static post(resource, params, header) {
        return __awaiter(this, void 0, void 0, function* () {
            loading.addL();
            return new Promise((resolve, reject) => {
                console.log("%crestFetch.post", "color:blue;");
                let rBody;
                let rHeader;
                if (params && typeof params === 'object') {
                    rBody = JSON.stringify(params);
                }
                else {
                    rBody = params;
                }
                rHeader = !header ? { "content-type": "application/json" } : header;
                fetch(`${restXHR.url}${resource}`, {
                    method: 'post',
                    headers: rHeader,
                    body: rBody
                })
                    .then((res) => {
                    return res.json();
                })
                    .then((data) => {
                    console.log("%cResponse: ", "color:blue", data);
                    loading.removeL();
                    resolve(data);
                })
                    .catch((err) => {
                    loading.removeL();
                    resolve(null);
                    alert("No se pudo completar la operacion");
                });
            });
        });
    }
}
restFetch.url = "http://localhost:3000/";
export class restJquery {
    static get(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            loading.addL();
            return new Promise((resolve, reject) => {
                console.log("%crestJquery.get", "color:blue;");
                $.get(`${restJquery.url}${resource}`, function (data) {
                    resolve(data);
                })
                    .fail(function (err) {
                    console.error("Error post: " + resource, err);
                    resolve(null);
                    alert("No se pudieron obtener los datos");
                })
                    .always(function () {
                    loading.removeL();
                });
            });
        });
    }
    static post(resource, params, header) {
        return __awaiter(this, void 0, void 0, function* () {
            loading.addL();
            return new Promise((resolve, reject) => {
                console.log("%crestJquery.post", "color:blue;");
                let rBody;
                let rHeader;
                if (params && typeof params === 'object') {
                    rBody = JSON.stringify(params);
                }
                else {
                    rBody = params;
                }
                rHeader = !header ? { "content-type": "application/json" } : header;
                $.ajax({
                    url: `${restJquery.url}${resource}`,
                    type: 'post',
                    data: rBody,
                    headers: rHeader,
                    success: function (data) {
                        console.info(data);
                        resolve(data);
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert("No se pudo completar la operacion");
                    }
                })
                    .always(function () {
                    loading.removeL();
                });
            });
        });
    }
}
restJquery.url = "http://localhost:3000/";
export class restLocaltorage {
    static gets(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                console.log("%crestLocaltorage.get", "color:blue;");
                let data;
                try {
                    data = localStorage.getItem("data");
                    if (data)
                        data = JSON.parse(data);
                }
                catch (error) {
                    data = [];
                    alert("No se pudieron obtener los datos");
                }
                console.log("restLocaltorage data ", data);
                resolve(data);
            });
        });
    }
    static post(resource, params, header) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                console.log("%crestLocaltorage.post", "color:blue;");
                let list = [...MemoryManager.instance.data];
                if (resource == "alta") {
                    let id = Math.max(...list.map((e) => e.id)) + 1;
                    params.id = id;
                    list.push(params);
                }
                else if (resource == "modificar") {
                    list = list.map((item) => item = (item.id == params.id)
                        ? params
                        : item);
                }
                else if (resource == "baja") {
                    let id = parseInt(params.split("=")[1]);
                    if (typeof id == "number") {
                        list = list.filter((item) => item.id != id);
                    }
                    else {
                        console.log("delete error", id);
                    }
                }
                else {
                    resolve(null);
                    alert("No se pudo completar la operacion");
                }
                let data = { data: list };
                localStorage.setItem("data", JSON.stringify(data));
                resolve(data);
            });
        });
    }
}
//# sourceMappingURL=rest.js.map