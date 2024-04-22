
// Importar el módulo mongoose para la creación de esquemas y modelos
import mongoose from 'mongoose';

// Definir un esquema para el modelo de usuario
const userSchema = new mongoose.Schema({
  // Definir el campo 'name' como tipo String, requerido y con eliminación de espacios en blanco alrededor
  name: {
    type: String,
    required: true,
    trim: true
  },
  // Definir el campo 'email' como tipo String, requerido y único
  email: {
    type: String,
    required: true,
    unique: true
  },
  // Definir el campo 'password' como tipo String y requerido
  password: {
    type: String,
    required: true
  }
}, {
  // Configurar las opciones del esquema
  timestamps: true // Agregar campos 'createdAt' y 'updatedAt' automáticamente
});

// Exportar el modelo de usuario basado en el esquema definido
export default mongoose.model('User', userSchema);
