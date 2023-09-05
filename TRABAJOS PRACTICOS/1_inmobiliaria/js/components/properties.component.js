
export class PropertiesComponent {
    static setTtem(img, title, text, price, bath, garage, bed) {
        let divElement = document.createElement('div');
        divElement.classList.add("col-4");
        divElement.classList.add("md");
        divElement.innerHTML = ` 
        <img src="${img}" alt="Foto propiedad">
        <div class="info">
            <h3 class="title-3">${title}</h3>
            <p>${text}</p>
            <strong class="c-secondary">$${price}</strong>
            <div class="row icons">
                <div class="col"><img src="./assets/img/icono_wc.svg" alt=""> ${bath}</div>
                <div class="col"><img src="./assets/img/icono_estacionamiento.svg" alt="">${garage}</div>
                <div class="col"><img src="./assets/img/icono_dormitorio.svg" alt=""> ${bed}</div>
            </div>
            <button onclick="PropertiesComponent.action('${title}') ">Ver propiedad</button>
        </div>`
        return divElement;
    }
    static action(title) {
        alert("prop " + title)
    }
}