document.addEventListener('DOMContentLoaded', function () {
    // Realiza la carga dinámica de las tarjetas de servicio al cargar la página
    loadServices();
});

function loadServices() {
    fetch('api/services') // Realiza una llamada a la ruta '/services' en el servidor
        .then(response => {
            if (response.ok) {
                return response.json(); // Convierte la respuesta a formato JSON
            } else {
                throw new Error('Error en la llamada a services:', response.status);
            }
        })
        .then(data => {
            // Itera sobre la lista de servicios
            data.forEach(service => {
                // Crea un elemento div para la tarjeta de servicio
                var serviceCard = document.createElement('div');
                serviceCard.classList.add('col-md-8', 'mb-6');

                // Construye el contenido de la tarjeta de servicio
                serviceCard.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <!-- Imagen del veterinario a la izquierda -->
                            <div class="col-3">
                                <img src="ruta/a/la/imagen.jpg" alt="Imagen del veterinario" class="img-fluid">
                            </div>
                            <div class="col-8">
                                <!-- Nombre del veterinario centrado -->
                                <h5 class="card-title text-start">${service.profesional_veterinario.nombre}</h5>
                                <!-- Enlace a las opiniones -->
                                <p class="text-start"><a href="#">Opiniones</a></p>
                                <!-- Dirección -->
                                <p class="card-text">Dirección: ${service.direccion.calle} ${service.direccion.numero}, ${service.direccion.ciudad}, ${service.direccion.pais}</p>
                                <!-- Servicio y precio a la derecha -->
                                <span class="d-flex justify-between-center">
                                    <p class="card-text">${service.nombre}</p>
                                    <p class="card-text ms-auto mr-8">Precio: ${service.precio}</p>
                                </span>
                                <!-- Fechas disponibles -->
                                <p class="card-text">Fechas Disponibles:</p>
                                <div id="dates-${service._id}">
                                    <!-- Aquí se mostrarán las fechas disponibles como botones -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                `;

                // Agrega la tarjeta de servicio al contenedor de servicios
                document.getElementById('servicesContainer').appendChild(serviceCard);

                // Itera sobre las fechas disponibles del servicio y crea botones para cada una
                var datesContainer = document.getElementById(`dates-${service._id}`);
                service.fechas_disponibles.forEach(date => {
                    var dateButton = document.createElement('button');
                    dateButton.classList.add('btn', 'btn-primary', 'mb-2');
                    dateButton.textContent = date;
                    dateButton.addEventListener('click', function () {
                        // Aquí puedes manejar el evento de clic en el botón de fecha
                        alert(`Has seleccionado la fecha: ${date}`);
                    });
                    datesContainer.appendChild(dateButton);
                });
            });
        })
        .catch(error => {
            console.error('Error en la llamada a services:', error);
        });
}
