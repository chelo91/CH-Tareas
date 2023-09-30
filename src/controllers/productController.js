import ProductManager from '../models/productManager.js';
import { sucessMessage, errorMessage, sucessMessageCreate, sucessMessageUpdate, sucessMessageDelete } from '../helper/utilsResponse.js';
import { pathProd, pathImg } from '../helper/utilsPath.js';
//import { uploadImage } from '../helper/utilsFs.js';

const getProducts = async (req, res) => {
    const productManager = new ProductManager(pathProd);
    const limit = req.query.limit;
    const products = await productManager.getAndLoadProducts();
    if (limit && limit < products.length && limit > 0) {
        products.length = limit;
    }
    return res.status(200).json(sucessMessage(products));
};

const getProductById = async (req, res) => {
    const productManager = new ProductManager(pathProd);
    const pid = parseInt(req.params.pid);
    const result = await productManager.getProductById(pid);
    if (result == null) {
        return res.status(404).json(errorMessage("Product not found"));
    }
    return res.status(200).json(sucessMessage(result));
};
const createProduct = async (req, res) => {
    const productManager = new ProductManager(pathProd);
    const title = req.body.title; // Campo 'title' como cadena
    const description = req.body.description; // Campo 'description' como cadena
    const code = req.body.code; // Campo 'code' como cadena
    const price = parseFloat(req.body.price); // Campo 'price' como número (se convierte a flotante)
    let status = req.body.status;
    if (typeof req.body.status == "string") {
        if (req.body.status.toLowerCase() == "true") {
            status = true;
        } else if (req.body.status.toLowerCase() == "false") {
            status = false
        }
    }
    const stock = parseInt(req.body.stock); // Campo 'stock' como número entero
    const category = req.body.category; // Campo 'category' como cadena
    //const newProd = JSON.parse(JSON.stringify(req.body));
    let arrayImages = []
    if (req.files) {
        arrayImages = req.files.map((file) => { return file.path });
    }

    const newProd = {
        title: title,
        description: description,
        code: code,
        price: price,
        status: status,
        stock: stock,
        category: category,
        thumbnail: arrayImages
    }
    productManager.addProduct(newProd)
        .then((pid) => {
            return res.status(200).json(sucessMessageCreate({ id: pid }));
        }).catch((err) => {
            return res.status(400).json(errorMessage(err.message));
        });
};
const updateProduct = async (req, res) => {
    const productManager = new ProductManager(pathProd);
    const pid = parseInt(req.params.pid);
    productManager.updateProduct(pid, req.body)
        .then((prod) => {
            return res.status(200).json(sucessMessageUpdate(prod));
        }).catch((err) => {
            return res.status(400).json(errorMessage(err.message));
        });
};
const deleteProduct = async (req, res) => {
    const productManager = new ProductManager(pathProd);
    const pid = parseInt(req.params.pid);
    productManager.deleteProduct(pid)
        .then(() => {
            return res.status(200).json(sucessMessageDelete({ id: pid }));
        }).catch((err) => {
            return res.status(400).json(errorMessage(err.message));
        });
};
export { getProducts, getProductById, createProduct, updateProduct, deleteProduct };