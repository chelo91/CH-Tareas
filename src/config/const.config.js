
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import dotenv from 'dotenv';
dotenv.config();

const persistence = process.env.PERSISTENCE || "MONGO";
const mongoDBName = process.env.MONGO_DB_NAME || "ecommerce";
const pathProd = process.env.PATH_PRODUCTS || "./db/products.json";
const pathCart = process.env.PATH_CARTS || "./db/carts.json";
const port = process.env.PORT || 3000;
const url = process.env.URL || "http://localhost";
const mongoUrl = process.env.MONGO_URL;
const secretSession = process.env.SECRET_SESSION || "";
const secretJWT = process.env.SECRET_JWT || "";

const __filename = fileURLToPath(import.meta.url);
const helperFolder = dirname(__filename);
const __dirname = path.join(helperFolder, '..');
const pathImg = path.join(__dirname, "/public/img");

const saltRounds = 10;

const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const callbackURL = process.env.GITHUB_CALLBACK_URL;

const env = process.env.NODE_ENV || 'development';

if (env === 'production') {
    // Configuraciones específicas para producción
    console.log('Estamos en modo producción.');
} else {
    // Configuraciones específicas para desarrollo
    console.log('Estamos en modo desarrollo.');
}

console.log(`Persistencia con ${persistence}`)

export { pathProd, mongoDBName, pathCart, port, url, pathImg, __dirname, mongoUrl, secretSession, secretJWT, saltRounds, clientID, clientSecret, callbackURL, persistence, env }