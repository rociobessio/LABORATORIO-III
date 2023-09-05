import { FieldCheckbox } from './fields.js';
import { filterModel } from '../config/field-model.js';
import { Anuncio_Mascota } from '../config/datos-modelo.js';
import { MemoryManager } from '../services/memory-manager.js';


export class Filters {
    constructor() {
        this.filColsContEl = document.getElementById("f_columns");
        this.addCols();
        this.setButons();
        this.byTextEl = document.getElementById("f_texto") as HTMLInputElement;
        this.byVacuEl = document.getElementById("f_vacuna") as HTMLInputElement;
        this.byAnimEl = document.getElementById("f_animal") as HTMLInputElement;
        this.byPrDeEl = document.getElementById("f_precio_d") as HTMLInputElement;
        this.byPrHaEl = document.getElementById("f_precio_h") as HTMLInputElement;
        this.byNaDeEl = document.getElementById("f_nacido_d") as HTMLInputElement;
        this.byNaHaEl = document.getElementById("f_nacido_h") as HTMLInputElement;
    }
    public filColsContEl: HTMLElement
    public colsCkBx: FieldCheckbox[] = []
    // public visibleCols:any[] = []

    private byTextEl: HTMLInputElement
    private byVacuEl: HTMLInputElement
    private byAnimEl: HTMLInputElement
    private byPrDeEl: HTMLInputElement
    private byPrHaEl: HTMLInputElement
    private byNaDeEl: HTMLInputElement
    private byNaHaEl: HTMLInputElement

    public sortBy: string;
    private lastSortBy: string;
    public sortOrientation: boolean;

    // #region Filtros de atributos
    /** Crea los checkbox para filtrar las columnas */
    private addCols() {
        filterModel.forEach((fm) => {
            let field: FieldCheckbox = new FieldCheckbox("fcol-" + fm.nombre, fm.placeholder, fm.isRequired, fm.isDisabled, fm.isVisible);
            this.colsCkBx.push(field);
            field.element.childNodes[1].remove();
            (field.element.childNodes[2] as HTMLInputElement).checked = fm.isVisible

            field.element.addEventListener('change', (event) => {
                let checkElement: HTMLInputElement = event.target as HTMLInputElement;
                let checkboxField: FieldCheckbox = this.colsCkBx.find((ckbx) => ckbx.nombre == checkElement.id);
                checkboxField.isVisible = checkElement.checked;
                MemoryManager.instance.filterAndRender();
            })

            this.filColsContEl.appendChild(field.element)
        });
    }

    /** Filtra los atributos de los objetos de la lista */
    private filterCols(list: any[]): any[] {
        this.colsCkBx.forEach(field => {
            if (!field.isVisible) {
                list.forEach((row) => {
                    let att: string = (field.nombre as string).split("-")[1];
                    delete row[att];
                })
            }
        });
        this.saveFilters();
        return list;
    }
    // #endregion

    // #region Filtros de filas
    /** Filtra la lista con los datos del form filtros */
    public applyFilters(data: Anuncio_Mascota[]): any[] {
        let list: Anuncio_Mascota[] = data;
        list = this.onSortBy(list);

        // filtrar por texto en strings
        let search: string = this.byTextEl.value
        if (search) {
            list = list.filter((row) => {
                return (
                    (row.titulo as string).toLowerCase().includes(search.toLowerCase())
                    // || (row.transaccion as string).toLowerCase().includes(search.toLowerCase())
                    || (row.descripcion as string).toLowerCase().includes(search.toLowerCase())
                    // || (row.animal as string).toLowerCase().includes(search.toLowerCase()) 
                    || (row.raza as string).toLowerCase().includes(search.toLowerCase())
                    // || (row.vacunas as string).toLowerCase().includes(search.toLowerCase())
                )
            });
        }

        if (this.byVacuEl.value) // filtrar por vacunas
            list = list.filter((row) => (row.vacunas as string).toLowerCase().includes(this.byVacuEl.value.toLowerCase()));

        if (this.byAnimEl.value) // filtrar por animal
            list = list.filter((row) => (row.animal as string).toLowerCase().includes(this.byAnimEl.value.toLowerCase()));

        if (this.byPrDeEl.value) // filtrar por precio desde
            list = list.filter((row) => row.precio > parseInt(this.byPrDeEl.value));

        if (this.byPrHaEl.value) // filtrar por precio hasta
            list = list.filter((row) => row.precio < parseInt(this.byPrHaEl.value));

        if (this.byNaDeEl.value) // filtrar por nacido desde
            list = list.filter((row) => new Date(row.fecha_de_nacimiento).getTime() > new Date(this.byNaDeEl.value).getTime());

        if (this.byNaHaEl.value) // filtrar por nacido hasta
            list = list.filter((row) => new Date(row.fecha_de_nacimiento).getTime() < new Date(this.byNaHaEl.value).getTime());

        this.dispalyAveragePrice(list);

        this.saveFilters()

        list = this.filterCols(JSON.parse(JSON.stringify(list)));

        return list
    }
    // #endregion

    // #region localstorage

    /** Limpia los fields del form de filtros */
    public cleanFilters() {
        this.byTextEl.value = "";
        this.byVacuEl.value = "";
        this.byAnimEl.value = "";
        this.byPrDeEl.value = "";
        this.byPrHaEl.value = "";
        this.byNaDeEl.value = "";
        this.byNaHaEl.value = "";

        // resetear checkbox tambien
        // this.colsCkBx.forEach((ckBx)=>{
        //     (document.getElementById(ckBx.nombre) as HTMLInputElement).checked = true;
        // })
        MemoryManager.instance.filterAndRender();
    }

    /** Guarda en localstorage los fields del form de filtros */
    public saveFilters() {
        localStorage.setItem('byTextEl', JSON.stringify(this.byTextEl.value));
        localStorage.setItem('byVacuEl', JSON.stringify(this.byVacuEl.value));
        localStorage.setItem('byAnimEl', JSON.stringify(this.byAnimEl.value));
        localStorage.setItem('byPrDeEl', JSON.stringify(this.byPrDeEl.value));
        localStorage.setItem('byPrHaEl', JSON.stringify(this.byPrHaEl.value));
        localStorage.setItem('byNaDeEl', JSON.stringify(this.byNaDeEl.value));
        localStorage.setItem('byNaHaEl', JSON.stringify(this.byNaHaEl.value));
        localStorage.setItem('colsCkBx', JSON.stringify(this.colsCkBx));
    }

    /** Recupera del localstorage los fields del form de filtros */
    public restoreFilters() {
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
                (document.getElementById(ckBx.nombre) as HTMLInputElement).checked = ckBx.isVisible;
            })
        }
    }
    // #endregion
    public dispalyAveragePrice(list: Anuncio_Mascota[]): void{

        let average = list.reduce((a,b) => a + b.precio, 0) / list.length;
        let element = document.getElementById('precioPromedio') as HTMLInputElement;
        element.value = Math.round(average).toString();
    }
    public onSortBy(list: Anuncio_Mascota[]): Anuncio_Mascota[] {
        if (!this.sortBy) this.sortBy = "id";
        let sortid = this.sortBy;

        if (this.lastSortBy != sortid) {
            this.lastSortBy = sortid;
            this.sortOrientation = true;
        } else {
            this.sortOrientation = !this.sortOrientation;
        }
        let sortAtt = sortid.split("-")[1];
        // console.log(sortAtt)
        if (this.sortOrientation) {
            list = list.sort((a, b) => { return (a[sortAtt] < b[sortAtt]) ? -1 : 1 })
        } else {
            list = list.sort((a, b) => { return (a[sortAtt] > b[sortAtt]) ? -1 : 1 })
        }

        return list;
    }

    // #region Buttons
    private setButons() {
        document.getElementById("btnSearch").onclick = this.onSerch;
        document.getElementById("btnClearFilters").onclick = this.onClean;
    }
    private onSerch() {
        MemoryManager.instance.filterAndRender();
    }
    private onClean() {
        MemoryManager.instance.filtersInstance.cleanFilters();
    }
    // #endregion

}