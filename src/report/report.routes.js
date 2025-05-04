import { Router } from 'express';
import {
    getReservationsByUser,
    getReservationsByHotel,
    getPaymentsByHotel,
    getInvoicesByUser
} from './report.controller.js';

import { validateJwt, isAdminPlataforma } from '../../middlewares/validate.jwt.js';

const router = Router();

// Reservas por usuario
router.get('/reservations/user/:userId', validateJwt, getReservationsByUser);

// Reservas por hotel
router.get('/reservations/hotel/:hotelId', validateJwt, getReservationsByHotel);

// Pagos por hotel
router.get('/payments/hotel/:hotelId', [validateJwt, isAdminPlataforma], getPaymentsByHotel);

// Facturas por usuario
router.get('/invoices/user/:userId', validateJwt, getInvoicesByUser);

export default router;
