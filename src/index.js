import app from './app.js';
import { connectDB } from './config/database.js';
import express from 'express'

// Llamar a la función 'connectDB' para conectar con la base de datos
connectDB();

app.use(express.static('../public'))
// Configurar el puerto y escuchar las solicitudes
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
