
export default class TicketsRepository {
    constructor(dao) {
        this.dao = dao
    }
    addTicket = async (newTicket) => { return await this.dao.addTicket(newTicket) }
    getTicketbyUser = async (user) => { return await this.dao.getTicketbyUser(user) }
    getTicketbyId = async (tid) => { return await this.dao.getTicketbyId(tid) }
}