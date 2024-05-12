import { Router } from "express";
import { createAppointment, deleteAppointmentById, getAppointmentsByUserId, getAppointmentById } from "../controllers/appointmentController.js";
import { authRequire } from "../middlewares/validateToken.js";


const router = Router();

// Ruta para crear una cita
router.post('/appointments/create', authRequire, createAppointment);

// Ruta para obtener las citas de un usuario por userId
router.get('/appointments/user', authRequire, getAppointmentsByUserId);

// Ruta para obtener las citas de un usuario por userId
router.get('/appointment/delete/:id', authRequire, deleteAppointmentById);

// Ruta para obtener información de una cita por appointmentId
router.get('/appointment/:id', authRequire, getAppointmentById);

export default router;