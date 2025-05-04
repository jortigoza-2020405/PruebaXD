import { Router } from 'express';
import {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent
} from './event.controller.js';

import { validateJwt, isAdminPlataforma } from '../../middlewares/validate.jwt.js';
import { eventValidator } from '../../helpers/validators.js';

const router = Router();

// Crear evento (solo adminPlataforma)
router.post('/', [validateJwt, isAdminPlataforma, eventValidator], createEvent);

// Obtener todos los eventos
router.get('/', getEvents);

// Obtener evento por ID
router.get('/:id', getEventById);

// Actualizar evento (solo adminPlataforma)
router.put('/:id', [validateJwt, isAdminPlataforma], updateEvent);

// Eliminar evento (solo adminPlataforma)
router.delete('/:id', [validateJwt, isAdminPlataforma], deleteEvent);

export default router;
