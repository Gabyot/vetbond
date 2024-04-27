import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import cookieParser from "cookie-parser";
import cors from 'cors';

// Crear una instancia de la aplicación Express
const app = express();

app.use(cors());

// Usar el middleware Morgan para el registro de solicitudes HTTP en el entorno de desarrollo
app.use(morgan('dev'));

// Usar el middleware integrado de Express para el análisis del cuerpo de las solicitudes en formato JSON
app.use(express.json());
// Configurar el middleware cookieParser en la aplicación Express
app.use(cookieParser());

// Usar las rutas de autenticación bajo el prefijo '/api'
app.use('/api', authRoutes);



// Exportar la aplicación Express para su uso en otros archivos
export default app;