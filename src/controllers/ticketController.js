import { TicketsService } from "../services/index.js";
import { sucessMessage, errorMessage, sucessMessageCreate, sucessMessageUpdate, sucessMessageDelete } from '../helper/utilsResponse.js';

const createTicket = async (req, res) => {
    try {
        const idTicket = await TicketsService.addTicket();
        return res.status(200).json(sucessMessageCreate(idTicket));
    } catch (error) {
        return res.status(400).json(errorMessage("Error creating ticket"));
    }
};
export { createTicket };