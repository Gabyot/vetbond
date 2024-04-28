document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Evita que el formulario se envíe de manera predeterminada

        // Obtener valores de email y contraseña
        var email = document.getElementById('input_email').value;
        var password = document.getElementById('input_password').value;

        // Crear objeto de datos para enviar a la API
        var data = {
            email: email,
            password: password
        };

        // Enviar datos a la API
        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                // Manejar la respuesta de la API
                if (data.id) {
                    // El inicio de sesión fue exitoso
                    alert('Inicio de sesión exitoso!');
                    localStorage.setItem('email', email);
                    // Redirigir a otra página, por ejemplo:
                    window.location.href = 'index.html';
                } else {
                    // El inicio de sesión falló, mostrar mensaje de error
                    alert('Error al iniciar sesión: ' + data.message);
                }
            })
            .catch(error => {
                // Manejar errores de red u otros errores
                console.error('Error:', error);
            });
    });
});
