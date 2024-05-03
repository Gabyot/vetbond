document.addEventListener('DOMContentLoaded', async function () {
    // Función para obtener los parámetros de la URL
    function getURLParams() {
        const params = new URLSearchParams(window.location.search);
        const serviceId = params.get('id');
        const fecha = params.get('fecha');
        return { serviceId, fecha };
    }

    // Función para obtener los horarios disponibles del servicio y fecha seleccionados
    async function fetchAvailableTimes() {
        const { serviceId, fecha } = getURLParams();
        try {
            // Realizar la solicitud a tu API para obtener los horarios disponibles
            const response = await fetch(`/api/services/times?id=${encodeURIComponent(serviceId)}&fecha=${encodeURIComponent(fecha)}`);
            if (!response.ok) {
                throw new Error('Error al obtener los horarios disponibles');
            }
            const data = await response.json();
            return data; // Aquí asumimos que la respuesta de la API es una lista de horarios disponibles
        } catch (error) {
            console.error('Error al obtener los horarios disponibles:', error);
            return null;
        }
    }

    // Función para actualizar el select de horarios con los horarios disponibles
    async function updateAvailableTimesSelect() {
        const availableTimes = await fetchAvailableTimes();
        const select = document.getElementById('horaCita'); // Suponiendo que el select tiene el id 'horaCita'
        if (availableTimes && Array.isArray(availableTimes)) {
            // Limpiar opciones anteriores
            select.innerHTML = '';
            // Agregar nuevas opciones
            availableTimes.forEach(time => {
                const option = document.createElement('option');
                option.value = time;
                option.textContent = time;
                select.appendChild(option);
            });
        } else {
            console.error('No se encontraron horarios disponibles.');
            // Opcional: Agregar una opción por defecto en caso de error
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'No hay horarios disponibles';
            select.appendChild(defaultOption);
        }
    }

    // Función para mostrar el nombre del servicio seleccionado
    async function showServiceName() {
        const { serviceId } = getURLParams();
        try {
            // Realizar la solicitud a tu API para obtener los detalles del servicio por su ID
            const response = await fetch(`/api/service/${encodeURIComponent(serviceId)}`);
            if (!response.ok) {
                throw new Error('Error al obtener los detalles del servicio');
            }
            const data = await response.json();
            const serviceName = data.nombre;
            const vetName = data.profesional_veterinario.nombre;
            // Concatenar el nombre del servicio y del veterinario, separados por un guion medio
            const displayName = `${serviceName} - ${vetName}`;
            // Actualizar la opción seleccionada en el select tipoServicio
            const select = document.getElementById('tipoServicio'); // Suponiendo que el select tiene el id 'tipoServicio'
            // Limpiar opciones anteriores
            select.innerHTML = '';
            const option = document.createElement('option');
            option.value = serviceName;
            option.textContent = displayName;
            select.appendChild(option);
        } catch (error) {
            console.error('Error al obtener los detalles del servicio:', error);
        }
    }

    // Llamar a la función para actualizar el select de horarios cuando se cargue la página
    updateAvailableTimesSelect();

    // Llamar a la función para mostrar el nombre del servicio cuando se cargue la página
    await showServiceName();
});
