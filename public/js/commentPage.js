// Obtener el ID de la cita desde la URL
const pathSegments = window.location.pathname.split('/');
const appointmentId = pathSegments[pathSegments.length - 1];

// Llamar a la función para cargar los datos de la cita cuando la página se cargue
document.addEventListener('DOMContentLoaded', loadAppointmentData(appointmentId));


function rateStar(rating) {
    const stars = document.querySelectorAll('#star-rating .star');
    document.getElementById('rating').value = rating; // Actualiza el valor de la calificación

    stars.forEach((star, index) => {
        if (index < rating) {
            star.style.color = '#ffcc00'; // Color para las estrellas activas
        } else {
            star.style.color = '#ccc'; // Color para las estrellas inactivas
        }
    });
}

function loadVetData() {
    var vetId = document.getElementById('vetSelector').value;
    if (vetId) {
        // Ejemplo de cómo podrías hacer una solicitud HTTP para obtener datos
        fetch(`/get-vet-data?veterinarianId=${vetId}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('vetName').textContent = data.name;
                document.getElementById('appointmentDateTime').textContent = data.appointmentDateTime;
                document.getElementById('serviceName').textContent = data.serviceName;
                document.getElementById('serviceLocation').textContent = data.location;
                document.getElementById('petName').textContent = data.petName;
            })
            .catch(error => console.error('Error fetching vet data:', error));
    }
}

// Esta función se encarga de cargar los datos de la cita al cargar la página
function loadAppointmentData(appointmentId) {

    // Hacer una solicitud GET al endpoint api/appointment/:id
    fetch(`/api/appointment/${appointmentId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(appointment => {
            // Aquí puedes insertar los datos de la cita en el contenedor row
            const rowContainer = document.querySelector('.infoVet');
             // Formatear la fecha
             const citaDate = new Date(appointment.cita.fecha);
             const fechaFormateada = citaDate.toLocaleDateString('es-ES', {
                 weekday: 'long', // Día de la semana (lunes, martes, etc.)
                 year: 'numeric', // Año (ej. 2022)
                 month: 'long', // Mes (enero, febrero, etc.)
                 day: 'numeric', // Día del mes (ej. 1, 2, 3)
             });
             
            const appointmentInfo = `
                <div class="col-sm-4 my-3" style="margin: auto;">
                    <img src="../../img/imag_veterinarios/${appointment.servicio.veterinario.rut}.jpeg" alt="${appointment.servicio.veterinario.nombre}" class="img-fluid">
                </div>
                <div class="col-sm-7 mt-3">
                    <h5 class="mb-2">${appointment.servicio.veterinario.nombre}</h5>
                    <p class="mb-2">
                        <i class="svg-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M19 3h-1V2c0-.55-.45-1-1-1s-1 .45-1 1v1H8V2c0-.55-.45-1-1-1s-1 .45-1 1v1H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1 .89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 17H5V8h14v12z"/>
                            </svg>
                        </i>
                        ${fechaFormateada} a las ${appointment.cita.hora}
                    </p>
                    <p class="mb-2">
                        <i class="svg-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM12 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
                            </svg>
                        </i>
                        ${appointment.servicio.direccion.calle} ${appointment.servicio.direccion.numero}, ${appointment.servicio.direccion.ciudad}
                    </p>
                    <p class="mb-2">
                        <i class="svg-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M11 2a1 1 0 1 0 0 2h1v7c0 1.55-1.453 3-3.5 3C6.453 14 5 12.55 5 11V4h1a1 1 0 0 0 0-2H4a1 1 0 0 0-1 1v8c0 2.536 2.013 4.496 4.5 4.916V19c0 .546.195 1.295.757 1.919C8.847 21.575 9.758 22 11 22h5c.493 0 1.211-.14 1.834-.588C18.51 20.925 19 20.125 19 19v-1.17a3.001 3.001 0 1 0-2 0V19c0 .474-.175.674-.334.788-.21.152-.493.212-.666.212h-5c-.758 0-1.097-.242-1.257-.419A.945.945 0 0 1 9.5 19v-3.084c2.487-.42 4.5-2.38 4.5-4.916V3a1 1 0 0 0-1-1h-2Zm7 14a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/></svg>
                        </i>
                        ${appointment.servicio.nombre} - 💲${appointment.servicio.precio}
                    </p>
                    <p class="mb-2">🐾  ${appointment.cita.paciente} (${appointment.cita.especie})</p>
                </div>
            `;
            rowContainer.innerHTML = appointmentInfo;
        })
        .catch(error => {
            console.error('Error fetching appointment data:', error);
        });
}


