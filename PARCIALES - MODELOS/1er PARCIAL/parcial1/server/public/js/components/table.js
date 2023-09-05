import { MemoryManager } from "../services/memory-manager.js";
import { fieldsModel } from "../config/field-model.js";

/**
 * Administra el componente tabla
 */
export class Table {
    /* 
    * Crea el elemento tabla y lo retorna 
    */
    static render(tableData) {
        let tableEl = document.createElement('table');

        let theadEl = document.createElement('thead');
        let trEl = document.createElement('tr');
        let key;
        for (let fm of fieldsModel) {
            key = fm.nombre;
            let thEl = document.createElement('th');
            let title = key.toLowerCase().split(' ').join('_').split('-').join('');
            thEl.innerHTML = title
            trEl.appendChild(thEl)
        }
        theadEl.appendChild(trEl)
        tableEl.appendChild(theadEl)


        let tbodyEl = document.createElement('tbody');
        tableData.forEach(trData => {
            let trEl = document.createElement('tr');
            for (let key in trData) {
                let tdEl = document.createElement('td');
                let value = Table.tdValue(key, trData[key])
                tdEl.innerHTML = value;//trData[key];
                tdEl.setAttribute('data-before', key.toLowerCase().split(' ').join('_').split('-').join(''));
                trEl.appendChild(tdEl);
            }
            trEl.onclick = Table.rowClick
            tbodyEl.appendChild(trEl)
        });
        tableEl.appendChild(tbodyEl)

        return tableEl;
    }

    /* 
    * Evalua como se debe renderizar el valor del item en la tabla
     */
    static tdValue(key, value) {
        let renderValue = value;
        for (let fm of fieldsModel) {
            try {
                if (key == fm.nombre) {
                    switch (fm.type) {
                        case "select":
                        case "radio":
                            fm.options.forEach(opt => {
                                if (value == opt.value) renderValue = opt.label
                            });
                            break;

                        case "checkbox":
                            renderValue = JSON.parse(value)
                                ? `<i class="fas fa-check"></i>`
                                : `<i class="fas fa-times"></i>`;
                            break;
                    }
                }
            } catch (error) {
                console.error("error tdValue() en key: " + key);
                console.error(error);
            }
        }
        return renderValue;
    }

    /** 
     * Evento Click en row de la tabla
    */
    static rowClick() {
        /* 
        * Inicialmente hice un toogle del row, pero no me parecio una buena experiencia modificar el item a mitad de la edicion,
        * y lo cambie a que solo seleccione el item, y se cierre el form solo desde el form. 
        */
        if (MemoryManager.instance.formInstance.formElement.classList.contains("close")) {
            let rows = document.querySelectorAll("tbody tr");
            let index = 0
            for (let row of rows) {
                if (row == event.path[1]) {
                    // if (row.classList.contains("active")) {
                    //     row.classList.remove("active");
                    //     MemoryManager.instance.formInstance.cancelEditDataInForm();
                    // } else {
                    MemoryManager.instance.formInstance.editDataInForm(index, row.offsetTop);
                    row.classList.add("active");
                    // }
                    // } else {
                    //     row.classList.remove("active");
                }
                index++;
            }
        }
    }
}