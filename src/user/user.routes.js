import { Router } from 'express';
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    changeUserRole
} from './user.controller.js';

import { validateJwt, isAdminPlataforma } from '../../middlewares/validate.jwt.js';

const router = Router();

// Obtener todos los usuarios (solo adminPlataforma)
router.get('/', [validateJwt, isAdminPlataforma], getAllUsers);

// Obtener usuario por ID (autenticado)
router.get('/:id', validateJwt, getUserById);

// Actualizar usuario (autenticado)
router.put('/:id', validateJwt, updateUser);

// Eliminar usuario (solo adminPlataforma)
router.delete('/:id', [validateJwt, isAdminPlataforma], deleteUser);

// Cambiar rol (solo adminPlataforma)
router.put('/changeRole/:id', [validateJwt, isAdminPlataforma], changeUserRole);

export default router;
