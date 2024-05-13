import mongoose from 'mongoose';

// Definir un esquema para el modelo de reseñas
const reviewSchema = new mongoose.Schema({
    // Campo para la referencia al usuario que dejó la reseña
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Campo para la referencia al servicio veterinario
    servicio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    // Campo para el comentario de la reseña
    comentario: {
        type: String,
        required: true
    },
    // Campo para la puntuación de la reseña
    puntuacion: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
},{
    // Configurar las opciones del esquema
    timestamps: true // Agregar campos 'createdAt' y 'updatedAt' automáticamente
  });

// Exportar el modelo de reseñas basado en el esquema definido
export default mongoose.model('Review', reviewSchema);
