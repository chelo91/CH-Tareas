export default class UsersDto {
    constructor(user) {
        this._id = user._id;
        this.email = user.email;
        this.first_name = user.first_name || '';
        this.last_name = user.last_name || '';
        this.birth_date = user.birth_date || null;
        this.age = this.birth_date ? Math.floor((Date.now() - this.birth_date) / (1000 * 60 * 60 * 24 * 365)) : null;
        this.cart = user.cart || null;
        this.role = user.role;
        this.isUser = user.role == "user" ? true : false;// use esto para los handlebars no se como usar el if con comparacion de string
        this.isAdmin = user.role == "admin" ? true : false;
        this.documents = user.documents || [];
        this.last_connection = user.last_connection || Date.now();
        this.actived = user.actived || false;
    }
}