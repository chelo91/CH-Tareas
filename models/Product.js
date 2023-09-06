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
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        Product.nextId += 1;
    }
}