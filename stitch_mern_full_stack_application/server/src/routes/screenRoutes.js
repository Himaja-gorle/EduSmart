import express from 'express';
import { getScreenDetails, getScreensList } from '../controllers/screenController.js';

const router = express.Router();

router.get('/screens', getScreensList);
router.get('/screens/:slug', getScreenDetails);

export default router;
