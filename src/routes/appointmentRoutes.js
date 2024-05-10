import { Router } from "express";
import { createAppointment, getAppointmentsByUserId } from "../controllers/appointmentController.js";
import { authRequire } from "../middlewares/validateToken.js";


const router = Router();

// Ruta para crear una cita
router.post('/appointments/create', authRequire, createAppointment);

// Ruta para obtener las citas de un usuario por userId
router.get('/appointments/user', authRequire, getAppointmentsByUserId);


export default router;