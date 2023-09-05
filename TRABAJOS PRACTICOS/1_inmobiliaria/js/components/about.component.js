
export class AboutComponent {
    static setTtem(img, title, text) {
        let divElement = document.createElement('div');
        divElement.classList.add("col-4");
        divElement.classList.add("md");
        divElement.innerHTML = `
            <img src="${img}" alt="icon ${title}">
            <h3 class="title-3 uppercase">${title}</h3>
            <p>${text}</p>`;
        return divElement;
    }
}