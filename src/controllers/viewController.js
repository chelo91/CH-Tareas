import ProductManager from '../models/productManager.js';
import { pathProd } from '../helper/utilsVars.js';

const pages = [
    { name: "home", title: "Home", url: "/"},
    { name: "now", title: "Real Time Products", url: "/now"}
];

const home = async (req, res) => {
    const productManager = new ProductManager(pathProd);
    const products = await productManager.getAndLoadProducts();
    cleanPages;
    pages[0].isActive = true;
    res.render('home', { pages: pages, products: products, myPage: pages[0] });
};

const realTime = (req, res) => {
    cleanPages;
    pages[1].isActive = true;
    res.render('realTimeProducts', { pages: pages, myPage: pages[1] });
};

const cleanPages = () => {
    pages.forEach(page => {
        page.isActive = false;
    });
};
export { home, realTime };