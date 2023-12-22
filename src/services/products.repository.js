
export default class ProductsRepository {
    constructor(dao) {
        this.dao = dao
    }
    addProduct = async (newProduct) => { await this.dao.addProduct(newProduct) }
    getProducts = async (query) => { await this.dao.getProducts(query) }
    getAllProducts = async () => { await this.dao.getAllProducts() }
    getProductById = async (pid, lean) => { await this.dao.getProductById(pid, lean) }
    getProductByCode = async (code) => { await this.dao.getProductByCode(code) }
    updateProduct = async (pid, newProduct) => { await this.dao.updateProduct(pid, newProduct) }
    deleteProduct = async (pid) => { await this.dao.deleteProduct(pid) }
}