import { ProductsService, CartsService } from "../services/index.js";
import { sucessMessage, /*errorMessage,*/ sucessMessageCreate, sucessMessageUpdate, sucessMessageDelete } from '../helper/utilsResponse.js';
import CustomError from "../services/errors/customError.js";
import {
    addCartNullIdError, addCartProductQuantityError,
    getCartsGenericError, getCartByIdGenericError,
    cartNotExistError, cartDbError
} from "../services/errors/carts.js";
import { productNotExistError } from "../services/errors/products.js";
import EErrors from "../services/errors/enums.js";

const createCart = async (req, res, next) => {
    const nameError = "Create Cart Error";
    const messageError = "Error trying to create cart";
    try {
        const idCart = await CartsService.addCart();
        return res.status(200).json(sucessMessageCreate(idCart));
    } catch (error) {
        next(error);
        //return res.status(400).json(errorMessage("Error creating cart"));
    }
};
const addProductToCart = async (req, res, next) => {
    const nameError = "Product add to Cart Error";
    const messageError = "Error trying to add product to cart";
    try {
        const cid = req.params.cid || null;
        const pid = req.params.pid || null;
        let quantity = parseInt(req.body.quantity);
        if (isNaN(quantity)) {
            quantity = 1;
        }
        if (cid == null || pid == null) {
            CustomError.createError({
                name: nameError,
                cause: addCartNullIdError(cid, pid),
                message: messageError,
                code: EErrors.INVALID_TYPES_ERROR
            })
            //return res.status(400).json(errorMessage("Invalid props"));
        }
        if (quantity <= 0) {
            CustomError.createError({
                name: nameError,
                cause: addCartProductQuantityError(quantity),
                message: messageError,
                code: EErrors.INVALID_TYPES_ERROR
            })
            //return res.status(400).json(errorMessage("Quantity must be greater than 0"));
        }
        const cart = await CartsService.getCartById(cid);
        if (!cart) {
            CustomError.createError({
                name: nameError,
                cause: cartNotExistError(cid),
                message: messageError,
                code: EErrors.ROUTING_ERROR
            })
            //return res.status(404).json(errorMessage("Cart not found"));
        }
        const product = await ProductsService.getProductById(pid);
        if (!product) {
            CustomError.createError({
                name: nameError,
                cause: productNotExistError(pid),
                message: messageError,
                code: EErrors.ROUTING_ERROR
            })
            //return res.status(404).json(errorMessage("Product not found"));
        }
        const newProduct = {
            id: product._id,
            quantity: quantity
        };
        CartsService.addProduct(cid, newProduct)
            .then((result) => {
                res.status(200).json(sucessMessageUpdate(result));
            })
            .catch((err) => {
                CustomError.createError({
                    name: nameError,
                    cause: cartDbError(err.message),
                    message: messageError,
                    code: EErrors.DATABASE_ERROR
                })
                //res.status(400).json(errorMessage("Error adding product to cart"));
            });
    } catch (error) {
        next(error);
        /*CustomError.createError({
            name: nameError,
            cause: addCartProductGenericError(),
            message: messageError,
            code: EErrors.UNKNOWN_ERROR
        })*/
        //return res.status(400).json(errorMessage("Error adding cart"));
    }

};
const getCarts = async (req, res, next) => {
    const nameError = "Get Carts Error";
    const messageError = "Error trying get carts";
    try {
        const carts = await CartsService.getCarts(res.locals.query);
        return res.status(200).json(sucessMessage(carts));
    } catch (error) {
        next(error);
        /*CustomError.createError({
            name: nameError,
            cause: getCartsGenericError(),
            message: messageError,
            code: EErrors.UNKNOWN_ERROR
        })*/
        //return res.status(400).json(errorMessage("Error getting carts"));
    }
};
const getCartById = async (req, res, next) => {
    const nameError = "Get Cart Error";
    const messageError = "Error trying get cart";
    try {
        const cid = req.params.cid;
        const cart = await CartsService.getCartById(cid);
        if (cart) {
            return res.status(200).json(sucessMessage(cart));
        } else {
            CustomError.createError({
                name: nameError,
                cause: cartNotExistError(cid),
                message: messageError,
                code: EErrors.ROUTING_ERROR
            })
            //return res.status(404).json(errorMessage("Cart not found"));
        }
    } catch (error) {
        next(error);
        /*CustomError.createError({
            name: nameError,
            cause: getCartByIdGenericError(),
            message: messageError,
            code: null
        })*/
        //return res.status(404).json(errorMessage("Cart not found"));
    }
};
const deleteCart = async (req, res, next) => {
    const nameError = "Delete Cart Error";
    const messageError = "Error trying to delete cart";
    try {
        const cid = req.params.cid;
        CartsService.deleteCart(cid)
            .then((result) => {
                if (result.deletedCount) {
                    return res.status(200).json(sucessMessageDelete({ id: cid }));
                } else {
                    CustomError.createError({
                        name: nameError,
                        cause: cartNotExistError(cid),
                        message: messageError,
                        code: EErrors.ROUTING_ERROR
                    })
                    //return res.status(404).json(errorMessage("Cart not found"));
                }
            }).catch((err) => {
                CustomError.createError({
                    name: nameError,
                    cause: cartDbError(err.message),
                    message: messageError,
                    code: EErrors.DATABASE_ERROR
                })
                //return res.status(400).json(errorMessage(err.message));
            });
    } catch (error) {
        next(error);
        //return res.status(400).json(errorMessage("Problems in delete cart"));
    }
};
const deleteProductCart = async (req, res, next) => {
    const nameError = "Delete Product in Cart Error";
    const messageError = "Error trying to delete product in cart";
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        CartsService.deleteProductCart(cid, pid)
            .then((result) => {
                if (result.deletedCount) {
                    return res.status(200).json(sucessMessageDelete({ id: cid }));
                } else {
                    CustomError.createError({
                        name: nameError,
                        cause: productNotExistError(pid),
                        message: messageError,
                        code: EErrors.ROUTING_ERROR
                    });
                    //return res.status(404).json(errorMessage("Product not found"));
                }
            }).catch((err) => {
                CustomError.createError({
                    name: nameError,
                    cause: cartDbError(err.message),
                    message: messageError,
                    code: EErrors.DATABASE_ERROR
                })
                //return res.status(400).json(errorMessage(err.message));
            });
    } catch (error) {
        next(error);
        // return res.status(400).json(errorMessage("Problems in delete product in cart"));
    }
};
const updateCart = async (req, res, next) => {
    const nameError = "Update Cart Error";
    const messageError = "Error trying to update cart";
    try {
        const cid = req.params.cid;
        const cart = req.body;
        CartsService.updateCart(cid, cart)
            .then((result) => {
                if (result.nModified) {
                    return res.status(200).json(sucessMessageUpdate({ id: cid }));
                } else {
                    CustomError.createError({
                        name: nameError,
                        cause: cartNotExistError(cid),
                        message: messageError,
                        code: EErrors.ROUTING_ERROR
                    })
                    //return res.status(404).json(errorMessage("Cart not found"));
                }
            }).catch((err) => {
                CustomError.createError({
                    name: nameError,
                    cause: cartDbError(err.message),
                    message: messageError,
                    code: EErrors.DATABASE_ERROR
                })
            });
    } catch (error) {
        next(error);
        //return res.status(400).json(errorMessage("Problems in update cart"));
    }
}
const updateCartProductQuantity = async (req, res) => {
    const nameError = "Update Cart Quantity Error";
    const messageError = "Error trying to update quantity in cart";
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.body.quantity;
        CartsService.updateCartProductQuantity(cid, pid, quantity)
            .then((result) => {
                if (result.nModified) {
                    return res.status(200).json(sucessMessageUpdate({ id: cid }));
                } else {
                    CustomError.createError({
                        name: nameError,
                        cause: productNotExistError(cid),
                        message: messageError,
                        code: EErrors.ROUTING_ERROR
                    })
                    //return res.status(404).json(errorMessage("Product not found"));
                }
            }).catch((err) => {
                CustomError.createError({
                    name: nameError,
                    cause: cartDbError(err.message),
                    message: messageError,
                    code: EErrors.DATABASE_ERROR
                })
                //return res.status(400).json(errorMessage(err.message));
            });
    } catch (error) {
        next(error);
        //return res.status(400).json(errorMessage("Problems in update product in cart"));
    }
};
export { createCart, addProductToCart, getCartById, getCarts, updateCart, updateCartProductQuantity, deleteCart, deleteProductCart };