document.addEventListener('DOMContentLoaded', async function () {
    console.log('DOMContentLoaded event triggered');
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

    // Función para verificar la autenticación del usuario
    async function checkAuthentication() {
        try {
            // Realizar una solicitud a la API para verificar la autenticación del usuario
            const response = await fetch('/api/check-authentication', {
                method: 'GET',
                credentials: 'include' // Incluir cookies en la solicitud
            });
            if (!response.ok) {
                throw new Error('Error al verificar la autenticación');
            }
            const data = await response.json();
            return data.authenticated; // Devuelve true si el usuario está autenticado, false de lo contrario
        } catch (error) {
            console.error('Error al verificar la autenticación:', error);
            return false; // En caso de error, asumimos que el usuario no está autenticado
        }
    }

    // Función para manejar el envío del formulario de reserva de cita
    async function handleAppointmentFormSubmit(event) {
        event.preventDefault(); // Evita que el formulario se envíe normalmente

        // Verificar la autenticación del usuario
        const isAuthenticated = await checkAuthentication();
        if (!isAuthenticated) {
            // Mostrar un mensaje de alerta
            alert('Para reservar una cita, primero debes iniciar sesión.');
            // Obtener la URL actual
            const currentUrl = window.location.href;
            // Redirigir al usuario a la página de inicio de sesión, pasando la URL actual como parámetro de consulta
            window.location.href = '/login?redirect=' + encodeURIComponent(currentUrl);
            return;
        }

        // Obtener los datos del formulario de reserva de cita
        const serviceId = getURLParams().serviceId;
        const fecha = getURLParams().fecha;
        const hora = document.getElementById('horaCita').value;
        const descripcion = document.getElementById('Cita').value;
        const paciente = document.getElementById('nombreMascota').value;
        const especie = document.getElementById('tipoMascota').value;

        console.log(serviceId, fecha, hora, descripcion, paciente, especie);

        try {
            // Realizar una solicitud a la API para crear una cita
            const response = await fetch('/api/appointments/create', {
                method: 'POST',
                credentials: 'include', // Incluir cookies en la solicitud
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    serviceId,
                    fecha,
                    hora,
                    descripcion,
                    paciente,
                    especie
                })
            });
            if (!response.ok) {
                throw new Error('Error al crear la cita');
            }
            const data = await response.json();
            alert(data.message); // Muestra un mensaje de éxito
            // Redirigir a una página de confirmación de cita u otra página deseada
            window.location.href = '/profile';
        } catch (error) {
            console.error('Error al crear la cita:', error);
            // Manejar el error, mostrar un mensaje de error, etc.
        }
    }

    // Llamar a la función para actualizar el select de horarios cuando se cargue la página
    updateAvailableTimesSelect();

    // Llamar a la función para mostrar el nombre del servicio cuando se cargue la página
    await showServiceName();

    // Agregar un evento de escucha para el envío del formulario de reserva de cita
    const appointmentForm = document.querySelector('form'); // Suponiendo que tu formulario tiene un contenedor con la clase 'card'
    console.log('appointmentForm:', appointmentForm);
    if (appointmentForm) {
        console.log('Adding event listener for form submission');
        appointmentForm.addEventListener('submit', async function (event) {
            console.log('Form submission event triggered');
            await handleAppointmentFormSubmit(event);
        });
    }
});
