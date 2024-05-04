document.addEventListener('DOMContentLoaded', async function () {
    const especialidadSelect = document.getElementById('especialidad');
    const ciudadSelect = document.getElementById('ciudad');
    const buscarButton = document.getElementById('buscar');

    // Obtener especialidades desde la API
    const especialidades = await fetch('/api/services/names');
    const especialidadesData = await especialidades.json();

    // Obtener ciudades/comunas desde la API
    const ciudades = await fetch('/api/comunas');
    const ciudadesData = await ciudades.json();

    // Llenar select de especialidades
    especialidadesData.forEach(especialidad => {
        const option = document.createElement('option');
        option.value = especialidad;
        option.textContent = especialidad;
        especialidadSelect.appendChild(option);
    });

    // Llenar select de ciudades/comunas
    ciudadesData.forEach(ciudad => {
        const option = document.createElement('option');
        option.value = ciudad;
        option.textContent = ciudad;
        ciudadSelect.appendChild(option);
    });

    // Agregar evento de clic al botón de búsqueda
    buscarButton.addEventListener('click', function () {
        const selectedEspecialidad = especialidadSelect.value;
        const selectedCiudad = ciudadSelect.value;
        // Redirigir al usuario a /services con los parámetros seleccionados en los selects
        window.location.href = `/services?especialidad=${encodeURIComponent(selectedEspecialidad)}&ciudad=${encodeURIComponent(selectedCiudad)}`;
    });
});
