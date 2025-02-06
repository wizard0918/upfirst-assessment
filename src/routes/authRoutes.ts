import express from 'express';
import { authorize, token } from '../controllers/authController';
import { validateAuthRequest, validateTokenRequest } from '../middleware/validateRequest';

const router = express.Router();

router.get('/authorize', validateAuthRequest, authorize);
router.post('/token', validateTokenRequest, token);

export default router;