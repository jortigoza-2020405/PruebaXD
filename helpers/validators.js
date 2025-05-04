import { body } from "express-validator";
import { validateErrors } from "./validate.error.js";
import { existEmail } from "./db.validators.js"; // El que te hice antes

// ======================
// VALIDACIÓN REGISTRO
// ======================

export const registerValidator = [
    body('firstName', 'El nombre no puede estar vacío').notEmpty(),
    body('lastName', 'El apellido no puede estar vacío').notEmpty(),
    body('email', 'El correo es obligatorio y debe ser válido')
        .notEmpty()
        .isEmail()
        .custom(existEmail),
    body('password', 'La contraseña es obligatoria y debe tener al menos 8 caracteres')
        .notEmpty()
        .isLength({ min: 8 }),
    body('role')
        .optional()
        .isIn(['cliente', 'adminHotel', 'adminPlataforma'])
        .withMessage('Rol inválido'),
    validateErrors
];

// ======================
// VALIDACIÓN LOGIN
// ======================

export const loginValidator = [
    body('email', 'El correo es obligatorio y debe ser válido')
        .notEmpty()
        .isEmail(),
    body('password', 'La contraseña es obligatoria')
        .notEmpty()
        .isLength({ min: 8 }),
    validateErrors
];

// ======================
// CAMBIO DE CONTRASEÑA
// ======================

export const newPasswordValidator = [
    body('newPassword', 'La nueva contraseña es obligatoria y debe tener mínimo 8 caracteres')
        .notEmpty()
        .isLength({ min: 8 }),
    validateErrors
];


// ======================
// hotel validator
// ======================
export const hotelValidator = [
    body('name', 'El nombre del hotel es obligatorio').notEmpty(),
    body('email', 'El email debe ser válido').optional().isEmail(),
    validateErrors
];

// ======================
// Room validator
// ======================

export const roomValidator = [
    body('roomNumber', 'El número de habitación es obligatorio').notEmpty(),
    body('roomType', 'El tipo de habitación es obligatorio').notEmpty(),
    body('capacity', 'La capacidad es obligatoria y debe ser un número').notEmpty().isNumeric(),
    body('pricePerNight', 'El precio por noche es obligatorio y debe ser un número').notEmpty().isNumeric(),
    body('hotel', 'El ID del hotel es obligatorio').notEmpty(),
    validateErrors
];

// ======================
// Event validator
// ======================

export const eventValidator = [
    body('name', 'El nombre del evento es obligatorio').notEmpty(),
    body('startDate', 'La fecha de inicio es obligatoria').notEmpty(),
    body('endDate', 'La fecha de fin es obligatoria').notEmpty(),
    body('hotel', 'El ID del hotel es obligatorio').notEmpty(),
    validateErrors
];

// ======================
// category validator
// ======================

export const categoryValidator = [
    body('name', 'El nombre de la categoría es obligatorio').notEmpty(),
    validateErrors
];

// ======================
// Reserva validator
// ======================

export const reservationValidator = [
    body('user', 'El ID del usuario es obligatorio').notEmpty(),
    body('hotel', 'El ID del hotel es obligatorio').notEmpty(),
    body('room', 'El ID de la habitación es obligatorio').notEmpty(),
    body('startDate', 'La fecha de inicio es obligatoria').notEmpty(),
    body('endDate', 'La fecha de fin es obligatoria').notEmpty(),
    validateErrors
];

// ======================
// Reserva validator
// ======================

export const invoiceValidator = [
    body('reservation', 'El ID de la reserva es obligatorio').notEmpty(),
    body('items.*.description', 'Cada item debe tener una descripción').notEmpty(),
    body('items.*.price', 'Cada item debe tener un precio válido').isNumeric().toFloat(),
    // Nota: el total es opcional porque se calcula si no se manda
    validateErrors
];

// ======================
// payment validator
// ======================

export const paymentValidator = [
    body('reservation', 'El ID de la reserva es obligatorio').notEmpty(),
    body('amount', 'El monto es obligatorio y debe ser numérico').notEmpty().isNumeric(),
    body('method').optional().isIn(['CARD', 'CASH', 'TRANSFER']),
    body('status').optional().isIn(['SUCCESS', 'PENDING', 'FAILED']),
    validateErrors
];

