import express from 'express';
import { login, register } from '../controllers/userController.js';

const router = express.Router();

router.use(express.json());

router.post('/register', register);
router.post('/login', login);

export default router;
