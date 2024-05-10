// Importar el modelo de servicio veterinario
import Service from '../model/Service.js';

// Función para obtener la fecha de hoy sin la hora
function obtenerFechaSinHora() {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0); // Establecer la hora a 00:00:00
  return hoy;
}

// Función para calcular la fecha de mañana
function obtenerFechaManana() {
  const manana = new Date();
  manana.setDate(manana.getDate() + 1);
  manana.setHours(0, 0, 0, 0); // Establecer la hora a 00:00:00
  return manana;
}

// Función para calcular la fecha de pasado mañana
function obtenerFechaPasadoManana() {
  const pasadoManana = new Date();
  pasadoManana.setDate(pasadoManana.getDate() + 2);
  pasadoManana.setHours(0, 0, 0, 0); // Establecer la hora a 00:00:00
  return pasadoManana;
}

// Función para actualizar las fechas disponibles en la base de datos
async function actualizarFechasDisponibles() {
  try {
    // Obtener la fecha de hoy, mañana y pasado mañana
    const hoy = obtenerFechaSinHora();
    const manana = obtenerFechaManana();
    const pasadoManana = obtenerFechaPasadoManana();

    // Actualizar las fechas disponibles en los servicios veterinarios
    await Service.updateMany({}, {
      $pull: { fechas_disponibles: { fecha: { $lt: hoy } } }, // Eliminar fechas anteriores a hoy
      $addToSet: { // Añadir las fechas de hoy, mañana y pasado mañana si no existen
        fechas_disponibles: {
          $each: [
            { fecha: hoy, horarios: [] },
            { fecha: manana, horarios: [] },
            { fecha: pasadoManana, horarios: [] }
          ]
        }
      }
    });

    console.log('Fechas actualizadas correctamente.');
  } catch (error) {
    console.error('Error al actualizar las fechas:', error);
  }
}

// Ejecutar la función para actualizar las fechas disponibles
actualizarFechasDisponibles();

