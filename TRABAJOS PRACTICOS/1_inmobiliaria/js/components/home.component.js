import { AboutComponent } from "./about.component.js";
import { PropertiesComponent } from "./properties.component.js";
import { BlogComponent } from "./blog.component.js";
import { call } from "../services/rest.service.js";

export class HomeComponent {
    data
    constructor() {
        call('./assets/json/translations.json').then(
            (res) => {
                console.log("call res", res);
                this.data = res;
                this.renderComponents() 
            }
        ).catch(
            (err) => console.log("call err", err)
        )
    }

    renderStaticComponents() {
        var aboutCont = document.getElementById("aboutData");
        this.data.about.us.forEach(item => {
            let element = AboutComponent.setTtem(item.img, item.title, item.text);
            aboutCont.appendChild(element)
        });
        var propertiesCont = document.getElementById("propertiesData");
        this.data.properties.prop.forEach(item => {
            let element = PropertiesComponent.setTtem(item.img, item.title, item.text, item.price, item.bath, item.garage, item.bed);
            propertiesCont.appendChild(element)
        });
    }
    removeArticle(blogCont) {
        let articles = blogCont.getElementsByTagName("article")
        // console.log("remove", articles)
        if (articles && articles.length > 1) {
            // console.log("remove", articles[0])
            articles[0].remove()
        }
    }
    addArticle(blogCont,i) {
        let edata = this.data.blog.articles[i]
        let element = BlogComponent.setTtem(edata.img, edata.title, edata.text, edata.date, edata.by)
        blogCont.appendChild(element)
        setTimeout(() => {
            element.classList.add('in');
            // console.log(element)

            // console.log(i)
        }, 10);
    }
    renderBlogComponents() {
        // var blogArticles = [];
        // this.data.blog.articles.forEach(item => {
        //     blogArticles.push(BlogComponent.setTtem(item.img, item.title, item.text, item.date, item.by));
        // });

        let blogCont = document.getElementById("blogData");

        var i = 0
        this.addArticle(blogCont,i)
        setInterval(() => {
            this.removeArticle(blogCont)
            setTimeout(() => {
                i++
                if (i >= this.data.blog.articles.length) {
                    i = 0;
                }
                this.addArticle(blogCont,i);
            }, 0);
        }, 7000);
    }
    renderComponents() {
        this.renderStaticComponents()
        this.renderBlogComponents()
    }
}