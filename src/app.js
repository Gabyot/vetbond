import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import cookieParser from "cookie-parser";
import cors from 'cors';
import reviewRoutes from './routes/reviewRoutes.js'
import serviceRoutes from './routes/serviceRoutes.js';
import frontendRoutes from './routes/frontendRoutes.js'; 
import appointmentRoutes from './routes/appointmentRoutes.js'; 

// Crear una instancia de la aplicación Express
const app = express();

// Permitir solicitudes desde todos los orígenes
app.use(cors({
    origin: true,
    credentials: true,
  }));

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

// Usar las rutas del frontend
app.use('/', frontendRoutes); 

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public')); 


// Exportar la aplicación Express para su uso en otros archivos
export default app;