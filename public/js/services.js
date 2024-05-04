// Variable global para almacenar todas las tarjetas de servicio
let allServiceCards = [];

document.addEventListener('DOMContentLoaded', async function () {
    const ciudadSelect = document.getElementById('ciudad');
    const especialidadSelect = document.getElementById('especialidad');

    await initializePage();

    ciudadSelect.addEventListener('change', updateUrlParams);
    especialidadSelect.addEventListener('change', updateUrlParams);
});

async function initializePage() {
    await loadSelectedValues();
    loadServices();
}

async function loadServices() {
    try {
        const { especialidad, ciudad } = getQueryParams();
        setSelectValues(especialidad, ciudad);

        let url = '/../api/services?';
        if (especialidad) {
            url += `especialidad=${encodeURIComponent(especialidad)}&`;
        }
        if (ciudad) {
            url += `ciudad=${encodeURIComponent(ciudad)}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error al obtener los servicios');
        }
        const data = await response.json();
        allServiceCards = data;
        displayServices(allServiceCards);
    } catch (error) {
        console.error('Error al cargar los servicios:', error);
    }
}

function updateUrlParams() {
    const selectedComuna = document.getElementById('ciudad').value;
    const selectedServicio = document.getElementById('especialidad').value;
    const url = new URL(window.location.href);
    url.searchParams.set('ciudad', selectedComuna);
    url.searchParams.set('especialidad', selectedServicio);
    window.location.href = url.toString();
}

function displayServices(serviceCards) {
    const servicesContainer = document.getElementById('servicesContainer');
    servicesContainer.innerHTML = '';
    serviceCards.forEach(service => {
        const serviceCard = createServiceCard(service);
        servicesContainer.appendChild(serviceCard);
    });
}

function createServiceCard(service) {
    const serviceCard = document.createElement('div');
    serviceCard.classList.add('col-md-8', 'mb-6');
    serviceCard.innerHTML = `
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-3">
                        <img src="https://s3.sa-east-1.amazonaws.com/doctoralia.cl/doctor/cdfac5/cdfac5ee16c2c04eb8ebb494f215f4b7_large.jpg" alt="Imagen del veterinario" class="img-fluid">
                    </div>
                    <div class="col-8">
                        <h5 class="card-title text-start">${service.profesional_veterinario.nombre}</h5>
                        <p class="text-start"><a href="#">Opiniones</a></p>
                        <p class="card-text ciudad">Dirección: ${service.direccion.calle} ${service.direccion.numero}, ${service.direccion.ciudad}, ${service.direccion.pais}</p>
                        <span class="d-flex justify-between-center">
                            <p class="card-text">${service.nombre}</p>
                            <p class="card-text ms-auto mr-8">Precio: ${service.precio}</p>
                        </span>
                        <p class="card-text">Fechas Disponibles:</p>
                        <div id="dates-${service._id}">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const datesContainer = serviceCard.querySelector(`#dates-${service._id}`);
    if (service.fechas_disponibles && Array.isArray(service.fechas_disponibles)) {
        service.fechas_disponibles.forEach(dateObj => {
            const date = dateObj.fecha;
            const dateButton = document.createElement('button');
            dateButton.classList.add('btn', 'btn-primary', 'mb-2');
            dateButton.textContent = date;
            dateButton.addEventListener('click', function () {
                const serviceId = service._id;
                window.location.href = `/reserva?id=${encodeURIComponent(serviceId)}&fecha=${encodeURIComponent(date)}`;
            });
            datesContainer.appendChild(dateButton);
        });
    } else {
        console.error('Error al crear tarjeta de servicio: las fechas disponibles son inválidas.');
    }
    return serviceCard;
}

async function loadSelectedValues() {
    const especialidadSelect = document.getElementById('especialidad');
    const ciudadSelect = document.getElementById('ciudad');

    const especialidades = await fetchData('/api/services/names');
    const ciudades = await fetchData('/api/comunas');

    fillSelect(especialidades, especialidadSelect);
    fillSelect(ciudades, ciudadSelect);
}

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error al obtener datos de ${url}`);
    }
    return response.json();
}

function fillSelect(data, selectElement) {
    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        selectElement.appendChild(option);
    });
}

function getQueryParams() {
    const queryParams = new URLSearchParams(window.location.search);
    return {
        especialidad: queryParams.get('especialidad'),
        ciudad: queryParams.get('ciudad')
    };
}

function setSelectValues(especialidad, ciudad) {
    document.getElementById('especialidad').value = especialidad;
    document.getElementById('ciudad').value = ciudad;
}
