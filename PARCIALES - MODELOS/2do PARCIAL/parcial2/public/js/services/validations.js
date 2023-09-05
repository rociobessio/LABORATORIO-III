import { fieldsModel } from "../config/field-model.js";
export class Validate {
    static cleanErrors() {
        let fields = document.querySelectorAll(".field");
        for (let field of fields) {
            field.classList.remove("error");
        }
    }
    static addError(fieldName, msj) {
        document.getElementById(`field_${fieldName}`).classList.add("error");
        document.getElementById(`error_${fieldName}`).innerText = msj;
    }
    static form(formdata) {
        console.log(" ");
        console.log("%cValidate Form", "color: green;", formdata);
        let valid = true;
        Validate.cleanErrors();
        let date = new Date(formdata.fecha_de_nacimiento);
        if (date.getTime() > Date.now()) {
            Validate.addError("fecha_de_nacimiento", "La fecha debe ser anterior a la fecha de hoy");
            valid = false;
        }
        valid = Validate.vRquired(formdata, valid);
        let color = valid ? "green" : "red";
        console.log(`  isValid:%c${valid}`, `color: ${color};`);
        return valid;
    }
    static vEmail(email) {
        return !Validate.mailformat.test(email);
    }
    static vRquired(formdata, valid) {
        for (let fm of fieldsModel) {
            for (let id in formdata) {
                if (fm.nombre == id) {
                    if (fm.isRequired && !formdata[id] && id != "id") {
                        Validate.addError(id, "Este Campo es oblicatorio");
                        valid = false;
                    }
                }
            }
        }
        return valid;
    }
}
Validate.mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//# sourceMappingURL=validations.js.map