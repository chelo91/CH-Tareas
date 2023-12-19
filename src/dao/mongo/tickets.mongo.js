import mongoose from 'mongoose'
import ticketModel from '../models/tickets.model.js';

export default class Tickets {
    /* PROPERTIES */
    constructor() {
    }
    
    /* METHODS */
    async addTicket(newTicket) {
        const ticket = new ticketModel(newTicket);
        return ticket.save();
    }
    async getTicketbyUser(user) {
        const ticket = await ticketModel.findByUser(user);
        return ticket;
    }
}