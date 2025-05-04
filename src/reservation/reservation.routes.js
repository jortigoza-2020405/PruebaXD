import { Router } from 'express';
import {
    createReservation,
    getReservations,
    getReservationById,
    updateReservation,
    deleteReservation
} from './reservation.controller.js';

import { validateJwt } from '../../middlewares/validate.jwt.js';

const router = Router();

// Crear reserva (usuario autenticado)
router.post('/', validateJwt, createReservation);

// Obtener todas las reservas (adminPlataforma)
router.get('/', validateJwt, getReservations);

// Obtener reserva por ID
router.get('/:id', validateJwt, getReservationById);

// Actualizar reserva
router.put('/:id', validateJwt, updateReservation);

// Eliminar reserva
router.delete('/:id', validateJwt, deleteReservation);

export default router;
