import { ProductsService, CartsService } from "../services/index.js";
import { sucessMessage, errorMessage, sucessMessageCreate, sucessMessageUpdate, sucessMessageDelete } from '../helper/utilsResponse.js';

const createCart = async (req, res) => {
    try {
        const idCart = await CartsService.addCart();
        return res.status(200).json(sucessMessageCreate(idCart));
    } catch (error) {
        return res.status(400).json(errorMessage("Error creating cart"));
    }
};
const addProductToCart = async (req, res) => {
    try {
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
        const cart = await CartsService.getCartById(cid);
        if (!cart) {
            return res.status(404).json(errorMessage("Cart not found"));
        }
        const product = await ProductsService.getProductById(pid);
        if (!product) {
            return res.status(404).json(errorMessage("Product not found"));
        }
        const newProduct = {
            id: product._id,
            quantity: quantity
        };
        CartsService.addProduct(cid, newProduct)
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
        const carts = await CartsService.getCarts(res.locals.query);
        return res.status(200).json(sucessMessage(carts));
    } catch (error) {
        return res.status(400).json(errorMessage("Error getting carts"));
    }
};
const getCartById = async (req, res) => {
    try {
        const cid = req.params.cid;
        const cart = await CartsService.getCartById(cid);
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
        const cid = req.params.cid;
        CartsService.deleteCart(cid)
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
        const cid = req.params.cid;
        const pid = req.params.pid;
        CartsService.deleteProductCart(cid, pid)
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
        const cid = req.params.cid;
        const cart = req.body;
        CartsService.updateCart(cid, cart)
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
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.body.quantity;
        CartsService.updateCartProductQuantity(cid, pid, quantity)
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