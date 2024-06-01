import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import cookieParser from "cookie-parser";
import cors from 'cors';
import reviewRoutes from './routes/reviewRoutes.js'
import serviceRoutes from './routes/serviceRoutes.js';
import frontendRoutes from './routes/frontendRoutes.js'; 
import appointmentRoutes from './routes/appointmentRoutes.js'; 
import path from 'path'; 

// Crear una instancia de la aplicación Express
const app = express();

// Permitir solicitudes desde todos los orígenes
app.use(cors({
  origin: 'https://vetbond.vercel.app/',
  credentials: true
}));

// Confianza en el primer proxy
app.set('trust proxy', 1); 

// Usar el middleware Morgan para el registro de solicitudes HTTP en el entorno de desarrollo
app.use(morgan('dev'));

// Usar el middleware integrado de Express para el análisis del cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Configurar el middleware cookieParser en la aplicación Express
app.use(cookieParser());

// Usar las rutas de autenticación bajo el prefijo '/api'
app.use('/api', authRoutes);

// Usar las rutas de servicios veterinarios bajo el prefijo '/api'
app.use('/api', serviceRoutes);

// Usar las rutas de citas bajo el prefijo '/api'
app.use('/api', appointmentRoutes);

// Usar las rutas de citas bajo el prefijo '/api'
app.use('/api', reviewRoutes);

// Obtener el directorio estático absoluto utilizando import.meta.url
const staticDir = path.join(new URL(import.meta.url).pathname, '..', 'public');

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static(staticDir));

// Usar las rutas del frontend
app.use('/', frontendRoutes); 

// Exportar la aplicación Express para su uso en otros archivos
export default app;