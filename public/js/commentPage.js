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
