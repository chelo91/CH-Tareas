import { sucessMessageCreate, errorMessage } from "../helper/utilsResponse.js";
import { generateProduct } from "../helper/utilsMocking.js";
import { ProductsService } from "../services/index.js";

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
        return res.status(400).json(errorMessage("Error creating cart"));
    }
};
