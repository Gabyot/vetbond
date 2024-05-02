// Importar el módulo mongoose para la creación de esquemas y modelos
import mongoose from 'mongoose';

// Definir un esquema para el modelo de servicio veterinario
const serviceSchema = new mongoose.Schema({
  // Definir el campo 'nombre' como tipo String y requerido
  nombre: {
    type: String,
    required: true
  },
  // Definir el campo 'precio' como tipo Number y requerido
  precio: {
    type: Number,
    required: true
  },
  // Definir el campo 'fechas_disponibles' como un array de tipo String
  fechas_disponibles: [{
    fecha: {
      type: String,
      required: true
    },
    horarios: {
      type: [String],
      required: true
    }
  }],
  // Definir el campo 'profesional_veterinario' como un objeto con campos 'nombre' y 'rut'
  profesional_veterinario: {
    nombre: {
      type: String,
      required: true
    },
    rut: {
      type: String,
      required: true
    }
  },
  // Definir el campo 'direccion' como un objeto con campos 'calle', 'numero', 'ciudad' y 'pais'
  direccion: {
    calle: {
      type: String
    },
    numero: {
      type: String
    },
    ciudad: {
      type: String
    },
    pais: {
      type: String
    }
  }
}, {
  // Configurar las opciones del esquema
  timestamps: true // Agregar campos 'createdAt' y 'updatedAt' automáticamente
});

// Exportar el modelo de servicio veterinario basado en el esquema definido
export default mongoose.model('Service', serviceSchema);
