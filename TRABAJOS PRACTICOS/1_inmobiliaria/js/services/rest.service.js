// ? Ejemplo simple
// var data = {};
// fetch('./assets/json/translations.json')
//     .then(function (response) {
//         return response.json();
//     })
//     .catch(function (error) {
//         console.log('Hubo un problema con la petición Fetch:' + error.message);
//     })
//     .then(function (d) {
//         data = d;
//         renderComponents()
//     });


export function call(URI, request) {

    let myBody = JSON.stringify(request);
    let header = {
        "content-type": "application/json",

    }

    const timer = new Promise((resolve) => {
        setTimeout(resolve, 100000, {
            timeout: true,
        });
    });
    return Promise.race([
        timer, 
        fetch(URI, {
            method: 'post',
            headers: header,
            body: myBody
            }).catch(() => {
                let message = "Error al establecer la conexión.";
                throw new ServiceResult(NaN, message);
            })
        ])


        .then((res) => {
            // console.log("res",res)
            if (res.timeout) {
                // console.error('fetch timeout')
                let message = "Error de Timeout";
                return new ServiceResult(1, message)
            }

            if (res.status == 200) {
                if (URI == "session") {
                    this._jwt = res.headers.get("jwtToken")
                }
            } else {
                let message = "Error de conexion: '" + URI + "' - status: " + res.status.toString();
                throw new ServiceResult(NaN, message);
            }
            return res.json();
        })
        // .catch((error) => {
        //     // console.error('fetch Error:' + URI + ':', error)
        //     let message = "Existen altas probabilidades que se le este enviando fruta a backend.\nFavor de revisar";
        //     throw new ServiceResult(NaN, message);
        // })
        
        
        .then((response) => {
            // console.log("response",response)
            return response;
        })

}

export class ServiceResult {
    cod;
    message;
    data;

    constructor(cod, message, data) {
        this.cod = cod;
        this.message = message;
        this.data = data;
    }
}


