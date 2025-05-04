import { Router } from 'express';
import {
    createInvoice,
    getInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice
} from './invoice.controller.js';

import { validateJwt, isAdminPlataforma } from '../../middlewares/validate.jwt.js';
import { invoiceValidator } from '../../helpers/validators.js';

const router = Router();

// Crear factura (solo adminPlataforma)
router.post('/', [validateJwt, isAdminPlataforma, invoiceValidator], createInvoice);

// Obtener todas las facturas
router.get('/', validateJwt, getInvoices);

// Obtener factura por ID
router.get('/:id', validateJwt, getInvoiceById);


// Actualizar factura
router.put('/:id', [validateJwt, isAdminPlataforma, invoiceValidator], updateInvoice);

// Eliminar factura
router.delete('/:id', [validateJwt, isAdminPlataforma], deleteInvoice);

export default router;
