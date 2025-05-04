import { Router } from 'express';
import {
    createRoom,
    getRooms,
    getRoomById,
    updateRoom,
    deleteRoom
} from './room.controller.js';

import { validateJwt, isAdminPlataforma } from '../../middlewares/validate.jwt.js';
import { roomValidator } from '../../helpers/validators.js';

const router = Router();

// Crear habitación (solo adminPlataforma)
router.post('/', [validateJwt, isAdminPlataforma, roomValidator], createRoom);

// Obtener todas las habitaciones
router.get('/', getRooms);

// Obtener habitación por ID
router.get('/:id', getRoomById);

// Actualizar habitación (solo adminPlataforma)
router.put('/:id', [validateJwt, isAdminPlataforma], updateRoom);

// Eliminar habitación (solo adminPlataforma)
router.delete('/:id', [validateJwt, isAdminPlataforma], deleteRoom);

export default router;
