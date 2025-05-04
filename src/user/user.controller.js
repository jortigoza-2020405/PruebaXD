import User from './user.model.js';
import { encrypt } from '../../utils/encrypt.js';

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
    const users = await User.find();
    return res.send({ users });
};

// Obtener usuario por ID
export const getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).send({ message: 'Usuario no encontrado' });
    return res.send({ user });
};

// Actualizar usuario (su propia información)
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    if (data.password) {
        data.password = await encrypt(data.password);
    }

    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
    if (!updatedUser) return res.status(404).send({ message: 'Usuario no encontrado' });

    return res.send({ message: 'Usuario actualizado', updatedUser });
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).send({ message: 'Usuario no encontrado' });

    return res.send({ message: 'Usuario eliminado', deletedUser });
};

// Cambiar rol (solo admin plataforma puede cambiar el rol de otros usuarios)
export const changeUserRole = async (req, res) => {
    const { id } = req.params;
    const { newRole } = req.body;

    if (!['cliente', 'adminHotel', 'adminPlataforma'].includes(newRole)) {
        return res.status(400).send({ message: 'Rol inválido' });
    }

    const updatedUser = await User.findByIdAndUpdate(id, { role: newRole }, { new: true });
    if (!updatedUser) return res.status(404).send({ message: 'Usuario no encontrado' });

    return res.send({ message: 'Rol actualizado exitosamente', updatedUser });
};
