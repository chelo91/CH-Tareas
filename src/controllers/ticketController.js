import { Products, Carts, Tickets } from "../dao/factory.js";
import { sucessMessage, errorMessage, sucessMessageCreate, sucessMessageUpdate, sucessMessageDelete } from '../helper/utilsResponse.js';

const createTicket = async (req, res) => {
    try {
        const ticketManager = new Tickets();
        const idTicket = await ticketManager.addTicket();
        return res.status(200).json(sucessMessageCreate(idTicket));
    } catch (error) {
        return res.status(400).json(errorMessage("Error creating ticket"));
    }
};
export { createTicket };