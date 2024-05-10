document.addEventListener('DOMContentLoaded', async function () {
    try {
        // Realizar una solicitud para obtener las citas del usuario
        const response = await fetch('api/appointments/user');
        const appointments = await response.json();

        // Obtener la fecha actual
        const currentDate = new Date();

        // Obtener el contenedor donde se mostrarán las citas programadas
        const citasProgramadasContainer = document.getElementById('citas-programadas');

        // Obtener el contenedor donde se mostrarán las citas completadas
        const citasCompletadasContainer = document.getElementById('citas-completadas');

        // Obtener el contenedor donde se mostrará el email
        const emailContainer = document.getElementById('email');
        // Verificar si hay un email de usuario almacenado en el almacenamiento local
        var email = localStorage.getItem('email');
        emailContainer.innerText = email;

        // Limpiar los contenedores antes de agregar las nuevas citas
        citasProgramadasContainer.innerHTML = '';
        citasCompletadasContainer.innerHTML = '';

        // Iterar sobre cada cita y agregarla al contenedor correspondiente
        appointments.forEach(appointment => {
            // Formatear la fecha
            const citaDate = new Date(appointment.cita.fecha);
            const fechaFormateada = citaDate.toLocaleDateString('es-ES', {
                weekday: 'long', // Día de la semana (lunes, martes, etc.)
                year: 'numeric', // Año (ej. 2022)
                month: 'long', // Mes (enero, febrero, etc.)
                day: 'numeric', // Día del mes (ej. 1, 2, 3)
            });

            // Verificar si la fecha de la cita es futura o pasada
            if (citaDate > currentDate) {
                // Agregar la cita al contenedor de citas programadas
                const citaHTML = `
                <div class="">
                    <div class="card-body my-2">
                        <div id="infoCita">
                            <div class="row">
                                <div class="col-sm-3 my-3">
                                    <img src="../img/imag_veterinarios/${appointment.servicio.veterinario.rut}.jpeg" alt="${appointment.servicio.veterinario.nombre}" class="img-fluid">
                                </div>
                                <div class="col-sm-9 mt-3">
                                    <h5 class="mb-2">${appointment.servicio.veterinario.nombre}</h5>
                                    <p class="mb-2"><i class="svg-icon" ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M19 3h-1V2c0-.55-.45-1-1-1s-1 .45-1 1v1H8V2c0-.55-.45-1-1-1s-1 .45-1 1v1H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1 .89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 17H5V8h14v12z"/>
                                </i>
                                  </svg>
                                   ${fechaFormateada} a las ${appointment.cita.hora}</p>
                                    <p class="mb-2"><i class="svg-icon" ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM12 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
                                   </i>
                                </svg>
                                 ${appointment.servicio.direccion.calle} ${appointment.servicio.direccion.numero}, ${appointment.servicio.direccion.ciudad}</p>
                                    <p class="mb-2"><i class="svg-icon" ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 2a1 1 0 1 0 0 2h1v7c0 1.55-1.453 3-3.5 3C6.453 14 5 12.55 5 11V4h1a1 1 0 0 0 0-2H4a1 1 0 0 0-1 1v8c0 2.536 2.013 4.496 4.5 4.916V19c0 .546.195 1.295.757 1.919C8.847 21.575 9.758 22 11 22h5c.493 0 1.211-.14 1.834-.588C18.51 20.925 19 20.125 19 19v-1.17a3.001 3.001 0 1 0-2 0V19c0 .474-.175.674-.334.788-.21.152-.493.212-.666.212h-5c-.758 0-1.097-.242-1.257-.419A.945.945 0 0 1 9.5 19v-3.084c2.487-.42 4.5-2.38 4.5-4.916V3a1 1 0 0 0-1-1h-2Zm7 14a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/></svg></i>
                                    ${appointment.servicio.nombre} - 💲${appointment.servicio.precio}</p>
                                    <p><strong>Paciente:</strong> ${appointment.cita.paciente} (${appointment.cita.especie})</p>
                                </div>
                            </div>
                            <hr>
							<div class="row my-4">
								<div class="col-md-12" >
                                    <button class="link col-md-6" href="/">Editar datos de la cita</button>
                                    <button class="link col-md-5" href="/profile">Cancelar cita</button>
								</div>
                            </div>
                        </div>
                    </div>
                </div>
                
            `;
                citasProgramadasContainer.innerHTML += citaHTML;
            } else {
                // Agregar la cita al contenedor de citas completadas
                const citaHTML = `
                <div class="">
                    <div class="card-body my-2">
                        <div id="infoCita">
                            <div class="row">
                                <div class="col-sm-3 my-3">
                                    <img src="../img/imag_veterinarios/${appointment.servicio.veterinario.rut}.jpeg" alt="${appointment.servicio.veterinario.nombre}" class="img-fluid">
                                </div>
                                <div class="col-sm-9 mt-3">
                                    <h5 class="mb-2">${appointment.servicio.veterinario.nombre}</h5>
                                    <p class="mb-2"><i class="svg-icon" ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M19 3h-1V2c0-.55-.45-1-1-1s-1 .45-1 1v1H8V2c0-.55-.45-1-1-1s-1 .45-1 1v1H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1 .89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 17H5V8h14v12z"/>
                                </i>
                                  </svg>
                                   ${fechaFormateada} a las ${appointment.cita.hora}</p>
                                    <p class="mb-2"><i class="svg-icon" ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM12 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
                                   </i>
                                </svg>
                                 ${appointment.servicio.direccion.calle} ${appointment.servicio.direccion.numero}, ${appointment.servicio.direccion.ciudad}</p>
                                    <p class="mb-2"><i class="svg-icon" ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 2a1 1 0 1 0 0 2h1v7c0 1.55-1.453 3-3.5 3C6.453 14 5 12.55 5 11V4h1a1 1 0 0 0 0-2H4a1 1 0 0 0-1 1v8c0 2.536 2.013 4.496 4.5 4.916V19c0 .546.195 1.295.757 1.919C8.847 21.575 9.758 22 11 22h5c.493 0 1.211-.14 1.834-.588C18.51 20.925 19 20.125 19 19v-1.17a3.001 3.001 0 1 0-2 0V19c0 .474-.175.674-.334.788-.21.152-.493.212-.666.212h-5c-.758 0-1.097-.242-1.257-.419A.945.945 0 0 1 9.5 19v-3.084c2.487-.42 4.5-2.38 4.5-4.916V3a1 1 0 0 0-1-1h-2Zm7 14a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/></svg></i>
                                    ${appointment.servicio.nombre} - 💲${appointment.servicio.precio}</p>
                                    <p><strong>Paciente:</strong> ${appointment.cita.paciente} (${appointment.cita.especie})</p>
                                </div>
                            </div>
                            <hr>
							<div class="row my-4">
								<div class="col-md-12" >
                                    <button class="link col-md-6" href="/">Editar datos de la cita</button>
                                    <button class="link col-md-5" href="/profile">Cancelar cita</button>
								</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
                citasCompletadasContainer.innerHTML += citaHTML;
            }
        });
    } catch (error) {
        console.error('Error al obtener las citas del usuario:', error);
    }
});


