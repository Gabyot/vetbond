import User from '../model/User.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../lib/jwt.js'

// Controlador para el registro de usuarios
export const register = async (req, res) => {
    const {email, password, name} = req.body

    try {
        // Hash de la contraseña del usuario
        const passwordHash = await bcrypt.hash(password, 10)
        // Crear un nuevo usuario con la contraseña hasheada
        const newUser = new User({
            name,
            email,
            password: passwordHash
        })
        // Guardar el nuevo usuario en la base de datos
        const userSaved = await newUser.save();
        // Crear un token de acceso para el usuario registrado
        const token = await createAccessToken({id: userSaved._id})
        // Configurar una cookie con el token de acceso
        res.cookie('token', token)
        // Enviar una respuesta JSON con los detalles del usuario registrado
        res.json({
            id: userSaved._id,
            name: userSaved.name,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updateAt: userSaved.updatedAt
        })
          
    } catch (error) {
        // Manejar errores y enviar una respuesta de error
        res.status(500).json({ message: error.message });
    }
}

// Controlador para el inicio de sesión de usuarios
export const login = async (req, res) => {
    const {email, password} = req.body
    try {
        // Buscar al usuario por su correo electrónico
        const userFound = await User.findOne({email});
        
        // Verificar si el usuario existe
        if (!userFound) return res.status(400).json({ message: "User not found"});

        // Verificar si la contraseña proporcionada coincide con la contraseña almacenada
        const isMatch = await bcrypt.compare(password, userFound.password);
        if(!isMatch) return res.status(400).json({ Message: "Invalid Credentials"});
        
        // Crear un token de acceso para el usuario autenticado
        const token = await createAccessToken({ id: userFound._id});

        // Configurar una cookie con el token de acceso
        res.cookie('token', token);

        // Enviar una respuesta JSON con los detalles del usuario autenticado
        res.json({
            id: userFound._id,
            name: userFound.name,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updateAt: userFound.updatedAt
        });
    } catch (error) {
        // Manejar errores
    }
}

// Controlador para cerrar sesión de usuarios
export const logout = (req, res) => {
    // Eliminar la cookie de token estableciendo su fecha de caducidad en el pasado
    res.cookie("token", "", {
        expires: new Date(0)
    });

    // Enviar una respuesta con estado 200 (OK)
    return res.sendStatus(200);
}

export const profile = async (req, res) => {

    const userFound = await User.findById(req.user.id)
    if (!userFound) return res.status(400).json({ message: "User not found"})
    
    return res.json({
        id: userFound._id,
        name: userFound.name,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updateAt: userFound.updatedAt
    })

    res.send('profile')
}
