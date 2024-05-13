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
                    <div class="col-4">
                        <img src="../img/imag_veterinarios/${service.profesional_veterinario.rut}.jpeg" alt="Imagen del veterinario" class="img-fluid">
                    </div>
                    <div class="col-8" style="padding-right:3rem">
                        <h5 class="card-title text-start">${service.profesional_veterinario.nombre}</h5>
                        <p class="text-start"><a href="/vetprofile/${service._id}">Opiniones</a></p>
                        <p class="card-text ciudad"><i class="svg-icon" ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM12 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
                        
                    </svg></i> ${service.direccion.calle} ${service.direccion.numero}, ${service.direccion.ciudad}, ${service.direccion.pais}</p>
                        <span class="d-flex justify-between-center">
                            <p class="card-text"><i class="svg-icon svg-icon-stethoscope svg-icon-size-16 svg-icon-color-gray-900" ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 2a1 1 0 1 0 0 2h1v7c0 1.55-1.453 3-3.5 3C6.453 14 5 12.55 5 11V4h1a1 1 0 0 0 0-2H4a1 1 0 0 0-1 1v8c0 2.536 2.013 4.496 4.5 4.916V19c0 .546.195 1.295.757 1.919C8.847 21.575 9.758 22 11 22h5c.493 0 1.211-.14 1.834-.588C18.51 20.925 19 20.125 19 19v-1.17a3.001 3.001 0 1 0-2 0V19c0 .474-.175.674-.334.788-.21.152-.493.212-.666.212h-5c-.758 0-1.097-.242-1.257-.419A.945.945 0 0 1 9.5 19v-3.084c2.487-.42 4.5-2.38 4.5-4.916V3a1 1 0 0 0-1-1h-2Zm7 14a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/></svg></i>
                            ${service.nombre}</p>
                            <p class="card-text ms-auto">💲${service.precio}</p>
                        </span>
                        <p class="card-text"><i class="svg-icon" ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M19 3h-1V2c0-.55-.45-1-1-1s-1 .45-1 1v1H8V2c0-.55-.45-1-1-1s-1 .45-1 1v1H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1 .89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 17H5V8h14v12z"/>
                        
                      </svg></i>  Fechas Disponibles:</p>
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
        const date = new Date(dateObj.fecha);
        
        // Formatear la fecha en el formato deseado (día/mes/año)
        const formattedDate = date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' });

        const dateButton = document.createElement('button');
        dateButton.classList.add('btn', 'btn-primary', 'mb-2');
        dateButton.textContent = formattedDate;
        dateButton.addEventListener('click', function () {
            const serviceId = service._id;
            window.location.href = `/reserva?id=${encodeURIComponent(serviceId)}&fecha=${encodeURIComponent(dateObj.fecha)}`;
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
