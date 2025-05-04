import { checkPassword, encrypt } from '../../utils/encrypt.js';
import { generateJwt } from '../../utils/jwt.js';
import User from '../user/user.model.js';

// Test
export const test = (req, res) => {
    return res.send({ message: 'Test is running' });
};

// Registro de usuario normal (cliente)
export const registerUser = async (req, res) => {
    try {
        const data = req.body;

        // Asignar firebaseUid si no se manda
        if (!data.firebaseUid) {
            const userCount = await User.countDocuments();
            data.firebaseUid = `user_${userCount + 1}`;
        }

        data.password = await encrypt(data.password);
        const user = new User(data);
        await user.save();
        return res.status(201).send({ message: 'Usuario registrado exitosamente', user });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al registrar usuario', error });
    }
};

// Login (para todos los roles)
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send({ message: 'Correo o contraseña incorrectos' });

        const validPassword = await checkPassword(password, user.password);
        if (!validPassword) return res.status(400).send({ message: 'Correo o contraseña incorrectos' });

        const token = await generateJwt({
            uid: user._id,
            name: user.firstName + ' ' + user.lastName,
            email: user.email,
            role: user.role
        });

        return res.send({
            message: `Bienvenido ${user.firstName}`,
            loggedUser: {
                uid: user._id,
                name: user.firstName + ' ' + user.lastName,
                email: user.email,
                role: user.role
            },
            token
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error en login', error });
    }
};

// Registro de administrador
export const registerAdmin = async (req, res) => {
    try {
        const data = req.body;

        if (!data.firebaseUid) {
            const userCount = await User.countDocuments();
            data.firebaseUid = `admin_${userCount + 1}`;
        }

        data.role = 'adminPlataforma';
        data.password = await encrypt(data.password);
        const admin = new User(data);
        await admin.save();

        return res.status(201).send({ message: 'Administrador de plataforma creado exitosamente', admin });

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al registrar administrador', error });
    }
};
