import mongoose from 'mongoose';
import messageModel from '../models/messages.model.js';
import { mongoUrl } from '../../config/const.config.js';

export default class Messages {

    /* PROPERTIES */
    constructor() {
        if (!mongoose.connection.readyState) {
            Products.conection = mongoUrl;
            mongoose.connect(Products.conection, { dbName: 'ecommerce' })
                .then(() => {
                    console.log('DB connected 👊 !!')
                })
                .catch(e => {
                    console.error('Error connecting to DB 😓 ')
                })
        }
    }
    async addMessage(message) {
        if (message.session && message.email && message.message) {
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