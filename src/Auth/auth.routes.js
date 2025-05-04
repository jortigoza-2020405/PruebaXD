import { Router } from 'express';
import {
    test,
    registerUser,
    login,
    registerAdmin
} from './auth.controller.js';

import { registerValidator, loginValidator } from '../../helpers/validators.js';
import { validateJwt, isAdminPlataforma } from '../../middlewares/validate.jwt.js';

const router = Router();

// Test
router.get('/test', test);

// Registro cliente
router.post('/register', registerValidator, registerUser);

// Login general
router.post('/login', loginValidator, login);

// Registro administrador (solo adminPlataforma puede crear otros admins)
router.post('/registerAdmin', [validateJwt, isAdminPlataforma, registerValidator], registerAdmin);

export default router;
