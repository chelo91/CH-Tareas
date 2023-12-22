
export default class MessagesRepository {
    constructor(dao) {
        this.dao = dao
    }
    addMessage = async (message) => { return await this.dao.addMessage(message) }
    getMessages = async (oid) => { return await this.dao.getMessages(oid) }
    getMessageById = async (order) => { return await this.dao.getMessageById(order) }
}