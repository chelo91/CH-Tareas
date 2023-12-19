import { Products, Carts } from "../dao/factory.js";
import { sucessMessage, errorMessage, sucessMessageCreate, sucessMessageUpdate, sucessMessageDelete } from '../helper/utilsResponse.js';

const createCart = async (req, res) => {
    try {
        const cartManager = new Carts();
        const idCart = await cartManager.addCart();
        return res.status(200).json(sucessMessageCreate(idCart));
    } catch (error) {
        return res.status(400).json(errorMessage("Error creating cart"));
    }
};
const addProductToCart = async (req, res) => {
    try {
        const cartManager = new Carts();
        const productManager = new Products();
        const cid = req.params.cid || null;
        const pid = req.params.pid || null;
        let quantity = parseInt(req.body.quantity);
        if (isNaN(quantity)) {
            quantity = 1;
        }
        if (cid == null || pid == null) {
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
            id: product._id,
            quantity: quantity
        };
        cartManager.addProduct(cid, newProduct)
            .then((result) => {
                res.status(200).json(sucessMessageUpdate(result));
            })
            .catch((error) => {
                res.status(400).json(errorMessage("Error adding product to cart"));
            });
    } catch (error) {
        return res.status(400).json(errorMessage("Error adding cart"));
    }

};
const getCarts = async (req, res) => {
    try {
        const cartManager = new Carts();
        const carts = await cartManager.getCarts(res.locals.query);
        return res.status(200).json(sucessMessage(carts));
    } catch (error) {
        return res.status(400).json(errorMessage("Error getting carts"));
    }
};
const getCartById = async (req, res) => {
    try {
        const cartManager = new Carts();
        const cid = req.params.cid;
        const cart = await cartManager.getCartById(cid);
        if (cart) {
            return res.status(200).json(sucessMessage(cart));
        } else {
            return res.status(404).json(errorMessage("Cart not found"));
        }
    } catch (error) {
        return res.status(404).json(errorMessage("Cart not found"));
    }
};
const deleteCart = async (req, res) => {
    try {
        const cartManager = new Carts();
        const cid = req.params.cid;
        cartManager.deleteCart(cid)
            .then((result) => {
                if (result.deletedCount) {
                    return res.status(200).json(sucessMessageDelete({ id: cid }));
                } else {
                    return res.status(404).json(errorMessage("Cart not found"));
                }
            }).catch((err) => {
                return res.status(400).json(errorMessage(err.message));
            });
    } catch (err) {
        return res.status(400).json(errorMessage("Problems in delete cart"));
    }
};
const deleteProductCart = async (req, res) => {
    try {
        const cartManager = new Carts();
        const cid = req.params.cid;
        const pid = req.params.pid;
        cart.deleteProductCart(cid, pid)
            .then((result) => {
                if (result.deletedCount) {
                    return res.status(200).json(sucessMessageDelete({ id: cid }));
                } else {
                    return res.status(404).json(errorMessage("Product not found"));
                }
            }).catch((err) => {
                return res.status(400).json(errorMessage(err.message));
            });
    } catch (err) {
        return res.status(400).json(errorMessage("Problems in delete product in cart"));
    }
};
const updateCart = async (req, res) => {
    try {
        const cartManager = new Carts();
        const cid = req.params.cid;
        const cart = req.body;
        cartManager.updateCart(cid, cart)
            .then((result) => {
                if (result.nModified) {
                    return res.status(200).json(sucessMessageUpdate({ id: cid }));
                } else {
                    return res.status(404).json(errorMessage("Cart not found"));
                }
            }).catch((err) => {
                return res.status(400).json(errorMessage(err.message));
            });
    } catch (err) {
        return res.status(400).json(errorMessage("Problems in update cart"));
    }
}
const updateCartProductQuantity = async (req, res) => {
    try {
        const cartManager = new Carts();
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.body.quantity;
        cartManager.updateCartProductQuantity(cid, pid, quantity)
            .then((result) => {
                if (result.nModified) {
                    return res.status(200).json(sucessMessageUpdate({ id: cid }));
                } else {
                    return res.status(404).json(errorMessage("Product not found"));
                }
            }).catch((err) => {
                return res.status(400).json(errorMessage(err.message));
            });
    } catch (err) {
        return res.status(400).json(errorMessage("Problems in update product in cart"));
    }
};
export { createCart, addProductToCart, getCartById, getCarts, updateCart, updateCartProductQuantity, deleteCart, deleteProductCart };