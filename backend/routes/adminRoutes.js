import express from 'express';
import { login, register } from '../controllers/adminContoller.js';

const router = express.Router();

router.use(express.json());

router.post('/register', register);
router.post('/login', login);

export default router;
