// Importar el modelo de usuario
import User from '../model/User.js';
// Importar el modelo de cita
import Appointment from '../model/Appointment.js';
// Importar el modelo de servicio
import Service from '../model/Service.js';
// Importar la función para verificar el token de acceso
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

// Controlador para crear una cita
export const createAppointment = async (req, res) => {
    const { serviceId, fecha, hora, descripcion, paciente, especie } = req.body;

    try {
        // Verificar la validez del token utilizando el secreto del token
        jwt.verify(req.cookies.token, TOKEN_SECRET, async (err, decoded) => {
            // Si hay un error o no se puede decodificar el token, devolver un error de token inválido
            if (err) return res.status(403).json({ message: "Invalid Token" });

            // Obtener el id de usuario decodificado del token
            const userId = decoded.id;

            // Obtener el servicio veterinario por su id
            const servicio = await Service.findById(serviceId);

            if (!servicio) {
                return res.status(404).json({ message: "Servicio veterinario no encontrado" });
            }

            // Crear una nueva instancia de Appointment con los datos proporcionados
            const nuevaCita = new Appointment({
                usuario: userId,
                servicio: servicio._id,
                fecha,
                hora,
                descripcion,
                paciente,
                especie
            });

            // Guardar la nueva cita en la base de datos
            await nuevaCita.save();

            // Eliminar el horario de la lista de horarios disponibles en el servicio correspondiente
            const fechaServicio = servicio.fechas_disponibles.find(fechaDisponible => fechaDisponible.fecha === fecha);
            if (fechaServicio) {
                fechaServicio.horarios = fechaServicio.horarios.filter(horario => horario !== hora);
                await servicio.save();
            }

            res.status(201).json({ message: "Cita creada exitosamente" });
        });
    } catch (error) {
        // Manejar errores y enviar una respuesta de error
        res.status(500).json({ message: error.message });
    }
};


// Controlador para obtener las citas de un usuario por userId
export const getAppointmentsByUserId = async (req, res) => {
    try {
        // Verificar la validez del token utilizando el secreto del token
        jwt.verify(req.cookies.token, TOKEN_SECRET, async (err, decoded) => {
            // Si hay un error o no se puede decodificar el token, devolver un error de token inválido
            if (err) return res.status(403).json({ message: "Invalid Token" });

            // Obtener el id de usuario decodificado del token
            const userId = decoded.id;

            // Buscar todas las citas del usuario por su userId
            const appointments = await Appointment.find({ usuario: userId });

            // Array para almacenar las citas con información adicional
            const appointmentsWithDetails = [];

            // Iterar sobre cada cita para obtener información adicional
            for (const appointment of appointments) {
                // Obtener información del servicio directamente desde su ID
                const service = await Service.findById(appointment.servicio);

                // Si el servicio existe, agregar información adicional a la cita
                if (service) {
                    appointmentsWithDetails.push({
                        cita: appointment,
                        servicio: {
                            nombre: service.nombre,
                            precio: service.precio,
                            direccion: service.direccion,
                            veterinario: {
                                nombre: service.profesional_veterinario.nombre,
                                rut: service.profesional_veterinario.rut
                            }
                        }
                    });
                }
            }

            // Devolver las citas con información adicional como respuesta
            res.status(200).json(appointmentsWithDetails);
        });
    } catch (error) {
        // Manejar errores y enviar una respuesta de error
        res.status(500).json({ message: error.message });
    }
};



