// Variable global para almacenar todas las tarjetas de servicio
let allServiceCards = [];

document.addEventListener('DOMContentLoaded', function () {
    // Realiza la carga dinámica de las tarjetas de servicio al cargar la página
    loadServices();
    loadCitys();
    // Agregar evento al selector de comuna
    const comunaSelect = document.getElementById('comunaSelect');
    comunaSelect.addEventListener('change', filterServicesByComuna);
});

async function loadServices() {
    try {
        // Realiza una llamada al servidor para obtener todas las tarjetas de servicio
        const response = await fetch('/../api/services');
        if (!response.ok) {
            throw new Error('Error al obtener los servicios');
        }
        const data = await response.json();
        allServiceCards = data; // Almacena todas las tarjetas de servicio en la variable global
        displayServices(allServiceCards); // Muestra todas las tarjetas de servicio
    } catch (error) {
        console.error('Error al cargar los servicios:', error);
    }
}

async function loadCitys() {
    const comunaSelect = document.getElementById('comunaSelect');

    try {
        // Obtener las comunas desde el servidor
        const response = await fetch('/../api/comunas');
        const data = await response.json();

        // Agregar opciones de select para cada comuna
        data.forEach(comuna => {
            const option = document.createElement('option');
            option.value = comuna;
            option.textContent = comuna;
            comunaSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al obtener las comunas:', error);
    }
}

function filterServicesByComuna() {
    const selectedComuna = document.getElementById('comunaSelect').value;
    const filteredServiceCards = allServiceCards.filter(card => {
        const comunaText = card.direccion.ciudad; // Suponiendo que "ciudad" es la propiedad que contiene el nombre de la comuna
        return selectedComuna === 'todas' || selectedComuna === comunaText;
    });
    displayServices(filteredServiceCards); // Muestra solo las tarjetas de servicio filtradas
}

function displayServices(serviceCards) {
    const servicesContainer = document.getElementById('servicesContainer');
    // Elimina todas las tarjetas de servicio actuales
    servicesContainer.innerHTML = '';
    // Agrega las tarjetas de servicio al contenedor
    serviceCards.forEach(service => {
        const serviceCard = createServiceCard(service);
        servicesContainer.appendChild(serviceCard);
    });
}

function createServiceCard(service) {
    // Crea y devuelve la estructura HTML de una tarjeta de servicio
    const serviceCard = document.createElement('div');
    serviceCard.classList.add('col-md-8', 'mb-6');
    serviceCard.innerHTML = `
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <!-- Imagen del veterinario a la izquierda -->
                    <div class="col-3">
                        <img src="https://s3.sa-east-1.amazonaws.com/doctoralia.cl/doctor/cdfac5/cdfac5ee16c2c04eb8ebb494f215f4b7_large.jpg" alt="Imagen del veterinario" class="img-fluid">
                    </div>
                    <div class="col-8">
                        <!-- Nombre del veterinario centrado -->
                        <h5 class="card-title text-start">${service.profesional_veterinario.nombre}</h5>
                        <!-- Enlace a las opiniones -->
                        <p class="text-start"><a href="#">Opiniones</a></p>
                        <!-- Dirección -->
                        <p class="card-text ciudad">Dirección: ${service.direccion.calle} ${service.direccion.numero}, ${service.direccion.ciudad}, ${service.direccion.pais}</p>
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
    // Iterar sobre las fechas disponibles del servicio y crear botones para cada una
    const datesContainer = serviceCard.querySelector(`#dates-${service._id}`);
    if (service.fechas_disponibles && Array.isArray(service.fechas_disponibles)) {
        service.fechas_disponibles.forEach(dateObj => {
            const date = dateObj.fecha;
            const dateButton = document.createElement('button');
            dateButton.classList.add('btn', 'btn-primary', 'mb-2');
            dateButton.textContent = date;
            dateButton.addEventListener('click', function () {
                // Obtener el ID del servicio
                const serviceId = service._id;
                // Redirigir a la página de citasForm y pasar la información del servicio y la fecha a través de la URL
                window.location.href = `/reserva?id=${encodeURIComponent(serviceId)}&fecha=${encodeURIComponent(date)}`;
            });
            datesContainer.appendChild(dateButton);
        });
    } else {
        console.error('Error al crear tarjeta de servicio: las fechas disponibles son inválidas.');
    }
    return serviceCard;
}
