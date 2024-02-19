export default class MessagesDto {
    constructor(message) {
        this._id = message._id;
        this.message = message.message;
        this.datetime = message.datetime;
        this.user = message.user;
    }
}