import express from "express";
export const router = express.Router();
import { getMockingProducts } from '../controllers/mockingController.js'
router.get('/mockingproducts', getMockingProducts);