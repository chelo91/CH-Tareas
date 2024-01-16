import { persistence, mongoUrl, mongoDBName } from "../config/const.config.js";
import mongoose from "mongoose";
import { logger } from '../helper/utilsLogger.js';

export let Carts
export let Products
export let Messages
export let Users
export let Tickets

switch (persistence) {
    case "FILE":

        const { default: CartsFile } = await import('./file/NOT IMPLEMENTED carts.file.js')
        const { default: ProductsFile } = await import('./file/NOT IMPLEMENTED products.file.js')
        const { default: MessagesFile } = await import('./file/messages.file.js') // NOT IMPLEMENTED
        const { default: UsersFile } = await import('./file/users.file.js') // NOT IMPLEMENTED
        const { default: TicketsFile } = await import('./file/tickets.file.js') // NOT IMPLEMENTED

        Carts = CartsFile
        Products = ProductsFile
        Messages = MessagesFile
        Users = UsersFile
        Tickets = TicketsFile

        break;

    case "MONGO":
        try {
            await mongoose.connect(mongoUrl, { dbName: mongoDBName })
            console.log('DB connected 👌')

            const { default: CartsMongo } = await import('./mongo/carts.mongo.js')
            const { default: ProductsMongo } = await import('./mongo/products.mongo.js')
            const { default: MessagesMongo } = await import('./mongo/messages.mongo.js')
            const { default: UsersMongo } = await import('./mongo/users.mongo.js')
            const { default: TicketsMongo } = await import('./mongo/tickets.mongo.js')

            Carts = CartsMongo
            Products = ProductsMongo
            Messages = MessagesMongo
            Users = UsersMongo
            Tickets = TicketsMongo
        } catch (error) {
            logger.fatal(error);
            process.exit(1);
        }
        break;
    default:
        throw "Persistence doesn't found"
}