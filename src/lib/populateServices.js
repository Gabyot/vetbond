import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import Service from '../model/Service.js'; // Asegúrate de que la ruta es correcta

dotenv.config();

const populateServices = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const servicesData = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../../data/services.json'), 'utf-8')
    );

    await Service.deleteMany({});
    await Service.insertMany(servicesData);

    console.log('Datos de servicios insertados correctamente');
    process.exit();
  } catch (error) {
    console.error('Error al poblar la base de datos:', error);
    process.exit(1);
  }
};

populateServices();
