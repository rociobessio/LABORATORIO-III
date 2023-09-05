import { MemoryManager } from "../services/memory-manager.js";
import { FieldTextEmail, FieldNumber, FieldDate, FieldCheckbox, FieldTextarea, FieldRadio, FieldSelect } from './fields.js';
import { fieldsModel } from '../config/field-model.js';
import { Validate } from "../services/validations.js";
import { eType } from '../config/interfaces.js';
export class Form {
    constructor() {
        this.fields = [];
        this.formElement = document.querySelector(".form");
        this.btnNewElement = document.getElementById("btnNew");
        this.titleElement = document.getElementById("formTitle");
        this.fieldContElement = document.querySelector(".fieldContainer");
        this.createFields();
        this.setButons();
        this.isEdit = false;
    }
    formOpen() {
        Validate.cleanErrors();
        this.formElement.classList.remove("close");
        this.btnNewElement.disabled = true;
    }
    formClose() {
        this.formElement.classList.add("close");
        this.formElement.classList.remove("edit");
        this.btnNewElement.disabled = false;
    }
    addIconAndDefaults() {
        document.querySelector(".form #transaccion").value = "venta";
        let lVaElement = document.getElementById("label_vacunas");
        let lvaText = lVaElement.innerText;
        lVaElement.innerHTML = `<i class="fas fa-syringe"></i> ${lvaText}`;
        let lFeElement = document.getElementById("label_fecha_de_nacimiento");
        let lFeText = lFeElement.innerText;
        lFeElement.innerHTML = `<i class="fas fa-birthday-cake"></i> ${lFeText}`;
        let lRaElement = document.getElementById("label_raza");
        let lRText = lRaElement.innerText;
        lRaElement.innerHTML = `<i class="fas fa-paw"></i> ${lRText}`;
    }
    newDataInForm() {
        this.cleanFormValues();
        this.formOpen();
        this.formElement.setAttribute("style", `top: 0;`);
        this.titleElement.innerHTML = `<i class='fas fa-plus'></i> Nuevo anuncio`;
        this.formElement.classList.remove("edit");
        document.getElementById("btnSubmit").innerHTML = `<i class="fas fa-save"></i> Guardar nuevo`;
        document.getElementById("btnRemove").classList.add("hidden");
        this.addIconAndDefaults();
        this.isEdit = false;
    }
    editDataInForm(index, topPosition) {
        this.cleanFormValues();
        let formData = MemoryManager.instance.data[index];
        this.populateFormValues(formData);
        this.formOpen();
        this.formElement.setAttribute("style", `top: ${topPosition - 25}px;`);
        this.formElement.classList.add("edit");
        this.titleElement.innerHTML = `<i class='fas fa-edit'></i> Editar anuncio ${formData.id}`;
        document.getElementById("btnSubmit").innerHTML = `<i class="fas fa-save"></i> Guardar cambios`;
        document.getElementById("btnRemove").classList.remove("hidden");
        this.isEdit = true;
    }
    cancelEditDataInForm() {
        this.formClose();
        let rows = [...document.querySelectorAll("tbody tr")];
        for (let row of rows) {
            row.classList.remove("active");
        }
    }
    populateFormValues(formData) {
        for (let fm of fieldsModel) {
            try {
                switch (fm.type) {
                    case eType.radio:
                        fm.options.forEach(opt => {
                            let id = opt.value.toLowerCase().split(' ').join('_').split('-').join('');
                            let element = document.getElementById(id);
                            element.checked = (formData[fm.nombre] == element.value);
                        });
                        break;
                    case eType.select:
                        fm.options.forEach(opt => {
                            let id = opt.value.toLowerCase().split(' ').join('_').split('-').join('');
                            let element = document.getElementById(id);
                            element.selected = (formData[fm.nombre] == element.value) ? formData[fm.nombre] : undefined;
                        });
                        break;
                    case eType.checkbox:
                        let element = document.getElementById(fm.nombre);
                        element.checked = JSON.parse(formData[fm.nombre]);
                        break;
                    default:
                        document.getElementById(fm.nombre).value = formData[fm.nombre];
                        break;
                }
            }
            catch (error) {
                console.error("error populateFormValues() en id: " + fm.nombre);
                console.error(error);
            }
        }
    }
    readFormValues() {
        let request = {};
        for (let fm of fieldsModel) {
            let value = "";
            let keyValue;
            try {
                switch (fm.type) {
                    case "radio":
                        fm.options.forEach(opt => {
                            let id = opt.value.toLowerCase().split(' ').join('_').split('-').join('');
                            let element = document.getElementById(id);
                            if (element.checked) {
                                value = element.value;
                            }
                        });
                        break;
                    case "select":
                        value = document.getElementById(fm.nombre).value;
                        break;
                    case "checkbox":
                        value = document.getElementById(fm.nombre).checked;
                        break;
                    case "number":
                        value = parseInt(document.getElementById(fm.nombre).value);
                        break;
                    default:
                        value = document.getElementById(fm.nombre).value;
                        break;
                }
                keyValue = { [fm.nombre]: value };
                request = Object.assign(Object.assign({}, request), keyValue);
            }
            catch (error) {
                console.error("error readFormValues() en id: " + fm.nombre + " " + value);
                console.error(error);
            }
        }
        return request;
    }
    cleanFormValues(cleanID = true) {
        for (let fm of fieldsModel) {
            if (!(!cleanID && fm.nombre == "id")) {
                try {
                    switch (fm.type) {
                        case "radio":
                            fm.options.forEach(opt => {
                                let id = opt.value.toLowerCase().split(' ').join('_').split('-').join('');
                                let element = document.getElementById(id);
                                element.checked = false;
                            });
                            break;
                        case "checkbox":
                            document.getElementById(fm.nombre).checked = false;
                            break;
                        default:
                            document.getElementById(fm.nombre).value = "";
                            break;
                    }
                }
                catch (error) {
                    console.error("error cleanFormValues() en id: " + fm.nombre);
                    console.error(error);
                }
            }
        }
    }
    createFields() {
        fieldsModel.forEach(fm => {
            let fInst;
            switch (fm.type) {
                case "number":
                    fInst = new FieldNumber(fm.nombre, fm.placeholder, fm.isRequired, fm.isDisabled, fm.isVisible, fm.min, fm.max);
                    break;
                case "date":
                    fInst = new FieldDate(fm.nombre, fm.placeholder, fm.isRequired, fm.isDisabled, fm.isVisible, fm.min, fm.max);
                    break;
                case "checkbox":
                    fInst = new FieldCheckbox(fm.nombre, fm.placeholder, fm.isRequired, fm.isDisabled, fm.isVisible);
                    break;
                case "textarea":
                    fInst = new FieldTextarea(fm.nombre, fm.placeholder, fm.isRequired, fm.isDisabled, fm.isVisible, fm.rows);
                    break;
                case "radio":
                    fInst = new FieldRadio(fm.nombre, fm.placeholder, fm.isRequired, fm.isDisabled, fm.isVisible, fm.options);
                    break;
                case "select":
                    fInst = new FieldSelect(fm.nombre, fm.placeholder, fm.isRequired, fm.isDisabled, fm.isVisible, fm.options);
                    break;
                default:
                    fInst = new FieldTextEmail(fm.nombre, fm.placeholder, fm.isRequired, fm.isDisabled, fm.isVisible, fm.type, fm.maxlength);
                    break;
            }
            this.fields.push(fInst);
            this.fieldContElement.appendChild(fInst.element);
        });
        console.log("%cFields instances: ", "color: green", this.fields);
    }
    setButons() {
        document.getElementById("btnSubmit").onclick = this.onSubmit;
        document.getElementById("btnRemove").onclick = this.onRemove;
        document.getElementById("btnClear").onclick = this.onClear;
        document.getElementById("btnCancel").onclick = this.onCancel;
        document.getElementById("btnCancelX").onclick = this.onCancel;
        document.getElementById("btnNew").onclick = this.onNew;
    }
    onNew() {
        MemoryManager.instance.formInstance.newDataInForm();
    }
    onSubmit() {
        event.preventDefault();
        MemoryManager.instance.saveEditData();
    }
    onRemove() {
        event.preventDefault();
        if (confirm("¿Esta seguro que desea eliminar los datos?"))
            MemoryManager.instance.removeData();
    }
    onCancel() {
        event.preventDefault();
        MemoryManager.instance.formInstance.cancelEditDataInForm();
    }
    onClear() {
        event.preventDefault();
        if (confirm("¿Esta seguro que desea vaciar los campos?"))
            MemoryManager.instance.formInstance.cleanFormValues(false);
    }
}
//# sourceMappingURL=form.js.map