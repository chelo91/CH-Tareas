import { Products } from "../dao/factory.js";
import { sucessMessage, errorMessage, sucessMessageCreate, sucessMessageUpdate, sucessMessageDelete } from '../helper/utilsResponse.js';
import { io } from '../helper/utilsServerVars.js';

const getProducts = async (req, res) => {

	//try {
	const productManager = new Products();
	const products = await productManager.getProducts(res.locals.query);
	return res.status(200).json(sucessMessage(products));
	/*} catch (err) {
		return res.status(400).json(errorMessage("Products not found"));
	}*/
};

const getProductById = async (req, res) => {
	try {
		const productManager = new Products();
		const pid = req.params.pid || null;
		const result = await productManager.getProductById(pid);
		if (!result) {
			return res.status(404).json(errorMessage("Product not found"));
		}
		return res.status(200).json(sucessMessage(result));
	} catch (err) {
		return res.status(404).json(errorMessage("Product not found"));
	}
};

const createProduct = async (req, res) => {
	try {
		const productManager = new Products();
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
	} catch (err) {
		return res.status(400).json(errorMessage("Problems creating product"));
	}
};

const updateProduct = async (req, res) => {
	try {
		const productManager = new Products();
		const pid = req.params.pid || null;
		productManager.updateProduct(pid, req.body)
			.then((prod) => {
				return res.status(200).json(sucessMessageUpdate(prod));
			}).catch((err) => {
				return res.status(400).json(errorMessage(err.message));
			});
	} catch (err) {
		return res.status(400).json(errorMessage("Problems in update product"));
	}
};

const deleteProduct = async (req, res) => {
	try {
		const productManager = new Products();
		const pid = req.params.pid || null;
		productManager.deleteProduct(pid)
			.then((result) => {
				if (result.deletedCount) {
					io.emit('delete-product', { id: pid });
					return res.status(200).json(sucessMessageDelete({ id: pid }));
				} else {
					return res.status(404).json(errorMessage("Product not found"));
				}
			}).catch((err) => {
				return res.status(400).json(errorMessage(err.message));
			});
	} catch (err) {
		return res.status(400).json(errorMessage("Problems in delete product"));
	}
};

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct };