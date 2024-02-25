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
        const tickets = await ticketModel.find({ user: user }).lean();
        return tickets;
    }
    async getTicketbyId(tid) {
        const ticket = await ticketModel.findById(tid).lean();
        return ticket;
    }
}