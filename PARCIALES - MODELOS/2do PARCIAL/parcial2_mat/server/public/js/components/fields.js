import { eType } from '../config/interfaces.js';
export class Field {
    constructor(nombre, placeholder = "", isRequired = false, isDisabled = false, isVisible = true) {
        if (!nombre) {
            throw "El field debe tener nombre";
        }
        this.nombre = nombre;
        this.label = nombre.toLowerCase().split('_').join(' ');
        this.label = this.label.charAt(0).toUpperCase() + this.label.slice(1);
        this.placeholder = placeholder;
        this.isRequired = isRequired;
        this.isDisabled = isDisabled;
        this.isVisible = isVisible;
        this.type = eType.text;
        this.element = null;
    }
    createFieldElement() {
        let fieldEl = document.createElement('div');
        fieldEl.setAttribute("id", `field_${this.nombre}`);
        fieldEl.classList.add("field");
        if (!this.isVisible)
            fieldEl.classList.add("hidden");
        return fieldEl;
    }
}
export class FieldTextEmail extends Field {
    constructor(nombre, placeholder, isRequired, isDisabled, isVisible, type = eType.text, maxlength = 0) {
        super(nombre, placeholder, isRequired, isDisabled, isVisible);
        this.type = type;
        this.maxlength = maxlength;
        this.renderField();
    }
    renderField() {
        let fieldEl = this.createFieldElement();
        let maxlength = this.maxlength ? `maxlength=${this.maxlength}` : '';
        fieldEl.innerHTML = `
        <label id="label_${this.nombre}" for="${this.nombre}">${this.label}</label>
        <input id="${this.nombre}" type="${this.type}" name="${this.nombre}" placeholder="${this.placeholder}" ${maxlength}>
        <span id="error_${this.nombre}" class="error-msj">error del campo</span>`;
        let inputEl = fieldEl.childNodes[3];
        inputEl.disabled = this.isDisabled;
        inputEl.required = this.isRequired;
        this.element = fieldEl;
    }
}
export class FieldNumber extends Field {
    constructor(nombre, placeholder, isRequired, isDisabled, isVisible, min, max) {
        super(nombre, placeholder, isRequired, isDisabled, isVisible);
        this.min = min;
        this.max = max;
        this.renderField();
    }
    renderField() {
        let fieldEl = this.createFieldElement();
        let minimo;
        let maximo;
        if (this.min != undefined)
            minimo = `min=${this.min}`;
        else
            minimo = '';
        if (this.max != undefined)
            maximo = `max=${this.max}`;
        else
            maximo = '';
        fieldEl.innerHTML = `
        <label id="label_${this.nombre}" for="${this.nombre}">${this.label}</label>
        <input id="${this.nombre}" type="number" name="${this.nombre}" placeholder="${this.placeholder}" ${minimo} ${maximo}>
        <span id="error_${this.nombre}" class="error-msj">error del campo</span>`;
        let inputEl = fieldEl.childNodes[3];
        inputEl.disabled = this.isDisabled;
        inputEl.required = this.isRequired;
        this.element = fieldEl;
    }
}
export class FieldCheckbox extends Field {
    constructor(nombre, placeholder, isRequired, isDisabled, isVisible) {
        super(nombre, placeholder, isRequired, isDisabled, isVisible);
        this.renderField();
    }
    renderField() {
        let fieldEl = this.createFieldElement();
        fieldEl.classList.add("checkbox");
        fieldEl.innerHTML = `
        <p>${this.label}</p>
        <input id="${this.nombre}" type="checkbox" name="${this.nombre}">
        <label id="label_${this.nombre}" for="${this.nombre}">${this.placeholder}</label>
        <span id="error_${this.nombre}" class="error-msj"></span>`;
        let inputEl = fieldEl.childNodes[3];
        inputEl.disabled = this.isDisabled;
        inputEl.required = this.isRequired;
        this.element = fieldEl;
    }
}
export class FieldTextarea extends Field {
    constructor(nombre, placeholder, isRequired, isDisabled, isVisible, rows = 0) {
        super(nombre, placeholder, isRequired, isDisabled, isVisible);
        this.rows = rows;
        this.renderField();
    }
    renderField() {
        let fieldEl = this.createFieldElement();
        fieldEl.classList.add("w-100");
        let rows = this.rows ? `rows="${this.rows}"` : '';
        fieldEl.innerHTML = `
        <label id="label_${this.nombre}" for="${this.nombre}">${this.label}</label>
        <textarea id="${this.nombre}"${this.placeholder}  type="checkbox" name="${this.nombre}" ${rows} ></textarea>
        <span id="error_${this.nombre}" class="error-msj">error del campo</span>`;
        let inputEl = fieldEl.childNodes[3];
        inputEl.disabled = this.isDisabled;
        inputEl.required = this.isRequired;
        this.element = fieldEl;
    }
}
export class FieldDate extends Field {
    constructor(nombre, placeholder, isRequired, isDisabled, isVisible, min = '', max = '') {
        super(nombre, placeholder, isRequired, isDisabled, isVisible);
        this.min = min;
        this.max = max;
        this.renderField();
    }
    renderField() {
        let fieldEl = this.createFieldElement();
        let minimo = this.min ? `min="${this.min}"` : '';
        let maximo = this.max ? `max="${this.max}"` : '';
        fieldEl.innerHTML = `
        <label id="label_${this.nombre}" for="${this.nombre}">${this.label}</label>
        <input id="${this.nombre}" type="date" name="${this.nombre}" placeholder="${this.placeholder}" ${minimo} ${maximo}>
        <span id="error_${this.nombre}" class="error-msj">error del campo</span>`;
        let inputEl = fieldEl.childNodes[3];
        inputEl.disabled = this.isDisabled;
        inputEl.required = this.isRequired;
        this.element = fieldEl;
    }
}
export class FieldRadio extends Field {
    constructor(nombre, placeholder, isRequired, isDisabled, isVisible, options = []) {
        super(nombre, placeholder, isRequired, isDisabled, isVisible);
        this.options = options;
        this.renderField();
    }
    renderField() {
        let fieldEl = this.createFieldElement();
        fieldEl.classList.add("radio");
        let disabled = this.isDisabled ? `disabled` : '';
        let required = this.isRequired ? `required` : '';
        let optionsElements = "";
        this.options.forEach(option => {
            let key = option.value.toLowerCase().split(' ').join('_').split('-').join('');
            optionsElements += `
            <input type="radio" id="${key}" name="${this.nombre}" value="${option.value}" ${disabled} ${required}>
            <label id="label_${this.nombre}" for="${key}">${option.label}</label>`;
        });
        fieldEl.innerHTML = `
                <p>${this.label}</p>
                ${optionsElements}
                <span id="error_${this.nombre}" class="error-msj">error del campo</span>`;
        this.element = fieldEl;
    }
}
export class FieldSelect extends Field {
    constructor(nombre, placeholder, isRequired, isDisabled, isVisible, options = []) {
        super(nombre, placeholder, isRequired, isDisabled, isVisible);
        this.options = options;
        this.renderField();
    }
    renderField() {
        let fieldEl = this.createFieldElement();
        let optionsElements = `<option value="" disabled selected hidden>${this.placeholder}</option>`;
        this.options.forEach(option => {
            let key = option.value.toLowerCase().split(' ').join('_').split('-').join('');
            optionsElements += `
            <option id="${key}" value="${option.value}">${option.label}</option>`;
        });
        fieldEl.innerHTML = `
                <label id="label_${this.nombre}" for="${this.nombre}">${this.label}</label>
                <select id="${this.nombre}" name="${this.nombre}">
                    ${optionsElements}
                </select>
                <span id="error_${this.nombre}" class="error-msj">error del campo</span>`;
        let inputEl = fieldEl.childNodes[3];
        inputEl.disabled = this.isDisabled;
        inputEl.required = this.isRequired;
        this.element = fieldEl;
    }
}
//# sourceMappingURL=fields.js.map