import mongoose from 'mongoose';
import messageModel from '../models/messages.model.js';

export default class Messages {

    /* PROPERTIES */
    constructor() {
    
    }

    async addMessage(message) {
        if (message.session && message.message && message.user) {
            message.date = Date.now();
            const bdMessage = new messageModel(message);
            return bdMessage.save();
        }
    }
    /* CRUD */
    async getMessages() {
        return messageModel.find({}).lean();
    }
    async getMessageById(pid) {
        return messageModel.findById(pid);
    }
}