
export default class CartsRepository {
    constructor(dao) {
        this.dao = dao
    }
    addCart = async () => { return await this.dao.addCart() }
    addProduct = async (idCart, newProduct) => { return await this.dao.addProduct(idCart, newProduct) }
    getCarts = async (query) => { return await this.dao.getCarts(query) }
    getCartById = async (cid, lean) => { return await this.dao.getCartById(cid, lean) }
    deleteCart = async (cid) => { return await this.dao.deleteCart(cid) }
    deleteProductCart = async (cid, pid) => { return await this.dao.deleteProductCart(cid, pid) }
    updateCart = async (cid, cart) => { return await this.dao.updateCart(cid, cart) }
    updateCartProductQuantity = async (cid, pid, quantity) => { return await this.dao.updateCartProductQuantity(cid, pid, quantity) }
}