export default class ProductsDto {
    constructor(product) {
        this._id = message._id;
        this.title = product.title;
        this.description = product.description;
        this.code = product.code;
        this.price = product.price;
        this.status = product.status;
        this.stock = product.stock;
        this.category = product.category;
        this.thumbnail = product.thumbnail;
        this.owner = product.owner;
    }
}