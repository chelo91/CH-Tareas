import ProductManager from '../models/productManager.js';
import { pathProd } from '../helper/utilsVars.js';

const home = async (req, res) => {
    const productManager = new ProductManager(pathProd);
    const products = await productManager.getAndLoadProducts();
    res.render('home', { title: "Home", products: products });
};

const realTime = (req, res) => {
    res.render('realTimeProducts', { title: "Real Time Products"});
};

export { home, realTime };