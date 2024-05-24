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
        fetch('https://vetbond.render.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include' // Incluir cookies en la solicitud
        })
        .then(response => response.json())
        .then(data => {
            // Manejar la respuesta de la API
            if (data.id) {
                // El inicio de sesión fue exitoso
                alert('Inicio de sesión exitoso!');
                localStorage.setItem('email', email);
                // Obtener el parámetro de consulta 'redirect' de la URL
                const params = new URLSearchParams(window.location.search);
                const redirectUrl = params.get('redirect');
                // Redirigir al usuario de vuelta a la URL guardada antes de iniciar sesión
                if (redirectUrl) {
                    window.location.href = redirectUrl;
                } else {
                    // Si no hay URL de redirección, redirigir al usuario a una página por defecto
                    window.location.href = '/';
                }
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
