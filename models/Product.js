export default class Product {
    id;
    title;
    description;
    price;
    thumbnail;
    code;
    stock;
    static nextId = 1;

    constructor(title, description, price, thumbnail, code, stock) {
        this.id = Product.nextId;
        Product.nextId += 1;

        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }

    get getId() {
        return this.id;
    }
}