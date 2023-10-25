import ProductManager from '../dao/mongo/products.mongo.js';
//import { pathProd } from '../helper/utilsVars.js';

const pages = [
    { name: "home", title: "Home", url: "/" },
    { name: "now", title: "Real Time Products", url: "/now" },
    { name: "chat", title: "Chat", url: "/chat" }

];

const home = async (req, res) => {
    const productManager = new ProductManager();
    const products = await productManager.getProducts();
    cleanPages;
    pages[0].isActive = true;
    res.render('home', { pages: pages, products: products, myPage: pages[0] });
};

const realTime = (req, res) => {
    cleanPages;
    pages[1].isActive = true;
    res.render('realTimeProducts', { pages: pages, myPage: pages[1] });
};

const chat = (req, res) => {
    cleanPages;
    pages[2].isActive = true;
    res.render('chat', { pages: pages, myPage: pages[2] });
};

const cleanPages = () => {
    pages.forEach(page => {
        page.isActive = false;
    });
};
export { home, realTime, chat };