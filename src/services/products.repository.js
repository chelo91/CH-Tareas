
export default class ProductsRepository {
    constructor(dao) {
        this.dao = dao
    }
    addProduct = async (newProduct) => { return await this.dao.addProduct(newProduct) }
    getProducts = async (query) => { return await this.dao.getProducts(query) }
    getAllProducts = async () => { return await this.dao.getAllProducts() }
    getProductById = async (pid, lean) => { return await this.dao.getProductById(pid, lean) }
    getProductByCode = async (code) => { return await this.dao.getProductByCode(code) }
    updateProduct = async (pid, newProduct) => { return await this.dao.updateProduct(pid, newProduct) }
    deleteProduct = async (pid) => { return await this.dao.deleteProduct(pid) }
}