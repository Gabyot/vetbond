// Importar el módulo mongoose para la creación de esquemas y modelos
import mongoose from 'mongoose';

// Definir un esquema para el modelo de cita
const appointmentSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    servicio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    fecha: {
        type: String,
        required: true
    },
    hora: {
        type: String,
        required: true
    },
    paciente: {
        type: String,
        required: true
    },
    especie: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: false
    }
}, {
    // Configurar las opciones del esquema
    timestamps: true // Agregar campos 'createdAt' y 'updatedAt' automáticamente
});

// Exportar el modelo de cita basado en el esquema definido
export default mongoose.model('Appointment', appointmentSchema);
