export default class CartsDto {
    constructor(cart) {
        this._id = cart._id;
        this.products = cart.products;
        this.role = cart.role;
        this.user = cart.user;
    }
}