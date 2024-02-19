export default class TicketsDto {
    constructor(ticket) {
        this._id = ticket._id;
        this.code = ticket.code;
        this.datetime = ticket.datetime;
        this.amount = ticket.amount;
        this.user = ticket.user;
        this.products = ticket.products;
    }
}