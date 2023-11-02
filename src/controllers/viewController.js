import ProductManager from '../dao/mongo/products.mongo.js';
import CartManager from '../dao/mongo/carts.mongo.js';

//import { pathProd } from '../helper/utilsVars.js';

const pages = [
    { name: "home", title: "Home", url: "/" },
    { name: "products", title: "Productos", url: "/products" },
    { name: "now", title: "Real Time Products", url: "/now" },
    { name: "chat", title: "Chat", url: "/chat" }
];

const home = async (req, res) => {
    cleanPages;
    pages[0].isActive = true;
    res.render('home', { pages: pages, myPage: pages[0] });
};

const products = async (req, res) => {
    //const productManager = new ProductManager();
    //const products = await productManager.getProducts({ page: 1, limit: 5, order: null, filters: {} });
    cleanPages;
    pages[0].isActive = true;
    res.render('products', { pages: pages, myPage: pages[1] });
};

const realTime = (req, res) => {
    cleanPages;
    pages[1].isActive = true;
    res.render('realTimeProducts', { pages: pages, myPage: pages[2] });
};

const chat = (req, res) => {
    cleanPages;
    pages[2].isActive = true;
    res.render('chat', { pages: pages, myPage: pages[3] });
};

const cleanPages = () => {
    pages.forEach(page => {
        page.isActive = false;
    });
};

const productById = async (req, res) => {
    const pid = req.params.pid;
    const productManager = new ProductManager();
    const product = await productManager.getProductById(pid, true);
    if (product == null) {
        res.status(404).send("Product not found");
    }
    cleanPages;
    res.render('productDetail', { pages: pages, product: product });
};

const cartById = async (req, res) => {
    const cid = req.params.cid;
    const cartManager = new CartManager();
    const cart = await cartManager.getCartById(cid, true);
    if (cart == null) {
        res.status(404).send("Cart not found");
    }
    cleanPages;
    res.render('cartDetail', { pages: pages, cart: cart });
};

export { home, products, realTime, chat, productById, cartById };