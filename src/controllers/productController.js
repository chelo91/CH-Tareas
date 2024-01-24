import { ProductsService } from "../services/index.js";
import { sucessMessage, sucessMessageCreate, sucessMessageUpdate, sucessMessageDelete } from '../helper/response.js';
import { io } from '../helper/serverVars.js';
import CustomError from "../services/errors/customError.js";
import { productNotExistError, productCustomError, productNullIdError, userCantChangeProductError } from "../services/errors/products.js";
import EErrors from "../services/errors/enums.js";

const getProducts = async (req, res, next) => {
	const nameError = "Get Products Error";
	const messageError = "Error trying to get products";
	try {
		const products = await ProductsService.getProducts(res.locals.query);
		return res.status(200).json(sucessMessage(products));
	} catch (err) {
		next(err);
		//return res.status(400).json(errorMessage("Products not found"));
	}
};

const getProductById = async (req, res, next) => {
	const nameError = "Get Product by id Error";
	const messageError = "Error trying to get product by id";
	try {
		const pid = req.params.pid || null;
		const result = await ProductsService.getProductById(pid);
		if (!result) {
			CustomError.createError({
				name: nameError,
				cause: productNotExistError(pid),
				message: messageError,
				code: EErrors.ROUTING_ERROR
			})
			//return res.status(404).json(errorMessage("Product not found"));
		}
		return res.status(200).json(sucessMessage(result));
	} catch (err) {
		next(err);
	}
};

const createProduct = async (req, res, next) => {
	const user = req.user;
	const nameError = "Create Product Error";
	const messageError = "Error trying to create product";
	try {
		const newProd = {
			title: req.body.title,
			description: req.body.description,
			code: req.body.code,
			price: req.body.price,
			status: req.body.status,
			stock: req.body.stock,
			category: req.body.category,
			thumbnail: req.body.images,
			owner: user.email
		}
		try {
			pid = await ProductsService.addProduct(newProd)
			//.then((pid) => {
			newProd.id = pid;
			io.emit('create-product', { product: newProd });
			return res.status(200).json(sucessMessageCreate({ id: pid }));
		} catch (err) {
			CustomError.createError({
				name: nameError,
				cause: productCustomError(err.message),
				message: messageError,
				code: EErrors.INVALID_TYPES_ERROR
			});
		}
		///}).catch((err) => {

		//return res.status(400).json(errorMessage(err.message));
		//});
	} catch (err) {
		next(err);
		//return res.status(400).json(errorMessage("Problems creating product"));
	}
};

const updateProduct = async (req, res, next) => {
	const user = req.user;
	const nameError = "Update Product Error";
	const messageError = "Error trying to update product";
	try {
		const pid = req.params.pid || null;
		if (!pid) {
			CustomError.createError({
				name: nameError,
				cause: productNotExistError(pid),
				message: messageError,
				code: EErrors.ROUTING_ERROR
			})
		}
		const canChange = await ProductsService.canChangeProduct(pid, user);
		if (!canChange) {
			CustomError.createError({
				name: nameError,
				cause: userCantChangeProductError(pid),
				message: messageError,
				code: EErrors.ROUTING_ERROR
			})
		}

		try {
			const prod = await ProductsService.updateProduct(pid, req.body)
			return res.status(200).json(sucessMessageUpdate(prod));
		} catch (err) {
			CustomError.createError({
				name: nameError,
				cause: productCustomError(err.message),
				message: messageError,
				code: EErrors.INVALID_TYPES_ERROR
			})
			//return res.status(400).json(errorMessage(err.message));
		}
	} catch (err) {
		next(err);
		//return res.status(400).json(errorMessage("Problems in update product"));
	}
};

const deleteProduct = async (req, res, next) => {
	const user = req.user;
	const nameError = "Delete Product Error";
	const messageError = "Error trying to delete product";
	try {
		const pid = req.params.pid || null;
		if (!pid) {
			CustomError.createError({
				name: nameError,
				cause: productNotExistError(pid),
				message: messageError,
				code: EErrors.ROUTING_ERROR
			})
		}
		const canChange = await ProductsService.canChangeProduct(pid, user);
		if (!canChange) {
			CustomError.createError({
				name: nameError,
				cause: userCantChangeProductError(pid),
				message: messageError,
				code: EErrors.ROUTING_ERROR
			})
		}
		try {
			const result = await ProductsService.deleteProduct(pid);
			if (result.deletedCount) {
				io.emit('delete-product', { id: pid });
				return res.status(200).json(sucessMessageDelete({ id: pid }));
			} else {
				CustomError.createError({
					name: nameError,
					cause: productNotExistError(pid),
					message: messageError,
					code: EErrors.ROUTING_ERROR
				})
				//return res.status(404).json(errorMessage("Product not found"));
			}
		} catch (err) {
			CustomError.createError({
				name: nameError,
				cause: productCustomError(err.message),
				message: messageError,
				code: EErrors.INVALID_TYPES_ERROR
			})
			//return res.status(400).json(errorMessage(err.message));
		}
	} catch (err) {
		next(err);
		//return res.status(400).json(errorMessage("Problems in delete product"));
	}
};

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct };