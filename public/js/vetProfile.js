// Obtener el ID del servicio desde la URL
const pathSegments = window.location.pathname.split('/');
const servicioId = pathSegments[pathSegments.length - 1];

document.addEventListener('DOMContentLoaded', async () => {
    console.log(servicioId)

    // Llamar a la función para cargar los datos del veterinario y sus reseñas
    await loadServiceData(servicioId);
    await loadServiceReviews(servicioId);
});


// Esta función se encarga de cargar los datos de la cita al cargar la página
async function loadServiceData(servicioId) {

    // Hacer una solicitud GET al endpoint api/appointment/:id
    await fetch(`/api/service/${servicioId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(servicio => {
            // Aquí puedes insertar los datos de la cita en el contenedor row
            const rowContainer = document.querySelector('.row');

            const vetInfo = `
                <div class="infoVetCard col-sm-4" style="margin: auto; margin-top:0rem;">
                    <img src="../../img/imag_veterinarios/${servicio.profesional_veterinario.rut}.jpeg" alt="${servicio.profesional_veterinario.nombre}" class="img-fluid">
                    <h5 class="my-3">${servicio.profesional_veterinario.nombre}</h5>
                    <p class="mb-2">
                        <i class="svg-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM12 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
                            </svg>
                        </i>
                        ${servicio.direccion.calle} ${servicio.direccion.numero}, ${servicio.direccion.ciudad}
                    </p>
                    <p class="mb-2">
                        <i class="svg-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M11 2a1 1 0 1 0 0 2h1v7c0 1.55-1.453 3-3.5 3C6.453 14 5 12.55 5 11V4h1a1 1 0 0 0 0-2H4a1 1 0 0 0-1 1v8c0 2.536 2.013 4.496 4.5 4.916V19c0 .546.195 1.295.757 1.919C8.847 21.575 9.758 22 11 22h5c.493 0 1.211-.14 1.834-.588C18.51 20.925 19 20.125 19 19v-1.17a3.001 3.001 0 1 0-2 0V19c0 .474-.175.674-.334.788-.21.152-.493.212-.666.212h-5c-.758 0-1.097-.242-1.257-.419A.945.945 0 0 1 9.5 19v-3.084c2.487-.42 4.5-2.38 4.5-4.916V3a1 1 0 0 0-1-1h-2Zm7 14a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/></svg>
                        </i>
                        ${servicio.nombre} - 💲${servicio.precio}
                    </p>
                </div>
                <div class="infoVetCard col-sm-7">
                    <h4 class="mb-4" style="color: #226669">Reseñas:</h4>
                    <div class="reviews-container"></div>
                </div>
            `;
            rowContainer.innerHTML = vetInfo;
        })
        .catch(error => {
            console.error('Error fetching appointment data:', error);
        });
}

// Esta función se encarga de cargar las reseñas del servicio al cargar la página
async function loadServiceReviews(servicioId) {

    // Hacer una solicitud GET al endpoint api/review-by-service/:id
    await fetch(`/api/review-by-service/${servicioId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(reviews => {
            // Aquí puedes insertar las reseñas en el contenedor adecuado
            const reviewsContainer = document.querySelector('.reviews-container');

            // Iterar sobre cada reseña y crear elementos HTML para mostrarlas
            reviews.forEach(review => {
                const reviewElement = document.createElement('div');
                reviewElement.classList.add('cardReview');

                // Crear HTML para mostrar la reseña
                const reviewHTML = `
                    <p>${review.usuario.name}:</p>
                    <div id="star-rating" style="color: #ffcc00;">
                        ${getStarRatingHTML(review.puntuacion)}
                    </div>
                    <p><strong>Comentario:</strong> ${review.comentario}</p>                    
                `;

                // Agregar el HTML de la reseña al elemento creado
                reviewElement.innerHTML = reviewHTML;

                // Agregar la reseña al contenedor de reseñas
                reviewsContainer.appendChild(reviewElement);
            });
        })
        .catch(error => {
            console.error('Error fetching reviews:', error);
        });
}

// Función para obtener el HTML de las estrellas según la puntuación
function getStarRatingHTML(rating) {
    const filledStars = '<span class="star" title="">&#9733;</span>'.repeat(rating);
    const emptyStars = '<span class="star" title="">&#9734;</span>'.repeat(5 - rating);
    return filledStars + emptyStars;
}

