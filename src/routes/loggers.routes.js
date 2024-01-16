import express from "express";
export const router = express.Router();
import { getLogs, getLogsTest } from '../controllers/logsController.js'

router.get('/logs', getLogs);
router.get('/loggerTest', getLogsTest);