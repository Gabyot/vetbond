import { Router } from "express";
import express from "express";
import path from "path";

const router = Router();
const staticRouter = express.Router();

// Ruta para los archivos estáticos del frontend
staticRouter.use(express.static(path.resolve('public')));

// Asociar el router de archivos estáticos con el router principal
router.use(staticRouter);

// Ruta para el archivo HTML principal del frontend
router.get('/', (req, res) => {
    res.sendFile(path.resolve('public/pages/index.html'));
});

router.get('/services', (req, res) => {
    res.sendFile(path.resolve('public/pages/services.html'));
});

router.get('/reserva', (req, res) => {
    res.sendFile(path.resolve('public/pages/citasform.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.resolve('public/pages/login.html'));
});

router.get('/register', (req, res) => {
    res.sendFile(path.resolve('public/pages/registro.html'));
});

router.get('/quienessomos', (req, res) => {
    res.sendFile(path.resolve('public/pages/quienessomos.html'));
});

router.get('/profile', (req, res) => {
    res.sendFile(path.resolve('public/pages/userProfile.html'));
});

router.get('/profile/review/:id', (req, res) => {
    res.sendFile(path.resolve('public/pages/commentPage.html'));
});

router.get('/vetprofile/:id', (req, res) => {
    res.sendFile(path.resolve('public/pages/vetProfile.html'));
});

export default router;
