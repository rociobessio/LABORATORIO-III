import { MemoryManager } from "../services/memory-manager.js";
import { FieldTextEmail, FieldNumber, FieldDate, FieldCheckbox, FieldTextarea, FieldRadio, FieldSelect } from './fields.js';
import { fieldsModel } from '../config/field-model.js';
import { Validate } from "../services/validations.js";
/**
 * Administra el componente Form
 */
export class Form {

    constructor() {
        this.fields = []
        this.formElement = document.querySelector(".form");
        this.btnNewElement = document.getElementById("btnNew");
        this.titleElement = document.getElementById("formTitle");
        this.fieldContElement = document.querySelector(".fieldContainer");
        this.renderFields();
        this.setButons();
    }
    formElement;
    fieldContElement;
    fields;
    btnNewElement;
    titleElement;
    isEdit;

    // #region Form
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
    addIconAndDefaults(){
        this.formElement.transaccion.value = "venta";

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
    // editDataInForm(id, trElement) {
    editDataInForm(index, topPosition) {
        this.cleanFormValues();
        let formData = MemoryManager.instance.data[index];
        this.populateFormValues(formData)

        this.formOpen();
        this.formElement.setAttribute("style", `top: ${topPosition - 25}px;`);
        this.formElement.classList.add("edit");
        this.titleElement.innerHTML = `<i class='fas fa-edit'></i> Editar anuncio ${formData.id}`;
        document.getElementById("btnSubmit").innerHTML = `<i class="fas fa-save"></i> Guardar cambios`;
        document.getElementById("btnRemove").classList.remove("hidden");
        // this.addIconAndDefaults();
        this.isEdit = true;
    }
    cancelEditDataInForm() {
        this.formClose();
        let rows = document.querySelectorAll("tbody tr");
        for (let row of rows) {
            row.classList.remove("active");
        }
    }
    populateFormValues(formData) {
        for (let fm of fieldsModel) {
            try {
                switch (fm.type) {
                    case "radio":
                        fm.options.forEach(opt => {
                            let id = opt.value.toLowerCase().split(' ').join('_').split('-').join('');
                            let element = document.getElementById(id);
                            element.checked = (formData[fm.nombre] == element.value)
                        });
                        break;
                    case "select":
                        fm.options.forEach(opt => {
                            let id = opt.value.toLowerCase().split(' ').join('_').split('-').join('');
                            let element = document.getElementById(id);
                            element.selected = (formData[fm.nombre] == element.value)
                        });
                        break;
                    case "checkbox":
                        document.getElementById(fm.nombre).checked = JSON.parse(formData[fm.nombre]);
                        break;

                    default:
                        document.getElementById(fm.nombre).value = formData[fm.nombre];
                        break;
                }
            } catch (error) {
                console.error("error populateFormValues() en id: " + fm.nombre);
                console.error(error);
            }
        }
        // }
    }
    readFormValues() {
        let request = {}
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
                        value = document.getElementById(fm.nombre).value
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
                request = { ...request, ...keyValue };
            } catch (error) {
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
                } catch (error) {
                    console.error("error cleanFormValues() en id: " + fm.nombre);
                    console.error(error);
                }
            }
        }
    }
    // #endregion

    // #region Fields
    renderFields() {
        fieldsModel.forEach(field => {
            let fInst;
            switch (field.type) {
                case "number":
                    fInst = new FieldNumber(field.nombre, field.placeholder, field.isRequired, field.isDisabled, field.isVisible, field.min, field.max);
                    break;
                case "date":
                    fInst = new FieldDate(field.nombre, field.placeholder, field.isRequired, field.isDisabled, field.isVisible, field.min, field.max);
                    break;
                case "checkbox":
                    fInst = new FieldCheckbox(field.nombre, field.placeholder, field.isRequired, field.isDisabled, field.isVisible);
                    break;
                case "textarea":
                    fInst = new FieldTextarea(field.nombre, field.placeholder, field.isRequired, field.isDisabled, field.isVisible, field.rows, field.cols);
                    break;
                case "radio":
                    fInst = new FieldRadio(field.nombre, field.placeholder, field.isRequired, field.isDisabled, field.isVisible, field.options);
                    break;
                case "select":
                    fInst = new FieldSelect(field.nombre, field.placeholder, field.isRequired, field.isDisabled, field.isVisible, field.options);
                    break;

                default:
                    fInst = new FieldTextEmail(field.nombre, field.placeholder, field.isRequired, field.isDisabled, field.isVisible, field.type, field.maxlength);
                    break;
            }
            this.fields.push(fInst);
            this.fieldContElement.appendChild(fInst.element);
        });
        console.log("%cFields instances: ", "color: green", this.fields)
    }
    // #endregion

    // #region Buttons
    setButons() {
        // this.formElement.onclick = this.onSubmit;
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
    // #endregion



}