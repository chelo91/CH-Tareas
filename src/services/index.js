
import { Carts, Products, Messages, Users, Tickets } from '../dao/factory.js'

import CartsRepository from "./carts.repository.js";
import ProductsRepository from "./products.repository.js";
import MessagesRepository from "./messages.repository.js";
import UsersRepository from "./users.repository.js";
import TicketsRepository from "./tickets.repository.js";

export const CartsService = new CartsRepository(new Carts())
export const ProductsService = new ProductsRepository(new Products())
export const MessagesService = new MessagesRepository(new Messages())
export const UsersService = new UsersRepository(new Users())
export const TicketsService = new TicketsRepository(new Tickets())