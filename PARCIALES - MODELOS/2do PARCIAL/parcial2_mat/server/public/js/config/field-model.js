import { eType } from './interfaces.js';
export var fNames;
(function (fNames) {
    fNames["id"] = "id";
    fNames["titulo"] = "titulo";
    fNames["transaccion"] = "transaccion";
    fNames["descripcion"] = "descripcion";
    fNames["precio"] = "precio";
    fNames["animal"] = "animal";
    fNames["raza"] = "raza";
    fNames["fecha_de_nacimiento"] = "fecha_de_nacimiento";
    fNames["vacunas"] = "vacunas";
})(fNames || (fNames = {}));
export const filterModel = [
    { type: eType.checkbox, nombre: fNames.id, placeholder: "Id", isRequired: true, isDisabled: false, isVisible: true },
    { type: eType.checkbox, nombre: fNames.titulo, placeholder: "Título", isRequired: true, isDisabled: false, isVisible: true },
    { type: eType.checkbox, nombre: fNames.transaccion, placeholder: "Transacción", isRequired: true, isDisabled: false, isVisible: true },
    { type: eType.checkbox, nombre: fNames.descripcion, placeholder: "Descripción", isRequired: true, isDisabled: false, isVisible: true },
    { type: eType.checkbox, nombre: fNames.precio, placeholder: "Precio", isRequired: true, isDisabled: false, isVisible: true },
    { type: eType.checkbox, nombre: fNames.animal, placeholder: "Animal", isRequired: true, isDisabled: false, isVisible: true },
    { type: eType.checkbox, nombre: fNames.raza, placeholder: "Raza", isRequired: true, isDisabled: false, isVisible: true },
    { type: eType.checkbox, nombre: fNames.fecha_de_nacimiento, placeholder: "Fecha nacimiento", isRequired: true, isDisabled: false, isVisible: true },
    { type: eType.checkbox, nombre: fNames.vacunas, placeholder: "Vacunas", isRequired: true, isDisabled: false, isVisible: true }
];
export const fieldsModel = [
    { type: eType.text, nombre: fNames.id, placeholder: "Ingrese id", isRequired: true, isDisabled: true, isVisible: false, min: 1 },
    { type: eType.text, nombre: fNames.titulo, placeholder: "Ingrese el titulo", isRequired: true, isDisabled: false, isVisible: true },
    { type: eType.text, nombre: fNames.transaccion, placeholder: "Ingrese la transaccion", isRequired: true, isDisabled: true, isVisible: true },
    { type: eType.textarea, nombre: fNames.descripcion, placeholder: "Ingrese la descripcion", isRequired: true, isDisabled: false, isVisible: true, rows: 2 },
    { type: eType.number, nombre: fNames.precio, placeholder: "Ingrese numero", isRequired: true, isDisabled: false, isVisible: true, min: 1 },
    { type: eType.radio, nombre: fNames.animal, placeholder: "Selecione un animal", isRequired: true, isDisabled: false, isVisible: true, options: [
            { value: "perro", label: "Perro" },
            { value: "gato", label: "Gato" }
        ] },
    { type: eType.text, nombre: fNames.raza, placeholder: "Ingrese la raza", isRequired: true, isDisabled: false, isVisible: true, maxlength: 10 },
    { type: eType.date, nombre: fNames.fecha_de_nacimiento, placeholder: "Ingrese fecha", isRequired: true, isDisabled: false, isVisible: true },
    { type: eType.select, nombre: fNames.vacunas, placeholder: "----Elegir----", isRequired: true, isDisabled: false, isVisible: true, options: [
            { value: "si", label: "Si" },
            { value: "no", label: "No" }
        ] }
];
//# sourceMappingURL=field-model.js.map