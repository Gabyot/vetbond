import Review from '../model/Review.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

// Controlador para crear una nueva reseña
export const createReview = async (req, res) => {
    const { servicioId, comentario, puntuacion } = req.body;

    try {
        // Verificar la validez del token utilizando el secreto del token
        jwt.verify(req.cookies.token, TOKEN_SECRET, async (err, decoded) => {
            // Si hay un error o no se puede decodificar el token, devolver un error de token inválido
            if (err) return res.status(403).json({ message: "Invalid Token" });

            // Obtener el id de usuario decodificado del token
            const userId = decoded.id;

            // Crear una nueva instancia de Review con los datos proporcionados
            const nuevaReseña = new Review({
                usuario: userId,
                servicio: servicioId,
                comentario,
                puntuacion
            });

            // Guardar la nueva reseña en la base de datos
            await nuevaReseña.save();

            res.status(201).json({ message: "Reseña creada exitosamente" });
        });
    } catch (error) {
        // Manejar errores y enviar una respuesta de error
        res.status(500).json({ message: error.message });
    }
};


export const getReviewsByServiceId = async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar todas las reseñas del servicio por su ID
        const reviews = await Review.find({ servicio: id }).populate('usuario');

        res.status(200).json(reviews);
    } catch (error) {
        // Manejar errores y enviar una respuesta de error
        res.status(500).json({ message: error.message });
    }
};


// Controlador para eliminar una reseña por su ID
export const deleteReviewById = async (req, res) => {
    const { id } = req.params;

    try {
        // Utilizar el método findByIdAndDelete() para eliminar la reseña por su ID
        const deletedReview = await Review.findByIdAndDelete(id);

        if (!deletedReview) {
            return res.status(404).json({ message: "Reseña no encontrada" });
        }

        res.status(200).json({ message: "Reseña eliminada exitosamente" });
    } catch (error) {
        // Manejar errores y enviar una respuesta de error
        res.status(500).json({ message: error.message });
    }
};

// Controlador para obtener una reseña por su ID
export const getReviewById = async (req, res) => {
    const { id } = req.params;

    try {
        // Utilizar el método findById() para encontrar la reseña por su ID
        const review = await Review.findById(id);

        if (!review) {
            return res.status(404).json({ message: "Reseña no encontrada" });
        }

        res.status(200).json(review);
    } catch (error) {
        // Manejar errores y enviar una respuesta de error
        res.status(500).json({ message: error.message });
    }
};


