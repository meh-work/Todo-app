import express from 'express';
import { login, logout } from '../controllers/adminContoller.js';

const router = express.Router();

router.use(express.json());

router.post('/login', login);
router.post("/logout", logout)

export default router;
