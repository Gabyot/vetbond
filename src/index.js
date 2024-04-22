import app from './app.js';
import { connectDB } from './config/database.js';

// Llamar a la función 'connectDB' para conectar con la base de datos
connectDB();

// Iniciar el servidor Express en el puerto 3000
app.listen(3000);

// Imprimir un mensaje en la consola para indicar que el servidor se ha iniciado en el puerto 3000
console.log('Server on port', 3000);