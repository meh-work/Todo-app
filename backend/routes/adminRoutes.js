import express from 'express';
import { login } from '../controllers/adminContoller.js';

const router = express.Router();

router.use(express.json());

router.post('/login', login);

export default router;
