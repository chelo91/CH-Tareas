import { sucessMessageCreate } from "../helper/response.js";
import { generateProduct } from "../helper/mocking.js";
import { ProductsService } from "../services/index.js";
import CustomError from "../services/errors/customError.js";
import { productNotExistError, productCustomError, productNullIdError } from "../services/errors/products.js";
import EErrors from "../services/errors/enums.js";

export const getMockingProducts = async (req, res) => {
    try {
        const products = [];
        for (let i = 0; i < 5; i++) {
            const product = generateProduct();
            try {
                product.response = await ProductsService.addProduct(product);
            }
            catch (err) {
                product.response = err.message;
            }
            finally {
                products.push(product);
            }
        }
        return res.status(200).json(products);
    } catch (error) {
        next(error);
        //return res.status(400).json(errorMessage("Error creating cart"));
    }
};
