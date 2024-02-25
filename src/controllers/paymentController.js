import { TicketsService, CartsService } from "../services/index.js";
import { uid } from 'uid';

const paymentMercadoPago = async (req, res) => {
    const status = req.params.status;
    const cart = await CartsService.getCartById(req.user.cart);
    const params = req.query;
    if (params.payment_id == null || params.payment_id == undefined ||
        params.payment_id == "" || params.payment_id == 0 || params.payment_id == "0" ||
        params.payment_id == "undefined" || params.payment_id == "null") {
        return res.redirect('/error');
    }
    let amount = 0;
    for (let i = 0; i < cart.products.length; i++) {
        const product = cart.products[i];
        amount = amount + (product.product.price * product.quantity);
    }
    const newTicket = {
        code: uid(),
        datetime: Date.now(),
        user: req.user._id,
        amount: amount,
        products: cart.products,
        paymentType: "mp",
        paymentStatus: status,
        paymentId: params.payment_id,
    }
    const idTicket = await TicketsService.addTicket(newTicket);
    if (status === "success" || status === "pending") {
        await CartsService.cleanCart(req.user.cart);
        return res.redirect('/gracias');
    }
    return res.redirect('/error');
}
export { paymentMercadoPago };
