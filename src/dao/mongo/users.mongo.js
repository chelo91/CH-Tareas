import mongoose from 'mongoose'
import userModel from '../models/users.model.js';

export default class Users {
    /* PROPERTIES */
    constructor() {
    }
    get getConection() {
        return Users.conection;
    }
    /* METHODS */
    async addUser(newUser) {
        const user = new userModel(newUser);
        return user.save();
    }
    async getUserByEmail(email) {
        const user = await userModel.findOne({ email: email });
        return user;
    }
    async getUser(id) {
        const user = await userModel.findById(id);
        return user;
    }
}