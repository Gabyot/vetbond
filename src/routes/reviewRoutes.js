import { Router } from "express";
import {createReview,getReviewsByServiceId, getReviewById, deleteReviewById } from '../controllers/ReviewController.js';
import { authRequire } from '../middlewares/validateToken.js';

const router = Router();

// Ruta para crear una nueva reseña
router.post('/review/create', authRequire, createReview);

// Ruta para obtener todas las reseñas de un servicio por su ID
router.get('/review-by-service/:id', getReviewsByServiceId);

// Ruta para eliminar una reseña por su ID
router.delete('review/delete/:id', authRequire, deleteReviewById);

// Ruta para obtener una reseña por su ID
router.get('review-by-id/:id', authRequire, getReviewById);

export default router;
