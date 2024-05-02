document.addEventListener('DOMContentLoaded', function () {
    var registrationForm = document.querySelector('form');

    registrationForm.addEventListener('submit', function (event) {
        // Prevenir el envío del formulario por defecto para manejarlo manualmente
        event.preventDefault();

        // Obtener los valores del formulario
        var rut = document.getElementById('input_Rut').value;
        var telefono = document.getElementById('input_telefono').value;
        var email = document.getElementById('input_email').value;
        var password = document.getElementById('input_password').value;

        // Obtener el nombre concatenado con los apellidos
        var nombre = document.getElementById('input_Nombres').value;

        // Crear un objeto con los datos del formulario
        var formData = {
            rut: rut,
            name: nombre,
            telefono: telefono,
            email: email,
            password: password
        };

        // Enviar una solicitud POST al endpoint /api/register
        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            // Manejar la respuesta del servidor
            console.log(data);
            alert('Registro exitoso');
            // Redirigir a otra página, si es necesario
            window.location.href = 'login';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al registrar, por favor intenta de nuevo');
        });
    });
});
