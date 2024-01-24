import { changeRole } from "../controllers/userController.js";
import express from "express";
import { parserQueryString } from "../middlewares/parserQueryString.js";
import { authApiAdmin } from "../middlewares/auth.js";

export const router = express.Router();

router.post('/:uid', authApiAdmin, changeRole);