export default class MessagesDto {
    constructor(message) {
        this._id = message._id;
        this.session = message.session;
        this.email = message.email;
        this.message = message.message;
        this.date = message.date;
    }
}