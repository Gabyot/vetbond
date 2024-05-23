import { EventEmitterAsyncResource } from 'events';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(">>> DB is connected");
  } catch (error) {
    console.error(">>> Error connecting to the database:", error);
  }
};
