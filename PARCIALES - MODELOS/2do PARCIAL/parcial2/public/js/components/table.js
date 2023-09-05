import { MemoryManager } from "../services/memory-manager.js";
import { fieldsModel } from "../config/field-model.js";
export class Table {
    static render(tableData) {
        let tableEl = document.createElement('table');
        let theadEl = document.createElement('thead');
        let trEl = document.createElement('tr');
        let key;
        for (let col of MemoryManager.instance.filtersInstance.colsCkBx) {
            if (col.isVisible) {
                key = col.placeholder;
                let thEl = document.createElement('th');
                let attr = col.nombre.split("-")[1];
                thEl.setAttribute("id", "sort-" + attr);
                thEl.onclick = Table.colClick;
                let title = key;
                if ("sort-" + attr == MemoryManager.instance.filtersInstance.sortBy) {
                    if (MemoryManager.instance.filtersInstance.sortOrientation) {
                        thEl.innerHTML = `${title} <i class="fas fa-sort-down"></i>`;
                    }
                    else {
                        thEl.innerHTML = `${title} <i class="fas fa-sort-up"></i>`;
                    }
                }
                else {
                    thEl.innerHTML = title;
                }
                trEl.appendChild(thEl);
            }
        }
        theadEl.appendChild(trEl);
        tableEl.appendChild(theadEl);
        let tbodyEl = document.createElement('tbody');
        tableData.forEach(trData => {
            let trEl = document.createElement('tr');
            for (let key in trData) {
                let tdEl = document.createElement('td');
                let value = Table.tdValue(key, trData[key]);
                tdEl.innerHTML = value;
                tdEl.setAttribute('data-before', key.toLowerCase().split('_')[0]);
                trEl.appendChild(tdEl);
            }
            trEl.onclick = Table.rowClick;
            tbodyEl.appendChild(trEl);
        });
        tableEl.appendChild(tbodyEl);
        return tableEl;
    }
    static tdValue(key, value) {
        let renderValue = value;
        for (let fm of fieldsModel) {
            try {
                if (key == fm.nombre) {
                    switch (fm.type) {
                        case "select":
                        case "radio":
                            fm.options.forEach(opt => {
                                if (value == opt.value)
                                    renderValue = opt.label;
                            });
                            break;
                        case "checkbox":
                            renderValue = JSON.parse(value)
                                ? `<i class="fas fa-check"></i>`
                                : `<i class="fas fa-times"></i>`;
                            break;
                    }
                }
            }
            catch (error) {
                console.error("error tdValue() en key: " + key);
                console.error(error);
            }
        }
        return renderValue;
    }
    static rowClick() {
        if (MemoryManager.instance.formInstance.formElement.classList.contains("close")) {
            let rows = [...document.querySelectorAll("tbody tr")];
            let index = 0;
            for (let row of rows) {
                if (row == event.composedPath()[1]) {
                    MemoryManager.instance.formInstance.editDataInForm(index, row.offsetTop);
                    row.classList.add("active");
                }
                index++;
            }
        }
    }
    static colClick() {
        MemoryManager.instance.filtersInstance.sortBy = event.target.id;
        MemoryManager.instance.filterAndRender();
    }
}
//# sourceMappingURL=table.js.map