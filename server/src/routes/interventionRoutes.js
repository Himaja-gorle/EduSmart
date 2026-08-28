import express from 'express';
import { createIntervention, listInterventions, updateIntervention } from '../controllers/interventionController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/interventions', requireAuth, listInterventions);
router.post('/interventions', requireAuth, requireRole(['admin', 'faculty']), createIntervention);
router.put('/interventions/:id', requireAuth, requireRole(['admin', 'faculty']), updateIntervention);

export default router;
