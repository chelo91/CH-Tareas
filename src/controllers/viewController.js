import { ProductsService, CartsService, UsersService, TicketsService } from "../services/index.js";
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { mercadoPagoKey, url } from '../config/const.config.js';

const pages = [
    { name: "home", title: "Home", url: "/" },
    { name: "products", title: "Productos", url: "/products" },
    { name: "now", title: "Real Time Products", url: "/now" },
    { name: "chat", title: "Chat", url: "/chat" }
];

const home = async (req, res) => {
    res.render('home', { pages: pages, myPage: pages[0], user: req.user });
};

const products = async (req, res) => {
    res.render('products', { pages: pages, myPage: pages[1], user: req.user });
};

const realTime = (req, res) => {
    res.render('realTimeProducts', { pages: pages, myPage: pages[2], user: req.user });
};

const chat = (req, res) => {
    res.render('chat', { pages: pages, myPage: pages[3], user: req.user });
};

const productById = async (req, res) => {
    const pid = req.params.pid;
    const product = await ProductsService.getProductById(pid, true);
    if (product == null) {
        res.status(404).send("Product not found");
    }
    res.render('productDetail', { pages: pages, product: product, user: req.user });
};

const editProductById = async (req, res) => {
    const pid = req.params.pid;
    const product = await ProductsService.getProductById(pid, true);
    if (product == null) {
        res.status(404).send("Product not found");
    }
    res.render('productEditDetail', { pages: pages, product: product, user: req.user });
};

const cartById = async (req, res) => {
    const cid = req.params.cid;
    const cart = await CartsService.getCartById(cid, true);
    if (cart == null) {
        res.status(404).send("Cart not found");
    }
    res.render('cartDetail', { pages: pages, cart: cart, user: req.user });
};

const login = (req, res) => {
    res.render('login', { pages: pages, user: req.user });
};

const register = (req, res) => {
    res.render('register', { pages: pages, user: req.user });
};

const logout = async (req, res) => {
    try {
        if (req.user != null) {
            console.log("User logged out: ", req.user.email);
            UsersService.refreshLastLoginUser(req.user._id);
        }
        res.clearCookie('cookieJWT');
        req.session.destroy(err => {
            if (err) {
                return res.redirect('/');
            }
            return res.redirect('/login');
        })
    } catch (e) {
        return res.redirect('/');
    }
};

const profile = (req, res) => {
    if (req.user == null) {
        return res.redirect('/login');
    }
    /*if (req.params.id != req.user._id) {
        return res.redirect('/login');
    }*/
    res.render('profile', { pages: pages, user: req.user });
};

const current = (req, res) => {
    if (req.user == null) {
        return res.redirect('/login');
    }
    /*if (req.params.id != req.user._id) {
        return res.redirect('/login');
    }*/
    res.render('profile', { pages: pages, user: req.user });
};

const tickets = async (req, res) => {
    const tickets = await TicketsService.getTicketbyUser(req.user._id);
    res.render('tickets', { pages: pages, myPage: pages, user: req.user, tickets: tickets });
};

const ticketById = async (req, res) => {
    const tid = req.params.tid;
    const ticket = await TicketsService.getTicketbyId(tid);
    if (ticket == null) {
        res.status(404).send("Ticket not found");
    }
    res.render('ticketsDetail', { pages: pages, ticket: ticket, user: req.user });
};

const gratitude = (req, res) => {
    res.render('gratitude', { pages: pages, user: req.user });
};

const payment = async (req, res) => {
    const client = new MercadoPagoConfig({ accessToken: mercadoPagoKey });
    const preference = new Preference(client);
    const cid = req.params.cid;
    const cart = await CartsService.getCartById(cid, true);
    if (cart == null) {
        res.status(404).send("Cart not found");
    }
    const items = [];
    for (let i = 0; i < cart.products.length; i++) {
        const row = cart.products[i];
        //product = await ProductsService.getProductById(row.product);
        items.push({
            title: row.product.title,
            quantity: row.quantity,
            unit_price: row.product.price
        });
        //fixear esto a futuro porque tomo el precio del carrito y no el real si llega a cambiar
    }
    const response = await preference.create({
        body: {
            items: items,
            back_urls: {
                "success": `${url}/payment/mercadopago/success`,
                "failure": `${url}/payment/mercadopago/failure`,
                "pending": `${url}/payment/mercadopago/pending`
            },
            auto_return: "approved",

        }
    })

    //console.log(preference);
    //const idPay = preference.id;
    res.render('payment', { pages: pages, user: req.user, idPayMP: response.id });
};
export {
    home, products, realTime, chat, productById, cartById, login, register, logout,
    profile, current, editProductById, tickets, ticketById, gratitude, payment
};