import app from './src/app.js';
import express from 'express'
import { connectDB } from './src/config/database.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtén la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);

// Obtén el directorio base
const __dirname = path.dirname(__filename);

app.use('/static', express.static(path.join(__dirname, 'public')));
// Llamar a la función 'connectDB' para conectar con la base de datos
connectDB();

// Configurar el puerto y escuchar las solicitudes
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
