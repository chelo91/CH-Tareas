import mongoose from 'mongoose'
import { mongoUrl } from '../../helper/utilsVars.js';
import userModel from '../models/users.model.js';

export default class Users {
    /* PROPERTIES */
    constructor() {
        if (!mongoose.connection.readyState) {
            Users.conection = mongoUrl;
            mongoose.connect(Users.conection, { dbName: 'ecommerce' })
                .then(() => {
                    console.log('DB connected 👊 !!')
                })
                .catch(e => {
                    console.error('Error connecting to DB 😓 ')
                })
        }
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