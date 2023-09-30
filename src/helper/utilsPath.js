
import dotenv from 'dotenv';
dotenv.config();
const pathProd = process.env.PATH_PRODUCTS || "./db/products.json";
const pathCart = process.env.PATH_CARTS || "./db/carts.json";
const port = process.env.PORT || 3000;
const url = process.env.URL || "http://localhost";
const pathImg = process.env.PATH_IMG || "../../public/img";

export { pathProd, pathCart, port, url, pathImg }