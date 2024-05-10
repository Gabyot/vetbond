import { Router } from "express";
import { login, register, logout, profile, checkAuthentication } from '../controllers/authController.js'
import { authRequire } from "../middlewares/validateToken.js";

const router = Router();

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

router.get('/profile', authRequire, profile);

router.get('/check-authentication', checkAuthentication);

export default router;