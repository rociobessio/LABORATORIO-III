import { HomeComponent } from "./components/home.component.js";

var h = new HomeComponent()

//? http://placeimg.com/480/320/any
//? http://mockaroo.com

// import { AboutComponent } from "./components/about.component.js";
// import { PropertiesComponent } from "./components/properties.component.js";
// import { BlogComponent } from "./components/blog.component.js";
// import { call } from "./services/rest.service.js";


// var data = {};
// call('./assets/json/translations.json').then(
//     (res) => {
//         console.log("call res", res)
//         data = res;
//         renderComponents()
//     }
// ).catch(
//     (err) => console.log("call err", err),
// )



// function renderStaticComponents() {
//     var aboutCont = document.getElementById("aboutData");
//     data.about.us.forEach(item => {
//         let element = AboutComponent.setTtem(item.img, item.title, item.text);
//         aboutCont.appendChild(element)
//     });
//     var propertiesCont = document.getElementById("propertiesData");
//     data.properties.prop.forEach(item => {
//         let element = PropertiesComponent.setTtem(item.img, item.title, item.text, item.price, item.bath, item.garage, item.bed);
//         propertiesCont.appendChild(element)
//     });
// }
// function renderBlogComponents() {
//     // var blogArticles = [];
//     // data.blog.articles.forEach(item => {
//     //     blogArticles.push(BlogComponent.setTtem(item.img, item.title, item.text, item.date, item.by));
//     // });

//     var blogCont = document.getElementById("blogData");
    
//     function removeArticle() {
//         let articles = blogCont.getElementsByTagName("article")
//         // console.log("remove", articles)
//         if (articles && articles.length > 1 ) {
//             // console.log("remove", articles[0])
//             articles[0].remove()
//         }
//     }
//     function addArticle() {
//         let edata = data.blog.articles[i]
//         let element = BlogComponent.setTtem(edata.img, edata.title, edata.text, edata.date, edata.by)
//         blogCont.appendChild(element)
//         setTimeout(() => {
//             element.classList.add('in');
//             // console.log(element)
            
//             // console.log(i)
//         }, 10);
//     }
//     var i = 0
//     addArticle()
//     setInterval(() => {
//         removeArticle();
//         setTimeout(() => {
//             i++
//             if (i >= data.blog.articles.length) {
//                 i = 0;
//             }
//             addArticle();
//         }, 0);
//     }, 7000);
// }
// function renderComponents() {
//     renderStaticComponents()
//     renderBlogComponents()
// }