export class BlogComponent {
    static setTtem(img, title, text, date, by) {
        let articleElement = document.createElement('article');
        articleElement.classList.add("row");
        articleElement.innerHTML = ` 
            <div class="col-4 sm "><img src="${img}" alt="Foto propiedad"></div>
            <div class="col-8 sm ">
                <h3 class="title-3">${title}</h3>
                <hr>
                <p>Escrito el: <strong class="c-secondary">${date}</strong> por: <strong class="c-secondary">${by}</strong></p>
                <p>${text}</p>
            </div>`;
        return articleElement;
    }
}
