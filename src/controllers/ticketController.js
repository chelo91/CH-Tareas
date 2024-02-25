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
    //try {
    const newTicket = {
        code: uid(),
        datetime: Date.now(),
        user: req.user.id,
    }
    const descriptionProducts = [];
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
                descriptionProducts.push({ product: productStock._id, quantity: row.quantity });
            } else {

            }
        }
    }
    newTicket.amount = total;
    newTicket.datetime = Date.now();
    newTicket.products = descriptionProducts;
    const idTicket = await TicketsService.addTicket(newTicket);
    await CartsService.cleanCart(idCart);
    return res.status(200).json(sucessMessageCreate(idTicket));
    /*} catch (error) {
        next(error);
        //return res.status(400).json(errorMessage("Error creating ticket"));
    }*/
};
const getTicketsByUser = async (req, res) => {
    try {
        const idUser = req.user.id;
        const tickets = await TicketsService.getTicketsByUser(idUser);
        return res.status(200).json(sucessMessage(tickets));
    } catch (error) {
        return res.status(400).json(errorMessage("Error getting tickets"));
    }

}
export { createTicket, getTicketsByUser };