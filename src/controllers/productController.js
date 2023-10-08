import ProductManager from '../models/productManager.js';
import { sucessMessage, errorMessage, sucessMessageCreate, sucessMessageUpdate, sucessMessageDelete } from '../helper/utilsResponse.js';
import { pathProd } from '../helper/utilsVars.js';
import { io } from '../helper/utilsServerVars.js';

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
	if (result) {
		return res.status(404).json(errorMessage("Product not found"));
	}
	return res.status(200).json(sucessMessage(result));
};

const createProduct = async (req, res) => {
	const productManager = new ProductManager(pathProd);
	const newProd = {
		title: req.body.title,
		description: req.body.description,
		code: req.body.code,
		price: req.body.price,
		status: req.body.status,
		stock: req.body.stock,
		category: req.body.category,
		thumbnail: req.body.images
	}
	productManager.addProduct(newProd)
		.then((pid) => {
			newProd.id = pid;
			io.emit('create-product', { product: newProd });
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
			io.emit('delete-product', { id: pid });
			return res.status(200).json(sucessMessageDelete({ id: pid }));
		}).catch((err) => {
			return res.status(400).json(errorMessage(err.message));
		});
};

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct };