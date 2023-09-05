/**
 * Configuracion del modelo de datos para form y tabla
 */
export const fieldsModel = [
    { type: "text", nombre: "id", placeholder: "Ingrese id", isRequired: true, isDisabled: true, isVisible: false, min: 1 },
    { type: "text", nombre: "titulo", placeholder: "Ingrese el titulo", isRequired: true, isDisabled: false, isVisible: true},
    { type: "text", nombre: "transaccion", placeholder: "Ingrese la transaccion", isRequired: true, isDisabled: true, isVisible: true},
    { type: "textarea", nombre: "descripcion", placeholder: "Ingrese la descripcion", isRequired: true, isDisabled: false, isVisible: true, rows: 2 },
    { type: "number", nombre: "precio", placeholder: "Ingrese numero", isRequired: true, isDisabled: false, isVisible: true, min: 1},
    {
        type: "radio", nombre: "animal", placeholder: "Selecione un animal", isRequired: true, isDisabled: false, isVisible: true, options: [
            { value: "perro", label: "Perro" },
            { value: "gato", label: "Gato" }
        ]
    },
    
    { type: "text", nombre: "raza", placeholder: "Ingrese la raza", isRequired: true, isDisabled: false, isVisible: true, maxlength: 10 },
    { type: "date", nombre: "fecha_de_nacimiento", placeholder: "Ingrese fecha", isRequired: true, isDisabled: false, isVisible: true},
    {
        type: "select", nombre: "vacunas", placeholder: "----Elegir----", isRequired: true, isDisabled: false, isVisible: true, options: [
            { value: "si", label: "Si" },
            { value: "no", label: "No" }
        ]
    },
    // { type: "email", nombre: "email", placeholder: "Ingrese email", isRequired: true, isDisabled: false, isVisible: true, maxlength: 40 },
    // { type: "checkbox", nombre: "checkbox", placeholder: "Ingrese checkbox", isRequired: true, isDisabled: false, isVisible: true },


    
    // { type: "text", nombre: "id", placeholder: "Ingrese id", isRequired: true, isDisabled: true, isVisible: false, min: 1 },
    // { type: "text", nombre: "titulo", placeholder: "Ingrese el titulo", isRequired: true, isDisabled: false, isVisible: true, maxlength: 10 },
    // { type: "text", nombre: "Transaccion", placeholder: "Ingrese la transaccion", isRequired: true, isDisabled: false, isVisible: true, maxlength: 10 },
    // { type: "textarea", nombre: "descripcion", placeholder: "Ingrese la descripcion", isRequired: true, isDisabled: false, isVisible: true, rows: 4 },
    // { type: "number", nombre: "precio", placeholder: "Ingrese numero", isRequired: true, isDisabled: false, isVisible: true, min: 1, max: 5 },
    // {
    //     type: "radio", nombre: "animal", placeholder: "Selecione un animal", isRequired: true, isDisabled: false, isVisible: true, options: [
    //         { value: "Perro", label: "Perro" },
    //         { value: "Gato", label: "Gato" }
    //     ]
    // },
    
    // { type: "text", nombre: "Raza", placeholder: "Ingrese la raza", isRequired: true, isDisabled: false, isVisible: true, maxlength: 10 },
    // { type: "date", nombre: "Fecha de nacimiento", placeholder: "Ingrese fecha", isRequired: true, isDisabled: false, isVisible: true, min: "2000-01-02", max: "2020-12-31" },
    // {
    //     type: "select", nombre: "Vacunas", placeholder: "----Elegir----", isRequired: true, isDisabled: false, isVisible: true, options: [
    //         { value: "Si", label: "Si" },
    //         { value: "No", label: "No" }
    //     ]
    // },
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