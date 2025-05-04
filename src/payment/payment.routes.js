import { Router } from 'express';
import {
    createPayment,
    getPayments,
    getPaymentById,
    updatePayment,
    deletePayment
} from './payment.controller.js';

import { validateJwt, isAdminPlataforma } from '../../middlewares/validate.jwt.js';
import { paymentValidator } from '../../helpers/validators.js';

const router = Router();

// Crear pago (adminPlataforma)
router.post('/', [validateJwt, isAdminPlataforma, paymentValidator], createPayment);

// Obtener todos los pagos
router.get('/', validateJwt, getPayments);

// Obtener pago por ID
router.get('/:id', validateJwt, getPaymentById);

// Actualizar pago (adminPlataforma)
router.put('/:id', [validateJwt, isAdminPlataforma, paymentValidator], updatePayment);

// Eliminar pago (adminPlataforma)
router.delete('/:id', [validateJwt, isAdminPlataforma], deletePayment);

export default router;
