import ProductManager from '../dao/mongo/products.mongo.js';
import CartManager from '../dao/mongo/carts.mongo.js';
import { sucessMessage, errorMessage, sucessMessageCreate, sucessMessageUpdate, sucessMessageDelete } from '../helper/utilsResponse.js';

const createCart = async (req, res) => {
    const cartManager = new CartManager();
    const idCart = await cartManager.addCart();
    return res.status(200).json(sucessMessageCreate({ id: idCart }));
};

const addProductToCart = async (req, res) => {
    const cartManager = new CartManager();
    const productManager = new ProductManager();
    const cid = req.params.cid || null;
    const pid = req.params.pid || null;
    const quantity = parseInt(req.body.quantity);
    if (isNaN(quantity) || cid != null || pid != null) {
        return res.status(400).json(errorMessage("Invalid props"));
    }
    if (quantity <= 0) {
        return res.status(400).json(errorMessage("Quantity must be greater than 0"));
    }
    const cart = await cartManager.getCartById(cid);
    if (!cart) {
        return res.status(404).json(errorMessage("Cart not found"));
    }
    const product = await productManager.getProductById(pid);
    if (!product) {
        return res.status(404).json(errorMessage("Product not found"));
    }
    const newProduct = {
        id: product.id,
        quantity: quantity
    };
    cartManager.addProduct(cid, newProduct)
        .then((result) => {
            res.status(200).json(sucessMessageUpdate(result));
        })
        .catch((error) => {
            res.status(400).json(errorMessage("Error adding product to cart"));
        });
    /*if (result) {
        return res.status(200).json(sucessMessageUpdate(result));
    } else {
        return res.status(400).json(errorMessage("Error adding product to cart"));
    }*/

};

const getCarts = async (req, res) => {
    const cartManager = new CartManager();
    const carts = await cartManager.getCarts();
    return res.status(200).json(sucessMessage(carts));
};

const getCartById = async (req, res) => {
    const cartManager = new CartManager();
    const cid = req.params.cid;
    const cart = await cartManager.getCartById(cid);
    if (cart) {
        return res.status(200).json(sucessMessage(cart));
    } else {
        return res.status(404).json(errorMessage("Cart not found"));
    }
};

export { createCart, addProductToCart, getCartById, getCarts };