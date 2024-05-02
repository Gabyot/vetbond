import { Router } from "express";
import { getAllCitys, getAllServices, getTimesForDate } from "../controllers/serviceController.js";

const router = Router();

router.get('/services', getAllServices);
router.get('/comunas', getAllCitys);
// Ruta para obtener los horarios de una fecha específica de un servicio
router.get('/services/times', getTimesForDate);

export default router;