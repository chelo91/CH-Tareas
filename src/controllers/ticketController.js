import { TicketsService, ProductsService, CartsService } from "../services/index.js";
import { sucessMessage, sucessMessageCreate, sucessMessageUpdate, sucessMessageDelete } from '../helper/response.js';
import { uid } from 'uid';
import CustomError from "../services/errors/customError.js";
import {
    addCartNullIdError, addCartProductQuantityError,
    getCartsGenericError, getCartByIdGenericError,
    cartNotExistError, cartDbError
} from "../services/errors/carts.js";
import { productNotExistError } from "../services/errors/products.js";
import EErrors from "../services/errors/enums.js";
import { nextTick } from "process";

const createTicket = async (req, res) => {
    try {
        const newTicket = {
            code: uid(),
            purchase_datetime: Date.now(),
            purchaser: req?.user?.email || "prueba@prueba.com",
        }
        const idCart = req.params.cid || null;
        const cart = await CartsService.getCartById(idCart);
        if (!cart) {
            CustomError.createError({
                name: nameError,
                cause: cartNotExistError(idCart),
                message: messageError,
                code: EErrors.ROUTING_ERROR
            })
            //return res.status(404).json(errorMessage("Cart not found"));
        }
        const products = cart.products;
        let total = 0;
        for (let i = 0; i < products.length; i++) {
            const row = products[i];
            const productStock = await ProductsService.getProductById(row.product.id);
            if (productStock) {
                if (row.quantity <= productStock.stock) {
                    total += productStock.price * row.quantity;
                    productStock.stock -= row.quantity;
                    productStock.save();
                }
            }
        }
        newTicket.amount = total;
        const idTicket = await TicketsService.addTicket(newTicket);
        return res.status(200).json(sucessMessageCreate(idTicket));
    } catch (error) {
        next(error);
        //return res.status(400).json(errorMessage("Error creating ticket"));
    }
};
export { createTicket };