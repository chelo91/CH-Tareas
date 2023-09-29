
import dotenv from 'dotenv';
dotenv.config();
const pathProd = process.env.PATH_PRODUCTS || "./db/products.json";
const pathCart = process.env.PATH_CARTS || "./db/carts.json";
export { pathProd, pathCart }