import { FieldCheckbox } from './fields.js';
import { filterModel } from '../config/field-model.js';
import { MemoryManager } from '../services/memory-manager.js';
export class Filters {
    constructor() {
        this.colsCkBx = [];
        this.filColsContEl = document.getElementById("f_columns");
        this.addCols();
        this.setButons();
        this.byTextEl = document.getElementById("f_texto");
        this.byVacuEl = document.getElementById("f_vacuna");
        this.byAnimEl = document.getElementById("f_animal");
        this.byPrDeEl = document.getElementById("f_precio_d");
        this.byPrHaEl = document.getElementById("f_precio_h");
        this.byNaDeEl = document.getElementById("f_nacido_d");
        this.byNaHaEl = document.getElementById("f_nacido_h");
    }
    addCols() {
        filterModel.forEach((fm) => {
            let field = new FieldCheckbox("fcol-" + fm.nombre, fm.placeholder, fm.isRequired, fm.isDisabled, fm.isVisible);
            this.colsCkBx.push(field);
            field.element.childNodes[1].remove();
            field.element.childNodes[2].checked = fm.isVisible;
            field.element.addEventListener('change', (event) => {
                let checkElement = event.target;
                let checkboxField = this.colsCkBx.find((ckbx) => ckbx.nombre == checkElement.id);
                checkboxField.isVisible = checkElement.checked;
                MemoryManager.instance.filterAndRender();
            });
            this.filColsContEl.appendChild(field.element);
        });
    }
    filterCols(list) {
        this.colsCkBx.forEach(field => {
            if (!field.isVisible) {
                list.forEach((row) => {
                    let att = field.nombre.split("-")[1];
                    delete row[att];
                });
            }
        });
        this.saveFilters();
        return list;
    }
    applyFilters(data) {
        let list = data;
        list = this.onSortBy(list);
        let search = this.byTextEl.value;
        if (search) {
            list = list.filter((row) => {
                return (row.titulo.toLowerCase().includes(search.toLowerCase())
                    || row.descripcion.toLowerCase().includes(search.toLowerCase())
                    || row.raza.toLowerCase().includes(search.toLowerCase()));
            });
        }
        if (this.byVacuEl.value)
            list = list.filter((row) => row.vacunas.toLowerCase().includes(this.byVacuEl.value.toLowerCase()));
        if (this.byAnimEl.value)
            list = list.filter((row) => row.animal.toLowerCase().includes(this.byAnimEl.value.toLowerCase()));
        if (this.byPrDeEl.value)
            list = list.filter((row) => row.precio > parseInt(this.byPrDeEl.value));
        if (this.byPrHaEl.value)
            list = list.filter((row) => row.precio < parseInt(this.byPrHaEl.value));
        if (this.byNaDeEl.value)
            list = list.filter((row) => new Date(row.fecha_de_nacimiento).getTime() > new Date(this.byNaDeEl.value).getTime());
        if (this.byNaHaEl.value)
            list = list.filter((row) => new Date(row.fecha_de_nacimiento).getTime() < new Date(this.byNaHaEl.value).getTime());
        this.dispalyAveragePrice(list);
        this.saveFilters();
        list = this.filterCols(JSON.parse(JSON.stringify(list)));
        return list;
    }
    cleanFilters() {
        this.byTextEl.value = "";
        this.byVacuEl.value = "";
        this.byAnimEl.value = "";
        this.byPrDeEl.value = "";
        this.byPrHaEl.value = "";
        this.byNaDeEl.value = "";
        this.byNaHaEl.value = "";
        MemoryManager.instance.filterAndRender();
    }
    saveFilters() {
        localStorage.setItem('byTextEl', JSON.stringify(this.byTextEl.value));
        localStorage.setItem('byVacuEl', JSON.stringify(this.byVacuEl.value));
        localStorage.setItem('byAnimEl', JSON.stringify(this.byAnimEl.value));
        localStorage.setItem('byPrDeEl', JSON.stringify(this.byPrDeEl.value));
        localStorage.setItem('byPrHaEl', JSON.stringify(this.byPrHaEl.value));
        localStorage.setItem('byNaDeEl', JSON.stringify(this.byNaDeEl.value));
        localStorage.setItem('byNaHaEl', JSON.stringify(this.byNaHaEl.value));
        localStorage.setItem('colsCkBx', JSON.stringify(this.colsCkBx));
    }
    restoreFilters() {
        if (localStorage.getItem('colsCkBx')) {
            this.byTextEl.value = JSON.parse(localStorage.getItem('byTextEl'));
            this.byVacuEl.value = JSON.parse(localStorage.getItem('byVacuEl'));
            this.byAnimEl.value = JSON.parse(localStorage.getItem('byAnimEl'));
            this.byPrDeEl.value = JSON.parse(localStorage.getItem('byPrDeEl'));
            this.byPrHaEl.value = JSON.parse(localStorage.getItem('byPrHaEl'));
            this.byNaDeEl.value = JSON.parse(localStorage.getItem('byNaDeEl'));
            this.byNaHaEl.value = JSON.parse(localStorage.getItem('byNaHaEl'));
            this.colsCkBx = JSON.parse(localStorage.getItem('colsCkBx'));
            this.colsCkBx.forEach((ckBx) => {
                document.getElementById(ckBx.nombre).checked = ckBx.isVisible;
            });
        }
    }
    dispalyAveragePrice(list) {
        let average = list.reduce((a, b) => a + b.precio, 0) / list.length;
        let element = document.getElementById('precioPromedio');
        element.value = Math.round(average).toString();
    }
    onSortBy(list) {
        if (!this.sortBy)
            this.sortBy = "id";
        let sortid = this.sortBy;
        if (this.lastSortBy != sortid) {
            this.lastSortBy = sortid;
            this.sortOrientation = true;
        }
        else {
            this.sortOrientation = !this.sortOrientation;
        }
        let sortAtt = sortid.split("-")[1];
        if (this.sortOrientation) {
            list = list.sort((a, b) => { return (a[sortAtt] < b[sortAtt]) ? -1 : 1; });
        }
        else {
            list = list.sort((a, b) => { return (a[sortAtt] > b[sortAtt]) ? -1 : 1; });
        }
        return list;
    }
    setButons() {
        document.getElementById("btnSearch").onclick = this.onSerch;
        document.getElementById("btnClearFilters").onclick = this.onClean;
    }
    onSerch() {
        MemoryManager.instance.filterAndRender();
    }
    onClean() {
        MemoryManager.instance.filtersInstance.cleanFilters();
    }
}
//# sourceMappingURL=filters.js.map