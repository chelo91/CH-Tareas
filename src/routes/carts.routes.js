import express from "express";
import dotenv from 'dotenv';

export const router = express.Router();

dotenv.config();
const path = process.env.PATH_PRODUCTS || "./src/files/productos.json";

router.post('/', (req, res) => {
    res.json({ msg: "Hola" });
});

router.get('/:cid', (req, res) => {
    res.json({ msg: "Hola" });
});

router.post('/:cid/product/:pid', (req, res) => {
    res.json({ msg: "Hola" });
});