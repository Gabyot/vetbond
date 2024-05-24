// Importar el secreto del token desde el archivo de configuración
import { TOKEN_SECRET } from "../config.js";

// Importar la librería jwt para la creación y verificación de tokens JWT
import jwt from 'jsonwebtoken';

// Función para crear un token de acceso JWT
export function createAccessToken(payload) {
    // Retornar una promesa para manejar de manera asincrónica la generación del token
    return new Promise((resolve, reject) => {
        // Firmar el payload utilizando el secreto del token
        jwt.sign(
            payload, // Payload que se incluirá en el token
            TOKEN_SECRET, // Secreto para firmar el token
            {
                expiresIn: "1d" // Tiempo de expiración del token (1 día)
            },
            (err, token) => {
                // Manejar cualquier error que ocurra durante la firma del token
                if (err) reject(err);
                // Si no hay errores, resolver la promesa con el token generado
                resolve(token);
            }
        );
    });
}
