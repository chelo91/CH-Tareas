
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import dotenv from 'dotenv';
dotenv.config();

const pathProd = process.env.PATH_PRODUCTS || "./db/products.json";
const pathCart = process.env.PATH_CARTS || "./db/carts.json";
const port = process.env.PORT || 3000;
const url = process.env.URL || "http://localhost";
const mongoUrl = process.env.MONGO_URL;

const __filename = fileURLToPath(import.meta.url);
const helperFolder = dirname(__filename);
const __dirname = path.join(helperFolder, '..');
const pathImg = path.join(__dirname, "/public/img");


export { pathProd, pathCart, port, url, pathImg, __dirname, mongoUrl }