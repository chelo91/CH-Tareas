import express from "express";
import { home, realTime, chat } from '../controllers/viewController.js';
export const router = express.Router();

router.get('/', home);
router.get('/now', realTime);
router.get('/chat', chat);