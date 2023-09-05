import { MemoryManager } from "../services/memory-manager.js";
import { FieldTextEmail, FieldNumber, FieldDate, FieldCheckbox, FieldTextarea, FieldRadio, FieldSelect, Field } from './fields.js';
import { fieldsModel } from '../config/field-model.js';
import { Validate } from "../services/validations.js";
import { Anuncio_Mascota } from '../config/datos-modelo.js';
import { eType } from '../config/interfaces.js';
/**
 * Administra el componente Form
 */
export class Form {

    constructor() {
        this.fields = []
        this.formElement = document.querySelector(".form") as HTMLElement & Anuncio_Mascota;
        this.btnNewElement = document.getElementById("btnNew") as HTMLButtonElement;
        this.titleElement = document.getElementById("formTitle") as HTMLElement;
        this.fieldContElement = document.querySelector(".fieldContainer") as HTMLElement;
        this.createFields();
        this.setButons();
        this.isEdit = false;
    }
    private fieldContElement: HTMLElement;
    private btnNewElement: HTMLButtonElement;
    private titleElement: HTMLElement;
    public formElement: HTMLElement & Anuncio_Mascota;
    public fields: Field[];
    public isEdit: boolean;

    // #region Form
    public formOpen() {
        Validate.cleanErrors();
        this.formElement.classList.remove("close");
        this.btnNewElement.disabled = true;
    }
    public formClose() {
        this.formElement.classList.add("close");
        this.formElement.classList.remove("edit");
        this.btnNewElement.disabled = false;
    }

    /** Agrega los iconos pedidos en la consigna del PDF */
    private addIconAndDefaults() {
        (document.querySelector(".form #transaccion") as HTMLInputElement).value = "venta";

        let lVaElement: HTMLElement = document.getElementById("label_vacunas") as HTMLElement;
        let lvaText: string = lVaElement.innerText;
        lVaElement.innerHTML = `<i class="fas fa-syringe"></i> ${lvaText}`;

        let lFeElement: HTMLElement = document.getElementById("label_fecha_de_nacimiento") as HTMLElement;
        let lFeText: string = lFeElement.innerText;
        lFeElement.innerHTML = `<i class="fas fa-birthday-cake"></i> ${lFeText}`;

        let lRaElement: HTMLElement = document.getElementById("label_raza") as HTMLElement;
        let lRText: string = lRaElement.innerText;
        lRaElement.innerHTML = `<i class="fas fa-paw"></i> ${lRText}`;
    }

    /** Prepara el fomulario para agregar un nuevo item a la lista */
    private newDataInForm() {
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
    
    /** Prepara el fomulario para editar un item de la lista */
    public editDataInForm(index: number, topPosition: number) {
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

    /** Cancela la edicion del form*/
    private cancelEditDataInForm() {
        this.formClose();
        let rows: Element[] = [...document.querySelectorAll("tbody tr")];
        for (let row of rows) {
            row.classList.remove("active");
        }
    }

    /** Popula los datos del item en el fomulario para su edicion */
    private populateFormValues(formData: any) {
        for (let fm of fieldsModel) {
            try {
                switch (fm.type) {
                    case eType.radio:
                        fm.options.forEach(opt => {
                            let id = opt.value.toLowerCase().split(' ').join('_').split('-').join('');
                            let element: HTMLInputElement = document.getElementById(id) as HTMLInputElement;
                            element.checked = (formData[fm.nombre] == element.value)
                        });
                        break;
                    case eType.select:
                        fm.options.forEach(opt => {
                            let id = opt.value.toLowerCase().split(' ').join('_').split('-').join('');
                            let element: HTMLOptionElement = document.getElementById(id) as HTMLOptionElement;
                            element.selected = (formData[fm.nombre] == element.value) ? formData[fm.nombre] : undefined
                         
                        });
                        break;
                    case eType.checkbox:
                        let element: HTMLInputElement = document.getElementById(fm.nombre) as HTMLInputElement
                        element.checked = JSON.parse(formData[fm.nombre]);
                        break;

                    default:
                        (document.getElementById(fm.nombre) as HTMLInputElement).value = formData[fm.nombre];
                        break;
                }
            } catch (error) {
                console.error("error populateFormValues() en id: " + fm.nombre);
                console.error(error);
            }
        }
        // }
    }

    /** Lee los datos del form y los retorna */
    public readFormValues(): Anuncio_Mascota | any {
        let request = {}
        for (let fm of fieldsModel) {
            let value: any = "";
            let keyValue;
            try {
                switch (fm.type) {
                    case "radio":
                        fm.options.forEach(opt => {
                            let id = opt.value.toLowerCase().split(' ').join('_').split('-').join('');
                            let element: HTMLInputElement = document.getElementById(id) as HTMLInputElement;
                            if (element.checked) {
                                value = element.value;
                            }
                        });
                        break;

                    case "select":
                        value = (document.getElementById(fm.nombre) as HTMLSelectElement).value
                        break;

                    case "checkbox":
                        value = (document.getElementById(fm.nombre) as HTMLInputElement).checked;
                        break;

                    case "number":
                        value = parseInt((document.getElementById(fm.nombre) as HTMLInputElement).value);
                        break;

                    default:
                        value = (document.getElementById(fm.nombre) as HTMLInputElement).value;
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

    /** Vacia los datos de los fields del fomulario */
    private cleanFormValues(cleanID = true): void {
        for (let fm of fieldsModel) {
            if (!(!cleanID && fm.nombre == "id")) {
                try {
                    switch (fm.type) {
                        case "radio":
                            fm.options.forEach(opt => {
                                let id = opt.value.toLowerCase().split(' ').join('_').split('-').join('');
                                let element:HTMLInputElement = document.getElementById(id) as HTMLInputElement;
                                element.checked = false;
                            });
                            break;

                        case "checkbox":
                            (document.getElementById(fm.nombre) as HTMLInputElement).checked = false;
                            break;

                        default:
                            (document.getElementById(fm.nombre) as HTMLInputElement).value = "";
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
    /** Crea los fields del formulario en base a la configuracion */
    private createFields() {
        fieldsModel.forEach(fm => {
            let fInst;
            switch (fm.type) {
                case "number":
                    fInst = new FieldNumber(fm.nombre, fm.placeholder, fm.isRequired, fm.isDisabled, fm.isVisible, fm.min as number, fm.max as number);
                    break;
                case "date":
                    fInst = new FieldDate(fm.nombre, fm.placeholder, fm.isRequired, fm.isDisabled, fm.isVisible, fm.min as string, fm.max as string);
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
        console.log("%cFields instances: ", "color: green", this.fields)
    }
    // #endregion

    // #region Buttons
    private setButons() {
        // this.formElement.onclick = this.onSubmit;
        document.getElementById("btnSubmit").onclick = this.onSubmit;
        document.getElementById("btnRemove").onclick = this.onRemove;
        document.getElementById("btnClear").onclick = this.onClear;
        document.getElementById("btnCancel").onclick = this.onCancel;
        document.getElementById("btnCancelX").onclick = this.onCancel;
        document.getElementById("btnNew").onclick = this.onNew;
    }
    private onNew() {
        MemoryManager.instance.formInstance.newDataInForm();
    }
    private onSubmit() {
        event.preventDefault();
        MemoryManager.instance.saveEditData();
    }
    private onRemove() {
        event.preventDefault();
        if (confirm("¿Esta seguro que desea eliminar los datos?"))
            MemoryManager.instance.removeData();
    }
    private onCancel() {
        event.preventDefault();
        MemoryManager.instance.formInstance.cancelEditDataInForm();
    }
    private onClear() {
        event.preventDefault();
        if (confirm("¿Esta seguro que desea vaciar los campos?"))
            MemoryManager.instance.formInstance.cleanFormValues(false);
    }
    // #endregion



}