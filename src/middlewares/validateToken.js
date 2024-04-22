import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js';

// Middleware de autenticación para verificar la presencia y validez del token
export const authRequire = (req, res, next) => {
    // Extraer el token de las cookies de la solicitud
    const { token } = req.cookies;

    // Verificar si se proporciona un token
    if (!token) {
        // Si no se proporciona un token, devolver un error de autorización
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    // Verificar la validez del token utilizando el secreto del token
    jwt.verify(token, TOKEN_SECRET, (err, user) => {

        // Si el token no es válido, devolver un error de token inválido
        if (err) return res.status(403).json({ message: "Invalid Token" });

        // Si el token es válido, agregar el usuario decodificado al objeto de solicitud (req.user)
        req.user = user;

        // Pasar al siguiente middleware o controlador en la cadena de middleware
        next();
    });
}