// Importar el modelo de Service
import Service from '../model/Service.js';

// Controlador para obtener todos los servicios veterinarios con filtro
export const getAllServices = async (req, res) => {
  try {
    // Obtener los parámetros de consulta de la URL
    const { especialidad, ciudad } = req.query;
    let query = {};

    // Construir la consulta basada en los parámetros recibidos
    if (especialidad) {
      query['nombre'] = especialidad;
    }
    if (ciudad) {
      query['direccion.ciudad'] = ciudad;
    }

    // Buscar los servicios veterinarios en la base de datos con el filtro aplicado
    const services = await Service.find(query);

    // Devolver los servicios encontrados como respuesta
    res.status(200).json(services);
  } catch (error) {
    // Manejar errores y devolver una respuesta de error
    res.status(500).json({ error: 'Hubo un error al buscar los servicios veterinarios.' });
  }
};


// Controlador para encontrar un servicio por su ID
export const findServiceById = async (req, res) => {
  try {
    // Obtener el ID del servicio de los parámetros de la solicitud
    const { id } = req.params;

    // Buscar el servicio en la base de datos por su ID
    const service = await Service.findById(id);

    // Verificar si se encontró el servicio
    if (!service) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    // Devolver el servicio encontrado como respuesta
    res.status(200).json(service);
  } catch (error) {
    // Manejar errores y devolver una respuesta de error
    console.error('Error al encontrar el servicio por ID:', error);
    res.status(500).json({ error: 'Hubo un error al encontrar el servicio por ID.' });
  }
};

// Controlador para obtener todos los servicios veterinarios
export const getAllCitys = async (req, res) => {
  try {
    // Buscar todos los servicios veterinarios en la base de datos
    const services = await Service.find();

    // Obtener todas las comunas únicas de los servicios
    const ciudades = [...new Set(services.map(service => service.direccion.ciudad))];

    // Devolver las comunas como respuesta
    res.status(200).json(ciudades);
  } catch (error) {
    // Manejar errores y devolver una respuesta de error
    res.status(500).json({ error: 'Hubo un error al buscar las comunas.' });
  }
};

export const getTimesForDate = async (req, res) => {
  try {
    // Obtener el ID del servicio y la fecha de la solicitud
    const { id, fecha } = req.query;

    // Buscar el servicio en la base de datos por su ID
    const service = await Service.findById(id);

    // Verificar si se encontró el servicio
    if (!service) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    // Buscar la fecha en las fechas disponibles del servicio
    const targetDate = service.fechas_disponibles.find(date => date.fecha == fecha);

    // Verificar si se encontró la fecha
    if (!targetDate) {
      return res.status(404).json({ error: 'No hay horarios disponibles para la fecha especificada' });
    }

    // Extraer los horarios de la fecha encontrada
    const times = targetDate.horarios;

    // Devolver los horarios de la fecha especificada
    res.status(200).json(times);

  } catch (error) {
    // Manejar errores y devolver una respuesta de error
    console.error('Error al obtener los horarios de la fecha especificada:', error);
    res.status(500).json({ error: 'Hubo un error al obtener los horarios de la fecha especificada.' });
  }
};

// Controlador para obtener una lista de todos los nombres de servicios sin repetir
export const getAllServiceNames = async (req, res) => {
  try {
    // Buscar todos los servicios en la base de datos
    const services = await Service.find();

    // Obtener todas las comunas únicas de los servicios
    const uniqueServiceNames = [...new Set(services.map(service => service.nombre))];

    // Devolver los nombres de los servicios encontrados como respuesta
    res.status(200).json(uniqueServiceNames);
  } catch (error) {
    // Manejar errores y devolver una respuesta de error
    console.error('Error al obtener los nombres de servicios.', error);
    res.status(500).json({ error: 'Hubo un error al obtener los nombres de servicios.' });
  }
};
