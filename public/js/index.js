document.addEventListener('DOMContentLoaded', function () {
    // Verificar si hay un email de usuario almacenado en el almacenamiento local
    var email = localStorage.getItem('email');

    if (email) {
        var loginButton = document.getElementById('loginButton');
        loginButton.textContent = 'Sesión Iniciada como: ' + email;
        loginButton.addEventListener('click', function(event) {
            event.preventDefault(); // Evita el comportamiento predeterminado del enlace
            // Realizar una solicitud a la API para cerrar la sesión del usuario
            fetch('http://localhost:3000/api/profile', {
                method: 'GET',
                credentials: 'include', // Incluir cookies en la solicitud
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json(); // Convierte la respuesta a formato JSON
                } else {
                    throw new Error('Error en la llamada a profile:', response.status);
                }
            })
            .then(data => {
                // Aquí puedes utilizar los datos recibidos del perfil del usuario
                console.log('Datos del perfil:', data);
            })
            .catch(error => {
                console.error('Error en la llamada a profile:', error);
            });
        });

        // Mostrar el botón de cerrar sesión
        var logoutButton = document.getElementById('logoutButton');
        logoutButton.style.display = 'block';

        logoutButton.addEventListener('click', function () {
            // Realizar una solicitud a la API para cerrar la sesión del usuario
            fetch('http://localhost:3000/api/logout', {
                method: 'POST', // Cambiar el método a GET
                credentials: 'include', // Incluir cookies en la solicitud
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    localStorage.removeItem('email');
                    window.location.href = '/';
                } else {
                    // Si hay un error en la respuesta, lanzar un error con el mensaje del servidor
                    throw new Error('Hubo un problema al cerrar la sesión');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
        
    }
});
