import { Router } from 'express';
import { createHotel, getHotels, getHotelById, updateHotel, deleteHotel } from './hotel.controller.js';
import { validateJwt, isAdminPlataforma } from '../../middlewares/validate.jwt.js';
import { hotelValidator } from '../../helpers/validators.js';

const router = Router();

// Crear hotel (solo adminPlataforma)
router.post('/', [validateJwt, isAdminPlataforma, hotelValidator], createHotel);

// Obtener todos los hoteles (abierto para todos)
router.get('/', getHotels);

// Obtener hotel por ID
router.get('/:id', getHotelById);

// Actualizar hotel (solo adminPlataforma)
router.put('/:id', [validateJwt, isAdminPlataforma], updateHotel);

// Eliminar hotel (solo adminPlataforma)
router.delete('/:id', [validateJwt, isAdminPlataforma], deleteHotel);

export default router;
