/**
 * Configuracion del modelo de datos para form y tabla
 */
export const fieldsModel = [
    { type: "text", nombre: "id", placeholder: "Ingrese id", isRequired: true, isDisabled: true, isVisible: false, min: 1 },
    { type: "text", nombre: "text", placeholder: "Ingrese texto", isRequired: true, isDisabled: false, isVisible: true, maxlength: 10 },
    { type: "email", nombre: "email", placeholder: "Ingrese email", isRequired: true, isDisabled: false, isVisible: true, maxlength: 40 },
    { type: "number", nombre: "number", placeholder: "Ingrese numero", isRequired: true, isDisabled: false, isVisible: true, min: 1, max: 5 },
    { type: "date", nombre: "date", placeholder: "Ingrese fecha", isRequired: true, isDisabled: false, isVisible: true, min: "2000-01-02", max: "2020-12-31" },
    { type: "checkbox", nombre: "checkbox", placeholder: "Ingrese checkbox", isRequired: true, isDisabled: false, isVisible: true },
    { type: "textarea", nombre: "textarea", placeholder: "Ingrese textarea", isRequired: true, isDisabled: false, isVisible: true, rows: 4 },
    { type: "radio", nombre: "radio", placeholder: "selecione un radio", isRequired: true, isDisabled: false, isVisible: true, options: [
            { value: "Hombre", label: "Un Hombre" },
            { value: "Mujer", label: "Una Mujer" },
            { value: "Otro", label: "Otro" }
        ]
    },
    { type: "select", nombre: "select", placeholder: "selecione una opcion", isRequired: true, isDisabled: false, isVisible: true, options: [
            { value: "AR", label: "Argentina" },
            { value: "CH", label: "Chile" },
            { value: "BR", label: "Brasil" }
        ]
    },


    // { type: "number", nombre: "id", placeholder: "", isRequired: false, isDisabled: true, isVisible: true },
    // { type: "text", nombre: "titulo", placeholder: "Ingrese el titulo", isRequired: true, isDisabled: false, isVisible: true },
    // { type: "radio", nombre: "transaccion", placeholder: "tipo de operacion", isRequired: false, isDisabled: false, isVisible: true, options: ["venta", "alquiler"] },
    // { type: "textarea", nombre: "descripcion", placeholder: "Ingrese una descripciond e la propiedad", isRequired: true, isDisabled: false, isVisible: true, rows: 4 },
    // { type: "number", nombre: "precio", placeholder: "Ingrese el precio", isRequired: true, isDisabled: false, isVisible: true, min: 1000 },
    // { type: "number", nombre: "num_wc", placeholder: "Ingrese Cantidad", isRequired: true, isDisabled: false, isVisible: true, min: 0 },
    // { type: "number", nombre: "num_estacionamiento", placeholder: "Ingrese Cantidad", isRequired: true, isDisabled: false, isVisible: true, min: 0 },
    // { type: "number", nombre: "num_dormitorio", placeholder: "Ingrese Cantidad", isRequired: true, isDisabled: false, isVisible: true, min: 0, max: 5 },
]

/*
text, email :: maxlength="10"
number      :: min="0" max="5"
textarea:   :: rows="10"
checkbox
date        :: min="2000-01-02" max="2020-12-31"
radio       :: options
select:     :: options
*/