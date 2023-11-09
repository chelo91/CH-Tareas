import express from "express";
import { createUsers, login } from "../controllers/sessionController.js";
export const router = express.Router();

router.post('/register', createUsers);
router.post('/login', login);