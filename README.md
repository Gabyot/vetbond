## Tabla de Contenidos
1. [Descripción del Proyecto](#1-descripción-del-proyecto)
2. [Instalación](#2-instalación)
3. [Uso](#3-uso)
4. [Variables de Entorno](#4-variables-de-entorno)
5. [Poblar la Base de Datos](#5-poblar-la-base-de-datos)
6. [Estructura del Proyecto](#6-estructura-del-proyecto)
7. [Scripts Disponibles](#7-scripts-disponibles)
8. [Endpoints de la API](#8-endpoints-de-la-api)
9. [Contribuciones](#9-contribuciones)

## 1. Descripción del Proyecto
Vetbond es una aplicación web que conecta a usuarios con veterinarios, permitiéndoles programar citas, ver servicios disponibles y dejar reseñas sobre las citas completadas. El backend está desarrollado usando Node.js y Express, con MongoDB como base de datos.

## 2. Instalación
Para comenzar con el proyecto, clona el repositorio e instala las dependencias:

```bash
git clone https://github.com/gabyot/vetbond.git
cd vetbond
npm install
```

## 3. Uso

Para ejecutar el servidor en modo desarrollo, usa el siguiente comando:

```bash
npm run dev
````
Esto iniciará el servidor usando nodemon, que reiniciará automáticamente el servidor cuando se detecten cambios.

## 4. Variables de Entorno
La aplicación requiere la configuración de algunas variables de entorno. Crea un archivo .env en el directorio raíz del proyecto y agrega las siguientes variables:
```bash
MONGODB_URI=tu_cadena_de_conexión_de_mongodb
```
## 5. Poblar la Base de Datos
El repositorio incluye un archivo JSON con datos para poblar la colección de servicios en la base de datos. Sigue estos pasos para poblar la base de datos:

1. Asegúrate de que tu base de datos MongoDB esté en funcionamiento.

2. Ejecuta el siguiente script para poblar la base de datos con los datos del archivo services.json:

```bash
node src/lib/populateServices.js
```

Siguiendo estos pasos, puedes poblar fácilmente la colección de servicios en tu base de datos MongoDB.


## 6. Estructura del Proyecto
La estructura del proyecto está organizada de la siguiente manera:

```bash
vetbond/
├── public/
│   ├── assets/
│   ├── js/
│   └── index.html
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.js
├── .env
├── .gitignore
├── package.json
└── README.md
```
 * public/: Contiene los archivos estáticos como imágenes y archivos JavaScript.
 * assets/: Directorio para las imágenes y estilos.
 * js/: Directorio para los archivos JavaScript del frontend.
 * index.html: Archivo HTML principal.
 * src/: Contiene el código fuente del servidor.
 * controllers/: Controladores de la aplicación.
* models/: Modelos de la base de datos.
* routes/: Definición de las rutas de la API.
* utils/: Utilidades y funciones auxiliares.
* index.js: Archivo principal del servidor.
* .env: Archivo de configuración de variables de entorno.
* .gitignore: Archivos y directorios que git debe ignorar.
* package.json: Archivo de configuración de npm.
* README.md: Documentación del proyecto.

## 7. Scripts Disponibles
En el archivo package.json, hay algunos scripts definidos:

* npm run dev: Inicia el servidor en modo desarrollo usando nodemon.
* npm start: Inicia el servidor en modo producción.

## 8. Endpoints de la API
Aquí se pueden listar algunos de los endpoints principales de la API:

- **POST /api/appointments/create**: Crea una nueva cita.
- **GET /api/appointments/user**: Obtiene las citas de un usuario por su `userId`.
- **DELETE /api/appointment/:id**: Elimina una cita por su `appointmentId`.
- **GET /api/appointment/:id**: Obtiene información de una cita por su `appointmentId`.
- **POST /api/register**: Registra un nuevo usuario.
- **POST /api/login**: Inicia sesión de un usuario.
- **POST /api/logout**: Cierra sesión de un usuario.
- **GET /api/profile**: Obtiene el perfil del usuario autenticado.
- **GET /api/check-authentication**: Verifica la autenticación del usuario.
- **POST /api/review/create**: Crea una nueva reseña.
- **GET /api/review-by-service/:id**: Obtiene todas las reseñas de un servicio por su `serviceId`.
- **DELETE /api/review/delete/:id**: Elimina una reseña por su `reviewId`.
- **GET /api/review-by-id/:id**: Obtiene una reseña por su `reviewId`.
- **GET /api/services**: Obtiene todos los servicios disponibles.
- **GET /api/service/:id**: Obtiene un servicio por su `serviceId`.
- **GET /api/comunas**: Obtiene todas las comunas disponibles.
- **GET /api/services/times**: Obtiene los horarios de una fecha específica de un servicio.
- **GET /api/services/names**: Obtiene todos los nombres de los servicios.

## 9. Contribuciones
Las contribuciones son bienvenidas. Para contribuir, sigue estos pasos:

1. Haz un fork del repositorio.
1. Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
2. Realiza tus cambios y haz commit (git commit -m 'Agregar nueva funcionalidad').
3. Haz push a la rama (git push origin feature/nueva-funcionalidad).
4. Abre un Pull Request.
