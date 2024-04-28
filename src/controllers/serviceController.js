// Importar el modelo de Service
import Service from '../model/Service.js';

// Controlador para obtener todos los servicios veterinarios
export const getAllServices = async (req, res) => {
  try {
    // Buscar todos los servicios veterinarios en la base de datos
    const services = await Service.find();

    // Devolver los servicios encontrados como respuesta
    res.status(200).json(services);
  } catch (error) {
    // Manejar errores y devolver una respuesta de error
    res.status(500).json({ error: 'Hubo un error al buscar los servicios veterinarios.' });
  }
};

