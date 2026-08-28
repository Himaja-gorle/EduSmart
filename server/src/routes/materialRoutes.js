import express from 'express';
import { createMaterial, listMaterials } from '../controllers/materialController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/materials', requireAuth, listMaterials);
router.post('/materials', requireAuth, requireRole(['admin', 'faculty']), createMaterial);

export default router;
