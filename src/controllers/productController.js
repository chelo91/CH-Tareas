import ProductManager from '../models/productManager.js';
import express from "express";
import dotenv from 'dotenv';

export const router = express.Router();

dotenv.config();
const path = process.env.PATH || "./src/files/productos.json";

router.get('/', (req, res) => {
    const productManager = new ProductManager(path);
    res.send(path);
});

/*
El servidor debe contar con los siguientes endpoints:
ruta ‘/products’, la cual debe leer el archivo de productos y devolverlos dentro de un objeto. 
Agregar el soporte para recibir por query param el valor ?limit= el cual recibirá un límite de resultados.
Si no se recibe query de límite, se devolverán todos los productos
Si se recibe un límite, sólo devolver el número de productos solicitados
ruta ‘/products/:pid’, la cual debe recibir por req.params el pid (product Id), y devolver sólo el producto solicitado, en lugar de todos los productos
*/